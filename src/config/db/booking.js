const oracledb = require("oracledb");
const { formatDate } = require("../../utils/formatDate");
const dotenv = require("dotenv");
const { compare } = require("bcrypt");
dotenv.config();
const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};

async function destroy(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "UPDATE DATLICH SET TINHTRANG = 0 "+
                    "WHERE MADL in ( " +
                    "SELECT MADL FROM DATLICH " +
                    "WHERE   MAKH = (SELECT MAKH FROM DATLICH WHERE MADL = :id) " +
                    "AND     NGAY = (SELECT NGAY FROM DATLICH WHERE MADL = :id) " +
                    "AND     MANV = (SELECT MANV FROM DATLICH WHERE MADL = :id) " +
                    "AND     MAGIO = (SELECT MAGIO FROM DATLICH WHERE MADL = :id) " +
                    ")";
        await conn.execute(
            exec,{
                id,
            },{
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
async function add(lstService, date, time, employee,) {
    let conn;
    try {
        // conn = await oracledb.getConnection(config);
        let day = date.split("/").join("-");
        let customer = process.env.id;
        let i;
        let service;
        for (i = 0;i < lstService.length; i++){
            conn = await oracledb.getConnection(config);
            service = lstService[i];
            let exec =
                "INSERT INTO DATLICH(MADL,Ngay,MaGio,MaKH,MaNV,MaDV) VALUES (MANV_SEQ3.nextval , To_Date(:day,'dd-mm-yyyy') , :time , :customer , :employee , :service)";
            await conn.execute(
                exec,
                {
                    day,
                    time,
                    customer,
                    employee,
                    service,
                },
                {
                    autoCommit: true,
                }
            );
            if (conn) {
                await conn.close();
            }
        }
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function showToAdd() {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT MANV,MAGIO FROM DatLich";
        const result = await conn.execute(exec);

        if (conn) {
            await conn.close();
        }
        return result.rows;
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
                    "SELECT dl.madl, EXTRACT(YEAR FROM dl.ngay) AS YEAR,EXTRACT(MONTH FROM dl.ngay) AS MONTH,EXTRACT(DAY FROM dl.ngay) AS DAY, dl.magio, gd.khunggio, kh.ho, kh.ten, nv.ho, nv.ten FROM DATLICH dl,KHACHHANG kh,NHANVIEN nv,GIODAT gd,DICHVU dv \n" +
                    "WHERE dl.MANV=nv.MANV \n" +
                    "AND dl.MAKH=kh.MAKH \n" +
                    "AND dl.MAGIO=gd.MAGIO \n" +
                    "AND dl.MADV=dv.MADV\n" +
                    "AND dl.TINHTRANG = 1\n" +
                    "ORDER BY YEAR DESC,MONTH DESC,DAY DESC,KHUNGGIO DESC";
                const result = await conn.execute(exec);
                // result = formatDate(result);
                if (conn) {
                    await conn.close();
                }
                return result.rows;
        } else {
            let exec =
                "SELECT dl.madl, EXTRACT(YEAR FROM dl.ngay) AS YEAR,EXTRACT(MONTH FROM dl.ngay) AS MONTH,EXTRACT(DAY FROM dl.ngay) AS DAY, dl.magio,gd.khunggio, kh.ho, kh.ten, nv.ho, nv.ten FROM DATLICH dl,KHACHHANG kh,NHANVIEN nv,GIODAT gd,DICHVU dv \n" +
                "WHERE dl.MANV=nv.MANV \n" +
                "AND dl.MAKH=kh.MAKH \n" +
                "AND dl.MAGIO=gd.MAGIO \n" +
                "AND dl.MADV=dv.MADV\n" +
                "AND dl.MAKH= :id \n" +
                "AND dl.TINHTRANG = 1\n" +
                "ORDER BY YEAR DESC,MONTH DESC,DAY DESC,KHUNGGIO DESC";
            let result = await conn.execute(
                exec, {
                    id,
                },{
                    autoCommit:true,
                }
            );   
            // result = formatDate(result);
            if (conn) {
                await conn.close();
            }
            return result.rows;
        }
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function showDetail(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT KHACHHANG.TEN,KHACHHANG.HO,EXTRACT(YEAR FROM DATLICH.NGAY) AS YEAR,EXTRACT(MONTH FROM DATLICH.NGAY) AS MONTH,EXTRACT(DAY FROM DATLICH.NGAY) AS DAY, GIODAT.KHUNGGIO, DATLICH.MADL, NHANVIEN.TEN, NHANVIEN.HO FROM KHACHHANG,GIODAT,DATLICH,NHANVIEN WHERE   KHACHHANG.MAKH =    ( SELECT MAKH FROM DATLICH WHERE MADL = :id ) and GIODAT.MAGIO = ( SELECT MAGIO FROM DATLICH WHERE MADL = :id)and NHANVIEN.MANV =(SELECT MANV FROM DATLICH WHERE MADL = :id ) and DATLICH.MADL = :id";
        const result = await conn.execute(
            exec, {
                id,
            },{
                autoCommit:true,
            }
        );
        if (conn) {
            await conn.close();
        }
        return result.rows;
    } catch (err) {
        console.log("Ouch!", err);
    }
}
module.exports = { show, destroy, add, showToAdd, showDetail};
