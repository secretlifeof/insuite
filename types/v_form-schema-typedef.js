/**
 * @module v_formSchema
 */

/**
 * @typedef {Object} module:v_formSchema.linkedContentsObj
 * @property {String} receiptId - 
 * @property {String} content - 
 * @property {String} caseFolderId - 
 * @property {String} patientId - 
 * @property {String} actType - 
 * @property {Number} amount - 
 */


/**
 * @typedef {Object} module:v_formSchema.linkedTimestampsObj
 * @property {String} receiptId - 
 * @property {Date} timestamp - 
 */


/**
 * @typedef {Object} module:v_formSchema.linkedEmployeesObj
 * @property {String} receiptId - 
 * @property {String} name - 
 * @property {String} employeeNo - 
 * @property {String} initials - 
 */


/**
 * @typedef {Object} module:v_formSchema.medDataObj
 * @property {String} category - 
 * @property {String} type - 
 * @property {Number} value - 
 * @property {String} textValue - 
 * @property {Date} dateValue - 
 * @property {Boolean} boolValue - 
 * @property {String} unit - 
 * @property {Array.<String>} sampleNormalValueText - 
 * @property {object} additionalData - 
 * @property {Number} cchKey - 
 * @property {Boolean} noTagCreation - 
 */


/**
 * @typedef {Object} module:v_formSchema.editorObj
 * @property {String} name - 
 * @property {String} employeeNo - 
 * @property {String} initials - 
 */


/**
 * @typedef {Object} module:v_formSchema.attachedMediaObj
 * @property {String} mediaId - 
 * @property {String} contentType - 
 * @property {String} caption - 
 * @property {String} title - 
 * @property {String} malwareWarning - 
 */


