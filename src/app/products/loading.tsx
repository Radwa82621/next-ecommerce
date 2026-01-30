import React from 'react'

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-[rgba(0,0,0,.3)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
    </div>
  )
}
