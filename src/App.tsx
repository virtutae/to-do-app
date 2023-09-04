import AppHeader from "./components/AppHeader";
import React, { useState } from "react";

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
  id: number;
  text: string;
}

type ToDoList = ToDoItem[];

function InputBox(): JSX.Element {
  const [tempText, setTempText] = useState("");
  const [list, setList] = useState<ToDoList>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempText(event.target.value);
  };

  const handleClick = () => {
    const newListItem: ToDoItem = {
      id: Math.floor(Math.random() * 1000),
      text: tempText,
    };
    const newList: ToDoList = [...list, newListItem];
    setList(newList);
    setTempText("");
  };

  return (
    <>
      <input
        type="text"
        className="input-bar"
        placeholder="Add the item here"
        onChange={handleChange}
        value={tempText}
      />

      <button type="button" className="add-button" onClick={handleClick}>
        Add item
      </button>
      <ul>
        {list.map((task: ToDoItem) => {
          return <li key={task.id}>{task.text}</li>;
        })}
      </ul>
    </>
  );
}

//////////////////////////////////
