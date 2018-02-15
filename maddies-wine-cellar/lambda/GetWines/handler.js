// This function is used to get all wines from the cellar table
'use strict';
exports.__esModule = true;
var AWS = require("aws-sdk");
module.exports.GetWines = function (event, context, callback) {
    console.info("Received event: ", JSON.stringify(event, null, 2));
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = process.env.TABLE_NAME;
    var response = {
        statusCode: 200,
        message: []
    };
    var params = {
        TableName: table,
        ProjectionExpression: "#n, #g, #d, #id, #vy, #vg",
        ExpressionAttributeNames: {
            "#n": "Name",
            "#g": "Grapes",
            "#d": "Description",
            "#id": "Id",
            "#vy": "Vineyard",
            "#vg": "Vintage"
        }
    };
    console.log("Scanning Cellar table.");
    docClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            response.statusCode = 500;
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, response);
        }
        else if (data == null) {
            response.statusCode = 404;
            callback(null, response);
        }
        else {
            console.log("Scan succeeded.");
            data.Items.forEach(function (wine) {
                response.message.push(wine);
            });
            callback(null, response);
        }
    }
};
