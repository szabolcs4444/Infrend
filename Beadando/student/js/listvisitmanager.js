$(document).ready(function () {
    $.getJSON('asd', function (data) {
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
    document.cookie = 'year=' + selectorValue;
    if (selectorValue === 'all') {
        $.getJSON('cars', function (data) {
            lister(data);
        });
    } else {
        $.getJSON('/check', function (data) {
            lister(data);
        });
    }
}

function lister(data) {
    var table = $('<table id="allTable"></table>');
    table.append("<tr>" +
        "<th id='allTableth'>Taj szám</th>" +
        "<th id='allTableth'>Diagnózis</th>" +
        "<th id='allTableth'>Lelet értékelése</th>" +
        "<th id='allTableth'>Kezelés</th>" +
        "<th id='allTableth'>Következő szűrővizságlat Időpontja</th>" +
        "<th id='allTableth'>Szürővizsgálat tipusa:</th>" +
        "<th id='allTableth'>Gyógyszerek listája</th>" +
        "<th id='allTableth'>Gyógyszerszedés napi darabszám</th>" +
        "<th id='allTableth'>Gyógyszerszedés időtartama hetekre nézve</th>" +
        "</tr>");
    $.each(data, function (key, value) {
        var row = $('<tr></tr>');
        var manufacturerCell = $('<td id="allTabletd">' + value.patient + '</td>');
        var diagnosisCell = $('<td id="allTabletd">' + value.diagnosis+ '</td>');
        var assessmentFindingCell = $('<td id="allTabletd">' + value.assessmentFindings + '</td>');
        var colorCell = $('<td id="allTabletd">' + value.treatment + '</td>');
        var yearCell = $('<td id="allTabletd">' + value.year + '</td>');
        var screenCell = $('<td id="allTabletd">' + value.screening + '</td>');
        var drugCell = $('<td id="allTabletd">' + value.drug + '</td>');
        var quantityCell = $('<td id="allTabletd">' + value.quantity + '</td>');
        var weekCell = $('<td id="allTabletd">' + value.week + '</td>');
        row.append(manufacturerCell);
        row.append(diagnosisCell);
        row.append(assessmentFindingCell);
        row.append(colorCell);
        row.append(yearCell);
        row.append(screenCell);
        row.append(drugCell);
        row.append(quantityCell);
        row.append(weekCell);
        table.append(row);
    });
    $(".visit_container").append(table);
}