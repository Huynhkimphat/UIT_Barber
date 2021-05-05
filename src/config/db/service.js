const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
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
        let exec = "SELECT MaDV,TenDichVu,Gia FROM DichVu";
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
async function destroy(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "UPDATE DICHVU SET TINHTRANG = 0 WHERE MADV = :id ";
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
                let exec = "SELECT * FROM DICHVU WHERE TINHTRANG = 1";
                const result = await conn.execute(exec);

                if (conn) {
                    await conn.close();
                }
                return result.rows;
            } else {
                let exec = "SELECT * FROM DICHVU";
                const result = await conn.execute(exec);

                if (conn) {
                    await conn.close();
                }
                return result.rows;
            }
        } else {
            let exec =
                "SELECT * FROM DICHVU WHERE TINHTRANG = 1 AND MADV =" + id;
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
async function update(id, name, price, describe, img, typeService) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "UPDATE DICHVU SET TenDichVu = :name, Gia = :price, MOTADICHVU= :describe, HinhAnh= :img, MALDV= :typeService  WHERE MADV= :id";
        await conn.execute(
            exec, {
                img,
                name,
                price,
                typeService,
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
module.exports = {
    show,
    showToAdd,
    add,
    destroy,
    update,
};