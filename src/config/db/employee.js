const oracledb = require("oracledb");
const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};
async function destroy(type, condition) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "DELETE FROM " + type + " WHERE MaSP = :condition ";
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
async function showToAdd() {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT MaNV,Ho,Ten FROM NHANVIEN";
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result.rows;
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function show(id = -1) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        if (id == -1) {
            let exec = "SELECT NHANVIEN.MANV,HO,TEN,NGAYSINH,GIOITINH,SODT,DIACHI,NGAYVAOLAM,LOAINHANVIEN,TINHTRANG,EMAIL,LUONG.MALUONG,LUONG.LUONGCOBAN,LUONGTHUONG,LUONGDUOCNHAN,NGAYNHANLUONG FROM NHANVIEN,LUONG,NHANLUONG WHERE NHANVIEN.MANV =LUONG.MANV AND    NHANVIEN.MANV = NHANLUONG.MANV";
            const result = await conn.execute(exec);
            if (conn) {
                await conn.close();
            }
            return result.rows;
        } else {
            let exec =
                "SELECT NHANVIEN.MANV,HO,TEN,NGAYSINH,GIOITINH,SODT,DIACHI,NGAYVAOLAM,LOAINHANVIEN,TINHTRANG,EMAIL,LUONG.MALUONG,LUONG.LUONGCOBAN,LUONGTHUONG,LUONGDUOCNHAN,NGAYNHANLUONG FROM NHANVIEN,LUONG,NHANLUONG WHERE NHANVIEN.MANV =LUONG.MANV AND    NHANVIEN.MANV = NHANLUONG.MANV AND NHANVIEN.MANV =" +
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
module.exports = {
    show,showToAdd,destroy
};