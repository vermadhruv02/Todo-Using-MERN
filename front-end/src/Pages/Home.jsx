// import React from 'react'
import Task from '../components/Task/Task'

function Home() {
  return (
    <div className="home flex flex-col items-center justify-center min-h-[70vh] bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Todo Dashboard</h1>
      <Task />
    </div>
  )
}

export default Home