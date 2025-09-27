import { detectArchitecture } from "../architectureDetection";

describe("detectArchitecture", () => {
  // Store original globals
  let originalNavigator: Navigator;
  let originalWindow: Window;

  beforeEach(() => {
    // Store original globals
    originalNavigator = global.navigator;
    originalWindow = global.window;
  });

  afterEach(() => {
    // Restore original globals
    Object.defineProperty(global, "navigator", {
      value: originalNavigator,
      writable: true,
    });
  });

  describe("SSR/Server-side rendering", () => {
    it("should return x86_64 when window is undefined", () => {
      // Remove window for SSR test
      delete (global as any).window;

      expect(detectArchitecture()).toBe("x86_64");
    });
  });

  describe("Basic architecture detection", () => {
    it("should detect ARM64 when user agent contains ARM64", () => {
      Object.defineProperty(global, "navigator", {
        value: {
          userAgent:
            "Mozilla/5.0 (Macintosh; ARM64 Mac OS X 10_15_7) AppleWebKit/537.36",
        },
        writable: true,
      });

      expect(detectArchitecture()).toBe("aarch64");
    });

    it("should detect Apple Silicon when user agent contains Apple M1", () => {
      // Mock document.createElement to avoid WebGL errors
      const originalCreateElement = document.createElement;
      document.createElement = jest.fn().mockReturnValue({
        getContext: jest.fn().mockReturnValue(null),
      });

      Object.defineProperty(global, "navigator", {
        value: {
          userAgent:
            "Mozilla/5.0 (Macintosh; Apple M1 Mac OS X 10_15_7) AppleWebKit/537.36",
        },
        writable: true,
      });

      expect(detectArchitecture()).toBe("aarch64");

      // Restore document.createElement
      document.createElement = originalCreateElement;
    });

    it("should detect Apple Silicon when user agent contains Apple M4", () => {
      // Mock document.createElement to avoid WebGL errors
      const originalCreateElement = document.createElement;
      document.createElement = jest.fn().mockReturnValue({
        getContext: jest.fn().mockReturnValue(null),
      });

      Object.defineProperty(global, "navigator", {
        value: {
          userAgent:
            "Mozilla/5.0 (Macintosh; Apple M4 Mac OS X 10_15_7) AppleWebKit/537.36",
        },
        writable: true,
      });

      expect(detectArchitecture()).toBe("aarch64");

      // Restore document.createElement
      document.createElement = originalCreateElement;
    });

    it("should detect ARM64 on Linux when user agent contains aarch64", () => {
      Object.defineProperty(global, "navigator", {
        value: {
          userAgent: "Mozilla/5.0 (Linux; aarch64) AppleWebKit/537.36",
        },
        writable: true,
      });

      expect(detectArchitecture()).toBe("aarch64");
    });

    it("should detect RISC-V when user agent contains riscv64", () => {
      Object.defineProperty(global, "navigator", {
        value: {
          userAgent: "Mozilla/5.0 (Linux; riscv64) AppleWebKit/537.36",
        },
        writable: true,
      });

      expect(detectArchitecture()).toBe("riscv64");
    });

    it("should return x86_64 for standard Intel/AMD systems", () => {
      Object.defineProperty(global, "navigator", {
        value: {
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        writable: true,
      });

      expect(detectArchitecture()).toBe("x86_64");
    });

    it("should return x86_64 for Intel Macs", () => {
      // Mock document.createElement to avoid WebGL errors
      const originalCreateElement = document.createElement;
      document.createElement = jest.fn().mockReturnValue({
        getContext: jest.fn().mockReturnValue(null),
      });

      Object.defineProperty(global, "navigator", {
        value: {
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
        writable: true,
      });

      expect(detectArchitecture()).toBe("x86_64");

      // Restore document.createElement
      document.createElement = originalCreateElement;
    });
  });
});
