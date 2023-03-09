import React, { useState, useEffect} from 'react'
import './styles.css'

import {Card} from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState()
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name:'', avatar:''})

  function hanleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
      setStudents(prevState => [...prevState, newStudent])
  }
  useEffect(() => {
    // fetch('https://api.github.com/users/GabrielLock')
    // .then( response => response.json())
    // .then(data => {
    //   setUser({
    //     name: data.login,
    //     avatar: data.avatar_url,
    //   })
    // })
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/GabrielLock')
      const data = await response.json()
      setUser({
        name: data.login,
        avatar: data.avatar_url,
      })
    }
    fetchData()
  }, [])
  return (
    <div className='container'>
    <header>
    <h1>Lista de Presença</h1>
    <div>
      <strong>{user.name}</strong>
      <img src={user.avatar} alt="Foto de perfil" />
    </div>
    </header>
    <input 
    type="text" 
    placeholder="Digite o nome..."
    onChange = {e => setStudentName(e.target.value)}
    />

    <button type="button" onClick={hanleAddStudent}>Adicionar</button>

    {
      students.map(student => (
      <Card 
      key={student.time}
      name={student.name} 
      time={student.time} 
      />))
    }
    </div>
  )
}