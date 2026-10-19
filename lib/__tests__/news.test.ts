import * as newsLib from "../news";

// Mocks
import fs, { Dirent } from "fs";
import path from "path";
import { imageSize } from "image-size";
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

jest.mock("image-size", () => ({
  imageSize: jest.fn().mockReturnValue({ width: 1052, height: 240 }),
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

    jest.spyOn(fs.promises, "readdir").mockResolvedValue(mockFileNames as any);

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

    it("should not include an image when the post has no image frontmatter", async () => {
      const postData = await newsLib.getPostData("post1");
      expect(postData).not.toHaveProperty("image");
    });
  });

  describe("post images", () => {
    const mockPostWithImage = (frontmatter: string) => {
      jest.spyOn(fs.promises, "readFile").mockImplementation((filePath) => {
        if (filePath.toString().endsWith(".md")) {
          return Promise.resolve(
            `---\ntitle: Post 1\ndate: "2022-01-01"\n${frontmatter}\n---\n\nPost 1 content`
          );
        }
        return Promise.resolve(Buffer.from("image bytes"));
      });
    };

    it("should resolve image frontmatter into dimensions and a dark variant", async () => {
      mockPostWithImage(
        'image: "/images/logos/opencourant.png"\nimageDark: "/images/logos/opencourant-dark.png"\nimageAlt: "OpenCourant Logo"\nimageWidth: 526'
      );

      const postData = await newsLib.getPostData("post1");

      expect(postData.image).toStrictEqual({
        src: "/images/logos/opencourant.png",
        srcDark: "/images/logos/opencourant-dark.png",
        alt: "OpenCourant Logo",
        width: 1052,
        height: 240,
        displayWidth: 526,
      });
    });

    it("should omit the dark variant, display width, and default the alt text", async () => {
      mockPostWithImage('image: "/images/news/example.png"');

      const postData = await newsLib.getPostData("post1");

      expect(postData.image).toStrictEqual({
        src: "/images/news/example.png",
        alt: "",
        width: 1052,
        height: 240,
      });
    });

    it("should drop only the dark variant when its file cannot be read", async () => {
      jest.spyOn(fs.promises, "readFile").mockImplementation((filePath) => {
        const target = filePath.toString();
        if (target.endsWith(".md")) {
          return Promise.resolve(
            '---\ntitle: Post 1\ndate: "2022-01-01"\nimage: "/images/news/example.png"\nimageDark: "/images/news/missing-dark.png"\n---\n\nPost 1 content'
          );
        }
        if (target.endsWith("missing-dark.png")) {
          return Promise.reject(new Error("ENOENT"));
        }
        return Promise.resolve(Buffer.from("image bytes"));
      });

      const warn = jest.spyOn(console, "warn").mockImplementation(() => {});

      const postData = await newsLib.getPostData("post1");

      expect(postData.image).toStrictEqual({
        src: "/images/news/example.png",
        alt: "",
        width: 1052,
        height: 240,
      });
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining("missing-dark.png")
      );

      warn.mockRestore();
    });

    it("should keep the dark variant but warn when its dimensions differ", async () => {
      mockPostWithImage(
        'image: "/images/news/example.png"\nimageDark: "/images/news/example-dark.png"'
      );

      (imageSize as jest.Mock)
        .mockReturnValueOnce({ width: 1052, height: 240 })
        .mockReturnValueOnce({ width: 800, height: 200 });

      const warn = jest.spyOn(console, "warn").mockImplementation(() => {});

      const postData = await newsLib.getPostData("post1");

      expect(postData.image?.srcDark).toBe("/images/news/example-dark.png");
      expect(warn).toHaveBeenCalledWith(expect.stringContaining("800x200"));

      warn.mockRestore();
    });

    it("should not expose raw image frontmatter keys", async () => {
      mockPostWithImage(
        'image: "/images/news/example.png"\nimageDark: "/images/news/example-dark.png"\nimageAlt: "Example"'
      );

      const postData = await newsLib.getPostData("post1");

      expect(postData).not.toHaveProperty("imageDark");
      expect(postData).not.toHaveProperty("imageAlt");
      expect(postData).not.toHaveProperty("imageWidth");
    });

    it("should skip the image when the file cannot be read", async () => {
      jest.spyOn(fs.promises, "readFile").mockImplementation((filePath) => {
        if (filePath.toString().endsWith(".md")) {
          return Promise.resolve(
            '---\ntitle: Post 1\ndate: "2022-01-01"\nimage: "/images/news/missing.png"\n---\n\nPost 1 content'
          );
        }
        return Promise.reject(new Error("ENOENT"));
      });

      const warn = jest.spyOn(console, "warn").mockImplementation(() => {});

      const postData = await newsLib.getPostData("post1");

      expect(postData).not.toHaveProperty("image");
      expect(warn).toHaveBeenCalled();

      warn.mockRestore();
    });

    it("should skip the image when the path escapes the public directory", async () => {
      mockPostWithImage('image: "/../../etc/passwd"');

      const warn = jest.spyOn(console, "warn").mockImplementation(() => {});

      const postData = await newsLib.getPostData("post1");

      expect(postData).not.toHaveProperty("image");

      warn.mockRestore();
    });
  });
});
