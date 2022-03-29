import React from 'react'
import Name from './elements/Name'
import Join from './elements/Join'
import Connect from './elements/Connect'
import Start from './elements/Start'

function App() {

  const [name, setName] = React.useState('anonim')
  const [code, setCode] = React.useState('')

  function changeName(newName) {
    setName(newName)
  }

  function start(newCode) {
    setCode(newCode)
  }

  return (
    <div className="main">
      <h1>Nastolka</h1>
      <Name onChange={changeName} />
      <Join className="h" onJoin={start} name={name} />
      <Connect onConnect={start} name={name}/>
      {code ? <Start name={name} code={code} /> : <h2>Entry code to start</h2>}
    </div>
  )
}

export default App;
