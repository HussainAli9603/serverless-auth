export const createuserschema = {
  type: "object",
  properties: {
    ID: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    token: { type: 'string' },
  },
  required: ['ID', "email", "password"]
} as const;

export const getuserschema = {
  type: "object",
  properties: {
    ID: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['ID']
} as const;


export const getalluserschema = {
  type: "object",
  properties: {
    ID: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['ID', "email", "password"]
} as const;


export const deleteuserschema = {
  type: "object",
  properties: {
    ID: { type: 'string' }
  },
  required: ['ID']
} as const;


export const updateuserschema = {
  type: "object",
  properties: {
    ID: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['ID', "email", "password"]
} as const;

export const loginuserschema = {
  type: "object",
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ["email", "password"]
} as const;

