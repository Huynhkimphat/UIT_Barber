const oracledb = require("oracledb");
const dotenv = require("dotenv");
const authenticate = require("./authenticate");
const booking = require("./booking");
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
async function show(type, condition) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT * FROM " + type;
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result;
    } catch (err) {
        console.log("Ouch!", err);
    }
}

module.exports = {
    connect,
    authenticate,
    booking,
    time,
};