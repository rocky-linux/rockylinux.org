import React, { useEffect } from "react";
import { useDarkMode } from "storybook-dark-mode";

import "../app/[locale]/globals.css";

import type { Preview } from "@storybook/react";

const modifyPreviewWindowClass = (
  isDarkMode: boolean,
  selector: string,
  changeDarkClass: boolean,
  forceMode: "light" | "dark" | undefined
) => {
  const preview = document.querySelector(selector);
  if (preview) {
    if (forceMode === "light" || (!isDarkMode && forceMode !== "dark")) {
      if (changeDarkClass) {
        preview.classList.remove("dark");
      }
      preview.classList.add("bg-white");
      preview.classList.remove("bg-gray-900");
    } else {
      if (changeDarkClass) {
        preview.classList.add("dark");
      }
      preview.classList.add("bg-gray-900");
      preview.classList.remove("bg-white");
    }
  }
};

const removePreviewBodyBackground = () => {
  const preview = document.querySelector("body");
  if (preview) {
    preview.classList.remove("sb-show-main");
    preview.style.padding = "1rem";
  }
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    (Story, { parameters }) => {
      const isDarkMode = useDarkMode();
      const forceMode = parameters.forceMode;

      useEffect(() => {
        removePreviewBodyBackground();
        modifyPreviewWindowClass(isDarkMode, "html", false, forceMode);
        modifyPreviewWindowClass(isDarkMode, "body", true, forceMode);
      }, [isDarkMode]);

      return <Story />;
    },
  ],
};

export default preview;
