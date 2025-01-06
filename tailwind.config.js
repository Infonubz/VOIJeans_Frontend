/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(108.05deg, #CED3FF 1.01%, #4255FF 100.4%)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
