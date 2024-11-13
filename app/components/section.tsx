'use client'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { StaticImageData } from 'next/image'

const socket = io('http://10.42.0.1:4000')

// const Case = ({ dateStr, content }: { content: string; dateStr: string }) => {
//   return (
//     <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
//       <p
//         className="text-white"
//         style={{
//           whiteSpace: 'nowrap',
//         }}
//       >
//         {dateStr}
//       </p>
//       <p className="text-white tracking-tight">{content}</p>
//     </div>
//   )
// }

type props = {
  dateStr: string
  content: string
  phrase: string
  imgStr: StaticImageData
  inputCase: {
    load: number
    toe: [string, number]
  }
}

export default function Section({
  dateStr,
  content,
  phrase,
  inputCase,
  imgStr,
}: props) {
  const [isClosed, setIsClosed] = useState(false)
  const [isDone, setIsDone] = useState(true)
  const startMsg = () => {
    socket.emit('message', inputCase)
  }

  const handleClick = () => {
    setIsClosed(true)
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
    <section>
      <div
        style={{
          marginBottom: '45px',
        }}
      >
        <button
          style={{
            border:
              isClosed || isDone ? '3px solid white' : '3px solid lightgreen',
            objectFit: 'cover',
          }}
          onClick={isClosed || isDone ? undefined : handleClick}
          className="border-3 w-full p-[10px] text-[16px]"
        >
          {`LOAD: ${
            inputCase.load
          } / TOE: [${inputCase.toe[0].toUpperCase()}, ${inputCase.toe[1]}]`}
        </button>
      </div>
    </section>
  )
}
