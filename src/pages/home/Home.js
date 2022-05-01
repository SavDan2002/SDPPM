import React from 'react'
import Name from './elements/Name'
import Join from './elements/Join'
import Create from './elements/Create'

function Home() {
    const [name, setName] = React.useState('anonim')
    return (
        <div className="main">
            <h1>Nastolka</h1>
            <Name setName={setName}/>
            <Join name={name}/>
            <Create name={name}/>
        </div>
    )
}

export default Home;

