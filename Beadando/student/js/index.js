$(document).ready(function () {
    $("#content").load("content.html");
});

$(document).ready(function () {
    $.each($(".menuButton"), function (mbIndex, mbValue) {
        $(mbValue).click(function (event) {
            event.preventDefault();
            if (!($(this).find('a').attr("href") === "index.html")) {
                $("#content").load($(this).find('a').attr("href"));
            } else {
                open("index.html", "_self");
            }
        });
    })
});

function Show(click) {
    var text = document.getElementById(click);
    var x = document.getElementById("Description");
    if (text.firstChild.data === "Eltüntet") {
        text.firstChild.data = "Megjelenít";
        x.style.display = "none";
    } else {
        text.firstChild.data = "Eltüntet";
        x.style.display = "block";
    }
}