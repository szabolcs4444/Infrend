$(document).ready(function () {
    $.getJSON('patientNumber', function (data) {
        var select = $('<select name="patient" required="required"></select>');
        $.each(data, function (key, value) {
            var option = $('<option value="' + value + '">' + value + '</option>');
            select.append(option);
        });
        $(".select").append(select);
    });
});

$(function () {
    $('form').on('submit', function (submit) {
        submit.preventDefault();

        $.ajax({
            type: 'post',
            url: 'addVisitManagement',
            data: $('form').serialize(),
            success: function () {
                confirm("Hozzáadva")
            },
            error: function () {
                window.alert("Hiba");
            }
        })
    })
});