# Contributing Guide

Thank you for your interest in contributing to the Rocky Linux website! Our site is built with Next.js using TypeScript, leverages the App Router, and styles with TailwindCSS. We also use components from shadcn/ui to keep our UI sleek and functional. Below is a guide to help you get started with your contributions.

**Prerequisites**

Before contributing, ensure you have a basic understanding of the following:

- **Next.js:** Familiarity with Next.js and its core principles is crucial as our website relies on this framework.
- **TypeScript:** All code should be written in TypeScript.
- **TailwindCSS:** Styles should be implemented using TailwindCSS.
- **Git:** Knowledge of Git workflows is essential since all our code management is done through Git.

**Development Environment**

1. **Fork and Clone:** Start by forking the repository and then cloning your fork locally.
2. **Install Dependencies:** Navigate to the project directory and run `npm install` to install the necessary dependencies.
3. **Branch:** Always create a new branch from `develop` for your work. The `develop` branch is our main development branch, and all PRs should target this branch.

**Issue-Driven Development**

- **Find or Create an Issue:** Before starting work on a change, please search for an existing issue. If no issue addresses your proposed changes, create a new issue to document the problem or potential enhancement.
- **Link Your PR:** When you open your pull request, clearly link it to the associated issue. This helps maintainers understand the context of your changes.

**Coding Guidelines**

- **Code Style:** Pay attention to ESLint warnings. Your pull requests should not introduce any new ESLint warnings. If you encounter warnings in areas you are not working on, consider fixing them.
- **Components:** Utilize existing UI components from shadcn/ui where possible. If you need to create new components, ensure they are reusable and well-documented.
- **TypeScript Usage:** Make sure to use TypeScript effectively to maintain type safety across the application.

**Adding Images**

- **Location:** Images used by the site itself go in the `public/images` directory, categorized by purpose. Images for news posts go in the content repository instead (see below).
- **Optimization:** Ensure that images are optimized for the web to enhance performance and reduce load times.

**News Posts and Events**

News posts are not stored in this repository. They live in [rocky-linux/rockylinux.org-content](https://github.com/rocky-linux/rockylinux.org-content), and this repository clones them at dev and build time. Only the code that renders them belongs here.

- **Where to contribute:** Open a pull request against the `main` branch of the content repository. Merging it triggers a rebuild of the website, so a new post does not need a pull request or a release here.
- **Do not edit here:** `news/` and `public/images/content/` are overwritten on every fetch and are not committed to this repository.
- **Posts:** Add a Markdown file at `news/<slug>.md`. The filename becomes the post's URL (`/news/<slug>`), so keep it URL-safe and lowercase, with words separated by hyphens. The frontmatter must include `title` and `date`. The content repository checks this on every pull request, and you can run the same check there with `npm run validate`.
- **Images:** Add image files to the content repository's `images/` directory and reference them as `/images/content/<filename>`, including images in the post body. Paths without the `content` folder will not load.
- **Previewing locally:** Point your local site at a branch of the content repository with `NEWS_CONTENT_REPO_BRANCH=<branch> npm run dev`. For a branch on your fork, also set `NEWS_CONTENT_REPO_URL` to your fork's clone URL. Use `SKIP_NEWS_FETCH=1` when working offline.
- **Events:** Event listings will also live in the content repository once the events page ([#387](https://github.com/rocky-linux/rockylinux.org/pull/387)) ships.

**News Post Images**

News posts can declare a lead image in their frontmatter. It is rendered above the post body and is also used for the OpenGraph social card, the `NewsArticle` structured data, and the RSS feed.

```yaml
---
title: "Example Post"
date: "2026-01-01"
author: "Your Name"
image: "/images/content/example.png"
imageDark: "/images/content/example-dark.png"
imageAlt: "Description of the image"
imageWidth: 526
---
```

- **`image`** (required for a lead image): Path to the image, in the form `/images/content/<filename>`. Intrinsic dimensions are read from the file at build time, so no size needs to be declared.
- **`imageDark`** (optional): Variant shown when the site is in dark mode. Use this when an image does not read well on both backgrounds, such as a dark-on-transparent logo. Both variants should share the same dimensions.
- **`imageAlt`** (optional): Alternative text. When an `imageDark` variant is present it is marked decorative, so only the light variant carries the alt text.
- **`imageWidth`** (optional): Caps the rendered width in CSS pixels and centers the image. Omit it to span the full content column. Useful for logos and other artwork that should not be upscaled.
- **Social cards:** Use a raster format such as PNG. Crawlers do not render SVG, so an SVG lead image will not produce a social card.

**Translation Contributions**

Currently, we are not accepting contributions for translations as the marketing copy has not been finalized. Please refrain from submitting translation updates at this time.

**Pull Request Process**

1. **Pull Request:** Once you are ready, open a pull request against the `develop` branch. Ensure that your PR title and description clearly describe the changes, and **reference the associated issue number (e.g., "Fixes #123")**.
2. **Review:** Your pull request will be reviewed by a member of the Web Team (see **Reviewers**). Be responsive to feedback and make necessary adjustments based on the review.
3. **Merge:** Once your PR is approved and passes all checks, a maintainer will merge it into the `develop` branch.

**Reviewers**

Request a review from one of the following Web Team members. This applies to pull requests into `develop` and to release pull requests from `develop` into `main`.

| Name           | GitHub                                            |
| -------------- | ------------------------------------------------- |
| Gabriel Graves | [NebraskaCoder](https://github.com/NebraskaCoder) |

**Testing**

Before submitting your pull request, ensure that all existing tests pass and add new tests if you are introducing new features or significant changes.

**Getting Help**

If you have any questions or need assistance with your contributions, please reach out via our [Mattermost instance](https://chat.rockylinux.org/rocky-linux/channels/web).

We appreciate your contributions and look forward to improving the Rocky Linux website together!
