import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
// import { Handler } from 'aws-lambda';
const Responses = require('../../common/API_Responses');

import Dynamo from "../../common/Dynamo"

import { loginwaiterschema, createwaiterschema, itemschema, orderschema, getallorderschema } from './schema';

// -------------------------------Register Waiter  --------------------------------------------

const hello1: ValidatedEventAPIGatewayProxyEvent<typeof createwaiterschema> = async (event) => {
  const ID: any = event.body.ID;
  const email: any = event.body.email;
  const password: any = event.body.password;
  const token: any = "";
  const tableName = 'waiterTabless';

  const newUser = await Dynamo.write(ID, email, password, tableName, token).catch(err => {
    console.log('error in dynamo write', err);
    return null;
  });

  if (!newUser) {
    return Responses._400({ message: 'Failed to write Create user' });
  }

  return Responses._200({ newUser });

}
export const waiterregister = middyfy(hello1);


// -------------------------------Login User  --------------------------------------------
const hello2: ValidatedEventAPIGatewayProxyEvent<typeof loginwaiterschema> = async (event) => {


  const userdata = event.body
  const tableName = 'waiterTabless';

  const loginuser = await Dynamo.login(userdata, tableName).catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });
  if (!loginuser) {
    return Responses._404({ message: 'User not Found' });
  }


  return Responses._200({ loginuser });
}



export const waiterlogin = middyfy(hello2);

// ------------------------------- Order  --------------------------------------------
const hello3: ValidatedEventAPIGatewayProxyEvent<typeof orderschema> = async (event) => {


  const orderdata = event.body
  const tableName = 'orderTabless';
  console.log(event.body)
  const customerorder = await Dynamo.order(orderdata, tableName).catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });
  if (!customerorder) {
    return Responses._404({ message: 'Error Order body' });
  }


  return Responses._200({ customerorder });
}

export const Order = middyfy(hello3);

// ------------------------------- Add Items  --------------------------------------------

const hello4: ValidatedEventAPIGatewayProxyEvent<typeof itemschema> = async (event) => {
  const item: any = event.body;
  const tableName = 'itemTabless';

  const newItem = await Dynamo.addItems(item, tableName).catch(err => {
    console.log('error in dynamo write', err);
    return null;
  });

  if (!newItem) {
    return Responses._400({ message: 'Error Add Items' });
  }

  return Responses._200({ newItem });

}
export const addfood = middyfy(hello4);

// ------------------------------- Get All Data  --------------------------------------------
const hello5: ValidatedEventAPIGatewayProxyEvent<typeof getallorderschema> = async () => {

  const user = await Dynamo.getalldata('orderTabless').catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });
  if (!user) {
    return Responses._404({ message: 'Failed to get all Order' });
  }

  return formatJSONResponse({ GetallOrders: user })
}

export const getAllOrder = middyfy(hello5);



