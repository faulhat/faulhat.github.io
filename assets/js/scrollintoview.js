const selected = document.getElementsByClassName("selected");
for (let element of selected) {
   element.scrollIntoView({ "block": "nearest" });
}
