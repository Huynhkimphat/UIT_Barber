const oracledb = require("oracledb");
const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};
async function show() {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT * FROM GIODAT";
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result.rows;
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function showToAdd() {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT MaDV,TenDichVu FROM DichVu";
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result.rows;
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function add(name,price,describle) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        console.log(name,price,describle)
        let exec = "INSERT INTO DICHVU(MADV,TENDICHVU, GIA, MOTADICHVU) VALUES (MADV_SEQ6.nextval , :name , :price, :describle)";
        await conn.execute(
            exec, {
                name,
                price,
                describle
            }, {
                autoCommit: true,
            }
        );
        if (conn) {
            await conn.close();
        }
    } catch (err) {
        console.log("Ouch!", err);
    }
}
module.exports = {
    show,showToAdd,add
};