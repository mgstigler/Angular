'use strict';
import { WineModel } from "../Shared/Models/wineModel"
import * as AWS from "aws-sdk";
import * as querystring from "querystring";

module.exports.GetWine = (event, context, callback) => {
    console.info("Received event: ", JSON.stringify(event, null, 2));
    let docClient = new AWS.DynamoDB.DocumentClient()
    let table = process.env.TABLE_NAME;

    let response = {
        statusCode: 200,
        message: ""
    };

    let params = {
        TableName: table,
        Key:{
            "Name": event.Name
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            response.statusCode = 500;
            response.message = "Cannot find wine " + event.Name;
            callback(null, response);
        } else if (data.Item == null) {
            response.statusCode = 404;
            response.message = "Cannot find wine " + event.Name;
            callback(null, response);
        }else{
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            response.message = "Wine retrieved: " + JSON.stringify(data);
            callback(null, response);
        }
    });
};
