const oracledb = require("oracledb");
const { formatDate } = require("../../utils/formatDate");
const { mergeEmpInfo } = require("../../utils/mergeEmpInfo");


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
        let exec = "SELECT MaNV,Ho,Ten FROM NHANVIEN WHERE LOAINHANVIEN != 'Admin'";
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
                let execEmpInfo = "SELECT NHANVIEN.MANV,HO,TEN,NGAYSINH,GIOITINH,SODT,DIACHI,NGAYVAOLAM,LOAINHANVIEN,HINHANH,TINHTRANG,EMAIL,LUONG.MALUONG,LUONG.LUONGCOBAN FROM NHANVIEN,LUONG WHERE NHANVIEN.MANV = LUONG.MANV AND TINHTRANG = 1"
                let execEmpSalaryBonus =
                    "SELECT LUONGTHUONG,LUONGDUOCNHAN,NGAYNHANLUONG FROM NHANLUONG WHERE NHANLUONG.MANV"

                const resultInfo = await conn.execute(execEmpInfo);
                const resultBonus = await conn.execute(execEmpSalaryBonus);

                let temp1 = formatDate(resultInfo);
                let temp2 = formatDate(resultBonus);
                const result = [{...temp1.rows[0], ...temp2.rows[0] }];
                if (conn) {
                    await conn.close();
                }
                return result;
            } else {
                let execEmpInfo = "SELECT NHANVIEN.MANV,HO,TEN,NGAYSINH,GIOITINH,SODT,DIACHI,NGAYVAOLAM,LOAINHANVIEN,HINHANH,TINHTRANG,EMAIL,LUONG.MALUONG,LUONG.LUONGCOBAN FROM NHANVIEN,LUONG WHERE NHANVIEN.MANV = LUONG.MANV"
                let execEmpSalaryBonus =
                    "SELECT * FROM NHANLUONG"

                const resultInfo = await conn.execute(execEmpInfo);
                const resultBonus = await conn.execute(execEmpSalaryBonus);

                let temp1 = formatDate(resultInfo);
                let temp2 = formatDate(resultBonus);
                const result = mergeEmpInfo(temp1, temp2);
                if (conn) {
                    await conn.close();
                }
                return result;
            }
        } else {
            let execEmpInfo = "SELECT NHANVIEN.MANV,HO,TEN,NGAYSINH,GIOITINH,SODT,DIACHI,NGAYVAOLAM,LOAINHANVIEN,HINHANH,TINHTRANG,EMAIL,LUONG.MALUONG,LUONG.LUONGCOBAN FROM NHANVIEN,LUONG WHERE NHANVIEN.MANV = LUONG.MANV AND NHANVIEN.MANV =" +
                id;
            let execEmpSalaryBonus =
                "SELECT LUONGTHUONG,LUONGDUOCNHAN,NGAYNHANLUONG FROM NHANLUONG WHERE NHANLUONG.MANV =" +
                id;

            const resultInfo = await conn.execute(execEmpInfo);
            const resultBonus = await conn.execute(execEmpSalaryBonus);

            let temp1 = formatDate(resultInfo);
            let temp2 = formatDate(resultBonus);

            const result = [{...temp1.rows[0], ...temp2.rows[0] }];
            if (conn) {
                await conn.close();
            }
            return result;
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
    basicSalary
) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);

        let exec1 =
            "INSERT INTO NHANVIEN VALUES(MANV_SEQ3.NEXTVAL,:firstName,:lastName,TO_DATE(:DateOfBirth,'yyyy-mm-dd'),:sex,:phoneNumber,:address,TO_DATE(:beginDate,'yyyy-mm-dd'),:typeEmployee,:img,1,:email)";
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
        let execForID = "SELECT MANV FROM NHANVIEN WHERE SODT = :phoneNumber AND TEN = :lastName AND HO = :firstName"
        let resultForID = await conn.execute(execForID, {
            phoneNumber,
            lastName,
            firstName
        }, {
            autoCommit: true,
        });
        let id = resultForID.rows[0].MANV;
        id = String(id);
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
        if (conn) {
            await conn.close();
        }
        return id;
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
    status
) {
    if (process.env.status == 3) {
        let conn;
        try {
            conn = await oracledb.getConnection(config);
            let exec1 =
                "UPDATE NHANVIEN SET HO = :firstName, TEN = :lastName, NGAYSINH = TO_DATE(:DateOfBirth,'yyyy-mm-dd') , GIOITINH=:sex, SODT=:phoneNumber, DIACHI=:address, NGAYVAOLAM= TO_DATE(:beginDate,'yyyy-mm-dd'), LOAINHANVIEN=:typeEmployee, HINHANH=:img, EMAIL=:email, TINHTRANG =:status WHERE MANV= :id";
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
                    status
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
            let check = "SELECT * FROM NHANLUONG";
            let rsCheck = await conn.execute(
                check, {}, {
                    autoCommit: true,
                }
            );
            let k = 0;
            for (let i = 0, len = rsCheck.rows.length; i < len; i++) {
                if (rsCheck.rows[i].MANV == id) {
                    exec3 =
                        "UPDATE NHANLUONG SET NGAYNHANLUONG = TO_DATE(:payday,'yyyy-mm-dd'), LUONGTHUONG = :bonusSalary, LUONGDUOCNHAN = :salary WHERE MANV = :id";
                    await conn.execute(
                        exec3, {
                            payday,
                            bonusSalary,
                            salary,
                            id,
                        }, {
                            autoCommit: true,
                        }
                    )
                    k = 1;
                }
            }
            if (k == 0) {
                console.log(payday);
                let finalExec = "INSERT INTO NHANLUONG VALUES(:salaryId, :id,TO_DATE(:payday,'yyyy-mm-dd') , :basicSalary, :bonusSalary, :salary)";
                await conn.execute(
                    finalExec, {
                        salaryId,
                        id,
                        payday,
                        basicSalary,
                        bonusSalary,
                        salary,
                    }, {
                        autoCommit: true,
                    }
                )
            }
            if (conn) {
                await conn.close();
            }
        } catch (err) {
            console.log("Ouch!", err);
        }
    } else if (process.env.status == 2) {
        let conn;
        try {
            conn = await oracledb.getConnection(config);
            let exec1 =
                "UPDATE NHANVIEN SET HO = :firstName, TEN = :lastName, NGAYSINH = TO_DATE(:DateOfBirth,'yyyy-mm-dd') , GIOITINH=:sex, SODT=:phoneNumber, DIACHI=:address, HINHANH=:img WHERE MANV= :id";
            await conn.execute(
                exec1, {
                    id,
                    firstName,
                    lastName,
                    DateOfBirth,
                    sex,
                    phoneNumber,
                    address,
                    img,
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
}

async function addTimePeriod(id, day) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT MAGIO,KHUNGGIO FROM GIODAT WHERE MAGIO NOT IN (SELECT MAGIO FROM DATLICH WHERE MANV = :id AND DATLICH.NGAY = TO_DATE(:day,'dd-mm-yyyy') AND TINHTRANG = 1) ORDER BY MAGIO";
        const result = await conn.execute(
            exec, {
                id,
                day,
            }, {
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
async function checkPhoneNumber() {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT SODT FROM NHANVIEN WHERE TINHTRANG = 1"
        const result = await conn.execute(exec);
        if (conn) {
            await conn.close();
        }
        return result.rows;
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function checkEmail() {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let exec = "SELECT EMAIL FROM NHANVIEN WHERE TINHTRANG = 1 AND LOAINHANVIEN='Staff'";
        const result = await conn.execute(exec);
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
    addTimePeriod,
    add,
    checkPhoneNumber,
    checkEmail
};