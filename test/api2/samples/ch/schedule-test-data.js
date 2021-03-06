'use strict';
var
    schedule =
        {
            "_id" : "5adde4486a7a2d5ddff1c631",
            "lastEditedDate" : "2018-04-23T13:48:56.212Z",
            "start" : "2018-04-23T13:50:00Z",
            "end" : "2018-04-23T14:05:00Z",
            "duration" : 15,
            "plannedDuration" : 15,
            "calendar" : "515ae9604013671c12c1c900",
            "type" : "BOOKED",
            "adhoc" : false,
            "patient" : "5addcc7ad8a71f5cf203f824",
            "scheduled" : 0,
            "allDay" : false,
            "severity" : "NONE",
            "urgency" : 0,
            "userDescr" : "Title",
            "resource": "5e02064d333ef7659d75a982",
            "resourceBased": true,
            "linkByResource": "5e10945a9229c64bc4afe494",
            "title" : "Lastname, Firstname; Title"
        },
    putParams = {
        data: schedule
    };

module.exports = {
    getData: function() {
        var
            data = JSON.parse( JSON.stringify( schedule ) );

        return data;
    },
    putParams: putParams
};

