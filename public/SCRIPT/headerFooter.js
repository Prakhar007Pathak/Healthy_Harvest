let burger = document.getElementById("burgerID");
let category = document.querySelectorAll(".categories");
let showCategory = false;

burger.addEventListener("click", function () {
    showCategory = !showCategory;
    if (showCategory) {
        category.forEach(function (button) {
            button.classList.add("show");

        });
    }
    else {
        category.forEach(function (button) {
            button.classList.remove("show");

        });
    }
});


document.getElementById("CatSearchBtn").addEventListener("click", function () {
    document.getElementById("id-of-categories").style.display = "none";
    document.getElementById("CatSearchBtn").style.display = "none";
    document.querySelector(".search-area").style.display = "block";
});

document.getElementById("CatBackBtn").addEventListener("click", function () {
    document.getElementById("id-of-categories").style.display = "block";
    document.getElementById("CatSearchBtn").style.display = "flex";
    document.querySelector(".search-area").style.display = "none";
});