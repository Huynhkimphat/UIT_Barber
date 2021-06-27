const oracledb = require("oracledb");

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
        let exec =
            "UPDATE HOADON SET TINHTRANG = 0, ,TONGTIEN = 0 WHERE MAHD = :id";
        await conn.execute(
            exec,
            {
                id,
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
async function show(id = -1) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        if (id == -1) {
            if (process.env.status == 1) {
                let exec =
                    "SELECT MAHD,MAKH,KHUYENMAI,TONGTIEN,THANHTOAN FROM HOADON";
                const result = await conn.execute(exec);
                if (conn) {
                    await conn.close();
                }
                return result.rows;
            } else {
                let exec =
                    "SELECT MAHD,MAKH,KHUYENMAI,TONGTIEN,THANHTOAN FROM HOADON";
                const result = await conn.execute(exec);
                if (conn) {
                    await conn.close();
                }
                return result.rows;
            }
        } else {
            let exec =
                "SELECT MAHD,MAKH,KHUYENMAI,TONGTIEN,THANHTOAN FROM HOADON WHERE MAKH =" +
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
async function viewProducts(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "SELECT CTHDSP.MASP, CTHDSP.SOLUONG, TENSANPHAM, GIA, MOTASANPHAM, XUATXU, HINHANH FROM SANPHAM, CTHDSP WHERE SANPHAM.MASP = CTHDSP.MASP AND CTHDSP.MAHD =" +
            id;
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result.rows;
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function viewServices(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "SELECT CTHDDV.MADV, DICHVU.TENDICHVU, DICHVU.GIA, DICHVU.HINHANH FROM DICHVU, CTHDDV \n" +
            "WHERE CTHDDV.MAHD =:id AND DICHVU.MADV = CTHDDV.MADV";
        const result = await conn.execute(
            exec,
            {
                id,
            },
            {
                autoCommit: true,
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
async function add(customer, money, date) {
    let conn;
    try {
        // conn = await oracledb.getConnection(config);
        let day = date.split("/").join("-");
        conn = await oracledb.getConnection(config);
        let exec =
            "INSERT INTO HOADON(MAHD, MAKH, NGAY, TONGTIEN, THANHTOAN) VALUES(MAHD_SEQ11.NEXTVAL,:customer,To_Date(:day,'dd-mm-yyyy'),:money,0)";
        await conn.execute(
            exec,
            {
                day,
                money,
                customer,
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
async function checkout(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "UPDATE HOADON SET THANHTOAN = 1 WHERE MAHD = :id";
        const result = await conn.execute(
            exec,
            {
                id,
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
module.exports = { show, destroy, viewProducts, viewServices, add };
