'use strict';
import { WineModel } from "../Shared/Models/wineModel"
import * as AWS from "aws-sdk";

module.exports.DeleteWine = (event: WineModel, context, callback) => {
    console.info("Received event: ", JSON.stringify(event, null, 2));
    let docClient = new AWS.DynamoDB.DocumentClient();

    let table = process.env.TABLE_NAME;

    let params = {
        TableName:table,
        Key:{
            "Name": event.Name
        }
    };

    let response = {
        statusCode: 200,
        message: ""
    };

    console.log("Attempting a conditional delete...");
    docClient.delete(params, (err, data) => {
        if (err) {
            response.statusCode = 500;
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            response.message = "Unable to delete employee " + event.Name;
            callback(null, response);
        } else if (params == null) {
            response.statusCode = 404;
            response.message = "Employee not found.";
            callback(null, response);
        } else {
            response.message = event.Name + " deleted from directory.";
            callback(null, response);
        }
    });
};
