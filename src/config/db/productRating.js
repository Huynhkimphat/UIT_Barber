const oracledb = require("oracledb");
const dotenv = require("dotenv");
const { formatDate } = require("../../utils/formatDate");
const e = require("express");
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
        let exec = "UPDATE DANHGIASANPHAM SET TINHTRANG = 0 WHERE MADGSP = :id";
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
async function add(customerID, productID, rateDay, ratePoint, cmt, Status) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        console.log(customerID,
            productID,
            rateDay,
            ratePoint,
            cmt,
            Status);
        let exec =
            "INSERT INTO DANHGIASANPHAM VALUES (MADGSP_SEQ13.NEXTVAL , :customerID, :productID, TO_DATE(:rateDay,'yyyy-mm-dd'), :ratePoint, :cmt, :Status)";
        await conn.execute(
            exec, {
                customerID,
                productID,
                rateDay,
                ratePoint,
                cmt,
                Status
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
                let exec = "SELECT * FROM DANHGIASANPHAM WHERE TINHTRANG = 1";
                const result = await conn.execute(exec);
                let temp = formatDate(result);
                if (conn) {
                    await conn.close();
                }
                return result.rows;
            } else {
                let exec = "SELECT * FROM DANHGIASANPHAM";
                const result = await conn.execute(exec);
                let temp = formatDate(result);
                if (conn) {
                    await conn.close();
                }
                return result.rows;
            }
        } else {
            let exec =
                "SELECT * FROM DANHGIASANPHAM WHERE MASP=" +
                id;
            const result = await conn.execute(exec);
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