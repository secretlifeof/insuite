/**
 * User: rrrw
 * Date: 19/11/2015  15:45
 * (c) 2015, Doc Cirrus GmbH, Berlin
 */

/*global YUI*/
YUI.add( 'v_ophthalmology_refraction-schema', function( Y, NAME ) {

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
                        "type": "VOphthalmologyRefraction_T",
                        "lib": types
                    }
                },
                "OphthalmologyRefractionActType_E": {
                    "type": "String",
                    "default": "OPHTHALMOLOGY_REFRACTION",
                    "apiv": { v:2, queryParam: true },
                    "list": [
                        {
                            "val": "OPHTHALMOLOGY_REFRACTION",
                            "-de": "Refraktion",
                            i18n: i18n( 'activity-schema.Activity_E.OPHTHALMOLOGY_REFRACTION' ),
                            "-en": "Refraction"
                        }

                    ]
                },
                "VOphthalmologyRefraction_T": {
                    "actType": {
                        "complex": "eq",
                        "type": "OphthalmologyRefractionActType_E",
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
                        "type": "OphthalmologyRefraction_T",
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
