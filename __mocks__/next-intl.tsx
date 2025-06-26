import React from "react";

export function NextIntlClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function useTranslations() {
  return (key: string) => key;
}

export function useFormatter() {
  return { dateTime: () => "mocked date", number: () => "mocked number" };
}

export default { NextIntlClientProvider, useTranslations, useFormatter };
