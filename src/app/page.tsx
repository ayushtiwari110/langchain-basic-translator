"use client";
import React, { useState } from 'react'
// import { ChatVertexAI } from "@langchain/google-vertexai";
// import { HumanMessage, SystemMessage } from "@langchain/core/messages";
// import { StringOutputParser } from "@langchain/core/output_parsers";
// import { ChatPromptTemplate } from "@langchain/core/prompts";

const HomePage = () => {
  const [language, setlanguage] = useState("")
  const [input, setinput] = useState("")
  const [response, setresponse] = useState("")
  const [loading, setloading] = useState(false)
  const langchain = async () => {
    setloading(true)
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: input, language })
    })
    if (response.status !== 200) {
      console.log(response)
      setresponse("An error occured! Please try again.")
      setloading(false)
    } else {
      const data = await response.json()
      console.log(data.response);
      setresponse(data.response)
      setloading(false)
    }
  }

  return (
    <div className='flex flex-col items-center h-screen bg-gradient-to-b from-black via-slate-900 to-slate-900 mt-20'>
      <div className='text-center font-bold text-4xl mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text'>Your own LangChain powered LLM!</div>
      <div className=''>
        <div className='flex items-center justify-center'>
          <label htmlFor="" className='font-medium text-gray-500'>Language</label>
          <input
            className='rounded-lg m-2 px-2 py-1 font-medium inline-block bg-black border border-white'
            placeholder='Select language'
            value={language}
            onChange={(event) => { setlanguage(event.target.value) }}
          />
        </div>
        <div className='flex items-center justify-center'>
          <label htmlFor="" className='font-medium text-gray-500'>Text:</label>
          <textarea
            className='rounded-lg m-2 px-2 py-1 font-medium inline-block bg-black border border-white w-full'
            placeholder='Start translating...!'
            value={input}
            onChange={(event) => { setinput(event.target.value) }}
          />
        </div>
      <button
        className='rounded-lg bg-black text-white px-4 py-2 m-2 border border-white text-center w-full font-medium hover:bg-white hover:text-black hover:border-black'
        onClick={langchain}
      >
        Translate
      </button>
      </div>
      <div>
        <h1 className='font-medium text-lg text-gray-400'>Output:</h1>
        <p className='p-3 m-2 rounded-lg min-h-20 min-w-80 bg-slate-950 font-semibold text-lg'>{loading ? "Loading..." : response}</p>
      </div>
    </div>
  )
}

export default HomePage