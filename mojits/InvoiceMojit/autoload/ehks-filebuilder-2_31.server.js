/**
 * User: do
 * Date: 28.11.18  15:47
 * (c) 2012, Doc Cirrus GmbH, Berlin
 */

/*global YUI */


YUI.add( 'ehks-filebuilder-2_31', function( Y, NAME ) {

        /**
         * @module ehks-filebuilder-2_31
         *
         */

        const
            edocConverter = Y.doccirrus.edocConverter,
            convert = edocConverter.convert,
            VALUE_RESULT_TYPE = 'value',
            formatDate = edocConverter.utils.formatDate,
            s = edocConverter.utils.s,
            buildInsurance = edocConverter.utils.buildInsurance,
            buildObservation = edocConverter.utils.buildObservation,
            translateEnum = edocConverter.utils.translateEnum,
            mapGender = edocConverter.utils.mapGender,

            startHeader = edocConverter.mapper.startHeader,
            software = edocConverter.mapper.software,
            endHeader = edocConverter.mapper.endHeader,
            startBody = edocConverter.mapper.startBody,
            openParagraph = edocConverter.mapper.openParagraph,
            closeParagraph = edocConverter.mapper.closeParagraph,

            ehksDocProcessConfig = [
                {
                    '$switch:activity.actType': {
                        EHKSND: [
                            startHeader,
                            {
                                'Header': [
                                    docInfo,
                                    provider,
                                    patient,
                                    software
                                ]
                            },
                            endHeader,
                            startBody, /*{ // optional if birth_dtm is set
                                'ohne Name': [
                                    openParagraph( 'ohne Name' ),
                                    patientAge,
                                    closeParagraph
                                ]
                            }, */ {
                                'Verdachtsdiagnose': [
                                    openParagraph( 'Verdachtsdiagnose' ),
                                    hksMalignesMelanom,
                                    hksBasalzellkarzinom,
                                    hksSpinozellul??resKarzinom,
                                    closeParagraph
                                ]
                            }, {
                                'Gesundheitsuntersuchung': [
                                    openParagraph( 'Gesundheitsuntersuchung' ),
                                    hksHealthExaminationAtSameTime,
                                    closeParagraph
                                ]
                            }
                        ],
                        EHKSD: [
                            startHeader,
                            {
                                'Header': [
                                    docInfo,
                                    provider,
                                    patient,
                                    software
                                ]
                            },
                            endHeader,
                            startBody, /*{ // optional if birth_dtm is set
                                'ohne Name': [
                                    openParagraph( 'ohne Name' ),
                                    patientAge,
                                    closeParagraph
                                ]
                            }, */ {
                                '??berweisung im Rahmen des Hautkrebs-Screenings': [
                                    openParagraph( '??berweisung im Rahmen des Hautkrebs-Screenings' ),
                                    hksHasReferral,
                                    closeParagraph
                                ]
                            }, setup, {
                                '$if:renderHksHasSuspectedDiag': { // only render block if hksHasSuspectedDiag is 'YES', 'NO'
                                    'Angabe der Verdachtsdiagnose des ??berweisenden Arztes': [
                                        openParagraph( 'Angabe der Verdachtsdiagnose des ??berweisenden Arztes' ),
                                        hksHasSuspectedDiag,
                                        hksMalignesMelanom,
                                        hksBasalzellkarzinom,
                                        hksSpinozellul??resKarzinom,
                                        closeParagraph
                                    ]
                                }
                            }, {
                                'Verdachtsdiagnose des Dermatologen': [
                                    openParagraph( 'Verdachtsdiagnose des Dermatologen' ),
                                    hksMalignesMelanomDermatologists,
                                    hksBasalzellkarzinomDermatologists,
                                    hksSpinozellul??resKarzinomDermatologists,
                                    closeParagraph
                                ]
                            }, {
                                'hksBiopsieOrExzision': [
                                    openParagraph( 'Biopsie/Exzision' ),
                                    hksBiopsieOrExzision,
                                    closeParagraph
                                ]
                            }, {
                                '$if:renderHistopathology': { // if 'YES' === hksBiopsieOrExzision
                                    'Histopathologie': [
                                        openParagraph( 'Histopathologie' ),
                                        hksMalignesMelanomHistopathologie,
                                        hksBasalzellkarzinomHistopathologie,
                                        hksSpinozellul??resKarzinomHistopathologie,
                                        closeParagraph
                                    ]
                                }
                            }
                        ]
                    }
                }
            ];

        // HEADER

        function docInfo( doc, context ) {
            const
                activity = context.activity,
                examDate = activity.dmpSignatureDate,
                timestamp = activity.timestamp,
                locationNo = context.location.commercialNo,
                docTypeDef = Y.doccirrus.ehksutils.getDocType( activity.actType, activity.hasAdditionalContract );

            doc = doc
                .ele( 'clinical_document_header' )
                .ele( 'id', {
                    EX: activity._id.toString(),
                    RT: locationNo
                } ).up()
                .ele( 'document_type_cd', {
                    V: docTypeDef && docTypeDef.id || '',
                    S: '1.2.276.0.76.5.100',
                    SN: 'KBV',
                    DN: docTypeDef && docTypeDef.text || ''
                } ).up()
                .ele( 'service_tmr', {
                    V: formatDate( examDate )
                } ).up()
                .ele( 'origination_dttm', {
                    V: formatDate( timestamp )
                } ).up();
            return doc;
        }

        function provider( doc, context ) {

            const
                location = context.location,
                employee = context.employee;

            doc = doc.ele( 'provider' )
                .ele( 'provider.type_cd', {
                    V: 'PRF'
                } ).up();

            doc = doc
                .ele( 'person' );

            if( employee.officialNo ) {
                doc = doc.ele( 'id', {
                    EX: s( employee.officialNo, '', 9 ),
                    RT: 'LANR'
                } ).up();
            }
            if( location.commercialNo ) {
                doc = doc.ele( 'id', {
                    EX: s( location.commercialNo, '', 9 ),
                    RT: 'BSNR'
                } ).up();
            }

            return doc.up().up();
        }

        function patient( doc, context ) {
            const
                location = context.location,
                patient = context.patient,
                kbvDob = patient.kbvDob;

            let i, arr,
                transformedDob = '';

            if( 'string' === typeof kbvDob ) { // create util fn
                arr = kbvDob.split( '.' );
                for( i = arr.length - 1; i >= 0; i-- ) {
                    transformedDob += arr[i];
                    if( i !== 0 ) {
                        transformedDob += '-';
                    }
                }
            }

            doc = doc
                .ele( 'patient' )
                .ele( 'patient.type_cd', {
                    V: 'PATSBJ'
                } ).up()
                .ele( 'person' )
                .ele( 'id', {
                    EX: s( patient.ehksPatientNo, '', 8 ),
                    RT: s( location.commercialNo, '', 9 )
                } ).up();

            doc = doc.up()
                .ele( 'birth_dttm', {
                    V: transformedDob
                } ).up()
                .ele( 'administrative_gender_cd', {
                    V: mapGender( patient.gender ),
                    S: '2.16.840.1.113883.5.1'
                } ).up();

            doc = buildInsurance( doc, context, null, true );

            return doc.up();
        }

        // EHKS_ND

        // function patientAge( doc, context ) {
        //     const
        //         patient = context.patient,
        //         dob = patient.dob,
        //         dod = patient.dateOfDeath,
        //         age = Y.doccirrus.schemas.patient.ageFromDob( dob, dod );
        //     return buildObservation( doc, 'Alter', {
        //         V: age,
        //         U: 'Jahre'
        //     } );
        // }

        function setup( doc, context ) {
            const
                hksHasSuspectedDiag = context.activity.hksHasSuspectedDiag[0];
            context.renderHksHasSuspectedDiag = ['YES', 'NO'].includes( hksHasSuspectedDiag );
            return doc;
        }

        // also used by EHKS_D where this is can be optional
        function hksMalignesMelanom( doc, context ) {
            const
                hksMalignesMelanom = context.activity.hksMalignesMelanom[0];
            if( !hksMalignesMelanom ) {
                return doc;
            }
            return buildObservation( doc, 'Malignes Melanom', {
                V: translateEnum( 'HksMalignesMelanom_E', hksMalignesMelanom )
            } );
        }

        // also used by EHKS_D where this is can be optional
        function hksBasalzellkarzinom( doc, context ) {
            const
                hksBasalzellkarzinom = context.activity.hksBasalzellkarzinom[0];
            if( !hksBasalzellkarzinom ) {
                return doc;
            }
            return buildObservation( doc, 'Basalzellkarzinom', {
                V: translateEnum( 'HkshksBasalzellkarzinom_E', hksBasalzellkarzinom )
            } );
        }

        // also used by EHKS_D where this is can be optional
        function hksSpinozellul??resKarzinom( doc, context ) {
            const
                hksSpinozellul??resKarzinom = context.activity.hksSpinozellul??resKarzinom[0];
            if( !hksSpinozellul??resKarzinom ) {
                return doc;
            }

            return buildObservation( doc, 'Spinozellul??res Karzinom', {
                V: translateEnum( 'HksSpinozellul??resKarzinom_E', hksSpinozellul??resKarzinom )
            } );
        }

        function hksHealthExaminationAtSameTime( doc, context ) {
            const
                hksHealthExaminationAtSameTime = context.activity.hksHealthExaminationAtSameTime[0];
            return buildObservation( doc, 'Gleichzeitig Gesundheitsuntersuchung durchgef??hrt', {
                V: translateEnum( 'HksHealthExaminationAtSameTime_E', hksHealthExaminationAtSameTime )
            } );
        }

        // EHKS_D

        function hksHasReferral( doc, context ) {
            const
                hksHasReferral = context.activity.hksHasReferral[0];
            return buildObservation( doc, 'Patient kommt auf ??berweisung im Rahmen des Hautkrebs-Screenings', {
                V: translateEnum( 'HksHasReferral_E', hksHasReferral )
            } );
        }

        function hksHasSuspectedDiag( doc, context ) {
            const
                hksHasSuspectedDiag = context.activity.hksHasSuspectedDiag[0];
            if( !hksHasSuspectedDiag ) {
                return doc;
            }
            return buildObservation( doc, 'Angabe ??ber die Verdachtsdiagnose liegt vor', {
                V: translateEnum( 'HksHasSuspectedDiag_E', hksHasSuspectedDiag )
            } );

        }

        // see hksBasalzellkarzinom, hksSpinozellul??resKarzinom and hksHealthExaminationAtSameTime above

        function hksMalignesMelanomDermatologists( doc, context ) {
            const
                hksMalignesMelanomDermatologists = context.activity.hksMalignesMelanomDermatologists[0];
            if( !hksMalignesMelanomDermatologists ) {
                return doc;
            }
            return buildObservation( doc, 'Malignes Melanom', {
                V: translateEnum( 'HksMalignesMelanom_E', hksMalignesMelanomDermatologists )
            } );
        }

        function hksBasalzellkarzinomDermatologists( doc, context ) {
            const
                hksBasalzellkarzinomDermatologists = context.activity.hksBasalzellkarzinomDermatologists[0];
            if( !hksBasalzellkarzinomDermatologists ) {
                return doc;
            }
            return buildObservation( doc, 'Basalzellkarzinom', {
                V: translateEnum( 'HkshksBasalzellkarzinom_E', hksBasalzellkarzinomDermatologists )
            } );
        }

        function hksSpinozellul??resKarzinomDermatologists( doc, context ) {
            const
                hksSpinozellul??resKarzinomDermatologists = context.activity.hksSpinozellul??resKarzinomDermatologists[0];
            if( !hksSpinozellul??resKarzinomDermatologists ) {
                return doc;
            }

            return buildObservation( doc, 'Spinozellul??res Karzinom', {
                V: translateEnum( 'HksSpinozellul??resKarzinom_E', hksSpinozellul??resKarzinomDermatologists )
            } );
        }

        function hksBiopsieOrExzision( doc, context ) {
            const
                hksBiopsieOrExzision = context.activity.hksBiopsieOrExzision[0];
            if( !hksBiopsieOrExzision ) {
                return doc;
            }

            context.renderHistopathology = 'YES' === hksBiopsieOrExzision;

            return buildObservation( doc, 'Biopsie zu Verdachtsdiagnose entnommen oder Exzision durchgef??hrt', {
                V: translateEnum( 'HksBiopsieOrExzision_E', hksBiopsieOrExzision )
            } );
        }

        // Malignes Melanom
        function hksMalignesMelanomHistopathologie( doc, context ) {
            const
                hksMalignesMelanomHistopathologie = context.activity.hksMalignesMelanomHistopathologie[0],
                renderSubObservations = 'YES' === hksMalignesMelanomHistopathologie;
            if( !hksMalignesMelanomHistopathologie ) {
                return doc;
            }

            return buildObservation( doc, 'Malignes Melanom', {
                V: translateEnum( 'HksMalignesMelanom_E', hksMalignesMelanomHistopathologie )
            }, null, context, renderSubObservations ? [
                hksMalignesMelanomClassification,
                hksMalignesMelanomTumorThickness
            ] : null );
        }

        // Malignes Melanom sub observation
        function hksMalignesMelanomClassification( doc, context ) {
            const
                hksMalignesMelanomClassification = context.activity.hksMalignesMelanomClassification[0];
            if( !hksMalignesMelanomClassification ) {
                return doc;
            }

            return buildObservation( doc, 'Klassifikation', {
                V: translateEnum( 'HksMalignesMelanomClassification_E', hksMalignesMelanomClassification )
            } );
        }

        // Malignes Melanom sub observation
        function hksMalignesMelanomTumorThickness( doc, context ) {
            const
                hksMalignesMelanomTumorThickness = context.activity.hksMalignesMelanomTumorThickness[0];
            if( !hksMalignesMelanomTumorThickness ) {
                return doc;
            }

            return buildObservation( doc, 'Tumordicke (Breslow)', {
                V: translateEnum( 'HksMalignesMelanomTumorThickness_E', hksMalignesMelanomTumorThickness )
            } );
        }

        // Basalzellkarzinom
        function hksBasalzellkarzinomHistopathologie( doc, context ) {
            const
                hksBasalzellkarzinomHistopathologie = context.activity.hksBasalzellkarzinomHistopathologie[0],
                renderSubObservations = 'YES' === hksBasalzellkarzinomHistopathologie;
            if( !hksBasalzellkarzinomHistopathologie ) {
                return doc;
            }

            return buildObservation( doc, 'Basalzellkarzinom', {
                V: translateEnum( 'HkshksBasalzellkarzinom_E', hksBasalzellkarzinomHistopathologie )
            }, null, context, renderSubObservations ? [
                hksBasalzellkarzinomHorizontalTumorDiameterClinical,
                hksBasalzellkarzinomVerticalTumorDiameterHistological
            ] : null );
        }

        // Basalzellkarzinom sub observation
        function hksBasalzellkarzinomHorizontalTumorDiameterClinical( doc, context ) {
            const
                hksBasalzellkarzinomHorizontalTumorDiameterClinical = context.activity.hksBasalzellkarzinomHorizontalTumorDiameterClinical;
            if( !hksBasalzellkarzinomHorizontalTumorDiameterClinical ) {
                return doc;
            }

            return buildObservation( doc, 'horizontaler Tumordurchmesser (klinisch)', {
                V: hksBasalzellkarzinomHorizontalTumorDiameterClinical,
                U: 'mm'
            }, VALUE_RESULT_TYPE );
        }

        // Basalzellkarzinom sub observation
        function hksBasalzellkarzinomVerticalTumorDiameterHistological( doc, context ) {
            const
                hksBasalzellkarzinomVerticalTumorDiameterHistological = context.activity.hksBasalzellkarzinomVerticalTumorDiameterHistological;
            if( !hksBasalzellkarzinomVerticalTumorDiameterHistological ) {
                return doc;
            }

            return buildObservation( doc, 'vertikaler Tumordurchmesser (histologisch)', {
                V: hksBasalzellkarzinomVerticalTumorDiameterHistological,
                U: 'mm'
            }, VALUE_RESULT_TYPE );
        }

        // Spinozellul??res Karzinom
        function hksSpinozellul??resKarzinomHistopathologie( doc, context ) {
            const
                hksSpinozellul??resKarzinomHistopathologie = context.activity.hksSpinozellul??resKarzinomHistopathologie[0],
                renderSubObservations = 'YES' === hksSpinozellul??resKarzinomHistopathologie;
            if( !hksSpinozellul??resKarzinomHistopathologie ) {
                return doc;
            }

            return buildObservation( doc, 'Spinozellul??res Karzinom', {
                V: translateEnum( 'HksSpinozellul??resKarzinom_E', hksSpinozellul??resKarzinomHistopathologie )
            }, null, context, renderSubObservations ? [
                hksSpinozellul??resKarzinomClassification,
                hksSpinozellul??resKarzinomGrading
            ] : null );
        }

        // Spinozellul??res Karzinom sub observation
        function hksSpinozellul??resKarzinomClassification( doc, context ) {
            const
                hksSpinozellul??resKarzinomClassification = context.activity.hksSpinozellul??resKarzinomClassification[0];
            if( !hksSpinozellul??resKarzinomClassification ) {
                return doc;
            }

            return buildObservation( doc, 'Klassifikation', {
                V: translateEnum( 'HksSpinozellul??resKarzinomClassification_E', hksSpinozellul??resKarzinomClassification )
            } );
        }

        // Spinozellul??res Karzinom sub observation
        function hksSpinozellul??resKarzinomGrading( doc, context ) {
            const
                hksSpinozellul??resKarzinomGrading = context.activity.hksSpinozellul??resKarzinomGrading[0];
            if( !hksSpinozellul??resKarzinomGrading ) {
                return doc;
            }

            return buildObservation( doc, 'Grading', {
                V: translateEnum( 'HksSpinozellul??resKarzinomGrading_E', hksSpinozellul??resKarzinomGrading )
            } );
        }

        // API

        function buildDocXml( context ) {
            return convert( context, ehksDocProcessConfig );
        }

        Y.namespace( 'doccirrus' ).ehksFileBuilder2_31 = {
            name: NAME,
            buildDocXml: buildDocXml
        };
    },
    '0.0.1', {requires: ['edoc-converter']}
);