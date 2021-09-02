import React, { useRef } from "react";

import "../css/NewTodo.css";

interface NewTodoProps {
  onAddTodo: (todoText: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText: string = textInputRef.current!.value;
    props.onAddTodo(enteredText);
  };

  return (
    <form>
      <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef}></input>
      </div>
      <button type="submit" onClick={submitHandler}>
        ADD TODO
      </button>
    </form>
  );
};

export default NewTodo;
