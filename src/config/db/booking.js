const oracledb = require("oracledb");
const { formatDate } = require("../../utils/formatDate");
const dotenv = require("dotenv");
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
        let exec = "UPDATE DATLICH SET WHERE MADL = :id";
        await conn.execute(
            exec, {
                id,
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
        let day = date.split("/").join("-");
        let customer = process.env.id;
        console.log(day, time, employee, service);
        let exec =
            "INSERT INTO DATLICH(MADL,Ngay,MaGio,MaKH,MaNV,MaDV) VALUES (MANV_SEQ3.nextval , To_Date(:day,'dd-mm-yyyy') , :time , :customer , :employee , :service)";
        await conn.execute(
            exec, {
                day,
                time,
                customer,
                employee,
                service,
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
            let temp = formatDate(result);
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
            let result = await conn.execute(exec);
            result = formatDate(result);
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