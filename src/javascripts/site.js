document.addEventListener("click", function(event) {
    if (event.target.dataset.action == "reading-show-more") {
        var elements = document.querySelectorAll("li.hidden");
        Array.prototype.forEach.call(elements, function(el, i) {
            el.classList.remove("hidden");
        });
        event.target.style.display = "none";
    }
});
