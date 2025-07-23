export interface NavigatorUserAgentData {
  platform: string;
  brands: Array<{ brand: string; version: string }>;
  mobile: boolean;
}

export interface NavigatorWithUserAgentData extends Navigator {
  userAgentData?: NavigatorUserAgentData;
}

/**
 * Detect user's architecture from browser
 * Supports Apple Silicon (M1/M2/M3/M4/etc.), ARM64, RISC-V, and x86_64
 */
export const detectArchitecture = (): string => {
  if (typeof window === "undefined") return "x86_64"; // SSR fallback

  const userAgent = navigator.userAgent;

  // Modern approach: use userAgentData if available
  const navigatorWithUserAgentData = navigator as NavigatorWithUserAgentData;
  if (navigatorWithUserAgentData.userAgentData?.platform) {
    const platform = navigatorWithUserAgentData.userAgentData.platform;

    // Check for Apple Silicon (M1/M2/M3/M4/etc.)
    if (platform === "macOS" && userAgent.includes("ARM64")) {
      return "aarch64";
    }
  }

  // Enhanced Apple Silicon detection for browsers that don't report ARM64 correctly
  if (userAgent.includes("Mac")) {
    // Check for explicit ARM64 mentions
    if (userAgent.includes("ARM64")) {
      return "aarch64";
    }

    // Dynamic Apple Silicon detection - check for any "Apple M" chip (M1, M2, M3, M4, M5, etc.)
    if (userAgent.includes("Apple M")) {
      return "aarch64";
    }

    // WebGL-based detection for Apple Silicon (more reliable than user agent parsing)
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl");
      if (gl) {
        // Apple Silicon supports the WEBGL_compressed_texture_etc extension.
        // However, this is not a definitive indicator, as some Intel Macs with certain GPUs
        // might also support this extension. This is one of several heuristics used for detection.
        const extensions = gl.getSupportedExtensions();
        if (extensions && extensions.includes("WEBGL_compressed_texture_etc")) {
          return "aarch64";
        }
      }
    } catch (_e) {
      // WebGL detection failed, continue with other methods
    }

    // Fallback: Try to detect Apple Silicon based on system characteristics
    // Apple Silicon Macs typically have high core counts and run newer macOS versions.
    const APPLE_SILICON_MIN_CORES = 8; // Heuristic: Apple Silicon devices generally have 8+ cores.
    if (navigator.hardwareConcurrency >= APPLE_SILICON_MIN_CORES) {
      const osVersionMatch = userAgent.match(/Mac OS X (\d+)_(\d+)_(\d+)/);
      if (osVersionMatch) {
        const majorVersion = parseInt(osVersionMatch[1]);
        // macOS 11+ (Big Sur) is when Apple Silicon was introduced.
        if (majorVersion >= 11) {
          // Additional check: if it's a Mac with many cores and newer macOS, likely Apple Silicon.
          return "aarch64";
        }
      }
    }
  }

  // Check for ARM64 on other platforms
  if (userAgent.includes("ARM64") || userAgent.includes("aarch64")) {
    return "aarch64";
  }

  // Check for RISC-V (less common, but possible)
  if (userAgent.includes("riscv64") || userAgent.includes("RISC-V")) {
    return "riscv64";
  }

  // Default to x86_64 for most cases
  return "x86_64";
};
