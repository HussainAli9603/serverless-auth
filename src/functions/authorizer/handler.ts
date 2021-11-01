// import Dynamo from "src/common/Dynamo";
import * as jwt from 'jsonwebtoken';
// const tokenTableName = "tokenTableName"
// import { middyfy } from '@libs/lambda';

const handler2 = async (event) => {
    // console.log(event)
    const bearerHeader: any = event["authorizationToken"];
    if (bearerHeader != "undefined") {
        var bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        event.token = bearerToken
        const decoded = jwt.verify(bearerToken, "shhhh");
        event.user = decoded;
        console.log(event.user)

        return {
            principalId: 'apikey123',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Resource: ['*'],
                        Effect: 'Allow',
                    },
                ],
            },
        };
    } else {
        return {
            principalId: 'apikey123',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Resource: ['*'],
                        Effect: 'Allow',
                    },

                ],

            },

        };
    }
};



export const handler11 = handler2;
