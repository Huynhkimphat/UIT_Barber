const oracledb = require("oracledb");
const dotenv = require("dotenv");
const e = require("express");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};
async function destroy(type, condition) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "DELETE FROM " + type + " WHERE MADGNV = :condition ";
        await conn.execute(
            exec, {
                condition,
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
async function add(date, time, employee, service) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        // let bookingDate = new Date(date)
        // console.log(bookingDate);
        let day = date.split('/').join('-');
        console.log(day, time, employee, service);
        let exec = "INSERT INTO DATLICH(MADL,Ngay,MaGio,MaKH,MaNV,MaDV) VALUES (MANV_SEQ3.nextval , To_Date(:day,'dd-mm-yyyy') , :time , 2 , :employee , :service)";
        await conn.execute(
            exec, {
                day,
                time,
                employee,
                service
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
            let exec =
                "SELECT dl.madl, dl.ngay,gd.khunggio, kh.ho, kh.ten, nv.ho, nv.ten, dv.tendichvu, dv.gia FROM DATLICH dl,KHACHHANG kh,NHANVIEN nv,GIODAT gd,DICHVU dv \n" +
                "WHERE dl.MANV=nv.MANV \n" +
                "AND dl.MAKH=kh.MAKH \n" +
                "AND dl.MAGIO=gd.MAGIO \n" +
                "AND dl.MADV=dv.MADV";
            const result = await conn.execute(exec);
            if (conn) {
                await conn.close();
            }
            return result.rows;
        } else {
            let exec =
                "SELECT dl.madl, dl.ngay,gd.khunggio, kh.ho, kh.ten, nv.ho, nv.ten, dv.tendichvu, dv.gia FROM DATLICH dl,KHACHHANG kh,NHANVIEN nv,GIODAT gd,DICHVU dv \n" +
                "WHERE dl.MANV=nv.MANV \n" +
                "AND dl.MAKH=kh.MAKH \n" +
                "AND dl.MAGIO=gd.MAGIO \n" +
                "AND dl.MADV=dv.MADV\n" +
                "AND dl.MADL=" +
                id;
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

module.exports = { show, destroy, add };