'use client'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://54.180.43.6:4000')

export default function Page() {
  const [selectedLoad, setSelectedLoad] = useState(`30`)
  const [selectedToe, setSelectedToe] = useState(`["good", 0]`)
  // const [isClosed, setIsClosed] = useState(false)
  const [isDone, setIsDone] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  const startMsg = () => {
    socket.emit('message', {
      load: Number(selectedLoad),
      toe: JSON.parse(selectedToe),
      lugnut: ['good', 80],
      wear: ['good', 8],
      damage: 'good',
    })
  }

  // TODO: 시간 설정 넣기
  const handleClick = () => {
    setIsFetching(true)
    setTimeout(() => {
      startMsg()
      setIsFetching(false)
    }, 7000)
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
      {isFetching && (
        <div
          className="absolute inset-0 z-[9999999] bg-black/70 text-white text-xl flex flex-col 
        justify-center items-center pointer-events-none"
        >
          처리중...
        </div>
      )}
      <div className="text-white text-[9px] text-center pb-[5px]">
        load: {selectedLoad} toe: {selectedToe}
      </div>
      <button
        disabled={isFetching}
        onClick={isDone ? undefined : handleClick}
        className={`p-[10px] border w-[60%] mx-auto mb-[20px] 
         ${
           isDone ? 'border-white text-white' : 'border-blue-400 text-blue-400'
         }`}
      >
        Send
      </button>
      <h1 className="text-center text-2xl font-bold">미니드럼</h1>
      <label className="text-[20px]">
        LOAD
        <select
          disabled={isFetching}
          name="options"
          id="options"
          value={selectedLoad}
          onChange={(e) => setSelectedLoad(e.target.value)}
          className="mb-[20px] p-[10px] border border-gray-300 rounded w-full h-[70px] text-[20px]"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </label>
      <label className="text-[20px]">
        TOE
        <select
          name="options"
          disabled={isFetching}
          id="options"
          value={selectedToe}
          onChange={(e) => setSelectedToe(e.target.value)}
          className="mb-[20px] p-[10px] border border-gray-300 rounded w-full h-[70px] text-[20px]"
        >
          <option value={`["good", 0]`}>good 0</option>
          <option value={`["caution", 1]`}>caution 1</option>
          <option value={`["caution", 2]`}>caution 2</option>
        </select>
      </label>
    </>
  )
}
