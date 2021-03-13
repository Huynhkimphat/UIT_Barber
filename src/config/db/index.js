const oracledb = require("oracledb");
const config = {
    user: "system",
    password: "Kimphat2001",
    connectString: "localhost:1521/Project",
};

async function connect() {
    try {
        await oracledb.getConnection(config);
        console.log("Connect successfully");
    } catch (err) {
        console.log("Connect failed!!!");
    }
}
module.exports = { connect };