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
                let exec = "SELECT NHANVIEN.MANV,HO,TEN,NGAYSINH,GIOITINH,SODT,DIACHI,NGAYVAOLAM,LOAINHANVIEN,HINHANH,TINHTRANG,EMAIL,LUONG.MALUONG,LUONG.LUONGCOBAN,LUONGTHUONG,LUONGDUOCNHAN,NGAYNHANLUONG FROM NHANVIEN,LUONG,NHANLUONG WHERE NHANVIEN.TINHTRANG = 1 AND NHANVIEN.MANV =LUONG.MANV AND NHANVIEN.MANV = NHANLUONG.MANV";
                const result = await conn.execute(exec);
                let temp = formatDate(result);
                if (conn) {
                    await conn.close();
                }
                return temp.rows;
            } else {
                let exec = "SELECT NHANVIEN.MANV,HO,TEN,NGAYSINH,GIOITINH,SODT,DIACHI,NGAYVAOLAM,LOAINHANVIEN,HINHANH,TINHTRANG,EMAIL,LUONG.MALUONG,LUONG.LUONGCOBAN,LUONGTHUONG,LUONGDUOCNHAN,NGAYNHANLUONG FROM NHANVIEN,LUONG,NHANLUONG WHERE NHANVIEN.MANV =LUONG.MANV AND NHANVIEN.MANV = NHANLUONG.MANV";
                const result = await conn.execute(exec);
                let temp = formatDate(result);
                if (conn) {
                    await conn.close();
                }
                return temp.rows;
            }
        } else {
            let exec =
                "SELECT NHANVIEN.MANV,HO,TEN,NGAYSINH,GIOITINH,SODT,DIACHI,NGAYVAOLAM,LOAINHANVIEN,HINHANH,TINHTRANG,EMAIL,LUONG.MALUONG,LUONG.LUONGCOBAN,LUONGTHUONG,LUONGDUOCNHAN,NGAYNHANLUONG FROM NHANVIEN,LUONG,NHANLUONG WHERE  NHANVIEN.MANV =LUONG.MANV AND NHANVIEN.MANV = NHANLUONG.MANV AND NHANVIEN.MANV =" +
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
async function add(
    firstName,
    lastName,
    DateOfBirth,
    sex,
    phoneNumber,
    address,
    beginDate,
    typeEmployee,
    img,
    email,
    password,
    basicSalary,
    bonusSalary,
    salary,
    payday
) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);

        let exec1 =
            "INSERT INTO NHANVIEN VALUES(MANV_SEQ3.NEXTVAL,:firstName,:lastName,NGAYSINH = TO_DATE(:dateOfBirth,'yyyy-mm-dd'),:sex,:phoneNumber,:address,NGAYVAOLAM= TO_DATE(:beginDate,'yyyy-mm-dd'),:typeEmployee,:img,1,:email)";
        await conn.execute(
            exec1, {
                firstName,
                lastName,
                DateOfBirth,
                sex,
                phoneNumber,
                address,
                beginDate,
                typeEmployee,
                img,
                email,
            }, {
                autoCommit: true,
            }
        );
        let execForID = "SELECT MANV FROM NHANVIEN WHERE SODT = :phoneNumber AND TEN = :lastName AND NGAYSINH = :dateOfBirth"
        let resultForID = await conn.execute(execForID, {
            phoneNumber,
            lastName,
            dateOfBirth
        })
        let id = resultForID.rows.MANV;

        let exec2 =
            "INSERT INTO LUONG VALUES(MALUONG_SEQ5.NEXTVAL,:id,:basicSalary)";
        await conn.execute(
            exec2, {
                id,
                basicSalary
            }, {
                autoCommit: true,
            }
        );
        let execForSalary = "SELECT MALUONG FROM LUONG WHERE MANV = :id";
        let resultForSalary = await conn.execute(execForSalary, { id });
        let salaryID = resultForSalary.rows.MALUONG;
        let exec3 =
            "INSERT INTO NHANLUONG VALUES(:salaryID,:id,NGAYNHANLUONG = TO_DATE(:payday,'yyyy-mm-dd'),LUONGCOBAN = :basicSalary,LUONGTHUONG = :bonusSalary,LUONGDUOCNHAN = :salary)";
        await conn.execute(
            exec3, {
                salaryID,
                id,
                payday,
                basicSalary,
                bonusSalary,
                salary
            }, {
                autoCommit: true,
            }
        );
        let exec4 = "INSERT INTO TAIKHOAN VALUES(MATK_SEQ4.NEXTVAL,)"
        if (conn) {
            await conn.close();
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
    beginDate,
    typeEmployee,
    img,
    email,
    salaryId,
    basicSalary,
    bonusSalary,
    salary,
    payday,
) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec1 =
            "UPDATE NHANVIEN SET HO = :firstName, TEN = :lastName, NGAYSINH = TO_DATE(:DateOfBirth,'yyyy-mm-dd') , GIOITINH=:sex, SODT=:phoneNumber, DIACHI=:address, NGAYVAOLAM= TO_DATE(:beginDate,'yyyy-mm-dd'), LOAINHANVIEN=:typeEmployee, HINHANH=:img, EMAIL=:email WHERE MANV= :id";
        await conn.execute(
            exec1, {
                id,
                firstName,
                lastName,
                DateOfBirth,
                sex,
                phoneNumber,
                address,
                beginDate,
                typeEmployee,
                img,
                email,
            }, {
                autoCommit: true,
            }
        );

        exec2 =
            "UPDATE LUONG SET LUONGCOBAN = :basicSalary WHERE MALUONG = :salaryId";
        await conn.execute(
            exec2, {
                salaryId,
                basicSalary,
            }, {
                autoCommit: true,
            }
        );
        exec3 =
            "UPDATE NHANLUONG SET NGAYNHANLUONG = TO_DATE(:payday,'yyyy-mm-dd'), LUONGTHUONG = :bonusSalary, LUONGDUOCNHAN = :salary WHERE MANV = :id";
        await conn.execute(
            exec3, {
                id,
                payday,
                bonusSalary,
                salary,
            }, {
                autoCommit: true,
            }
        )
        if (conn) {
            await conn.close();
        }
    } catch (err) {
        console.log("Ouch!", err);
    }
}

async function addTimePeriod(id) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT MAGIO,KHUNGGIO FROM GIODAT WHERE MAGIO NOT IN (SELECT MAGIO FROM DATLICH WHERE MANV = :id) ORDER BY MAGIO";
        const result = await conn.execute(
            exec, {
                id,
            },{
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



module.exports = {
    show,
    showToAdd,
    destroy,
    update,
    addTimePeriod
};