const oracledb = require("oracledb");
const config = {
    user: "system",
    password: "Kimphat2001",
    connectString: "localhost:1521/Project",
};

async function connect() {
    try {
        await oracledb.getConnection(config);
        console.log("Connect successfully");
    } catch (err) {
        console.log("Connect failed!!!");
    }
}
async function login(email, password) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = `select * from TaiKhoan where TaiKhoan.Email = '${email}'`;
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        if (result) {
            if (result.rows[0][2] === password) return true;
        }
        return false;
    } catch (err) {
        console.log("Ouch!", err);
    }
}
module.exports = { connect, login };