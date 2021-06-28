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
        ////delete HoaDon
        let exec = "UPDATE HOADON SET TINHTRANG = 0, TONGTIEN = 0\n "+
                    "WHERE MAHD = (\n" +
                    "SELECT DISTINCT MAHD FROM CTHDDV\n"+
                    "WHERE MADL in (\n" +
                    "SELECT MADL FROM DATLICH \n"+   
                        "WHERE   MAKH = (SELECT MAKH FROM DATLICH WHERE MADL = :id) \n"+
                            "AND     NGAY = (SELECT NGAY FROM DATLICH WHERE MADL = :id)\n"+
                            "AND     MANV = (SELECT MANV FROM DATLICH WHERE MADL = :id) \n"+
                            "AND     MAGIO = (SELECT MAGIO FROM DATLICH WHERE MADL = :id)\n"+
                        ")\n" +
                    ")";
        await conn.execute(
            exec,{
                    id,
            }, {
                autoCommit: true,
            }
        );
        //// delete datlich
        exec = "UPDATE DATLICH SET TINHTRANG = 0 "+
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
        //// delete CTHDDV
        exec = "DELETE FROM CTHDDV\n"+
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
async function add(customer,lstService, date, time, employee,money) {
    let conn;
    try {
        let day = date.split("/").join("-");
        let i;
        let service;
        conn = await oracledb.getConnection(config);
        let execHD = "INSERT INTO HOADON(MAHD, MAKH, NGAY, TONGTIEN, THANHTOAN) VALUES(MAHD_SEQ11.NEXTVAL,:customer,To_Date(:day,'dd-mm-yyyy'),:money,0)"
        await conn.execute(
            execHD,{
                day,
                money,
                customer,
            },{
                autoCommit: true,
            }
        );
        /// add into DatLich
        for (i = 0;i < lstService.length; i++){
            service = lstService[i];
            let execDL ="INSERT INTO DATLICH(MADL,Ngay,MaGio,MaKH,MaNV,MaDV) VALUES (MADL_SEQ10.nextval , To_Date(:day,'dd-mm-yyyy') , :time , :customer , :employee , :service)";
            let execCTHDDV = "INSERT INTO CTHDDV(MAHD,MADV,MADL) VALUES(MAHD_SEQ11.CURRVAL,:service,MADL_SEQ10.CURRVAL)";
            await conn.execute(
                execDL,{
                    day,
                    time,
                    customer,
                    employee,
                    service,
                },{
                    autoCommit: true,
                }
            );
            await conn.execute(
                execCTHDDV,{
                    service
                },{
                    autoCommit: true,
                }
            )
        }
        if (conn) {
            await conn.close();
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
                    "SELECT dl.madl, EXTRACT(YEAR FROM dl.ngay) AS YEAR,EXTRACT(MONTH FROM dl.ngay) AS MONTH,EXTRACT(DAY FROM dl.ngay) AS DAY, dl.magio, gd.khunggio, kh.ho, dl.manv, kh.ten, nv.ho, nv.ten FROM DATLICH dl,KHACHHANG kh,NHANVIEN nv,GIODAT gd,DICHVU dv \n" +
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
            if (process.env.status == 2){
                let exec =
                "SELECT dl.madl, EXTRACT(YEAR FROM dl.ngay) AS YEAR,EXTRACT(MONTH FROM dl.ngay) AS MONTH,EXTRACT(DAY FROM dl.ngay) AS DAY, dl.magio,gd.khunggio, kh.ho, kh.ten, dl.manv, nv.ho, nv.ten FROM DATLICH dl,KHACHHANG kh,NHANVIEN nv,GIODAT gd,DICHVU dv \n" +
                    "WHERE dl.MANV=nv.MANV \n" +
                    "AND dl.MAKH=kh.MAKH \n" +
                    "AND dl.MAGIO=gd.MAGIO \n" +
                    "AND dl.MADV=dv.MADV\n" +
                    "AND dl.MANV= :id \n" +
                    "AND dl.TINHTRANG = 1\n" +
                    "ORDER BY YEAR DESC,MONTH DESC,DAY DESC,KHUNGGIO DESC";
                    let result = await conn.execute(
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
            } else{
                let exec =
                    "SELECT dl.madl, EXTRACT(YEAR FROM dl.ngay) AS YEAR,EXTRACT(MONTH FROM dl.ngay) AS MONTH,EXTRACT(DAY FROM dl.ngay) AS DAY, dl.magio,gd.khunggio, kh.ho, kh.ten, dl.manv, nv.ho, nv.ten FROM DATLICH dl,KHACHHANG kh,NHANVIEN nv,GIODAT gd,DICHVU dv \n" +
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
                if (conn) {
                    await conn.close();
                }
                return result.rows;
            }
            // result = formatDate(result);
            
        }
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function getDetail(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT KHACHHANG.TEN,KHACHHANG.MAKH,KHACHHANG.HO,EXTRACT(YEAR FROM DATLICH.NGAY) AS YEAR,EXTRACT(MONTH FROM DATLICH.NGAY) AS MONTH,EXTRACT(DAY FROM DATLICH.NGAY) AS DAY, TO_CHAR(NGAY,'dd/mm/yyyy') AS NGAY,DATLICH.MANV, DATLICH.MAGIO, GIODAT.KHUNGGIO, DATLICH.MADL, NHANVIEN.TEN, NHANVIEN.HO FROM KHACHHANG,GIODAT,DATLICH,NHANVIEN WHERE   KHACHHANG.MAKH =    ( SELECT MAKH FROM DATLICH WHERE MADL = :id ) and GIODAT.MAGIO = ( SELECT MAGIO FROM DATLICH WHERE MADL = :id)and NHANVIEN.MANV =(SELECT MANV FROM DATLICH WHERE MADL = :id ) and DATLICH.MADL = :id";
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
module.exports = { show, destroy, add, showToAdd, getDetail};
