$(document).ready(function () {
    $.getJSON('manufacturerNames', function (data) {
        var select = $('<select id="manufacturers"></select>');
        var optionAll = $('<option value="all">Mind</option>');
        select.append(optionAll);

        $(".select").append(select);
    });
});
function list() {
    $("table").remove();
    var e = document.getElementById("manufacturers");
    var selectorValue = e.options[e.selectedIndex].value;
    document.cookie = 'name=' + selectorValue;
    if (selectorValue === 'all') {
        $.getJSON('manufacturers', function (data) {
            lister(data);
        });

    }  else {
        $.getJSON('/manufacturer', function (data) {
            lister(data);
        });


    }

}
function lister(data) {
    var table = $('<table id="allTable"></table>');
    table.append("<tr>" +
        "<th id='allTableth'>Név</th>" +
        "<th id='allTableth'>Ország</th>" +
        "<th id='allTableth'>Évjárat</th>" +
        "</tr>");
    $.each(data, function (key, value) {
        var row = $('<tr></tr>');
        var NameCella = $('<td id="allTabletd">' + value.name + '</td>');
        var countryCell = $('<td id="allTabletd">' + value.country + '</td>');
        var foundedCell = $('<td id="allTabletd">' + value.founded + '</td>');
        row.append(NameCella);
        row.append(countryCell);
        row.append(foundedCell);
        table.append(row);
    });
    $(".carlist_container").append(table);
}