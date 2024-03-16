import { useState, useEffect } from 'react'
import './App.css'
import { TodoProvider } from './Contexts/Todocontext'
import TodoForm from './components/Todoform'
import TodoItem from './components/TodoItem'

function App() {
  //jo todo se hamare changes aayege toh uska kaam niche ho raha hai 
  const [Todos, setTodo] = useState([])   //ye hamne usestate use kiya hai aur isme hamne initally mai array daali hai 
  //ye jo todos hai woh ek array hai jisme bohot saari values hai  

  const addTodo = (todo) => {  //purani value lene k liye hamne "...prev" liya hai array k andar 
    //naya value add karne k liye ham array k andar object lege aur properties daalege 
    setTodo((prev) => [{ id: Date.now(), ...todo }, ...prev])       //agar maine ye todo daala hai bracket mai toh ye puraani saari value delete karega aur bas nayi wali value hi rakhega 
    //agar mujhe purani value bhi chahiye toh callback use karuga aur prev daaluga aur ek array luga ab ye prev puraane value bhi lega aur array nayi vvalues 
  }          //todo ek string hai usse jyada kuch nahi hai 
  const updateTodo = (id, todo) => {
    setTodo((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((todo) => todo.id !== id))
  }

  const togglecomplete = (id) => {    //yejo hamne banaya hai toggle ye todo list mai jo tick karne wala option hai uske liyekaam aayega 
    setTodo((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ?{ ...prevTodo,
           completed: !prevTodo.completed}:prevTodo))
  }
  //Local storage:-
  /* 
  1. Local storage key value pairs mai leta hai values 
  2. local storage string store karta haiu default
  3. isme do cheeze rehti hai  :-  a) setitem,getitem
  a)setitem :- setitem mai hame key aur value likhna padta hai ki kya dena hai 
  b) getitem:- getitem mai hame bas key ka naam likhna hai aur hame uss key ki value mil jaati hai   
  JSON.parse():-  ye directly aapko javascript deta hai  
  kai application mai ek se jyada bhi useeffect() use kar sakte hai 
  */
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodo(todos)
    }

  }, [])
  //json.stringify()  ye sabko string mai convert karta hai 
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(Todos))
  }, [Todos])


  return ( //iske niche jo likha hai todoprovider mai values toh woh isslie likha hai kyuki jab ham hover karege toh values tab provide karega woh
    <TodoProvider value={{ Todos, addTodo, updateTodo, deleteTodo, togglecomplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {Todos.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </TodoProvider>
  )
}

export default App
