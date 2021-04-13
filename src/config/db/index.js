const oracledb = require("oracledb");
const dotenv = require("dotenv");
const adminAuthenticate = require("./admin/adminAuthenticate");
const create = require("./admin/create");
const authenticate = require("./authenticate");
const booking = require("./booking");
const service = require("./service");
const product = require("./product");
const employee = require("./employee");
const customer = require("./customer");
const productType = require("./productType");
const bill = require("./bill");
const customerRating = require("./customerRating");
const time = require("./time");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};

async function connect() {
    try {
        await oracledb.getConnection(config);
        console.log("Connect successfully");
    } catch (err) {
        console.log("Connect failed!!!");
    }
}

module.exports = {
    connect,
    adminAuthenticate,
    create,
    authenticate,
    booking,
    service,
    product,
    employee,
    customer,
    productType,
    bill,
    customerRating,
    time,
};