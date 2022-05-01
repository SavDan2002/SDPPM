import React from 'react'
import Name from './elements/Name'
import Join from './elements/Join'
import Create from './elements/Create'

const styles = {
    name: {
        textAlign: 'center',
        fontSize: '2em',
        fontWeight: 'bold',
        marginBottom: 'auto'
    }
}

function Home() {
    const [name, setName] = React.useState('anonim')
    return (
        <div className="main">
            <p style={styles.name}>Nastolka</p>
            <Name setName={setName}/>
            <Join name={name}/>
            <Create name={name}/>
        </div>
    )
}

export default Home;

