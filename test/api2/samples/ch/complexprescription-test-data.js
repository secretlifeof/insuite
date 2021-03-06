'use strict';
var
    prescriptionData = {
        "comment": "test Comment",
        "bsnr": "370103000",
        "lanr": "333333333",
        "patientId": "54be764fc404c1d77a286d4d",
        "caseFolderId": "5c137f913961453684fb0446",
        "dispatchActivities": [{
            "actType": "PUBPRESCR",
            "prescriptionDate": "2018-12-12T00:00:00.000Z",
            "activities": [{
                "actType": "MEDICATION",
                "codePZN": "03875348",
                "codeHMV": "60.11.22",
                "note": "test Medication 01",
                "quantity": "2",
                "dose": "11St",
                "prescPeriod": " - "
            }, {
                "actType": "MEDICATION",
                "codePZN": "03875348",
                "codeHMV": "60.11.22",
                "note": "test Medication 01",
                "dose": "11St",
                "prescPeriod": " - "
            }, {
                "actType": "MEDICATION",
                "codePZN": "4226",
                "codeHMV": "",
                "note": "new to hauskatalog_2",
                "dose": "text",
                "prescPeriod": "1 - 2"
            }
            ]
        },
            {
                "actType":"PRESASSISTIVE",
                "prescriptionDate":"2018-12-12T00:00:00.000Z",
                "note":"AAA",
                "activities":[
                    {
                        "actType":"ASSISTIVE",
                        "codeHMV":"60.11.23",
                        "note":"test Assistive 01",
                        "quantity":"2"
                    },
                    {
                        "actType":"ASSISTIVE",
                        "codePZN": "4226",
                        "codeHMV":"60.11.23",
                        "note":"test Assistive 02"
                    },
                    {
                        "actType":"ASSISTIVE",
                        "codePZN": "4226",
                        "note":"test Assistive 02"
                    }
                ]
            }
        ]

    },
    putParams = {
        data: prescriptionData
    };

module.exports = {
    getData: function() {
        return prescriptionData;
    },
    setData: function(key, value){
        prescriptionData[key] = value;
    },
    putParams: putParams
};

