import axios from "axios";
import { useEffect, useState } from "react";
import ToDoItem from "../Interfaces";
import React from "react";

type ToDoList = ToDoItem[];

export default function InputBox(): JSX.Element {
    const [currentText, setCurrentText] = useState("");
    const [list, setList] = useState<ToDoList>([]);
    const [currentEntryToSend, setCurrentEntryToSend] = useState<ToDoItem>();
    const [entriesFromApi, setEntriesFromApi] = useState<ToDoList[]>([]);

    useEffect(() => {
        function getEntries() {
            axios
                .get("https://todoapp-backend-2ubv.onrender.com/")
                .then((response) => {
                    setList(response.data);
                })
                .catch((error) => console.log(error))
                .finally(() =>
                    console.log("this gets logged when .finally gets executed")
                );
        }
        getEntries();
    }, [entriesFromApi]);

    useEffect(
        () => {
            function sendEntryToApi() {
                axios
                    .post(
                        "https://todoapp-backend-2ubv.onrender.com/",
                        currentEntryToSend
                    )
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error))
                    .finally(() => getUpdatedEntries());
            }

            sendEntryToApi();
        },
        // eslint-disable-next-line
        []
    );

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

    function handleDelete(todoId: number) {
        console.log("the item was deleted");
    }

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
                        <button onClick={() => handleDelete(task.todo_id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
