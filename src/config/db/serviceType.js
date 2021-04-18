const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
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
        let exec = "SELECT * FROM LOAIDICHVU";
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
        let exec =
            "INSERT INTO LOAIDICHVU(MALDV,TENLOAIDICHVU) VALUES (MALDV_SEQ14.nextval , :name)";
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
async function show(id = -1) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        if (id == -1) {
            let exec = "SELECT * FROM LOAIDICHVU";
            const result = await conn.execute(exec);

            if (conn) {
                await conn.close();
            }
            return result.rows;
        } else {
            let exec = "SELECT * FROM LOAIDICHVU WHERE MALDV =" + id;
            const result = await conn.execute(exec);
            if (conn) {
                await conn.close();
            }
            return result.rows;
        }
    } catch (err) {
        console.log("Ouch!", err);
    }
}
module.exports = { show, showToAdd, add };