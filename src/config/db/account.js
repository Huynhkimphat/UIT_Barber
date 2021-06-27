const oracledb = require("oracledb");
const dotenv = require("dotenv");
const adminAuthenticate = require("../../config/db")
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};
async function destroy(id) {
    // let conn;
    // try {
    //     conn = await oracledb.getConnection(config);
    //     let exec = "UPDATE TAIKHOAN WHERE MATK = :id";
    //     await conn.execute(
    //         exec, {
    //             id,
    //         }, {
    //             autoCommit: true,
    //         }
    //     );
    //     if (conn) {
    //         await conn.close();
    //     }
    // } catch (err) {
    //     console.log("Ouch!", err);
    // }
}
async function show(id = -1) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        if (id == -1) {
            let exec = "SELECT * FROM TAIKHOAN";
            const result = await conn.execute(exec);
            if (conn) {
                await conn.close();
            }
            return result.rows;
        } else {
            let exec = "SELECT * FROM TAIKHOAN WHERE MATK =" + id;
            const result = await conn.execute(exec);
            let temp = formatDate(result);
            if (conn) {
                await conn.close();
            }
            return result.rows;
        }
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function changePassword(
    email,
    newPassword
) {
    try {
        let conn = await oracledb.getConnection(config);
        if (process.env.status == 3) {
            let execForID = "SELECT MANV FROM NHANVIEN WHERE EMAIL =: email AND LOAINHANVIEN = 'Admin'";
            let adminID = await conn.execute(execForID, {
                email
            }, {
                autoCommit: true,
            });
            adminId = adminID.rows[0].MANV;
            let exec = "UPDATE TAIKHOAN SET PASSWORD =:newPassword WHERE MANV =:adminId";

            await conn.execute(exec, {
                newPassword,
                adminId,

            }, {
                autoCommit: true,
            });
            if (conn) {
                await conn.close();
            }
        } else if (process.env.status == 1) {
            let execForID = "SELECT MAKH FROM KHACHHANG WHERE EMAIL =: email";
            let customerID = await conn.execute(execForID, {
                email
            }, {
                autoCommit: true,
            });
            customerId = customerID.rows[0].MAKH;
            let exec = "UPDATE TAIKHOAN SET PASSWORD =:newPassword WHERE MAKH =:customerId";

            await conn.execute(exec, {
                newPassword,
                customerId,

            }, {
                autoCommit: true,
            });
            if (conn) {
                await conn.close();
            }
        } else if (process.env.status == 2) {
            let execForID = "SELECT MANV FROM NHANVIEN WHERE EMAIL =: email AND LOAINHANVIEN='Staff'";
            let employeeID = await conn.execute(execForID, {
                email
            }, {
                autoCommit: true,
            });
            employeeId = employeeID.rows[0].MANV;
            let exec = "UPDATE TAIKHOAN SET PASSWORD =:newPassword WHERE MANV =:employeeId";

            await conn.execute(exec, {
                newPassword,
                employeeId,

            }, {
                autoCommit: true,
            });
            if (conn) {
                await conn.close();
            }
        }

    } catch (err) {
        console.log("Ouch!", err);
    }
}
module.exports = { show, changePassword };