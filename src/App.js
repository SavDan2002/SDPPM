import React from 'react'
import {over} from 'stompjs'
import SockJS from 'sockjs-client'
import Name from './elements/Name'
import Join from './elements/Join'
import Create from './elements/Create'
import Start from './elements/Start'
import Modal from "./Modal/Modal";

let stompClient = null;
let number = 0; //нехорошо так делать

const connect = ()=>{
    let Sock = new SockJS('https://mem.borodun.works/api/v1/ws');
    stompClient = over(Sock);
    stompClient.connect({},onConnected, onError);
}

const onConnected = () => {
    let chatMessage = {
        numberOfPlayer: number,
        roomId:0
    };
    /*let chatMessage2 = {
        currentPlayerNumber: 2,
        Action:"PLAYERJOIN"
    };*/

    stompClient.subscribe('/user/queue/create', onMessageReceived);
    stompClient.send("/app/create", {}, JSON.stringify(chatMessage));
}


const onMessageReceived = (payload)=>{
    let payloadData = JSON.parse(payload.body);
    console.log(payloadData)
    let chatMessage = {
        numberOfPlayer: payloadData.numberOfPlayer,
        roomId: payloadData.roomId
    };
    let chatMessage2 = {
        currentPlayerNumber: 2,
        Action:"PLAYERJOIN"
    };
    stompClient.subscribe('/topic/room/' + chatMessage.roomId.toString(), onMessageReceived);
    stompClient.send("/app/room/" + chatMessage.roomId.toString(), {}, JSON.stringify(chatMessage2));
}

const onError = (err) => {
    console.log(err);
}

const createRoom=(numberOfPlayer)=>{
    console.log("Creating room");
    number = numberOfPlayer;
    connect();
}

const joinRoom=(roomId)=>{
    console.log("Joining room");
    connect();
}

const styles = {
    name: {
        textAlign: 'center',
        fontSize: '2em',
        fontWeight: 'bold',
        marginBottom: 'auto'
    }
}

function App() {

    const [modalActive, setModalActive] = React.useState(false)
    const [name, setName] = React.useState('anonim')
    const [code, setCode] = React.useState('')
    const [number, setNumber] = React.useState('')

    function changeName(newName) {
        setName(newName)
    }

    // function start(newCode) { - createRoom
    //     setCode(newCode)
    // }

    return (
        <div className="main">
            <p style={styles.name}>Nastolka</p>
            <Name onChange={changeName}/>
            <Join onJoin={joinRoom} name={name}/>
            <Create onConnect={createRoom} setModalActive={setModalActive} name={name}/>
            {code ? <Start name={name} code={code}/> : <p>Entry code to start</p>}
            <button className='button' onClick={() => setModalActive(true)}>Module</button>
            <Modal active={modalActive} setActive={setModalActive}>
                <p>Число игроков должно быть от 2 до 10!</p>
            </Modal>
        </div>
    )
}

export default App;
