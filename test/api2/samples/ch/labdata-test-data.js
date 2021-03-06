'use strict';
var
    history = {
        "actType": "LABDATA",
        "timestamp": "2017-06-20T21:14:33.173Z",
        "patientId": "54be764fc404c1d77a286d4d",
        "employeeId": "56f5382c37644678aa923d92",
        "locationId": "54eb41b878382da863181d3b",
        "caseFolderId": "594a58fb396bdc130bd43ed2",
        "content" : "Befundart [E] Endbefund",
        "userContent" : "Befundart [E] Endbefund",
        "labText" : "Befundart: [E] Endbefund\n    Test: HBA1C\n        Testbezeichnung: HbA1c (IFCC)\n        Ergebnis-Wert: 48\n        Einheit: mmol/mol Hb\n        Grenzwert-Indikator: +\n        Normalwert-Text: 29.0 - 42.0\n            Anmerkung: gute Stoffwechseleinstellung:\n            Anmerkung: bis 6.5 % bzw. bis 48.0 mmol/mol Hb\n    Test: HBA1C%\n        Testbezeichnung: HbA1c\n        Ergebnis-Wert: 6.5\n        Einheit: %\n        Grenzwert-Indikator: +\n        Normalwert-Text: 4.80 - 6.00\n    Test: QUICKT\n        Testbezeichnung: Quick/Antikoagulanz\n        Ergebnis-Wert: 21\n        Einheit: %\n        Normalwert-Text: 17 - 33\n            Anmerkung: Befund unter Vorbehalt, da Füllmenge nicht korrekt!\n            Anmerkung: therap. Bereich\n    Test: INRT\n        Testbezeichnung: INR/Antikoagulanz\n        Ergebnis-Wert: 2.78\n        Einheit: kA\n        Normalwert-Text: 2.00 - 3.50\n            Anmerkung: Befund unter Vorbehalt, da Füllmenge nicht korrekt!\n            Anmerkung: therap. Bereich\n",
        "status": "VALID"
    },
    putParams = {
        data: history
    };

module.exports = {
    getData: function() {
        return history;
    },
    putParams: putParams
};