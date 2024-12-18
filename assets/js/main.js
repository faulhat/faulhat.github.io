const root = document.querySelector(":root");
const faviconLink = document.querySelector("link[rel*='icon']");
const arms = document.getElementById("arms");

const themes = {
   "coder": {
      "vars": {
         "main-bg-color": "#002b36",
         "main-fg-color": "lightgreen",
         "link-color": "crimson",
         "code-bg-color": "#000040",
         "code-fg-color": "white"
      },
      "icon": "arms.png"
   },
   "sakura": {
      "vars": {
         "main-bg-color": "#000020",
         "main-fg-color": "#f67280",
         "link-color": "#6b8e23",
         "code-bg-color": "black",
         "code-fg-color": "white"
      },
      "icon": "arms_sakura.png"
   },
   "vampiro": {
      "vars": {
         "main-bg-color": "#000020",
         "main-fg-color": "#990012",
         "link-color": "#009987",
         "code-bg-color": "black",
         "code-fg-color": "white"
      },
      "icon": "arms_vampiro.png"
   },
   "power": {
      "vars": {
         "main-bg-color": "#012456",
         "main-fg-color": "#61d6d6",
         "link-color": "#cccccc",
         "code-bg-color": "black",
         "code-fg-color": "white"
      },
      icon: "arms_power.png"
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

const storedTheme = localStorage.getItem("theme");
if (storedTheme === null) {
   setColors("coder");
} else {
   setColors(storedTheme);
   themeSelector.value = storedTheme;
}

const selected = document.getElementsByClassName("selected");
for (let element of selected) {
   element.scrollIntoView({ "block": "nearest" });
}
