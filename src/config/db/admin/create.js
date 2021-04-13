const oracledb = require("oracledb");
const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};
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
        let currentDay = `
        ${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}
        `;
        let emBirthday = birthday.split("-").reverse().join("-");
        let exec1 =
            "INSERT INTO NhanVien(MaNV,Ho,Ten,NgaySinh,GioiTinh,SoDT,NgayVaoLam,Email) VALUES (MANV_SEQ3.nextval , :firstName , :lastName , To_Date(:emBirthday,'dd-mm-yyyy') , :gender ,:phone , To_Date(:currentDay,'dd-mm-yyyy'), :email)";
        await conn.execute(
            exec1, {
                firstName,
                lastName,
                emBirthday,
                gender,
                phone,
                currentDay,
                email,
            }, {
                autoCommit: true,
            }
        );
        let exec2 =
            "INSERT INTO TaiKhoan VALUES (MATK_SEQ4.nextval,:password,null,MANV_SEQ3.CURRVAL)";
        await conn.execute(
            exec2, {
                password,
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
    register,
};