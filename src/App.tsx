import AppHeader from "./components/AppHeader";
import React, { useState, useEffect } from "react";
import axios from "axios";


function App(): JSX.Element {
  return (
    <>
      <AppHeader />
      <InputBox />
    </>
  );
}

export default App;

interface ToDoItem {
  todo_id: number;
  description: string;
}


type ToDoList = ToDoItem[];

function InputBox(): JSX.Element {
  const [currentText, setCurrentText] = useState("");
  const [list, setList] = useState<ToDoList>([]);


  useEffect(() => {
    function getEntries() {
      axios
        .get("https://todoapp-backend-2ubv.onrender.com/")
        .then((response) => {
          console.log("Data received:", response.data); // Add this line
          setList(response.data);
        })
        .catch((error) => console.log(error))
        .finally(() =>
          console.log("this gets logged when .finally gets exceuted")
        );
    }
    getEntries();
  }, []);



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(event.target.value);
  };

  const handleClick = () => {
    const newListItem: ToDoItem = {
      todo_id: Math.floor(Math.random() * 1000),
      description: currentText,
    };
    const newList: ToDoList = [...list, newListItem];
    setList(newList);
    setCurrentText("");
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
        {list.map((task: ToDoItem) => {
          return <li key={task.todo_id}>{task.description}</li>;
        })}
      </ul>
    </>
  );
}

//////////////////////////////////
