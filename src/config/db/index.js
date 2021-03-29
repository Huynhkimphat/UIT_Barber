const oracledb = require("oracledb");

const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};

// const config = {
//     user: "system",
//     password: "Kimphat2001",
//     connectString: "localhost:1521/Project",
// };
async function connect() {
    try {
        await oracledb.getConnection(config);
        console.log("Connect successfully");
    } catch (err) {
        console.log("Connect failed!!!");
    }
}
async function login(email) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = `select * from TaiKhoan where TaiKhoan.Email = '${email}'`;
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result.rows[0][2];
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
        let emBirthday = birthday.split("-").reverse().join("-");
        let exec1 =
            "INSERT INTO NhanVien(MaNV,Ho,Ten,NgaySinh,GioiTinh,SoDT,NgayVaoLam) VALUES (MANV_SEQ3.nextval , :firstName , :lastName , To_Date(:emBirthday,'dd-mm-yyyy') , :gender ,:phone , To_Date(:currentDay,'dd-mm-yyyy'))";
        await conn.execute(
            exec1, {
                firstName,
                lastName,
                emBirthday,
                gender,
                phone,
                currentDay,
            }, {
                autoCommit: true,
            }
        );
        let exec2 =
            "INSERT INTO TaiKhoan VALUES (MATK_SEQ4.nextval,:email,:password,null,MANV_SEQ3.CURRVAL)";
        await conn.execute(
            exec2, {
                email,
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

async function showBooking() {
    let conn;
    try {
        conn = await oracledb.getConnection(config); <<
        <<
        << < HEAD
        let exec = "SELECT * FROM SANPHAM"; ===
        ===
        =
        let exec = "SELECT * FROM DATLICH,KHACHHANG,NHANVIEN,GIODAT,DICHVU \n" +
            "WHERE DATLICH.MANV=NHANVIEN.MANV \n" +
            "AND DATLICH.MAKH=KHACHHANG.MAKH \n" +
            "AND DATLICH.MAGIO=GIODAT.MAGIO \n" +
            "AND DATLICH.MADV=DichVu.MADV"; >>>
        >>>
        > master
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result;
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function addBooking(date) {
    let conn;
    try {
        console.log(date);
        let bookingDate = date.split('-').reverse().join('-');
        console.log(bookingDate);
        conn = await oracledb.getConnection(config);
        let exec =
            "INSERT INTO DATLICH VALUES (MADL_SEQ10.nextval , To_Date(:bookingDate,'dd-mm-yyyy') , 1 , 1 , 1 ,1)";
        await conn.execute(
            exec, {
                bookingDate
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
module.exports = { connect, login, register, showBooking, show, addBooking };