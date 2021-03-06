const oracledb = require("oracledb");
const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};

async function login(email) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = `SELECT tk.password FROM NHANVIEN nv, TAIKHOAN tk where nv.manv=tk.manv and nv.Email='${email}' and nv.LoaiNhanVien='Admin'`;
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result.rows[0].PASSWORD;
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
        let currentDay = `
        ${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}
        `;
        let admin = "Admin";
        let emBirthday = birthday.split("-").reverse().join("-");
        let exec1 =
            "INSERT INTO NhanVien(MaNV,Ho,Ten,NgaySinh,GioiTinh,SoDT,NgayVaoLam,LoaiNhanVien,Email) VALUES (MANV_SEQ3.nextval , :firstName , :lastName , To_Date(:emBirthday,'dd-mm-yyyy') , :gender ,:phone , To_Date(:currentDay,'dd-mm-yyyy'),:admin, :email)";
        await conn.execute(
            exec1, {
                firstName,
                lastName,
                emBirthday,
                gender,
                phone,
                currentDay,
                admin,
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
    login,
    register,
};