/**
 * User: oliversieweke
 * Date: 10.04.18  17:06
 * (c) 2012, Doc Cirrus GmbH, Berlin
 */
/*global YUI */
'use strict';

YUI.add( 'workstation-schema', function( Y, NAME ) {
        /**
         * @module workstation-schema
         */

        var
            i18n = Y.doccirrus.i18n,
            types = {};

        types = Y.mix( types, {
                root: {
                    base: {
                        complex: "ext",
                        type: "WorkStation_T",
                        lib: types
                    }
                },
                WorkStation_T: {
                    humanId: {
                        type: "String",
                        required: true,
                        unique: true,
                        key: true,
                        index: "unique",
                        apiv: {v: 2, queryParam: false},
                        validate: "WorkStation_T_humanId",
                        i18n: i18n( 'workstation-schema.WorkStation_T.humanId.i18n' )
                    },
                    name: {
                        type: "String",
                        required: true,
                        apiv: {v: 2, queryParam: false},
                        i18n: i18n( 'workstation-schema.WorkStation_T.name.i18n' )
                    },
                    tiCardReaders: {
                        type: ["ObjectId"],
                        apiv: {v: 2, queryParam: false},
                        i18n: i18n( 'workstation-schema.WorkStation_T.tiCardReaders.i18n' )
                    }
                }
            }
        );

        NAME = Y.doccirrus.schemaloader.deriveSchemaName( NAME );

        /**
         * @class workstation
         * @namespace doccirrus.schemas
         */
        Y.namespace( 'doccirrus.schemas' )[NAME] = {
            types: types,

            indexes: [
                {
                    key: {
                        "humanId": 1
                    },
                    indexType: {unique: true}
                }
            ],

            name: NAME
        };

        Y.doccirrus.schemaloader.mixSchema( Y.doccirrus.schemas[NAME], true );
    },
    '0.0.1', {
        requires: [
            'doccirrus',
            'dcschemaloader'
        ]
    }
);
