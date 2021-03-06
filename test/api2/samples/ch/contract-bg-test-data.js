'use strict';
var
    today = new Date(),
    contract = {
        "_id": "5a393f6feafe0907f3b85c6b",
        "actType": "BGSCHEIN",
        "timestamp": today,
        "patientId": "54be764fc404c1d77a286d4d",
        "employeeId": "56f5382c37644678aa923d92",
        "locationId": "54eb41b878382da863181d3b",
        "treatmentType": "AMBULANT",
        "fk4217": "",
        "fk4241": "",
        "fk4236": false,
        "fk4206": null,
        "fk4123": "",
        "fk4125to": null,
        "fk4125from": null,
        "fk4126": "",
        "fk4124": "",
        "scheinSubgroup": "",
        "scheinType": "",
        "scheinBillingArea": "00",
        "scheinYear": "",
        "scheinQuarter": "",
        "fk4219": "",
        "scheinNotes": "Blabla",
        "scheinFinding": "",
        "scheinDiagnosis": "",
        "scheinOrder": "",
        "scheinSpecialisation": "",
        "scheinEstablishment": "",
        "scheinRemittor": "",
        "explanations": "",
        "userContent": "",
        "comment": "API2TestingActivity",
        "timeOfArrival": today,
        "dayOfArrival": today,
        "workingHoursEnd": today,
        "workingHoursStart": today,
        "timeOfAccident": today,
        "dayOfAccident": today
    },
    putParams = {
        data: contract
    },
    postResult = {
        "_id": "5a393f6feafe0907f3b85c6b",
        "employeeInitials": "FB",
        "employeeName": "Bein_test, Frederike_test",
        "timestamp": today,
        "patientId": "54be764fc404c1d77a286d4d",
        "employeeId": "56f5382c37644678aa923d92",
        "locationId": "54eb41b878382da863181d3b",
        "treatmentType": "AMBULANT",
        "comment": "API2TestingActivity",
        "uvGoaeType": "bg_ahb",
        "caseFolderId": "5a393f6feafe0907f3b85c6a",
        "accidentCompanyCity": "",
        "accidentCompanyPLZ": "",
        "accidentCompanyHouseno": "",
        "accidentCompanyStreet": "",
        "accidentCompany": "",
        "timeOfArrival": today,
        "dayOfArrival": today,
        "workingHoursEnd": today,
        "workingHoursStart": today,
        "timeOfAccident": today,
        "dayOfAccident": today,
        "fk4219": "",
        "scheinNotes": "Blabla",
        "scheinFinding": "",
        "scheinDiagnosis": "",
        "scheinOrder": "",
        "scheinSpecialisation": "",
        "scheinEstablishment": "",
        "scheinRemittor": "",
        "apkState": "IN_PROGRESS",
        "editor": [
            {
                "name": "Doc-Cirrus Kundendienst",
                "employeeNo": "",
                "_id": "5a393f6feafe0907f3b85c6c"
            }
        ],
        "status": "VALID",
        "explanations": "",
        "partnerInfo": "",
        "userContent": "",
        "subType": "",
        "actType": "BGSCHEIN"
    },
    putResult = {
        "_id": "5a3a3a7beafe0907f3b85cf6",
        "employeeInitials": "FB",
        "employeeName": "Bein_test, Frederike_test",
        "timestamp": "2017-12-20T10:24:57.690Z",
        "patientId": "54be764fc404c1d77a286d4d",
        "employeeId": "56f5382c37644678aa923d92",
        "locationId": "54eb41b878382da863181d3b",
        "treatmentType": "AMBULANT",
        "comment": "API2TestingActivity",
        "uvGoaeType": "bg_ahb",
        "caseFolderId": "5a3a3a7beafe0907f3b85cf5",
        "accidentCompanyCity": "",
        "accidentCompanyPLZ": "",
        "accidentCompanyHouseno": "",
        "accidentCompanyStreet": "",
        "accidentCompany": "",
        "timeOfArrival": "2017-12-19T12:06:54.572Z",
        "dayOfArrival": "2017-12-19T12:06:54.572Z",
        "workingHoursEnd": "2017-12-19T12:06:54.572Z",
        "workingHoursStart": "2017-12-19T12:06:54.571Z",
        "timeOfAccident": "2017-12-19T12:06:54.571Z",
        "dayOfAccident": "2017-12-19T12:06:54.571Z",
        "fk4219": "",
        "scheinNotes": "Blabla",
        "scheinFinding": "",
        "scheinDiagnosis": "",
        "scheinOrder": "",
        "scheinSpecialisation": "",
        "scheinEstablishment": "",
        "scheinRemittor": "",
        "apkState": "IN_PROGRESS",
        "editor": [
            {
                "name": "Doc-Cirrus Kundendienst",
                "employeeNo": "",
                "_id": "5a3a3a7beafe0907f3b85cf7"
            }
        ],
        "status": "VALID",
        "explanations": "",
        "partnerInfo": "",
        "userContent": "",
        "subType": "",
        "actType": "BGSCHEIN"
    },
    deleteResult = {
        "_id": "5a3a3cbe7f6555c3defe2741",
        "employeeInitials": "FB",
        "employeeName": "Bein_test, Frederike_test",
        "timestamp": "2017-12-20T10:34:35.714Z",
        "patientId": "54be764fc404c1d77a286d4d",
        "employeeId": "56f5382c37644678aa923d92",
        "locationId": "000000000000000000000001",
        "treatmentType": "AMBULANT",
        "comment": "API2TestingActivity",
        "accidentCompanyCity": "",
        "accidentCompanyPLZ": "",
        "accidentCompanyHouseno": "",
        "accidentCompanyStreet": "",
        "accidentCompany": "",
        "timeOfArrival": "2017-12-19T12:06:54.572Z",
        "dayOfArrival": "2017-12-19T12:06:54.572Z",
        "workingHoursEnd": "2017-12-19T12:06:54.572Z",
        "workingHoursStart": "2017-12-19T12:06:54.571Z",
        "timeOfAccident": "2017-12-19T12:06:54.571Z",
        "dayOfAccident": "2017-12-19T12:06:54.571Z",
        "fk4219": "",
        "scheinNotes": "Blabla",
        "scheinFinding": "",
        "scheinDiagnosis": "",
        "scheinOrder": "",
        "scheinSpecialisation": "",
        "scheinEstablishment": "",
        "scheinRemittor": "",
        "apkState": "IN_PROGRESS",
        "editor": [
            {
                "_id": "5a3a3cbeeafe0907f3b85d39",
                "employeeNo": "",
                "name": "Doc-Cirrus Kundendienst"
            },
            {
                "name": "Doc-Cirrus Kundendienst"
            }
        ],
        "status": "DELETED",
        "explanations": "",
        "partnerInfo": "",
        "userContent": "",
        "subType": "",
        "actType": "BGSCHEIN"
    },
    deleteUpsertResult = {
        "_id": "5a3a42b47f6555c3defe4d42",
        "employeeInitials": "FB",
        "employeeName": "Bein_test, Frederike_test",
        "timestamp": "2017-12-20T11:00:01.538Z",
        "patientId": "54be764fc404c1d77a286d4d",
        "employeeId": "56f5382c37644678aa923d92",
        "locationId": "000000000000000000000001",
        "treatmentType": "AMBULANT",
        "comment": "API2TestingActivity",
        "accidentCompanyCity": "",
        "accidentCompanyPLZ": "",
        "accidentCompanyHouseno": "",
        "accidentCompanyStreet": "",
        "accidentCompany": "",
        "timeOfArrival": "2017-12-19T12:06:54.572Z",
        "dayOfArrival": "2017-12-19T12:06:54.572Z",
        "workingHoursEnd": "2017-12-19T12:06:54.572Z",
        "workingHoursStart": "2017-12-19T12:06:54.571Z",
        "timeOfAccident": "2017-12-19T12:06:54.571Z",
        "dayOfAccident": "2017-12-19T12:06:54.571Z",
        "fk4219": "",
        "scheinNotes": "Blabla",
        "scheinFinding": "",
        "scheinDiagnosis": "",
        "scheinOrder": "",
        "scheinSpecialisation": "",
        "scheinEstablishment": "",
        "scheinRemittor": "",
        "apkState": "IN_PROGRESS",
        "editor": [
            {
                "_id": "5a3a42b4eafe0907f3b85de1",
                "employeeNo": "",
                "name": "Doc-Cirrus Kundendienst"
            },
            {
                "name": "Doc-Cirrus Kundendienst"
            }
        ],
        "status": "DELETED",
        "explanations": "",
        "partnerInfo": "",
        "userContent": "",
        "subType": "",
        "actType": "BGSCHEIN"
    };

module.exports = {
    getData: function() {
        return JSON.parse( JSON.stringify( contract ) );
    },
    putParams: putParams,
    getPostResult() {
        return JSON.parse( JSON.stringify( postResult ) );
    },
    getPutResult() {
        return JSON.parse( JSON.stringify( putResult ) );
    },
    getDeleteResult() {
        return JSON.parse( JSON.stringify( deleteResult ) );
    },
    getDeleteUpsertResult() {
        return JSON.parse( JSON.stringify( deleteUpsertResult ) );
    }
};