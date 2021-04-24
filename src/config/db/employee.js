const oracledb = require("oracledb");
const { formatDate } = require("../../utils/formatDate");
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
        let exec = "UPDATE NHANVIEN SET TINHTRANG = 0 WHERE MANV = :id";
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
            if (process.env.status != 3) {
                let exec = "SELECT NHANVIEN.MANV,HO,TEN,NGAYSINH,GIOITINH,SODT,DIACHI,NGAYVAOLAM,LOAINHANVIEN,TINHTRANG,EMAIL,LUONG.MALUONG,LUONG.LUONGCOBAN,LUONGTHUONG,LUONGDUOCNHAN,NGAYNHANLUONG FROM NHANVIEN,LUONG,NHANLUONG WHERE NHANVIEN.TINHTRANG = 1 AND NHANVIEN.MANV =LUONG.MANV AND    NHANVIEN.MANV = NHANLUONG.MANV";
                const result = await conn.execute(exec);
                let temp = formatDate(result);
                if (conn) {
                    await conn.close();
                }
                return temp.rows;
            } else {
                let exec = "SELECT NHANVIEN.MANV,HO,TEN,NGAYSINH,GIOITINH,SODT,DIACHI,NGAYVAOLAM,LOAINHANVIEN,TINHTRANG,EMAIL,LUONG.MALUONG,LUONG.LUONGCOBAN,LUONGTHUONG,LUONGDUOCNHAN,NGAYNHANLUONG FROM NHANVIEN,LUONG,NHANLUONG WHERE NHANVIEN.MANV =LUONG.MANV AND    NHANVIEN.MANV = NHANLUONG.MANV";
                const result = await conn.execute(exec);
                let temp = formatDate(result);
                if (conn) {
                    await conn.close();
                }
                return temp.rows;
            }
        } else {
            let exec =
                "SELECT NHANVIEN.MANV,HO,TEN,NGAYSINH,GIOITINH,SODT,DIACHI,NGAYVAOLAM,LOAINHANVIEN,TINHTRANG,EMAIL,LUONG.MALUONG,LUONG.LUONGCOBAN,LUONGTHUONG,LUONGDUOCNHAN,NGAYNHANLUONG FROM NHANVIEN,LUONG,NHANLUONG WHERE NHANVIEN.TINHTRANG = 1 AND NHANVIEN.MANV =LUONG.MANV AND    NHANVIEN.MANV = NHANLUONG.MANV AND NHANVIEN.MANV =" +
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
    show,
    showToAdd,
    destroy
};