import { createuserschema, getuserschema, getalluserschema, deleteuserschema, updateuserschema, loginuserschema } from './schema';
import { handlerPath } from '@libs/handlerResolver';




export const createuser = {
  handler: `${handlerPath(__dirname)}/handler.main1`,
  events: [
    {
      http: {
        method: 'post',
        path: 'create',
        request: {
          schema: {
            'application/json': createuserschema
          }
        }

      }
    }
  ],

}

export const getuser = {
  handler: `${handlerPath(__dirname)}/handler.main2`,
  events: [
    {
      http: {
        method: 'get',
        path: 'get-data/{ID}',
        authorizer: "authoriserAnyToken",
        request: {
          schema: {
            'application/json': getuserschema
          }
        },

      }
    }
  ],

}


export const getalluser = {
  handler: `${handlerPath(__dirname)}/handler.main5`,
  events: [
    {
      http: {
        method: 'get',
        path: 'get-data-all',
        request: {
          schema: {
            'application/json': getalluserschema
          }
        }
      }
    }
  ],

}

export const deleteuser = {
  handler: `${handlerPath(__dirname)}/handler.main3`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'delete-data',
        authorizer: "authoriserAnyToken",
        request: {
          schema: {
            'application/json': deleteuserschema
          }
        }
      }
    }
  ],

}
export const updateuser = {
  handler: `${handlerPath(__dirname)}/handler.main4`,
  events: [
    {
      http: {
        method: 'put',
        path: 'update-data',
        request: {
          schema: {
            'application/json': updateuserschema
          }
        }
      }
    }
  ],

}

export const loginuser = {
  handler: `${handlerPath(__dirname)}/handler.main6`,
  events: [
    {
      http: {
        method: 'post',
        path: 'login-user',
        request: {
          schema: {
            'application/json': loginuserschema
          }
        }
      }
    }
  ],

}





