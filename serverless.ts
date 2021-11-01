import type { AWS } from '@serverless/typescript';

import { createuser, getuser, getalluser, deleteuser, updateuser, loginuser, } from '@functions/userdata';
import { createwaiter, loginwaiter, addItems, order, getallorder } from '@functions/waiterdata';
import { authoriserAnyToken } from '@functions/authorizer'
const serverlessConfiguration: AWS = {
  service: 'typescriptserverless',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
    dynamodb: {
      stages: [
        "dev"
      ],
      start: {
        port: 8000,
        inMemory: true,
        heapInitial: "200m",
        heapMax: "1g",
        migrate: true,
        seed: true,
        convertEmptyValues: true
      }
    }

  },
  plugins: [
    'serverless-esbuild',
    "serverless-dynamodb-local",
    "serverless-offline"
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { createuser, getuser, getalluser, deleteuser, updateuser, loginuser, createwaiter, loginwaiter, addItems, order, getallorder, authoriserAnyToken },
  resources: {
    Resources: {
      usersTabless: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "usersTabless",
          AttributeDefinitions: [
            {
              AttributeName: "ID",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "ID",
              KeyType: "HASH"
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      },
      TokenTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "tokenTableName",
          AttributeDefinitions: [
            {
              AttributeName: "ID",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "ID",
              KeyType: "HASH"
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      },
      waiterTabless: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "waiterTabless",
          AttributeDefinitions: [
            {
              AttributeName: "ID",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "ID",
              KeyType: "HASH"
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      },
      itemTabless: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "itemTabless",
          AttributeDefinitions: [
            {
              AttributeName: "ID",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "ID",
              KeyType: "HASH"
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      },
      orderTabless: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "orderTabless",
          AttributeDefinitions: [
            {
              AttributeName: "ID",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "ID",
              KeyType: "HASH"
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
