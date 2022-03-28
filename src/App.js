import React from 'react'
import Name from './elements/Name'
import Join from './elements/Join';
import Connect from './elements/Connect';

function App() {

  const [name, setName] = React.useState('')
  const [code, setCode] = React.useState('')

  function changeName(newName) {
    setName(newName)
    console.log('Name: ', name)
  }

  function start(newCode) {
    setCode(newCode)
    console.log('You are started the game with name ', name, ' and code ', code)
  }

  return (
    <div>
      <h1>Nastolka</h1>
      <Name onChange={changeName} />
      <Join onJoin={start} />
      <Connect onConnect={start} />
    </div>
  )
}

export default App;
