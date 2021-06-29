const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const dotenv = require("dotenv");
const { service } = require(".");
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
async function add(name, price, describe, img, typeService) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "INSERT INTO DICHVU(MADV,TENDICHVU, GIA, MOTADICHVU, HINHANH , MALDV) VALUES (MADV_SEQ6.nextval , :name , :price, :describe, :img, :typeService)";
        await conn.execute(
            exec,
            {
                img,
                name,
                price,
                describe,
                typeService,
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
async function destroy(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let check = "SELECT * FROM DICHVU WHERE MADV =" + id;
        let finalCheck = await conn.execute(check);
        if (finalCheck.rows[0].TINHTRANG) {
            console.log("Go");
            let exec = "UPDATE DICHVU SET TINHTRANG = 0 WHERE MADV = :id ";
            await conn.execute(
                exec,
                {
                    id,
                },
                {
                    autoCommit: true,
                }
            );
        } else {
            console.log("NO");
            let exec = "UPDATE DICHVU SET TINHTRANG = 1 WHERE MADV = :id ";
            await conn.execute(
                exec,
                {
                    id,
                },
                {
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
async function update(id, name, price, describe, img, typeService) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "UPDATE DICHVU SET TenDichVu = :name, Gia = :price, MOTADICHVU= :describe, HinhAnh= :img, MALDV= :typeService  WHERE MADV= :id";
        await conn.execute(
            exec,
            {
                img,
                name,
                price,
                typeService,
                describe,
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
async function addNameService(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT TENDICHVU,MADV,GIA FROM DICHVU WHERE MALDV = :id AND TINHTRANG = 1";
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
async function getDetail(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec =
            "SELECT MALDV,MADV,TENDICHVU,GIA FROM DICHVU WHERE MADV in (SELECT MADV From DatLich WHERE   MAKH = (SELECT MAKH FROM DATLICH WHERE MADL = :id ) and MAGIO = ( SELECT MAGIO FROM DATLICH WHERE MADL = :id ) and MANV =  ( SELECT MANV FROM DATLICH WHERE MADL = :id )and NGAY = (SELECT NGAY FROM DATLICH WHERE MADL =: id) and TINHTRANG = 1)";
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
async function getmoney(lstService) {
    let conn;
    try {
        let money = 0;
        for (let i = 0; i < lstService.length; i++) {
            conn = await oracledb.getConnection(config);
            let service = lstService[i];
            let exec = "SELECT GIA FROM DICHVU WHERE MADV = :service";
            let result = await conn.execute(
                exec,
                {
                    service,
                },
                {
                    autoCommit: true,
                }
            );
            if (conn) {
                await conn.close();
            }
            money += result.rows[0].GIA;
        }
        return money;
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
    addNameService,
    getDetail,
    getmoney,
};
