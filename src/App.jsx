import { useCallback, useState, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [another,new_ps] = useState(false)
  const [length, setLength] = useState(0)
  const [number, includeNumber] = useState(false)
  const [char, includeChar] = useState(false)
  const [password, changePassword] = useState("")
  const passwordGenrator = useCallback(() => 
  {
    let pass = ""
    let str = "ASDFGHJKLQWERTYUIOPZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(number) str+="1234567890";
    if(char) str +="!@#$%^&*()";
    for(let i = 0; i <length;i++)
    {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str[char];
    }
    changePassword(pass)
  },[length,Number,char])

  useEffect(()=>{
    passwordGenrator()
  },[length,number,char,changePassword,another])

  const copyPasswordToClipboard = useCallback(() =>
  {
    window.navigator.clipboard.writeText(password)
  },[password])
  const passwordRef = useRef(null)
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-20 text-orange-500 bg-gray-700 ">
        <div className="text-center">
          Password Generator
          <input type = "text" ref={passwordRef} value={password} className="outline-nono w-full py-1 my-2 px-3 rounded-lg" placeholder="Enter your password" readOnly></input>
          <button onClick={()=>{copyPasswordToClipboard();alert("Password is copied!")}} className="mx-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-7 border-b-4 border-blue-700 hover:border-blue-500 rounded">Copy</button>
          <button onClick={(another)=>{console.log("hello" + another); new_ps((pre)=>!pre)}} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Another</button>
        </div>
        <div className='flex items-center gap-x-1'>
            <div className='flex item-center gap-x-1'>
                <input 
                type="range"
                min={6} 
                max={100} 
                value={length}  
                className="cursor_pointer" 
                onChange={(e)=>{setLength(e.target.value)}}
                />
                <label>Length :{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={number}
                id="numberInput"
                onChange = {()=>{
                  includeNumber((prev)=>!prev);
                }}
                />
                <label>Number</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={char}
                id="charInput"
                onChange = {()=>{
                  includeChar((prev)=>!prev);
                }}
                />
                <label>Char</label>
            </div>
        </div>
      </div>
      </>
  )
}
export default App
