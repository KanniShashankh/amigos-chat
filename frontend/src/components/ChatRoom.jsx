import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
  getDocs,
} from "firebase/firestore";

import { auth, db } from "../config";

function App(props) {
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState(true);
  const [messages, setMessages] = useState([]);

  function toggleTheme() {
    setTheme((prevTheme) => !prevTheme);
  }

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const { uid, photoURL, displayName } = auth.currentUser;

    try {
      const messageRef = await addDoc(collection(db, "messages"), {
        message,
        timestamp: serverTimestamp(),
        uid,
        photoURL,
        displayName,
      });
      console.log("Document written with ID: ", messageRef.id);
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      let result = [];
      const doc_refs = await getDocs(collection(db, "messages"));
       result = doc_refs.forEach(element => {
        result.push(element.data().message);
        return result;
      });

      setMessages(result);
      console.log(result);
    };
    getData();
  }, []);

  return (
    <div
      className={`${
        theme ? "bg-dark-navy-blue" : "bg-whitish-blue"
      } w-full min-h-screen flex flex-col py-20`}
    >
      <div className="w-screen max-w-full  flex justify-between flex-col p-1 overflow-hidden">
        <div className="flex-1 max-w-full">
          <h1 className="text-4xl max-w-full font-bold text-center text-white"></h1>
        </div>
        <>
          
            {/* {
              messages.map((item, index)=><p key={index}>{item}</p>)
            } */}
          
        </>
        <form onSubmit={(event) => sendMessage(event)}>
          <div className="max-w-full flex absolute bottom-0 mb-1 ">
            <div className="flex justify-center w-[95vw]">
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-[80vw] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></input>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white bg-gray font-bold py-2 px-4 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
