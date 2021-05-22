const oracledb = require("oracledb");
const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};
async function destroy(id) {
    // let conn;
    // try {
    //     conn = await oracledb.getConnection(config);
    //     let exec = "UPDATE TAIKHOAN WHERE MATK = :id";
    //     await conn.execute(
    //         exec, {
    //             id,
    //         }, {
    //             autoCommit: true,
    //         }
    //     );
    //     if (conn) {
    //         await conn.close();
    //     }
    // } catch (err) {
    //     console.log("Ouch!", err);
    // }
}
async function show(id = -1) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        if (id == -1) {
            let exec = "SELECT * FROM TAIKHOAN";
            const result = await conn.execute(exec);
            if (conn) {
                await conn.close();
            }
            return result.rows;
        } else {
            let exec = "SELECT * FROM TAIKHOAN WHERE MATK =" + id;
            const result = await conn.execute(exec);
            let temp = formatDate(result);
            if (conn) {
                await conn.close();
            }
            return result.rows;
        }
    } catch (err) {
        console.log("Ouch!", err);
    }
}

module.exports = { show };