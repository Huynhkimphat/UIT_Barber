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
        let exec = "UPDATE HOADON SET TINHTRANG = 0 WHERE MAHD = :id";
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
async function show(id = -1) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        if (id == -1) {
            if (process.env.status != 3) {
                let exec =
                    "SELECT MAHD,MAKH,KHUYENMAI,TONGTIEN,TINHTRANG FROM HOADON WHERE TINHTRANG = 1";
                const result = await conn.execute(exec);
                if (conn) {
                    await conn.close();
                }
                return result.rows;
            } else {
                let exec =
                    "SELECT MAHD,MAKH,KHUYENMAI,TONGTIEN,TINHTRANG FROM HOADON";
                const result = await conn.execute(exec);
                if (conn) {
                    await conn.close();
                }
                return result.rows;
            }
        } else {
            let exec =
                "SELECT MAHD,MAKH,KHUYENMAI,TONGTIEN,TINHTRANG FROM HOADON WHERE TINHTRANG = 1 AND MAHD =" +
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
            "SELECT CTHDDV.MADV, TENDICHVU, GIA, HINHANH, TINHTRANG FROM DICHVU, CTHDDV WHERE CTHDDV.MAHD =" +
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

module.exports = { show, destroy, viewProducts, viewServices };