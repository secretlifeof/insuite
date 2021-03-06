'use strict';
var
    role =
        {
            "_id" : "5cd93fb725b54125e762288f",
            "code" : "7680316440115",
            "phPZN" : "20244",
            "phCompany" : "1836",
            "phPackSize" : "30",
            "phDescription" : "Ferro-Gradumet Depottabl 30 Stk",
            "phPriceSale" : "10.9",
            "phPriceCost" : "7.92",
            "u_extra" : [
                {
                    "VDAT" : "1999-01-01T00:00:00+01:00",
                    "PTYP" : "PPUB",
                    "PRICE" : "10.9"
                }
            ],
            "insuranceCode" : "30",
            "paidByInsurance" : false,
            "supplyCategory" : "C",
            "phAtc" : "B03AA07",
            "phAsNeededMedication": false,
            "phForm" : "Depottabl",
            "catalogShort" : "HCI",
            "phIngr" : [
                {
                    "code" : "202846",
                    "strength" : "105mg",
                    "name" : "Eisen(II)",
                    "type" : "ACTIVE"
                }
            ],
            "name": "Ferro-Gradumet Depottabl 30 Stk"
        },
    putParams = {
        data: role
    };

module.exports = {
    getData: function() {
        return JSON.parse( JSON.stringify( role ) );
    },
    putParams: putParams
};

