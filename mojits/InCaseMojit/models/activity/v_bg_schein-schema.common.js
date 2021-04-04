/**
 * User: pi
 * Date: 11/12/2015  12:00
 * (c) 2015, Doc Cirrus GmbH, Berlin
 */

/*global YUI*/
YUI.add( 'v_bg_schein-schema', function( Y, NAME ) {

        'use strict';

        var
        // ------- Schema definitions  -------
            i18n = Y.doccirrus.i18n,
            types = {};

        Y.log( 'Loading Schema ' + NAME, 'debug', NAME );

        NAME = Y.doccirrus.schemaloader.deriveSchemaName( NAME );

        /**
         * MOJ-5065 this is a virtual schema and
         * does not actually have a collection related
         * to it in the DB.
         */
        types = Y.mix( types,
            {
                "root": {
                    "base": {
                        "complex": "ext",
                        "type": "VBGSchein_T",
                        "lib": types
                    }
                },
                "ScheinActType_E": {
                    "type": "String",
                    "default": "BGSCHEIN",
                    "apiv": { v:2, queryParam: true },
                    "list": [
                        {
                            "val": "BGSCHEIN",
                            "-de": "BG Schein",
                            i18n: i18n( 'activity-schema.Activity_E.BGSCHEIN' ),
                            "-en": "BG schein Received"
                        }
                    ]
                },
                "VBGSchein_T": {
                    "actType": {
                        "complex": "eq",
                        "type": "ScheinActType_E",
                        "lib": types,
                        "apiv": { v:2, queryParam: false },
                        "required": true
                    },
                    "activityBase": {
                        "complex": "ext",
                        "type": "Activity_T",
                        "lib": "activity"
                    },
                    "Base": {
                        "complex": "ext",
                        "type": "Schein_T",
                        "lib": "activity"
                    },
                    "BGScheinBase": {
                        "complex": "ext",
                        "type": "BGSchein_T",
                        "lib": "activity"
                    },
                    "billingBase": {
                        "complex": "ext",
                        "type": "BillingTrackSchein_T",
                        "lib": "activity"
                    },
                    "hasDiagnosisBase": {
                        "complex": "ext",
                        "type": "HasDiagnosis_T",
                        "lib": "activity"
                    },
                    "hasUvGoaeTypeBase": {
                        "complex": "ext",
                        "type": "HasUvGoaeType_T",
                        "lib": "activity"
                    }
                }
            }
        );

        Y.namespace( 'doccirrus.schemas' )[NAME] = {

            /* MANDATORY */
            name: NAME,

            /* MANDATORY */
            types: types

        };

        Y.doccirrus.schemaloader.mixSchema( Y.doccirrus.schemas[NAME], true );
    },
    '0.0.1', {
        requires: [
            'dcschemaloader',
            'activity-schema'
        ]
    }
);
