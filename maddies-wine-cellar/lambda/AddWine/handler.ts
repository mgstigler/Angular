'use strict';
import { WineModel } from "../Shared/Models/wineModel"
import * as AWS from "aws-sdk";

module.exports.AddWine = (event: WineModel, context, callback) => {
    console.info("Received event: ", JSON.stringify(event, null, 2));

    let docClient = new AWS.DynamoDB.DocumentClient();

    let table = process.env.TABLE_NAME;

    let params = {
        TableName:table,
        Item:{
            "Name": event.Name,
            "Grapes": event.Grapes,
            "Description": event.Description,
            "Id": event.Id,
            "Vineyard": event.Vineyard,
            "Vintage": event.Vintage
        }
    };

    let response = {
        statusCode: 200,
        message: ""
    };


    console.log("Adding a new item...");
    docClient.put(params, (err, data) => {
        if (err) {
            response.statusCode = 500;
            console.error("Unable to create employee. Error JSON:", JSON.stringify(err, null, 2));
            response.message = "Unable to create wine " + event.Name + " ," + event.Vineyard;
            callback(null, response);
        } else if(params == null){
            response.statusCode = 404;
            response.message = "Unable to create wine " + event.Name + " ," + event.Vineyard;
            callback(null, response);
        } else {
            response.message = "Created wine " + event.Name + " " +event.Vineyard + " succeeded.";
            callback(null, response);
        }
    });
};
