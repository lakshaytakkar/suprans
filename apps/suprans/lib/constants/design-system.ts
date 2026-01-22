/**
 * Suprans Design System Constants
 * Centralized design tokens for consistent branding
 */

export const designTokens = {
  colors: {
    primary: {
      main: "#dc2626", // Red-600
      hover: "#b91c1c", // Red-700
      light: "#fee2e2", // Red-100
      dark: "#991b1b", // Red-800
    },
    secondary: {
      main: "#1e3a8a", // Blue-900
      hover: "#1e40af", // Blue-800
      light: "#dbeafe", // Blue-100
    },
    neutral: {
      white: "#ffffff",
      gray50: "#f9fafb",
      gray100: "#f3f4f6",
      gray200: "#e5e7eb",
      gray600: "#4b5563",
      gray700: "#374151",
      gray800: "#1f2937",
      gray900: "#111827",
    },
  },
  typography: {
    fontFamily: {
      sans: "Inter, system-ui, sans-serif",
      heading: "Inter, system-ui, sans-serif",
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },
  borderRadius: {
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.5rem", // 24px
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const

export const brandColors = {
  suprans: {
    primary: designTokens.colors.primary.main,
    secondary: designTokens.colors.secondary.main,
  },
  legalnations: {
    primary: "#1e3a8a",
    secondary: "#059669",
  },
  toysinbulk: {
    primary: "#f59e0b",
    secondary: "#8b5cf6",
  },
  travel: {
    primary: "#0891b2",
    secondary: "#dc2626",
  },
} as const

