import React, { ReactElement } from "react";
import { NextIntlProvider } from "next-intl";
import { render, RenderOptions } from "@testing-library/react";
import messages from "@/dictionaries/en.json";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlProvider locale="en" messages={messages}>
      {children}
    </NextIntlProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
