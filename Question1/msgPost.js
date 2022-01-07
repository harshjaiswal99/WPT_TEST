const mysql = require("mysql");
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "project",
};

async function addMsg(obj) {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  console.log("Connected ...");
  let sql_query = `INSERT INTO chats VALUES(?)`;
  await connection.queryAsync(sql_query, [obj.msg]);
  await connection.endAsync();
  console.log("Message Sent");
}

async function getMsgs() {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  console.log("Connected ...");
  let sql_query = `SELECT * FROM chats`;
  const list = await connection.queryAsync(sql_query, []);
  await connection.endAsync();
  console.log("The chat history is :", list);
  return list;
}

module.exports = { addMsg, getMsgs };

const obj = { msg: "hello World" };
addMsg(obj);
