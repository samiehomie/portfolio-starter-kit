'use client'
import React from 'react'
import io from 'socket.io-client'

const socket = io('http://192.168.0.21:4000')

export default function ClientA() {
  const startMsg = () => {
    socket.emit('message', { load: 10, toe: ['warning', -1] })
  }

  const stopMsg = () => {
    socket.emit('message', {})
  }

  return (
    <>
      <h1 onClick={startMsg}>{`[My Portfolio]`}</h1>

      <div
        style={{
          padding: '20px',
          backgroundColor: 'red',
        }}
      >
        <button onClick={startMsg}>START</button>
      </div>
      <div
        style={{
          padding: '20px',
          backgroundColor: 'blue',
        }}
      >
        <button onClick={stopMsg}>STOP</button>
      </div>
    </>
  )
}
