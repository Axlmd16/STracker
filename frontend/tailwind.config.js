// filepath: /C:/Users/Axlmd/Desktop/fastapi_react/frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ["light", "dark", "cupcake", "nord"],
    },
    plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
