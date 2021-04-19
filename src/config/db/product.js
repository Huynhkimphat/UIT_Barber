const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};
async function add(name, price, describe, country, img, count, typeProduct) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "INSERT INTO SANPHAM(MASP,TENSANPHAM, GIA, MOTASANPHAM, XUATXU , HINHANH, SOLUONG , MALSP) VALUES (MASP_SEQ8.nextval , :name , :price, :describe, :country , :img, :count, :typeProduct)";
        await conn.execute(
            exec, {
                img,
                name,
                price,
                country,
                count,
                typeProduct,
                describe,
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
async function destroy(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "UPDATE SANPHAM SET TINHTRANG = 0 WHERE MASP = :id";
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
                    "SELECT MASP, TENSANPHAM, GIA, MOTASANPHAM, XUATXU, HINHANH, SANPHAM.TINHTRANG, SOLUONG, SANPHAM.MALSP, LOAISANPHAM.TENLOAISANPHAM FROM SANPHAM, LOAISANPHAM WHERE SANPHAM.TINHTRANG = 1 AND SANPHAM.MALSP = LOAISANPHAM.MALSP";
                const result = await conn.execute(exec);
                if (conn) {
                    await conn.close();
                }
                return result.rows;
            } else {
                let exec =
                    "SELECT MASP, TENSANPHAM, GIA, MOTASANPHAM, XUATXU, HINHANH, SANPHAM.TINHTRANG, SOLUONG, SANPHAM.MALSP, LOAISANPHAM.TENLOAISANPHAM FROM SANPHAM, LOAISANPHAM WHERE SANPHAM.MALSP = LOAISANPHAM.MALSP";
                const result = await conn.execute(exec);
                if (conn) {
                    await conn.close();
                }
                return result.rows;
            }
        } else {
            let exec =
                "SELECT MASP, TENSANPHAM, GIA, MOTASANPHAM, XUATXU, HINHANH, SANPHAM.TINHTRANG, SOLUONG, SANPHAM.MALSP, LOAISANPHAM.TENLOAISANPHAM FROM SANPHAM, LOAISANPHAM WHERE SANPHAM.TINHTRANG = 1 AND SANPHAM.MALSP = LOAISANPHAM.MALSP AND SANPHAM.MASP =" +
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
async function update(
    id,
    name,
    price,
    describe,
    country,
    img,
    count,
    typeProduct
) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "UPDATE SANPHAM SET TenSanPham = :name, Gia = :price, MOTASANPHAM= :describe, XuatXu= :country, HinhAnh= :img, SOLUONG= :count, MALSP= :typeProduct  WHERE MASP= :id";
        await conn.execute(
            exec, {
                img,
                name,
                price,
                country,
                count,
                typeProduct,
                describe,
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
module.exports = { show, destroy, add, update };