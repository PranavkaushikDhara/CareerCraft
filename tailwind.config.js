/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        CareerCraftPrimary: "#1B9AF5",
        CareerCraftPrimaryDark: "#007ACC",
        CareerCraftPrimaryHover: "#3AB0F7",
        CareerCraftSecondary: "#374151",
        CareerCraftSecondaryHover: "#4B5563",
        CareerCraftBackground: "#111827",
        CareerCraftForeGround: "#1F2937",
        CareerCraftForeGroundAlt: "#121921",
        CareerCraftForeGroundLight: "#374151",
        CareerCraftForeGroundLightAlt: "#4B5563",
        CareerCraftWhite: "#FFFFFF",
        CareerCraftText: "#D1D5DB",
        CareerCraftInputText: "#6B7280",
        CareerCraftInputBorder: "#374151",
        CareerCraftInputBorderFocus: "#1B9AF5",
        CareerCraftSuccess: "#4ADE80",
        CareerCraftSuccessLight: "rgba(34, 197, 94, 0.2)",
        CareerCraftWarning: "#FACC15",
        CareerCraftWarningLight: "rgba(234, 179, 8, 0.2)",
        CareerCraftDanger: "#EF4444",
        CareerCraftCardNeutral: "#1C222A",
        CareerCraftCardElevated: "#2F3A46",
        CareerCraftCardLight: "#374151",
        CareerCraftTertiary: "#F472B6",
      },
    },
  },
  plugins: [],
}; 