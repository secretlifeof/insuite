/**
 * @module v_ophthalmology_refractionSchema
 */

/**
 * @typedef {Object} module:v_ophthalmology_refractionSchema.editorObj
 * @property {String} name - 
 * @property {String} employeeNo - 
 * @property {String} initials - 
 */


/**
 * @typedef {Object} module:v_ophthalmology_refractionSchema.attachedMediaObj
 * @property {String} mediaId - 
 * @property {String} contentType - 
 * @property {String} caption - 
 * @property {String} title - 
 * @property {String} malwareWarning - 
 */


/**
 * @typedef {Object} module:v_ophthalmology_refractionSchema.v_ophthalmology_refraction
 * @property {String} actType - 
 * @property {Array.<String>} attachments - 
 * @property {Array.<module:v_ophthalmology_refractionSchema.attachedMediaObj>} attachedMedia - 
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
 * @property {String} status - 
 * @property {Array.<module:v_ophthalmology_refractionSchema.editorObj>} editor - 
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
 * @property {String} orType - 
 * @property {Date} orRead - 
 * @property {Number} orSphL - 
 * @property {Number} orSphR - 
 * @property {Number} orCylL - 
 * @property {Number} orCylR - 
 * @property {Number} orAxsL - 
 * @property {Number} orAxsR - 
 * @property {Number} orAddL - 
 * @property {Number} orAddR - 
 * @property {Number} orPsmL - 
 * @property {Number} orPsmR - 
 * @property {String} orBasL - 
 * @property {String} orBasR - 
 * @property {Number} orAdd2L - 
 * @property {Number} orAdd2R - 
 * @property {String} orVisAcuTyp - 
 * @property {Number} orFarL - 
 * @property {Number} orFarR - 
 * @property {Number} orFarB - 
 * @property {Number} orNearL - 
 * @property {Number} orNearR - 
 * @property {Number} orNearB - 
 * @property {Number} orPD - 
 * @property {Number} orHSA - 
 */