import React from 'react'
import Name from './elements/Name'
import Join from './elements/Join'
import Create from './elements/Create'
import Start from './elements/Start'

const styles = {
    name: {
        textAlign: 'center',
        fontSize: '2em',
        fontWeight: 'bold',
        marginBottom: 'auto'
    }
}

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
            <p style={styles.name}>Nastolka</p>
            <Name onChange={changeName}/>
            <Join onJoin={start} name={name}/>
            <Create onConnect={start} name={name}/>
            {code ? <Start name={name} code={code}/> : <p>Entry code to start</p>}
        </div>
    )
}

export default App;
