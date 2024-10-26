'use client'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import Image, { StaticImageData } from 'next/image'

const socket = io('http://192.168.0.21:4000')

const Case = ({ dateStr, content }: { content: string; dateStr: string }) => {
  return (
    <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
      <p
        className="text-white"
        style={{
          whiteSpace: 'nowrap',
        }}
      >
        {dateStr}
      </p>
      <p className="text-white tracking-tight" >
        {content}
      </p>
    </div>
  )
}

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
    }, 8000) 
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
          marginBottom: '20px',
        }}
      >
        <Image
          src={imgStr}
          alt=""
          width={350}
          height={155}
          style={{
            border:
              isClosed || isDone ? '3px solid white' : '3px solid lightgreen',
            objectFit: 'cover',
          }}
          onClick={isClosed || isDone ? undefined : handleClick}
        />
        <div className="my-5">
          <div className="flex flex-col space-y-1 mb-4" onClick={() => setIsClosed(false)}>
            <Case dateStr={dateStr} content={content} />
          </div>
        </div>
      </div>
      <p className="mb-[25px]" onClick={undefined}>
        {phrase}
      </p>
    </section>
  )
}
