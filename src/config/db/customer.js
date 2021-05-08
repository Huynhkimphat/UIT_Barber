const oracledb = require("oracledb");
const dotenv = require("dotenv");
const { formatDate } = require("../../utils/formatDate");
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
        let exec = "UPDATE KHACHHANG SET TINHTRANG = 0 WHERE MAKH = :id";
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
                    "SELECT * FROM KHACHHANG WHERE TINHTRANG = 1";
                const result = await conn.execute(exec);
                let temp = formatDate(result);
                if (conn) {
                    await conn.close();
                }
                return result.rows;
            } else {
                let exec =
                    "SELECT * FROM KHACHHANG";
                const result = await conn.execute(exec);
                let temp = formatDate(result);
                if (conn) {
                    await conn.close();
                }
                return result.rows;
            }
        } else {
            let exec =
                "SELECT * FROM KHACHHANG WHERE MAKH =" +
                id;

            const result = await conn.execute(exec);
            let temp = formatDate(result);
            if (conn) {
                await conn.close();
            }
            return temp.rows;
        }
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function update(
    id,
    firstName,
    lastName,
    DateOfBirth,
    sex,
    phoneNumber,
    address,
    point,
    img,
    status,
    email,
) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec1 =
            "UPDATE KHACHHANG SET HO = :firstName, TEN = :lastName, NGAYSINH = TO_DATE(:DateOfBirth,'yyyy-mm-dd') , GIOITINH=:sex, SODT=:phoneNumber, DIACHI=:address, DIEMTICHLUY= :point, HINHANH=:img, TINHTRANG=:status, EMAIL=:email WHERE MAKH= :id";
        await conn.execute(
            exec1, {
                id,
                firstName,
                lastName,
                DateOfBirth,
                sex,
                phoneNumber,
                address,
                point,
                img,
                status,
                email,
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
module.exports = { show, destroy, update };