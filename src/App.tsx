import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/card/Card";

 export type Todo ={
  id:  number;
  title: string;
  completed: boolean;
}

function App() {

  const [todoInput, setTodoInput] = useState('')
  const [todos, setTodos] = useState<Todo[]>(()=> {
    const storedTodos = localStorage.getItem('@codersList:todos')

    if(storedTodos){
      return JSON.parse(storedTodos)
    }

    return []
  });

  useEffect(() => {
    localStorage.setItem('@codersList:todos', JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    setTodos((previousTodos) => [...previousTodos, {id: Math.random(), title: todoInput, completed: false}])
 
    setTodoInput('')
  }

  function completeTodo(id: number){
    setTodos((previusTodos) => previusTodos.map((todo)=> todo.id != id ? todo : {... todo, completed: !todo.completed}))
  }

  function handleInputChange (e: ChangeEvent<HTMLInputElement>){
    setTodoInput(e.target.value)
  }

  function deleteTodo(id: number){
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id != id))
  }

  return (
    <div className="App">
      <div className="add-todo">
        <input placeholder="Digite uma tarefa do seu dia a dia..." value={todoInput} onChange={handleInputChange} />
        <button onClick={addTodo}>Adicionar</button>
      </div>
      {todos.map((todo) => (
      <Card key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
      ))}
    </div>
  );
}

export default App;
