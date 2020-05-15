
var express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var app = express();
var patients =
    [
        {"socialSecurityNumber": "426573576",           "diseaseHistory": "magas láz, fejfájás",   "fullName": "Fekete Patrik",    "birthTime": "1995-12-24"},
        {"socialSecurityNumber": "947221745",           "diseaseHistory": "tüdőgyulladás",     "fullName": "Nagy lajos",    "birthTime": "1980-10-27"},
        {"socialSecurityNumber": "123456789",           "diseaseHistory": "covid-19",  "fullName": "Boros Géza",   "birthTime": "2000-11-12"},
        {"socialSecurityNumber": "876554433",           "diseaseHistory": "influenza",     "fullName": "Hajdu Nándor",    "birthTime": "2000-01-01"},
        {"socialSecurityNumber": "222111667",           "diseaseHistory": "fejfájás,hasmenés",    "fullName": "Nagy Ferenc",       "birthTime": "1970-07-07"},
        {"socialSecurityNumber": "356723567",           "diseaseHistory": "alzheimer",     "fullName": "Tóth Zsuzsanna",      "birthTime": "1950-05-04"},
        {"socialSecurityNumber": "102582346",           "diseaseHistory": "Szív- és érrendszeri betegségek",       "fullName": "Molnár Petra",    "birthTime": "1942-02-13"},
        {"socialSecurityNumber": "174331754",           "diseaseHistory": "Tojásallergia", "fullName": "Kerekes Boglárka",   "birthTime": "2002-08-20"}
];
var visits = [
    {
        "diagnosis": "Krónikus betegség",
        "assessmentFindings": "több eltérés a normáltól",
        "treatment": "Helyes táplálkozás,műtét",
        "patient": "174331754",
        "quantity": 1,
        "year": "2021-03-23",
        "week":10,
        "screening":"mammográfiai,általános vizsgálat",
        "drug":"szteroid"
    },
    {
        "diagnosis":"Tüdődaganat",
        "assessmentFindings":"megemelkedett fehérvérsejt",
        "treatment":"Sugár,kemoterápia",
        "patient":"102582346",
        "year":"2023-02-02",
        "quantity":3,
        "week":20,
        "screening":"tüdőszűrés,mammográfiai",
        "drug":"Vitamin"
    },
    {
        "diagnosis": "Cukorbetegség",
        "assessmentFindings": "alacsony cukor",
        "treatment": "Helyes táplálkozás",
        "patient": "356723567",
        "quantity": 1,
        "year": "2023-02-02",
        "week":3,
        "screening":"általános vizsgálat,mammográfiai,tüdőszűrés",
        "drug":"inzulin"
    },
    {
        "diagnosis": "Magas vérnyomás",
        "assessmentFindings": "megfelel",
        "treatment": "rendszeres vérnyomás mérés",
        "patient": "222111667",
        "quantity": 2,
        "year": "2021-03-23",
        "week":10,
        "screening":"általános vizsgálat,prosztata",
        "drug":"vérnyomáscsökkentő"
    },
    {
        "diagnosis": "mandulatályog",
        "assessmentFindings": "pajzsmirigy alulműködés",
        "treatment": "forró tea",
        "patient": "876554433",
        "quantity": 1,
        "year": "2021-03-03",
        "week":2,
        "screening":"tüdőszűrés",
        "drug":"rubophen,antibiotikum"
    },
    {
        "diagnosis": "Covid-19",
        "assessmentFindings": "vérszegénység",
        "treatment": "pihenés, gyóyszeres kezelés",
        "patient": "123456789",
        "quantity": 3,
        "year": "2025-02-01",
        "week":3,
        "screening":"általános vizsgálat",
        "drug":"antibiotikum"
    },
    {
        "diagnosis": "Nátha",
        "assessmentFindings": "cukor kicsivel magasabb",
        "treatment": "pihenés, orrfújás",
        "patient": "947221745",
        "quantity": 1,
        "year": "2022-05-30",
        "week": 2,
        "screening":"általános vizsgálat,prosztata",
        "drug":"orrspray"
    },

    {
        "diagnosis": "Torokgyulladás",
        "assessmentFindings": "megfelel",
        "treatment": "sok folyadék,pihenés",
        "patient": "426573576",
        "quantity": 3,
        "year": "1965-10-24",
        "week": 1,
        "screening":"tüdőszűrés",
        "drug":"aspirin plus c"
    }
];

app.use(express.static(__dirname + '/student'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/patients', function (req, res) {
    res.send(patients);
});


app.get('/patientNumber', function (req, res) {
    var patientNames = [];
    for (let m of patients) {
        if (!patientNames.includes(m.socialSecurityNumber)) {
            patientNames.push(m.socialSecurityNumber);
        }
    }
    res.send(patientNames);
});
app.get('/asd',function (req,res) {
    var asd=[];
    for(let a of visits){
        if(!asd.includes(a.year)){
            asd.push(a.year);
        }
    }
    res.send(asd);
});

app.get('/cars', function (req, res) {
    res.send(visits);
});

app.get('/patient', function (req, res) {
    var ok = false;
    for (var m of patients) {
        if (m.socialSecurityNumber === req.cookies.socialSecurityNumber) {
            ok = true;
            break;
        }
    }
    if (!ok) {
        res.status(409).end();
        return;
    }
    var patientNumber = [];
    for (let car of patients) {
        if (req.cookies.socialSecurityNumber === car.socialSecurityNumber) {
            patientNumber.push(car);
        }
    }
    res.send(patientNumber);
});
app.get('/check',function (req,res) {
   var ok = false;
   for(var check of visits){
       if(check.year === req.cookies.year){
           ok = true;
           break;
       }
   }
    if (!ok) {
        res.status(409).end();
        return;
    }
    var carCheck = [];
    for(let car of visits){
        if(req.cookies.year === car.year){
            carCheck.push(car);
        }
    }
    res.send(carCheck);

});

app.post('/addVisitManagement', function (req, res) {
    for (var car of visits) {
        if (car.diagnosis === req.body.diagnosis) {
            res.status(409).end();
            return;
        }
    }
    var visitManagementJSON = {
        "diagnosis":req.body.diagnosis,
        "assessmentFindings":req.body.assessmentFindings,
        "treatment":req.body.treatment,
        "patient":req.body.patient,
        "year":req.body.year,
        "quantity":req.body.quantity,
        "week":req.body.week,
        "screening":req.body.screening,
        "drug":req.body.drug,


    };
    visits.push(visitManagementJSON);
    res.send(visits);
});

app.post('/addPatient', function (req, res) {
    for (var m of patients) {
        if (m.socialSecurityNumber === req.body.socialSecurityNumber) {
            res.status(409).end();
            return;
        }
    }
    var patient ={
        "socialSecurityNumber": req.body.socialSecurityNumber,
        "diseaseHistory": req.body.diseaseHistory,
        "fullName": req.body.fullName,
        "birthTime": req.body.birthTime
    };
    patients.push(patient);
    res.send(patients);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/student/" + "index.html");
});

var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
