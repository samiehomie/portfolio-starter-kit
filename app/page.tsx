'use client'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://10.42.0.1:4000')

export default function Page() {
  const [selectedLoad, setSelectedLoad] = useState('---')
  const [selectedToe, setSelectedToe] = useState(`["---", "---"]`)
  const [selectedLugnut, setSelectedLugnut] = useState(`["---", "---"]`)
  const [selectedWear, setSelectedWear] = useState(`["---", "---"]`)
  // const [isClosed, setIsClosed] = useState(false)
  const [isDone, setIsDone] = useState(true)

  const startMsg = () => {
    socket.emit('message', {
      load: Number(selectedLoad),
      toe: JSON.parse(selectedToe),
      lugnut: JSON.parse(selectedLugnut),
      wear: JSON.parse(selectedWear),
    })
  }

  const handleClick = () => {
    // setIsClosed(true)
    setTimeout(() => {
      startMsg()
    }, 5000)
  }

  useEffect(() => {
    socket.on('start', (data: { done: boolean }) => {
      console.log(data)
      setIsDone(data.done)
    })

    return () => {
      socket.off('start')
    }
  }, [])

  return (
    <>
      <button
        onClick={isDone ? undefined : handleClick}
        className={`p-[10px] border w-[60%] mx-auto mb-[20px] 
        text-blue-400 ${isDone ? '' : 'border-blue-400'}`}
      >
        Send
      </button>
      <label className="text-[20px]">
        LOAD
        <select
          name="options"
          id="options"
          value={selectedLoad}
          onChange={(e) => setSelectedLoad(e.target.value)}
          className="mb-[20px] p-[10px] border border-gray-300 rounded w-full h-[70px] text-[20px]"
        >
          <option value="500">500</option>
          <option value="550">550</option>
          <option value="600">600</option>
          <option value="650">650</option>
          <option value="700">700</option>
          <option value="750">750</option>
          <option value="800">800</option>
          <option value="850">850</option>
          <option value="900">900</option>
        </select>
      </label>
      <label className="text-[20px]">
        TOE
        <select
          name="options"
          id="options"
          value={selectedToe}
          onChange={(e) => setSelectedToe(e.target.value)}
          className="mb-[20px] p-[10px] border border-gray-300 rounded w-full h-[70px] text-[20px]"
        >
          <option value={`["caution", -2]`}>caution -2</option>
          <option value={`["caution", -1.5]`}>caution -1.5</option>
          <option value={`["caution", -1]`}>caution -1</option>
          <option value={`["good", -0.5]`}>good -0.5</option>
          <option value={`["good", 0]`}>good 0</option>
          <option value={`["good", 0.5]`}>good 0.5</option>
          <option value={`["caution", 1]`}>caution 1</option>
          <option value={`["caution", 1.5]`}>caution 1.5</option>
          <option value={`["caution", 2]`}>caution 2</option>
        </select>
      </label>
      <label className="text-[20px]">
        WEAR
        <select
          name="options"
          id="options"
          value={selectedWear}
          onChange={(e) => setSelectedWear(e.target.value)}
          className="mb-[20px] p-[10px] border border-gray-300 rounded w-full h-[70px] text-[20px]"
        >
          <option value={`["caution", 4]`}>caution</option>
          <option value={`["good", 8]`}>good</option>
        </select>
      </label>
      <label className="text-[20px]">
        LUGNUT
        <select
          name="options"
          id="options"
          value={selectedLugnut}
          onChange={(e) => setSelectedLugnut(e.target.value)}
          className="mb-[20px] p-[10px] border border-gray-300 rounded w-full h-[70px] text-[20px]"
        >
          <option value={`["caution", 70]`}>caution</option>
          <option value={`["good", 80]`}>good</option>
        </select>
      </label>
    </>
  )
}
