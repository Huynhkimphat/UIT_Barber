const oracledb = require("oracledb");
const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};
async function registerForAdmin(
    Password,
    employeeID
) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let execAccount = "INSERT INTO TAIKHOAN VALUES(MATK_SEQ4.NEXTVAL, :Password, null, :employeeID)";
        await conn.execute(
            execAccount, {
                Password,
                employeeID
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
async function login(email) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = `SELECT tk.password,tk.makh,kh.hinhanh FROM KHACHHANG kh, TAIKHOAN tk where kh.makh=tk.makh and kh.Email='${email}'`;
        const result = await conn.execute(exec);
        if (result.rows[0] != null) {
            if (conn) {
                await conn.close();
            }
            return result.rows[0];
        } else {
            let exec = `SELECT tk.password,tk.manv,nv.hinhanh FROM NHANVIEN nv, TAIKHOAN tk where nv.manv=tk.manv and nv.Email='${email}'`;
            const result = await conn.execute(exec);
            if (conn) {
                await conn.close();
            }
            return result.rows[0];
        }

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
        let emBirthday = birthday.split("-").reverse().join("-");
        let exec1 =
            "INSERT INTO KhachHang(MaKH,Ho,Ten,NgaySinh,GioiTinh,SoDT,Email) VALUES (MAKH_SEQ1.nextval , :firstName , :lastName , To_Date(:emBirthday,'dd-mm-yyyy') , :gender ,:phone , :email)";
        await conn.execute(
            exec1, {
                firstName,
                lastName,
                emBirthday,
                gender,
                phone,
                email,
            }, {
                autoCommit: true,
            }
        );
        let exec2 =
            "INSERT INTO TaiKhoan VALUES (MATK_SEQ4.nextval,:password,MAKH_SEQ1.CURRVAL,null)";
        await conn.execute(
            exec2, {
                password,
            }, {
                autoCommit: true,
            }
        );
        let exec3 =
            "INSERT INTO LOAIKHACHHANG(MALKH,MAKH) VALUES(MALKH_SEQ2.nextval,MAKH_SEQ1.CURRVAL)";
        await conn.execute(
            exec3, {}, {
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
    registerForAdmin
};