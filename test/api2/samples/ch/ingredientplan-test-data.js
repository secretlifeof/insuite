'use strict';
var
    ingredientplan =
        {
            "_id": "5e28797d336178d3e493630d",
            "actType": "INGREDIENTPLAN",
            "attachments": [],
            "subType": "",
            "backupEmployeeIds": [],
            "userContent": "",
            "partnerInfo": "",
            "explanations": "",
            "status": "VALID",
            "activities": [],
            "apkState": "IN_PROGRESS",
            "medicationPlanCarrierSegments": [
                "<MP U=\"97A290990D724B749F40417389C1E225\" l=\"de-DE\" p=\"\" v=\"024\"><P b=\"19750105\" f=\"Kluge\" g=\"Hans\"/><A c=\"Berlin\" e=\"dv@doc-cirrus.com\" n=\"Voth, Dirk\" s=\"AM Schlo0223 10a\" t=\"2019-10-25T12:01:52\" z=\"10585\"/><O/><S><M d=\"0\" h=\"0\" i=\"\" m=\"1\" p=\"00766736\" r=\"\" v=\"3\"/><M i=\"\" p=\"00777444\" r=\"\" t=\"2 Tabletten jeden Morgen\"/><M d=\"0\" h=\"0\" i=\"\" m=\"0\" p=\"01672492\" r=\"\" v=\"0\"/><M d=\"0\" h=\"0\" i=\"\" m=\"1\" p=\"01865647\" r=\"\" v=\"3\"/><M d=\"0\" h=\"0\" i=\"\" m=\"0\" p=\"01876740\" r=\"\" v=\"0\"/></S></MP>00130010"
            ],
            "medData": [
                {
                    "category": "ACTIVEINGREDIENTS",
                    "sampleNormalValueText": [],
                    "_id": "5e28797d336178d3e493631b",
                    "type": "Ammi visnaga",
                    "value": 0.04,
                    "textValue": "0.04 ml",
                    "unit": "ml",
                    "additionalData": {
                        "ActiveIngredient_Wirkstoffplan_comment": "",
                        "ActiveIngredient_Wirkstoffplan_dosis": "",
                        "ActiveIngredient_Wirkstoffplan_group": "",
                        "ActiveIngredient_Wirkstoffplan_initialDosis": "",
                        "ActiveIngredient_Wirkstoffplan_noteOnAdaption": "",
                        "ActiveIngredient_Wirkstoffplan_planVersion": 0,
                        "ActiveIngredient_Wirkstoffplan_stage": "",
                        "ActiveIngredient_Wirkstoffplan_strength": 0.04,
                        "ActiveIngredient_Wirkstoffplan_targetDosis": ""
                    }
                }
            ],
            "locationId": "000000000000000000000001",
            "employeeId": "56f5382c37644678aa923d92",
            "patientId": "54be764fc404c1d77a286d4d",
            "caseFolderId": "56fa30e6b641255602e1b576",
            "timestamp": "2020-01-22T16:34:05.615Z",
            "attachedMedia": [],
            "editor": [],
            "employeeName": "",
            "employeeInitials": "",
            "content": "Ammi visnaga: 0,04 ml 0.04 ml"
        },
    putParams = {
        data: ingredientplan
    };

module.exports = {
    getData: function() {
        var
            data = JSON.parse( JSON.stringify( ingredientplan ) );

        return data;
    },
    putParams: putParams
};

