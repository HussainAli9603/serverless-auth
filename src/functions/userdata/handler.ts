import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
// import { Handler } from 'aws-lambda';
const Responses = require('../../common/API_Responses');

import Dynamo from "../../common/Dynamo"

import { createuserschema, getuserschema, getalluserschema, deleteuserschema, updateuserschema, loginuserschema } from './schema';

const hello1: ValidatedEventAPIGatewayProxyEvent<typeof createuserschema> = async (event) => {
  const ID: any = event.body.ID;
  const email: any = event.body.email;
  const password: any = event.body.password;
  const token: any = "";
  const tableName = 'usersTabless';

  const newUser = await Dynamo.write(ID, email, password, token, tableName).catch(err => {
    console.log('error in dynamo write', err);
    return null;
  });

  if (!newUser) {
    return Responses._400({ message: 'Failed to write Create user' });
  }

  return Responses._200({ newUser });

}
export const main1 = middyfy(hello1);

// ------------------------------- Get Single Data  --------------------------------------------
const hello2: ValidatedEventAPIGatewayProxyEvent<typeof getuserschema> = async (event) => {

  if (!event.pathParameters || !event.pathParameters.ID) {
    // failed without an ID
    return Responses._400({ message: 'missing the ID from the path' });
  }
  let ID = event.pathParameters.ID;
  const tableName = 'usersTabless';

  const user = await Dynamo.get(ID, tableName).catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });
  if (!user) {
    return Responses._404({ message: 'Failed to get user by ID' });
  }
  return Responses._200({ user });

}
export const main2 = middyfy(hello2);


// ------------------------------- Delete Data  --------------------------------------------
const hello3: ValidatedEventAPIGatewayProxyEvent<typeof getalluserschema> = async (event) => {
  if (!event.body || !event.body.ID) {
    // failed without an ID
    return Responses._400({ message: 'missing the ID from the path' });
  }
  let ID: any = event.body.ID;
  const tableName = 'usersTabless';

  const user = await Dynamo.deletedata(ID, tableName).catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });
  if (!user) {
    return Responses._404({ message: 'Failed to get user by ID' });
  }
  return Responses._200({ user });

}
export const main3 = middyfy(hello3);


// ------------------------------- Update Data  --------------------------------------------
const hello4: ValidatedEventAPIGatewayProxyEvent<typeof deleteuserschema> = async (event) => {

  let ID: any = event.body.ID;
  let email: any = event.body.email;
  let password: any = event.body.password;
  const tableName = 'usersTabless';

  const user = await Dynamo.updatedataa({ ID, email, password }, tableName).catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });
  if (!user) {
    return Responses._404({ message: 'Failed to get user by ID' });
  }
  return Responses._200({ user });

}
export const main4 = middyfy(hello4);


// ------------------------------- Get All Data  --------------------------------------------
const hello5: ValidatedEventAPIGatewayProxyEvent<typeof updateuserschema> = async () => {

  const user = await Dynamo.getalldata('usersTabless').catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });
  if (!user) {
    return Responses._404({ message: 'Failed to get user by ID' });
  }

  return formatJSONResponse({ message: user })
}

export const main5 = middyfy(hello5);


// -------------------------------Login User  --------------------------------------------
const hello6: ValidatedEventAPIGatewayProxyEvent<typeof loginuserschema> = async (event) => {

  const userdata = event.body
  const tableName = 'usersTabless';

  const loginuser = await Dynamo.login(userdata, tableName).catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });
  if (!loginuser) {
    return Responses._404({ message: 'User not Found' });
  }


  return Responses._200({ loginuser });
}

export const main6 = middyfy(hello6);



