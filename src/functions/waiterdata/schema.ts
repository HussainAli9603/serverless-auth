export const createwaiterschema = {
  type: "object",
  properties: {
    ID: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ["ID", "email", "password"]
} as const;


export const loginwaiterschema = {
  type: "object",
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ["email", "password"]
} as const;

export const itemschema = {
  type: "object",
  properties: {
    ID: { type: 'string' },
    name: { type: 'string' },
    price: { type: 'string' },
  },
  required: ["ID", "name", "price"]
} as const;

export const orderschema = {
  type: "object",
  properties: {
    ID: { type: 'string' },
    customerId: {
      ID: 'string',
      email: 'string',
    },
    item: [{
      ID: 'string',
      name: 'string',
      price: 'string'
    }],
    address: { type: 'string' },

  },
  required: ["ID", "customerId", "item", "address"]
} as const;

export const getallorderschema = {
  type: "object",
  properties: {
    ID: { type: 'string' },
    customerId: {
      IDD: 'string',
      email: 'string',
    },
    item: [{
      IDDD: 'string',
      name: 'string',
      price: 'string'
    }],
    address: { type: 'string' },

  },
  required: ["ID", "IDD", "email", "IDDD", "name", "price", "item", "address"]
} as const;
