const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
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
        let check = "SELECT * FROM LOAIDICHVU WHERE MALDV =" + id;
        let finalCheck = await conn.execute(check);
        if (finalCheck.rows[0].TINHTRANG) {
            let exec = "UPDATE LOAIDICHVU SET TINHTRANG = 0 WHERE MALDV = :id ";
            await conn.execute(
                exec, {
                    id,
                }, {
                    autoCommit: true,
                }
            );
        } else {
            let exec = "UPDATE LOAIDICHVU SET TINHTRANG = 1 WHERE MALDV = :id ";
            await conn.execute(
                exec, {
                    id,
                }, {
                    autoCommit: true,
                }
            );
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
        let exec = "SELECT * FROM LOAIDICHVU";
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result.rows;
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function add(name, status) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "INSERT INTO LOAIDICHVU(MALDV, TENLOAIDICHVU, TINHTRANG) VALUES (MALDV_SEQ14.nextval , :name, :status)";
        await conn.execute(
            exec, {
                name,
                status,
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
                let exec = "SELECT * FROM LOAIDICHVU WHERE TINHTRANG = 1";
                const result = await conn.execute(exec);

                if (conn) {
                    await conn.close();
                }
                return result.rows;
            } else {
                let exec = "SELECT * FROM LOAIDICHVU";
                const result = await conn.execute(exec);

                if (conn) {
                    await conn.close();
                }
                return result.rows;
            }
        } else {
            let exec =
                "SELECT * FROM LOAIDICHVU WHERE MALDV =" + id;
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
    status
) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "UPDATE LOAIDICHVU SET TENLOAIDICHVU = :name, TINHTRANG=:status  WHERE MALDV= :id";
        await conn.execute(
            exec, {
                id,
                name,
                status,
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
module.exports = { show, destroy, showToAdd, add, update };