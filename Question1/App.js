import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <>
      <MyComponent />
    </>
  );
}

function MyComponent() {
  const [msg, setMsg] = useState("");
  const [list, setList] = useState([]);

  const handleMsgChange = (e) => {
    setMsg(e.target.value);
  };

  const addMsg = async () => {
    const url = "http://localhost:4000/sendit";
    const data = {
      msg: msg,
    };
    // AJAX using AXIOS
    await axios.post(url, data);
    const newList = [data, ...list];
    setList(newList);
    setMsg("");
  };

  const getMsgs = async () => {
    const url = "http://localhost:4000/msgs";
    const result = await axios.get(url);
    const list = result.data;
    const newList = [...list];
    setList(newList);
  };

  useEffect(() => getMsgs(), []);

  return (
    <div>
      <h1>MyChatApp</h1>
      <div class="bg-dark">
        <div class>
          <input
            type="text"
            name=""
            id=""
            value={msg}
            onChange={handleMsgChange}
            placeholder="Lets Chat Here..."
          />
        </div>
        <div>
          <input type="button" name="" value="Register" onClick={addMsg} />
        </div>
      </div>
      <h1>User List</h1>
      {list.map((item, index) => (
        <div key={index}>{item.msg}</div>
      ))}
    </div>
  );
}
