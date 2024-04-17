import Script from "next/script";

function AccessibilityWidget() {
  return (
    <Script
      src="/sienna.min.js"
      strategy="afterInteractive"
    />
  );
}

export default AccessibilityWidget;
