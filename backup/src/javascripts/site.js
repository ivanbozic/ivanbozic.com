function setDarkMode() {
    console.log("asd");
    document.getElementsByTagName("body")[0].dataset.theme = "dark";
}

function isItNighttime() {
    var currentHour = new Date().getHours();

    return currentHour < 6 || currentHour > 22 ? true : false;
}

if (isItNighttime() == true) setDarkMode();

// Tapping on "Show more" in the reading section will show
// the hidden list elements and hide the "Show more" button.
document.addEventListener("click", function(event) {
    if (event.target.dataset.action == "reading-show-more") {
        var elements = document.querySelectorAll("li.hidden");
        Array.prototype.forEach.call(elements, function(el, i) {
            el.classList.remove("hidden");
        });
        event.target.style.display = "none";
    }
});
