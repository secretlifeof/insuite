'use strict';

var
    configuration = {
        "inSuite": {
            "network": {
                "externalURL": "http://66e5f75e55.dev.dc",
                "sn": "66e5f75e55"
            },
            "language": "DE",
            "licenseScope": {
                "upgrade": "05.03.2018",
                "trialExpire": '2019-09-05T21:59:59.999Z',
                "trialBegin": '2019-08-06T12:27:55.968Z',
                "telematikServices": [
                    "VSDM",
                    "KIM",
                    "QES"
                ],
                "specialModules": [
                    "edmp",
                    "care",
                    "doquvide",
                    "dqs",
                    "cardio",
                    "oculus",
                    "asv",
                    "ehks",
                    "gyn"
                ],
                "baseSystemLevel": "enterprise",
                "doctorsAmount": "0",
                "baseServices": [
                    "inCase",
                    "inTime",
                    "inForm",
                    "inVoice",
                    "inPort"
                ],
                "additionalServices": [
                    "inTouch",
                    "inScribe",
                    "inScan",
                    "inSight",
                    "inOut",
                    "inPortPlus",
                    "inTouchPlus",
                    "inBackup",
                    "inPacs",
                    "inTi",
                    "inCash",
                    "inSpectorApo"
                ],
                "supportLevel": "premium",
                "solutions": [
                    "infusion",
                    "alanta-oncotrace",
                    "amts-check-backend",
                    "amts",
                    "amts-scoring"
                ]
            }
        }
    };

module.exports = {
    getData: function() {
        return JSON.parse( JSON.stringify( configuration ) );
    }
};
