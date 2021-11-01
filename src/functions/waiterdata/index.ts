import { createwaiterschema, loginwaiterschema, itemschema, orderschema, getallorderschema } from './schema';
import { handlerPath } from '@libs/handlerResolver';

export const createwaiter = {
  handler: `${handlerPath(__dirname)}/handler.waiterregister`,
  events: [
    {
      http: {
        method: 'post',
        path: 'waiter/create',
        request: {
          schema: {
            'application/json': createwaiterschema
          }
        }
      }
    }
  ],

}


export const loginwaiter = {
  handler: `${handlerPath(__dirname)}/handler.waiterlogin`,
  events: [
    {
      http: {
        method: 'post',
        path: 'login-waiter',
        request: {
          schema: {
            'application/json': loginwaiterschema
          }
        }
      }
    }
  ],

}

export const addItems = {
  handler: `${handlerPath(__dirname)}/handler.addfood`,
  events: [
    {
      http: {
        method: 'post',
        path: 'add/food',
        request: {
          schema: {
            'application/json': itemschema
          }
        }
      }
    }
  ],

}

export const order = {
  handler: `${handlerPath(__dirname)}/handler.Order`,
  events: [
    {
      http: {
        method: 'post',
        path: 'add/order',
        request: {
          schema: {
            'application/json': orderschema
          }
        }
      }
    }
  ],

}

export const getallorder = {
  handler: `${handlerPath(__dirname)}/handler.getAllOrder`,
  events: [
    {
      http: {
        method: 'get',
        path: 'get/all/order',
        request: {
          schema: {
            'application/json': getallorderschema
          }
        }
      }
    }
  ],

}





