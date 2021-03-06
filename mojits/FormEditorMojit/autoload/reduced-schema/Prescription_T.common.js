/*
 *  Copyright DocCirrus GmbH 2015
 *
 *  Defines flat list of properties bound into forms
 */

/*jslint anon:true, sloppy:true, nomen:true*/

/*global YUI */

YUI.add(
    /* YUI module name */
    'dcforms-schema-Prescription-T',

    /* Module code */
    function(Y) {
        'use strict';

        if (!Y.dcforms) { Y.dcforms = {}; }
        if (!Y.dcforms.schema)  { Y.dcforms.schema = {}; }

        Y.dcforms.schema.Prescription_T = {
            "version": 1.0,
            "mapper": "prescription",
            "patientId": {
                "schema": "activity",
                "path": "patientId"
            },
            "date": {
                "type": "String",
                "label": {
                    "en": "Date",
                    "de": "Datum"
                }
            },
            "dateNormal": {
                "type": "String",
                "label": {
                    "en": "Date normal",
                    "de": "Datum DD.MM.YYYY"
                }
            },
            "editDate": {
                "type": "String",
                "label": {
                    "en": "Date edited",
                    "de": "Zuletzt geändert am"
                }
            },
            "dobSmaller": {
                "type": "String",
                "label": {
                    "en": "Birthdate KBV",
                    "de": "Geburtsdatum KBV"
                }
            },
            "age": {
                "type": "String",
                "label": {
                    "en": "Age",
                    "de": "Alter"
                }
            },
            "dd": {
                "type": "String",
                "label": {
                    "en": "B.Day",
                    "de": "Geb. Tag"
                }
            },
            "mm": {
                "type": "String",
                "label": {
                    "en": "B.Month",
                    "de": "Geb. Monat"
                }
            },
            "yy": {
                "type": "String",
                "label": {
                    "en": "B.Year YY",
                    "de": "Geb. Jahr YY"
                }
            },
            "yyyy": {
                "type": "String",
                "label": {
                    "en": "B.Year YYYY",
                    "de": "Geb. Jahr YYYY"
                }
            },
            "currentDate": {
                "type": "String",
                "label": {
                    "en": "Today's Date",
                    "de": "Heutiges Datum"
                }
            },
            "civilStatus": {
                "complex": "eq",
                "type": "CivilStatus_E",
                "lib": "reduced",
                "label": {
                    "en": "Civil Status",
                    "de": "Zivilstand"
                }
            },
            "comment": {
                "schema": "activity",
                "path": "comment"
            },
            "gender": {
                "complex": "eq",
                "type": "Gender_E",
                "lib": "reduced",
                "label": {
                    "en": "Sex",
                    "de": "Geschlecht"
                }
            },
            "jobTitle": {
                "schema": "patient",
                "path": "jobTitle"
            },
            "patientName": {
                "type": "String",
                "label": {
                    "en": "Patient Name",
                    "de": "Patientennamen"
                }
            },
            "firstName": {
                //  note capital N, differs from Person_T
                "schema": "patient",
                "path": "firstname"
            },
            "lastName": {
                //  note capital N, differs from Person_T
                "schema": "patient",
                "path": "lastname"
            },
            "patientDOB": {
                "schema": "patient",
                "path": "dob"
            },
            "dobD": {
                "type": "String",
                "label": {
                    "en": "Day of Birth",
                    "de": "Geburtstag"
                }
            },
            "dobM": {
                "type": "String",
                "label": {
                    "en": "Month of Birth",
                    "de": "Geburtsmonat"
                }
            },
            "dobY": {
                "type": "String",
                "label": {
                    "en": "Year of Birth",
                    "de": "Geburtsjahr"
                }
            },
            "address": {
                "required": true,
                "type": "String",
                "label": {
                    "en": "Client address",
                    "de": "Patienten Adresse"
                }
            },
            "street": {
                "schema": "patient",
                "path": "addresses.0.street"
            },
            "houseno": {
                "schema": "patient",
                "path": "addresses.0.houseno"
            },
            "zip": {
                "schema": "patient",
                "path": "addresses.0.zip"
            },
            "city": {
                "schema": "patient",
                "path": "addresses.0.city"
            },
            "postbox": {
                "schema": "patient",
                "path": "addresses.0.postbox"
            },
            "country": {
                //  enum inheritance not yet working for this type
                "required": true,
                "type": "String",
                "label": {
                    "en": "Country",
                    "de": "Land"
                }
            },
            "workingAt": {
                "schema": "patient",
                "path": "workingAt"
            },

            "insured": {
                //  presumed to refer to policy holder, comparing .de labels of previos reduced schema with
                //  label 'Hauptversicherter' in person-schema.common.js
                "schema": "patient",
                "path": "insuranceStatus.0.policyHolder"
            },
            "insuredDob": {
                //  policy holder's date of birth? [CHECKME]
                "schema": "patient",
                "path": "insuranceStatus.0.policyDob"
            },
            "insuranceName": {
                //  name of health insurance company? [CHECKME]
                "schema": "patient",
                "path": "insuranceStatus.0.insuranceName"
            },
            //
            "insuranceNumber": {
                "schema": "patient",
                "path": "insuranceStatus.0.insuranceNo"
            },

            "docBlock": {
                "type": "String",
                "label": {
                    "en": "Doctor's Stamp",
                    "de": "Arztstempel"
                }
            },
            "doctorID": {
                "schema": "patient",
                "path": "primaryDoc"
            },
            "medication1": {
                "type": "String",
                "label": {
                    "en": "Medication1",
                    "de": "Medication1"
                }
            },
            "medication2": {
                "type": "String",
                "label": {
                    "en": "Medication2",
                    "de": "Medication2"
                }
            },
            "medication3": {
                "type": "String",
                "label": {
                    "en": "Medication3",
                    "de": "Medication3"
                }
            },
            "dosis1": {
                "type": "String",
                "label": {
                    "en": "Dosis1",
                    "de": "Dosis1"
                }
            },
            "dosis2": {
                "type": "String",
                "label": {
                    "en": "Dosis2",
                    "de": "Dosis2"
                }
            },
            "dosis3": {
                "type": "String",
                "label": {
                    "en": "Dosis3",
                    "de": "Dosis3"
                }
            },
            "pzn1": {
                "type": "String",
                "insight2": true,
                "label": {
                    "en": "PZN1",
                    "de": "PZN1"
                }
            },
            "pzn2": {
                "type": "String",
                "insight2": true,
                "label": {
                    "en": "PZN2",
                    "de": "PZN2"
                }
            },
            "pzn3": {
                "type": "String",
                "insight2": true,
                "label": {
                    "en": "PZN3",
                    "de": "PZN3"
                }
            },
            "medicationStr": {
                "type": "String",
                "label": {
                    "en": "Medications (x3)",
                    "de": "Medications (x3)"
                }
            },
            "items": {
                "type": "Medication_T",
                "label": {
                    "en": "Items",
                    "de": "Items"
                }
            },
            "patient": {
                "type": "Patient_T",
                "label": {
                    "en": "Patient (obj)",
                    "de": "Personalienfeld"
                }
            },
            "patient2": {
                "type": "Personalienfeld_T",
                "label": {
                    "en": "Patient (obj, postal address)",
                    "de": "Personalienfeld (Postanschrift)"
                }
            },
            "paidFree": {
                "type": "String",
                "label": {
                    "en": "paid free",
                    "de": "gebührenbefreit"
                }
            },
            "paid": {
                "type": "String",
                "label": {
                    "en": "paid",
                    "de": "gebührenpflichtig"
                }
            },
            "barcode1a": {
                "type": "String",
                "label": {
                    "en": "BFB barcode1a",
                    "de": "BFB barcode1a"
                }
            },
            "barcode2a": {
                "type": "String",
                "label": {
                    "en": "BFB barcode2a",
                    "de": "BFB barcode2a"
                }
            },
            "barcode2b": {
                "type": "String",
                "label": {
                    "en": "BFB barcode2b",
                    "de": "BFB barcode2b"
                }
            },
            "barcode4": {
                "type": "String",
                "label": {
                    "en": "BFB barcode4",
                    "de": "BFB barcode4"
                }
            },
            "barcode6": {
                "type": "String",
                "label": {
                    "en": "BFB barcode6",
                    "de": "BFB barcode6"
                }
            },
            "barcode10": {
                "type": "String",
                "label": {
                    "en": "BFB barcode10",
                    "de": "BFB barcode10"
                }
            },
            "barcode10L": {
                "type": "String",
                "label": {
                    "en": "BFB barcode10L",
                    "de": "BFB barcode10L"
                }
            },
            "barcode10A": {
                "type": "String",
                "label": {
                    "en": "BFB barcode10A",
                    "de": "BFB barcode10A"
                }
            },
            "barcode13": {
                "type": "String",
                "label": {
                    "en": "BFB barcode13",
                    "de": "BFB barcode13"
                }
            },
            "barcode14": {
                "type": "String",
                "label": {
                    "en": "barcode14",
                    "de": "barcode14"
                }
            },
            "barcode15_1": {
                "type": "String",
                "label": {
                    "en": "BFB barcode15_1",
                    "de": "BFB barcode15_1"
                }
            },
            "barcode18": {
                "type": "String",
                "label": {
                    "en": "BFB barcode18",
                    "de": "BFB barcode18"
                }
            },
            "barcode19a": {
                "type": "String",
                "label": {
                    "en": "BFB barcode19a",
                    "de": "BFB barcode19a"
                }
            },
            "barcode19b": {
                "type": "String",
                "label": {
                    "en": "BFB barcode19b",
                    "de": "BFB barcode19b"
                }
            },
            "barcode21": {
                "type": "String",
                "label": {
                    "en": "BFB barcode21",
                    "de": "BFB barcode21"
                }
            },
            "certNumber": {
                "type": "String",
                "label": {
                    "en": "BFB Certificate Number",
                    "de": "BFB Zertifikat-Nummer"
                }
            }
        };


    },

    /* Min YUI version */
    '0.0.1',

    /* Module config */
    {
        requires: []
    }
);