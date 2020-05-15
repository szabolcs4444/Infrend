$(document).ready(function () {
    document.querySelector("#date_field").value = new Date().toISOString().substr(0, 10);
});

$(function () {
    $('form').on('submit', function (submit) {
        submit.preventDefault();

        $.ajax({
            type: 'post',
            url: 'addPatient',
            data: $('form').serialize(),
            success: function () {
                if (confirm("Sikeresen hozzáadta")) {
                    $("#content").load("listpatient.html");
                }
            },
            error: function () {
                window.alert("Hiba");
            }
        })
    })
});