const root = document.querySelector(":root");
const faviconLink = document.querySelector("link[rel*='icon']");
const arms = document.getElementById("arms");

const themes = {
   "Coder": {
      "vars": {
         "main-bg-color": "#002b36",
         "main-fg-color": "lightgreen",
         "link-color": "crimson",
         "code-bg-color": "#000040",
         "code-fg-color": "white"
      },
      "icon": "arms.png"
   },
   "Sakura": {
      "vars": {
         "main-bg-color": "#000020",
         "main-fg-color": "#f67280",
         "link-color": "#6b8e23",
         "code-bg-color": "black",
         "code-fg-color": "white"
      },
      "icon": "arms_sakura.png"
   },
   "Vampiro": {
      "vars": {
         "main-bg-color": "#000020",
         "main-fg-color": "#990012",
         "link-color": "#009987",
         "code-bg-color": "black",
         "code-fg-color": "white"
      },
      "icon": "arms_vampiro.png"
   },
   "Power": {
      "vars": {
         "main-bg-color": "#012456",
         "main-fg-color": "#61d6d6",
         "link-color": "#cccccc",
         "code-bg-color": "black",
         "code-fg-color": "white"
      },
      icon: "arms_power.png"
   },
   "Kaffee": {
        "vars": {
            "main-bg-color": "#f5deb3",
            "main-fg-color": "#8b4513",
            "link-color": "#800000",
            "code-bg-color": "black",
            "code-fg-color": "white"
        },
        icon: "arms_kaffee.png"
   },
   "Seaglass": {
        "vars": {
            "main-bg-color": "#2f4f4f",
            "main-fg-color": "#00fa9a",
            "link-color": "#f08080",
            "code-bg-color": "black",
            "code-fg-color": "white"
        },
        icon: "arms_seaglass.png"
   },
   "Neo": {
        "vars": {
            "main-bg-color": "black",
            "main-fg-color": "cyan",
            "link-color": "red",
            "code-bg-color": "indigo",
            "code-fg-color": "#ffdab9"
        },
        icon: "arms_neo.png"
   },
   "Mono": {
        "vars": {
            "main-bg-color": "black",
            "main-fg-color": "#a9a9a9",
            "link-color": "white",
            "code-bg-color": "#d3d3d3",
            "code-fg-color": "black"
        },
        icon: "arms_mono.png"
   }
};

function setIcon(imageName) {
   var imageURL = "/assets/images/" + imageName;
   faviconLink.href = imageURL;
   arms.src = imageURL;
}

function setColors(themeName) {
   var theme = themes[themeName];
   for (const [key, value] of Object.entries(theme["vars"])) {
      root.style.setProperty("--" + key, value);
   }

   setIcon(theme["icon"]);
   localStorage.setItem("theme", themeName);
}

const themeSelector = document.getElementById("themeSelector");

for (const key of Object.keys(themes)) {
    themeSelector.add(new Option(key, key));
}

const storedTheme = localStorage.getItem("theme");
if (storedTheme === null) {
   setColors("Coder");
} else {
   setColors(storedTheme);
   themeSelector.value = storedTheme;
}
