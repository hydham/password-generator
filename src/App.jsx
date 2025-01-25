import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { useCallback } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [isNumbersAllowed, setIsNumbersAllowed] = useState(false)
  const [isSymbolsAllowed, setIsSymbolsAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const generatePassword = useCallback(() => {
    let password = ''
    let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'

    if (isNumbersAllowed) {
      letters += numbers
    }

    if (isSymbolsAllowed) {
      letters += '!@#$%^&*()_+'
    }

    for (let i = 0; i < length; i++) {
      password += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    setPassword(password)
  }, [length, isNumbersAllowed, isSymbolsAllowed])

  const copyToClip = async () => {
    try {
      await navigator.clipboard.writeText(password)
      alert("password copied to clipboard")

    } catch (error) {
      console.error('Failed to copy password:', error)
    }
  }

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  return (
    <div className='w-full px-4 py-3 my-8 text-orange-500 mx-auto 
    max-w-md shadow-md rounded-lg bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} readOnly
          className='outline-none w-full py-1 px-3 bg-white '
          placeholder='Password' />
        <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyToClip}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            value={length}
            min={6} max={20}
            onChange={(e) => setLength(Number(e.target.value))} />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            checked={isNumbersAllowed}
            onChange={() => setIsNumbersAllowed(prev => !prev)}
          />
          <label htmlFor="length">Numbers </label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            checked={isSymbolsAllowed}
            onChange={() => setIsSymbolsAllowed(prev => !prev)}
          />
          <label htmlFor="symbols">Characters </label>
        </div>
      </div>
    </div>
  )
}

export default App
