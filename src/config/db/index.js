const oracledb = require("oracledb");

const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};

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
        let exec = `SELECT tk.password FROM NHANVIEN nv, TAIKHOAN tk where nv.manv=tk.manv and nv.Email='${email}'`;
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result.rows[0][0];
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
        $ { date.getDate() } - $ {
            date.getMonth() + 1
        } - $ { date.getFullYear() }
        `;
        let emBirthday = birthday.split("-").reverse().join("-");
        let exec1 =
            "INSERT INTO NhanVien(MaNV,Ho,Ten,NgaySinh,GioiTinh,SoDT,NgayVaoLam,Email) VALUES (MANV_SEQ3.nextval , :firstName , :lastName , To_Date(:emBirthday,'dd-mm-yyyy') , :gender ,:phone , To_Date(:currentDay,'dd-mm-yyyy'), :email)";
        await conn.execute(
            exec1,
            {
                firstName,
                lastName,
                emBirthday,
                gender,
                phone,
                currentDay,
                email,
            },
            {
                autoCommit: true,
            }
        );
        let exec2 =
            "INSERT INTO TaiKhoan VALUES (MATK_SEQ4.nextval,:password,null,MANV_SEQ3.CURRVAL)";
        await conn.execute(
            exec2,
            {
                password,
            },
            {
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

async function destroy(type, condition) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "DELETE FROM " + type + " WHERE MaDL = :condition ";
        await conn.execute(
            exec,
            {
                condition,
            },
            {
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
async function showBooking() {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "SELECT * FROM DATLICH,KHACHHANG,NHANVIEN,GIODAT,DICHVU \n" +
            "WHERE DATLICH.MANV=NHANVIEN.MANV \n" +
            "AND DATLICH.MAKH=KHACHHANG.MAKH \n" +
            "AND DATLICH.MAGIO=GIODAT.MAGIO \n" +
            "AND DATLICH.MADV=DichVu.MADV";
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
        let bookingDate = date.split("-").reverse().join("-");
        console.log(bookingDate);
        conn = await oracledb.getConnection(config);
        let exec =
            "INSERT INTO DATLICH VALUES (MADL_SEQ10.nextval , To_Date(:bookingDate,'dd-mm-yyyy') , 1 , 1 , 1 ,1)";
        await conn.execute(
            exec,
            {
                bookingDate,
            },
            {
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
    connect,
    login,
    register,
    showBooking,
    show,
    addBooking,
    destroy,
};
