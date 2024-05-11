import * as newsLib from "../news";

// Mocks
import fs, { Dirent } from "fs";
import path from "path";
import "@/utils/remarkUtils";

jest.mock("@/utils/remarkUtils", () => ({
  processMarkdownAsHTML: jest
    .fn()
    .mockResolvedValue("<p>Mocked HTML content</p>"),
}));

jest.mock("fs", () => ({
  promises: {
    access: jest.fn(),
    readdir: jest.fn(),
    readFile: jest.fn(),
  },
}));

// Tests

describe("News Library", () => {
  beforeEach(() => {
    const mockFileNames = ["post1.md", "post2.md"];
    const mockFileContents = [
      '---\ntitle: Post 1\ndate: "2022-01-01"\n---\n\nPost 1 content',
      '---\ntitle: Post 2\ndate: "2022-01-02"\n---\n\nPost 2 content',
    ];

    jest.spyOn(fs.promises, "access").mockImplementation((filePath) => {
      const index = mockFileNames.indexOf(path.basename(filePath.toString()));
      return index >= 0 ? Promise.resolve() : Promise.reject();
    });

    jest
      .spyOn(fs.promises, "readdir")
      .mockResolvedValue(mockFileNames as unknown as Dirent[]);

    jest.spyOn(fs.promises, "readFile").mockImplementation((filePath) => {
      const index = mockFileNames.indexOf(path.basename(filePath.toString()));
      return Promise.resolve(mockFileContents[index]);
    });
  });

  describe("checkIfSlugIsValid", () => {
    it("should return true if the slug is valid", async () => {
      const slug = "post1";
      const isValid = await newsLib.checkIfSlugIsValid(slug);
      expect(isValid).toBe(true);
    });

    it("should return false if the slug is blank", async () => {
      const slug = "";
      const isValid = await newsLib.checkIfSlugIsValid(slug);
      expect(isValid).toBe(false);
    });

    it("should return false if the slug is invalid", async () => {
      const slug = "invalid-slug";
      const isValid = await newsLib.checkIfSlugIsValid(slug);
      expect(isValid).toBe(false);
    });

    it("should return false if the slug is in an invalid format", async () => {
      const slug = "invalid/slug";
      const isValid = await newsLib.checkIfSlugIsValid(slug);
      expect(isValid).toBe(false);
    });
  });

  describe("getSortedPostsData", () => {
    it("should return an array of sorted post data with excerpt and contentHtml", async () => {
      const sortedPosts = await newsLib.getSortedPostsData();
      expect(sortedPosts).toStrictEqual([
        {
          slug: "post2",
          excerpt: "Mocked HTML content...",
          contentHtml: "<p>Mocked HTML content</p>",
          date: "2022-01-02",
          title: "Post 2",
        },
        {
          slug: "post1",
          excerpt: "Mocked HTML content...",
          contentHtml: "<p>Mocked HTML content</p>",
          date: "2022-01-01",
          title: "Post 1",
        },
      ]);
    });
  });

  describe("getAllPostSlugs", () => {
    it("should return an array of all post slugs", async () => {
      const postSlugs = await newsLib.getAllPostSlugs();
      expect(postSlugs).toStrictEqual([
        { params: { slug: "post1" } },
        { params: { slug: "post2" } },
      ]);
    });
  });

  describe("getPostData", () => {
    it("should return the data of a specific post", async () => {
      const slug = "post1";
      const postData = await newsLib.getPostData(slug);
      expect(postData).toBeDefined();
      expect(postData.date.toString()).toBe("2022-01-01");
      expect(postData.slug).toBe(slug);
      expect(postData.contentHtml).toBe("<p>Mocked HTML content</p>");
    });

    it("should throw an error if the post does not exist", async () => {
      const slug = "non-existent-post";
      await expect(newsLib.getPostData(slug)).rejects.toThrow();
    });
  });
});
