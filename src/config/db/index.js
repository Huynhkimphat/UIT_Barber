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
async function register(
    email,
    password,
    firstName,
    lastName,
    birthday,
    gender,
    phone
) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let date = new Date();
        let currentDay = `${date.getDate()}-${
            date.getMonth() + 1
        }-${date.getFullYear()}`;
        // birthday.split("-").reverse().join("-")
        let exec1 = `INSERT INTO NhanVien(MaNV,Ho,Ten,NgaySinh,GioiTinh,SoDT,NgayVaoLam) VALUES (
            MANV_SEQ3.nextval,'${firstName}','${lastName}',to_date('${birthday
            .split("-")
            .reverse()
            .join(
                "-"
            )}','dd-mm-yyyy'),'${gender}','${phone}',To_Date('${currentDay}','dd-mm-yyyy'));`;
        let exec2 = `INSERT INTO TaiKhoan VALUES (
                MATK_SEQ4.nextval,'${email}','${password}',null,MANV_SEQ3.CURRVAL);`;
        console.log(exec1);
        console.log(exec2);
        // await conn.execute(exec1);
        // await conn.execute(exec2);
        if (conn) {
            await conn.close();
        }
    } catch (err) {
        console.log("Ouch!", err);
    }
}
module.exports = { connect, login, register };