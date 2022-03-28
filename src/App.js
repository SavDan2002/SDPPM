import React from 'react'
import Join from './elements/Join';

function App() {

  const [name, setName] = React.useState('')
  const [code, setCode] = React.useState('')
  
  function join(code2, name2) {
    //setCode(code = this.code)
    setCode(code2)
    console.log(code)
    return code
  }

  return (
    <div>
      <h1>Hi</h1>
      <Join onJoin={join} />
    </div>
  )
}

export default App;
