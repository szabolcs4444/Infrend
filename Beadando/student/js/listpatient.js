$(document).ready(function () {
    $.getJSON('patientNumber', function (data) {
        var select = $('<select id="selector"></select>');
        var optionAll = $('<option value="all">Mind</option>');
        select.append(optionAll);
        $.each(data, function (key, value) {
            var option = $('<option value="' + value + '">' + value + '</option>');
            select.append(option);
        });
        $(".select").append(select);
    });
});
function list() {
    $("table").remove();
    var e = document.getElementById("selector");
    var selectorValue = e.options[e.selectedIndex].value;
    document.cookie = 'socialSecurityNumber=' + selectorValue;
    if (selectorValue === 'all') {
        $.getJSON('patients', function (data) {
            lister(data);
        });

    }  else {
        $.getJSON('/patient', function (data) {
            lister(data);
        });


    }

}
function lister(data) {
    var table = $('<table id="allTable"></table>');
    table.append("<tr>" +
        "<th id='allTableth'>Taj szám</th>" +
        "<th id='allTableth'>Kór történet</th>" +
        "<th id='allTableth'>Név</th>" +
        "<th id='allTableth'>Születési dátum</th>" +
        "</tr>");
    $.each(data, function (key, value) {
        var row = $('<tr></tr>');
        var socialSecurityNumberCell = $('<td id="allTabletd">' + value.socialSecurityNumber + '</td>');
        var diseaseHistoryCell = $('<td id="allTabletd">' + value.diseaseHistory + '</td>');
        var fullNameCell = $('<td id="allTabletd">' + value.fullName + '</td>');
        var birthTimeCell = $('<td id="allTabletd">' + value.birthTime + '</td>');
        row.append(socialSecurityNumberCell);
        row.append(diseaseHistoryCell);
        row.append(fullNameCell);
        row.append(birthTimeCell);
        table.append(row);
    });
    $(".visit_container").append(table);
}