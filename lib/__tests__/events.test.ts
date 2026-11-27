import fs from "fs";

import { getEvents } from "../events";

jest.mock("fs", () => ({
  promises: {
    readdir: jest.fn(),
    readFile: jest.fn(),
  },
}));

const files: Record<string, string> = {};

const eventFile = (fields: string) => `---\n${fields}\n---\n`;

describe("Events Library", () => {
  beforeEach(() => {
    for (const key of Object.keys(files)) delete files[key];
    jest.spyOn(console, "warn").mockImplementation(() => {});
    (fs.promises.readdir as jest.Mock).mockImplementation(async () =>
      Object.keys(files)
    );
    jest.spyOn(fs.promises, "readFile").mockImplementation(async (filePath) => {
      const name = String(filePath).split("/").pop() as string;
      return files[name];
    });
  });

  afterEach(() => jest.restoreAllMocks());

  it("returns empty lists when the events directory is missing", async () => {
    (fs.promises.readdir as jest.Mock).mockRejectedValue(new Error("ENOENT"));

    await expect(getEvents("2027-01-01")).resolves.toEqual({
      upcoming: [],
      past: [],
    });
  });

  it("splits upcoming and past, ordering each sensibly", async () => {
    files["late.md"] = eventFile(
      'title: Late\nstartDate: "2027-09-01"\nlocation: Berlin'
    );
    files["soon.md"] = eventFile(
      'title: Soon\nstartDate: "2027-03-01"\nlocation: Atlanta'
    );
    files["old.md"] = eventFile(
      'title: Old\nstartDate: "2026-01-01"\nlocation: Online'
    );
    files["older.md"] = eventFile(
      'title: Older\nstartDate: "2025-01-01"\nlocation: Online'
    );

    const { upcoming, past } = await getEvents("2027-01-01");

    expect(upcoming.map((e) => e.slug)).toEqual(["soon", "late"]);
    expect(past.map((e) => e.slug)).toEqual(["old", "older"]);
  });

  it("keeps a multi-day event upcoming until its last day ends", async () => {
    files["conf.md"] = eventFile(
      'title: Conf\nstartDate: "2027-03-01"\nendDate: "2027-03-03"\nlocation: X'
    );

    expect((await getEvents("2027-03-03")).upcoming).toHaveLength(1);
    expect((await getEvents("2027-03-04")).past).toHaveLength(1);
  });

  it("accepts unquoted YAML dates and optional fields", async () => {
    files["conf.md"] = eventFile(
      "title: Conf\nstartDate: 2027-03-01\nlocation: Austin\nurl: https://example.com\ndescription: Come say hi"
    );

    const [event] = (await getEvents("2027-01-01")).upcoming;

    expect(event).toEqual({
      slug: "conf",
      title: "Conf",
      startDate: "2027-03-01",
      location: "Austin",
      url: "https://example.com",
      description: "Come say hi",
    });
  });

  it("drops an end date that is not after the start date", async () => {
    files["conf.md"] = eventFile(
      'title: Conf\nstartDate: "2027-03-05"\nendDate: "2027-03-01"\nlocation: X'
    );

    const [event] = (await getEvents("2027-01-01")).upcoming;

    expect(event.endDate).toBeUndefined();
  });

  it("skips invalid events and non-markdown files with a warning", async () => {
    files["no-title.md"] = eventFile('startDate: "2027-03-01"\nlocation: X');
    files["bad-date.md"] = eventFile(
      "title: Bad\nstartDate: soon\nlocation: X"
    );
    files["bad-url.md"] = eventFile(
      'title: Bad\nstartDate: "2027-03-01"\nlocation: X\nurl: "javascript:alert(1)"'
    );
    files["README.txt"] = "ignore me";
    files["good.md"] = eventFile(
      'title: Good\nstartDate: "2027-03-01"\nlocation: X'
    );

    const { upcoming } = await getEvents("2027-01-01");

    expect(upcoming.map((e) => e.slug)).toEqual(["good"]);
    expect(console.warn).toHaveBeenCalledTimes(3);
  });
});
