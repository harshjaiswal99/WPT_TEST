const express = require("express");
const app = express();
const { addMsg, getMsgs } = require("./msgPost");
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.get("/msgs", async (req, res) => {
  const list = await getMsgs();
  res.json(list);
});

app.post("/sendit", async (req, res) => {
  const obj = req.body;
  console.log(req.body);
  await addMsg(obj);
  console.log(req.body);
  res.json({ message: "Message Sent Successfully" });
});

app.listen(4000, () => {
  console.log("server started");
  console.log(
    `CHATTING APP IS NOW ACTIVE AND IS LISTENING AT http://localhost:4000`
  );
});
