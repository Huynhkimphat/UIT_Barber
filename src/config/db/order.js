const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
    connectString: process.env.API_STRING,
};
async function show(id) {
    let conn;
    if (id) {
        try {
            conn = await oracledb.getConnection(config);
            let exec = "SELECT * FROM HOADON WHERE HOADON.MAKH =" + id;
            let result = await conn.execute(exec);
            if (conn) {
                await conn.close();
            }
            return result.rows;

        } catch (err) {
            console.log("Ouch!", err);
        }
    }
}
async function showDetail(id) {
    let conn;
    if (id) {
        try {
            conn = await oracledb.getConnection(config);
            let exec = "SELECT * FROM CTHDSP WHERE MAHD = " + id;
            let result = await conn.execute(exec);
            if (conn) {
                await conn.close();
            }
            return result.rows;
        } catch (err) {
            console.log("Ouch!", err);
        }
    }
}
async function update(
    orderID,
    productID,
    amountOfProduct
) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let length = productID.length;
        let proc = "";
        let amnt = "";
        for (let i = 0; i < length; i++) {
            proc = String(productID[i]);
            amnt = String(amountOfProduct[i]);
            let exec = "UPDATE CTHDSP SET SOLUONG = :amnt WHERE MAHD = :orderID AND MASP = :proc";
            await conn.execute(exec, {
                orderID,
                proc,
                amnt
            }, {
                autoCommit: true,
            });

        }
        if (conn) {
            await conn.close();
        }
    } catch (err) {
        console.log("Ouch!", err);
    }
}
async function add(customerID, productId, price, amount) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        let sumPrice = 0;
        let billID = "";
        let execForPrice = "";
        let execForBill = "SELECT * FROM HOADON WHERE MAKH =: customerID AND TINHTRANG = 1";
        let resBill = await conn.execute(
            execForBill, {
                customerID,
            }, {
                autoCommit: true,
            }
        );
        if (resBill) {
            billID = resBill.rows[0].MAHD;
            execForPrice = "SELECT * FROM CTHDSP WHERE MAHD =:billID";
            let resPrice = await conn.execute(
                execForPrice, {
                    billID,
                }, {
                    autoCommit: true,
                }
            );
            let productID = 0;
            let execForProduct = "SELECT * FROM SANPHAM WHERE MASP =:productID";
            let resForProduct;

            for (let i = 0, len = resPrice.rows.length; i < len; i++) {
                productID = resPrice.rows[i].MASP;
                resForProduct = await conn.execute(
                    execForProduct, {
                        productID,
                    }, {
                        autoCommit: true,
                    }
                );
                sumPrice = sumPrice + resForProduct.rows[0].GIA;
            }
            console.log(sumPrice);
            sumPrice = sumPrice + price * amount;
            console.log(sumPrice);
            let exec = "UPDATE HOADON SET TONGTIEN =: sumPrice WHERE MAHD =: billID";
            await conn.execute(
                exec, {
                    sumPrice,
                    billID,
                }, {
                    autoCommit: true,
                }
            );
            exec = "INSERT INTO CTHDSP VALUES(:billID,:productId,:amount)";
            await conn.execute(
                exec, {
                    billID,
                    productId,
                    amount
                }, {
                    autoCommit: true,
                }
            );
            if (conn) {
                await conn.close();
            }
        } else {
            sumPrice = price * amount;
            let execCreateBill = "INSERT INTO HOADON VALUES(MAHD_SEQ11.NEXTVAL, :customerID, 0, :sumPrice, 1)";
            await conn.execute(
                execCreateBill, {
                    customerID,
                    sumPrice
                }, {
                    autoCommit: true,
                }
            );
            let exec = "INSERT INTO CTHDSP VALUES(:billID, :productId, :amount)";
            await conn.execute(
                exec, {
                    billID,
                    productId,
                    amount
                }, {
                    autoCommit: true,
                }
            );
            if (conn) {
                await conn.close();
            }
        }


    } catch (err) {
        console.log("Ouch!", err);
    }
}
module.exports = { show, showDetail, update, add };