import AppHeader from "./components/AppHeader";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDoItem from "./Interfaces";

function App(): JSX.Element {
  return (
    <>
      <AppHeader />
      <InputBox />
    </>
  );
}

export default App;

type ToDoList = ToDoItem[];

function InputBox(): JSX.Element {
  const [currentText, setCurrentText] = useState("");
  const [list, setList] = useState<ToDoList>([]);
  const [currentEntryToSend, setCurrentEntryToSend] = useState<ToDoItem>();
  const [entriesFromApi, setEntriesFromApi] = useState<ToDoList[]>([]);

  useEffect(() => {
    function getEntries() {
      axios
        .get("https://todoapp-backend-2ubv.onrender.com/")
        .then((response) => {
          console.log("Data received:", response.data);
          console.log("entriesFromApi are:", entriesFromApi);
          setList(response.data);
        })
        .catch((error) => console.log(error))
        .finally(() =>
          console.log("this gets logged when .finally gets executed")
        );
    }
    getEntries();
  }, [entriesFromApi]);

  useEffect(() => {
    function sendEntryToApi() {
      axios
        .post("https://todoapp-backend-2ubv.onrender.com/", currentEntryToSend)
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
        .finally(() => getUpdatedEntries());
    }

    sendEntryToApi();
  }, [currentEntryToSend]);

  function getUpdatedEntries() {
    axios
      .get("https://paste-bin-si-tl.onrender.com/")
      .then((response) => setEntriesFromApi(response.data))
      .catch((error) => console.log(error));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(event.target.value);
  };

  const handleClick = () => {
    const newListItem: ToDoItem = {
      todo_id: Math.floor(Math.random() * 1000),
      description: currentText,
    };
    setCurrentEntryToSend(newListItem);
    const newList: ToDoList = [...list, newListItem];
    setList(newList);
    setCurrentText("");
  };

  const handleDelete = (id: number) => {
    console.log("this is the id from handle delete triggered on clcik", {id});
    axios
      .delete(`https://todoapp-backend-2ubv.onrender.com/${id}`)
      .then((response) => {
        if (response.status === 204) {
          const updatedList = list.filter((item) => item.todo_id !== id);
          setList(updatedList);
        } else {
          console.error("Failed to delete item.");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <>
      <input
        type="text"
        className="input-bar"
        placeholder="Add the item here"
        onChange={handleChange}
        value={currentText}
      />

      <button type="button" className="add-button" onClick={handleClick}>
        Add item
      </button>
      <ul>
        {list.map((task: ToDoItem) => (
          <li key={task.todo_id}>
            {task.description}
            <button onClick={() => handleDelete(task.todo_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
