import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...
    // aca deberia hacer uso de useEffect para hacer un get de lo que hay en la base de datos y setear con setResources las resources que serian todas las notes o persons
    useEffect(() => {
        axios
            .get(baseUrl).then(response => {
                setResources(response.data)
            }).catch(err => {
                console.log(err)
            })
    }, [baseUrl])

  const create = (resource) => {
    // ...
      // aca deberia hacer un post de lo que me llega, la resource, que es el objeto de una note o de una person, el id lo crea axios
      
      axios
          .post(baseUrl, resource)
          .then(response => {
              const newData = resources.concat([response.data])
              setResources(newData)
          })
          .catch(err => console.log(err))
          
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App