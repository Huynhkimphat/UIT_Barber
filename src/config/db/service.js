const oracledb = require("oracledb");
const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};
async function showToAdd() {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT MaDV,TenDichVu FROM DichVu";
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result.rows;
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function add(name, price, describe, img) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "INSERT INTO DICHVU(MADV,TENDICHVU, GIA, MOTADICHVU, HINHANH) VALUES (MADV_SEQ6.nextval , :name , :price, :describe, :img)";
        await conn.execute(
            exec, {
                img,
                name,
                price,
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
async function destroy(type, condition) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "DELETE FROM " + type + " WHERE MaDV = :condition ";
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
async function show(id = -1) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        if (id == -1) {
            let exec = "SELECT * FROM DICHVU";
            const result = await conn.execute(exec);
            if (conn) {
                await conn.close();
            }
            return result.rows;
        } else {
            let exec = "SELECT * FROM DICHVU WHERE MADV =" + id;
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
module.exports = {
    show,
    showToAdd,
    add,
    destroy,
};