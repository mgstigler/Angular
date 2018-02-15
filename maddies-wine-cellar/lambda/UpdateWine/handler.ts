'use strict';
import * as AWS from "aws-sdk";
import { WineModel } from "../Shared/Models/wineModel"

module.exports.UpdateWine = (event: WineModel, context, callback) => {
    console.info("Received event: ", JSON.stringify(event, null, 2));

    let docClient = new AWS.DynamoDB.DocumentClient()

    let table = process.env.TABLE_NAME;

    // Update the item, unconditionally,

    let params = {
        TableName:table,
        Key:{
            "Name": event.Name
        },
        UpdateExpression: "set Name = :n, Grapes=:g, Description=:d, Id=:id, Vineyard=:vy, Vintage=:vg",
        ExpressionAttributeValues:{
            ":n": event.Name,
            ":g": event.Grapes,
            ":d": event.Description,
            ":id": event.Id,
            ":vy": event.Vineyard,
            ":vg": event.Vintage
        },
        ReturnValues:"UPDATED_NEW"
    };

    let response = {
        statusCode: 200,
        message: ""
    };
       
    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            response.statusCode = 500;
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            response.message = "Unable to update " + event.Name;
            callback(null, response);
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            response.message = "Updated wine " + event.Name +  " successfully.";
            callback(null, response);
        }
    });
};
