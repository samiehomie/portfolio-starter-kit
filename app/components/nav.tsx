'use client'
import React, { useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://10.42.0.173:4000')

export function Navbar() {
  const [isStarted, setIsStarted] = useState(false)
  const startMsg = () => {
    socket.emit('start', { done: false })
    setIsStarted(true)
  }
  // const stopMsg = () => {
  //   socket.emit('start', { done: true })
  //   setIsStarted(false)
  // }

  const stopMsg = () => {
    setIsStarted(false)
    setTimeout(() => {
      socket.emit('start', { done: true })
    }, 3000)
  }
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight fixed top-0 bg-black w-full h-[80px]">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="text-white flex flex-row space-x-0 pr-10 text-[20px]">
            {/* <div className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1">
              home
            </div>
            <div className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1">
              blog
            </div> */}
            <div
              onClick={isStarted ? undefined : startMsg}
              style={{
                color: isStarted ? 'lightgreen' : '',
              }}
              className={`border-b transition-all flex align-middle relative py-1 px-2 m-1`}
            >
              start
            </div>
            <div
              style={{
                color: !isStarted ? 'lightgreen' : '',
              }}
              onClick={!isStarted ? undefined : stopMsg}
              className={`text-white border-b transition-all flex align-middle relative py-1 px-2 m-1 ml-[50px]`}
            >
              stop
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}