/**
 * @typedef {Object} module:v_formSchema.v_form
 * @property {String} actType - 
 * @property {string} status - 
 * @property {Array.<String>} attachments - 
 * @property {Array.<module:v_formSchema.attachedMediaObj>} attachedMedia - 
 * @property {Array.<String>} attachedMediaTags - 
 * @property {String} pressButton - 
 * @property {String} subType - 
 * @property {Date} timestamp - 
 * @property {String} daySeparation - 
 * @property {String} time - 
 * @property {String} patientId - 
 * @property {String} employeeId - 
 * @property {Array.<String>} backupEmployeeIds - 
 * @property {String} employeeName - 
 * @property {String} employeeInitials - 
 * @property {ObjectId} locationId - 
 * @property {boolean} external - 
 * @property {String} externalRef - 
 * @property {String} copyRef - 
 * @property {String} content - 
 * @property {String} mirrorActivityId - 
 * @property {String} mirrorCaseFolderType - 
 * @property {String} userContent - 
 * @property {Mixed} mediaImportError - 
 * @property {String} partnerInfo - 
 * @property {Object} patientShort - 
 * @property {String} comment - 
 * @property {String} explanations - 
 * @property {Array.<module:v_formSchema.editorObj>} editor - 
 * @property {Array.<String>} activities - 
 * @property {Array.<String>} referencedBy - 
 * @property {String} formId - 
 * @property {String} formVersion - 
 * @property {String} formPdf - 
 * @property {String} formLang - 
 * @property {String} formGender - 
 * @property {Object} u_extra - 
 * @property {String} caseFolderId - 
 * @property {String} patientName - 
 * @property {String} patientLastName - 
 * @property {String} patientFirstName - 
 * @property {String} patientNo - 
 * @property {String} patientKbvDob - 
 * @property {String} apkState - 
 * @property {Boolean} sentToMediport - 
 * @property {String} asvTeamnumber - 
 * @property {String} careComment - 
 * @property {Boolean} caseFolderDisabled - 
 * @property {Boolean} notDeletable - 
 * @property {String} cancelReason - 
 * @property {String} autoGenID - 
 * @property {String} locationName - 
 * @property {Date} lastChanged - 
 * @property {Array.<String>} unlinkedMirrorIds - 
 * @property {Number} printCount - 
 * @property {Array.<ObjectId>} savedEmails - 
 * @property {boolean} belegarztBeh - 
 * @property {boolean} notfall - 
 * @property {boolean} unfall - 
 * @property {boolean} bvg - 
 * @property {boolean} notwendig - 
 * @property {Date} betreuungVon - 
 * @property {Date} betreuungBis - 
 * @property {Boolean} ambulantePsychotherapeutischeAkutbehandlung - 
 * @property {Boolean} ambulantePsychoTherapie - 
 * @property {Boolean} zeitnahErforderlich - 
 * @property {Boolean} analytischePsychotherapie - 
 * @property {Boolean} tiefenpsychologischFundiertePsychotherapie - 
 * @property {Boolean} verhaltenstherapie - 
 * @property {String} naehereAngabenZuDenEmpfehlungen - 
 * @property {Array.<module:v_formSchema.medDataObj>} medData - 
 * @property {Object} labEntries - 
 * @property {String} medDataType - 
 * @property {String} invoiceNo - 
 * @property {Date} autoGenerated - 
 * @property {String} ruleStatus - 
 * @property {Object} ruleErrors - 
 * @property {Array.<String>} receipts - 
 * @property {String} scheinOrder - 
 * @property {String} scheinDiagnosis - 
 * @property {String} treatmentType - 
 * @property {String} reasonType - 
 * @property {Boolean} includesBSK - 
 * @property {Boolean} isChiefPhysician - 
 * @property {String} debtCollection - 
 * @property {String} orderAccounting - 
 * @property {Number} agencyCost - 
 * @property {Number} totalReceipts - 
 * @property {Number} totalPenalties - 
 * @property {Number} totalReceiptsOutstanding - 
 * @property {Array.<module:v_formSchema.linkedEmployeesObj>} linkedEmployees - 
 * @property {Array.<module:v_formSchema.linkedTimestampsObj>} linkedTimestamps - 
 * @property {Date} invoiceDate - 
 * @property {Date} invoiceBilledDate - 
 * @property {Date} reminderDate - 
 * @property {Date} warning1Date - 
 * @property {Date} warning2Date - 
 * @property {String} billingAddress - 
 * @property {Array.<String>} continuousIcds - 
 * @property {Array.<module:v_formSchema.linkedContentsObj>} linkedContents - 
 * @property {String} insuranceName - 
 * @property {String} referenceNo - 
 * @property {String} scheinNotes - 
 * @property {Boolean} hasOP - 
 * @property {Number} totalASK - 
 * @property {Number} totalBSK - 
 * @property {Number} totalDoc - 
 * @property {Number} totalWithoutExpenses - 
 * @property {Number} total75 - 
 * @property {Number} total25 - 
 * @property {Number} total15 - 
 * @property {Number} totalOwing - 
 * @property {Number} beforetax - 
 * @property {Number} totalExpense - 
 * @property {Number} totalAHB - 
 * @property {Number} totalBHB - 
 * @property {Number} total - 
 * @property {Number} totalVat - 
 * @property {Number} vatAmount - 
 * @property {Number} BSK - 
 * @property {Number} ASK - 
 * @property {Number} AHB - 
 * @property {Number} BHB - 
 * @property {Number} price - 
 * @property {Number} actualPrice - 
 * @property {String} unit - 
 * @property {String} actualUnit - 
 * @property {Boolean} hasVat - 
 * @property {Number} vat - 
 * @property {Array.<String>} icds - 
 * @property {Array.<String>} icdsExtra - 
 * @property {String} scheinSlipMedicalTreatment - 
 * @property {Boolean} fk4202 - 
 * @property {String} auType - 
 * @property {boolean} erstBesch - 
 * @property {boolean} folgeBesc - 
 * @property {boolean} arbeitsunfall - 
 * @property {boolean} durchgangsarzt - 
 * @property {Date} auVon - 
 * @property {Date} auVorraussichtlichBis - 
 * @property {Date} festgestelltAm - 
 * @property {boolean} sonstigerUnf - 
 * @property {boolean} rehab - 
 * @property {boolean} reintegration - 
 * @property {String} massnahmen - 
 * @property {String} diagnosesAdd - 
 * @property {boolean} krankengeld - 
 * @property {boolean} endBesch - 
 * @property {String} eTSArrangementCode - 
 * @property {String} eTSArrangementCodeRequestMessageId - 
 * @property {String} eTSAErrorMessage - 
 * @property {string} mobilityOtherCheck - 
 * @property {string} mobilityOtherString - 
 * @property {String} vendorId - 
 * @property {String} eventMessage - 
 * @property {Date} eventDate - 
 * @property {String} selectedContact - 
 * @property {Object} d_extra - 
 */