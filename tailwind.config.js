/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/App.jsx", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "grey-200": "#e5e7eb",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".custom-button": {
          "@apply rounded-md border-2 cursor-pointer border-grey-200 bg-white flex justify-center items-center w-[40px] h-[45px] px-3 py-1 mx-auto":
            {},
        },
      });
    },
    function ({ addComponents }) {
      addComponents({
        ".card-category-heading": {
          "@apply font-bold text-lg mx-9 pt-3": {},
        },
      });
    },
    function ({ addComponents }) {
      addComponents({
        ".widget-drawer-border": {
          "@apply pb-2 hover:text-blue-600 hover:border-blue-600 border-b-2 border-transparent transition-colors":
            {},
        },
      });
    },
  ],
};
