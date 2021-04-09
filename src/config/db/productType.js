const oracledb = require("oracledb");
const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};
async function showToAdd() {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT * FROM LOAISANPHAM";
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result.rows;
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function add(name) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "INSERT INTO LOAISANPHAM(MALSP,TENLOAISANPHAM) VALUES (MALSP_SEQ7.nextval , :name)";
        await conn.execute(
            exec, {
                name,
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
    add,showToAdd
};