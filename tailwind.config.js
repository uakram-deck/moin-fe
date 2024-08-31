// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'restro-green-light': "#ECF1EB",
//         'restro-green': "#70B56A",
//         'restro-green-dark': "#243922",
//         'restro-border-green-light': "#DCE7DB"
//       }
//     },
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: false,
//     darkTheme: "light",
//   }
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'restro-green-light': "#f9923d", // "#ECF1EB", // side-bar, main
        'restro-green': "#F58021", //"#70B56A", // button
        'restro-green-dark': "#ffffff", // "#243922", // side-bar, tabs font-color
        'restro-border-green-light': "#fd7404", //"#DCE7DB" // active buttons, border color
        'restro-border-green': "#f9923d", //"#DCE7DB" // active buttons, border color
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: "light",
  }
}


