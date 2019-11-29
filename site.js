function setDarkMode() {
    document.getElementsByTagName("body")[0].dataset.theme = "dark";
}

function isItNighttime() {
    var currentHour = new Date().getHours();

    return currentHour < 6 || currentHour > 22 ? true : false;
}

if (isItNighttime() == true) setDarkMode();