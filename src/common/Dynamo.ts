
const AWS = require('aws-sdk');
var jwt = require('jsonwebtoken');

// let options = {};
// if (process.env.IS_OFFLINE) {
let options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
};
// }

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async write(ID, email, password, token, TableName) {
        const params = {
            TableName,
            Item: {
                ID, email, password, token
            }
        };
        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error in table ${TableName}`);
        }

        return params
    },
    // -------------------------------Get Data----------------------------------
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
        }
        // console.log(data);

        return data;
    },
    // -------------------------------DELETE Data----------------------------------
    async deletedata(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };
        const data = await documentClient.delete(params).promise();
        console.log(data)
        return "DELETE DATA"
    },

    // -------------------------------Update Data----------------------------------

    async updatedataa(data: any, TableName) {
        const params = {
            TableName,
            Item: {
                "ID": data.ID,
                "email": data.email,
                "password": data.password
            }
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error in table ${TableName}`);
        }
        return data
    },

    // -------------------------------Get all Data----------------------------------
    async getalldata(TableName) {
        const params = {
            TableName,
        };
        const res = await documentClient.scan(params).promise();
        if (!res) {
            throw Error(`There was in table ${TableName}`);
        }
        return res;
    },

    // ------------------------------- Login User ----------------------------------
    async login(data, TableName) {
        var userArr = [];
        const params = {
            TableName,
            item: userArr
        };

        const userEmail = await documentClient.scan(params).promise();
        for (var i = 0; i < userEmail.Items.length; i++) {
            var dataItem = userEmail.Items[i];
            userArr.push(dataItem)
        }
        var result = userArr.filter((x) => x.email === data.email);
        if (result[0].password === data.password) {
            var token = jwt.sign({ id: result[0].ID }, 'shhhh', { expiresIn: '1m' });

            const params1 = {
                TableName,
                Item: {
                    ID: result[0].ID,
                    email: result[0].email,
                    password: result[0].password,
                    token: token
                }
            }
            const res = await documentClient.put(params1).promise();
            console.log(res)
            return params1
        } else {
            return "wrong Password"
        }

    },

    // ------------------------------- Add Customer Order ------------------------------------

    async order(data: any, TableName) {
        const itemArr = [];

        for (var i = 0; i < data.item.length; i++) {
            var dataItem = data.item[i];
            itemArr.push(dataItem)
        }

        const params = {
            TableName,
            Item: {
                "ID": data.ID,
                "customerId": {
                    "IDD": data.customerId.IDD,
                    "email": data.customerId.email
                },
                "item": itemArr,
                "address": data.name
            }
        };
        console.log(params)
        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error in table ${TableName}`);
        }

        return data
    },

    // ------------------------------- Add Item(Foods) ------------------------------------
    async addItems(Foods, TableName) {
        const params = {
            TableName,
            Item: Foods
        };
        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error in table ${TableName}`);
        }

        return params
    },


};
export default Dynamo
// module.exports = Dynamo;

// { FullName: { $regex: new RegExp(fullName.FullName, 'i') } }


