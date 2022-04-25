import React from 'react'
import {over} from 'stompjs'
import SockJS from 'sockjs-client'
import Name from './elements/Name'
import Join from './elements/Join'
import Create from './elements/Create'
import Modal from "./Modal/Modal"

let stompClient = null
let number = -1
let gameCode = -1

const connect = ()=>{
    let Sock = new SockJS('https://mem.borodun.works/api/v1/ws')
    stompClient = over(Sock)
    stompClient.connect({},onConnected, onError)
}

const onConnected = () => {
    let chatMessage = {
        numberOfPlayer: number,
        roomId: gameCode
    };
    /*let chatMessage2 = {
        currentPlayerNumber: 2,
        Action:"PLAYERJOIN"
    };*/
    if (gameCode === -1) {
        stompClient.subscribe('/user/queue/create', onMessageReceived)
        stompClient.send("/app/create", {}, JSON.stringify(chatMessage))
    } else {
        stompClient.subscribe('/topic/room/' + chatMessage.roomId.toString(), onMessageReceived)
    }
}


const onMessageReceived = (payload)=>{
    let payloadData = JSON.parse(payload.body)
    console.log(payloadData)
    let chatMessage = {
        numberOfPlayer: payloadData.numberOfPlayer,
        roomId: payloadData.roomId
    };
    let chatMessage2 = {
        currentPlayerNumber: 2,
        Action:"PLAYERJOIN"
    };
    stompClient.subscribe('/topic/room/' + chatMessage.roomId.toString(), onMessageReceived)
    stompClient.send("/app/room/" + chatMessage.roomId.toString(), {}, JSON.stringify(chatMessage2))
}

const onError = (err) => {
    console.log(err)
}

const createRoom=(numberOfPlayer)=>{
    console.log("Creating room")
    number = numberOfPlayer
    connect()
}

const joinRoom=(roomId)=>{
    console.log("Joining room")
    gameCode=(roomId)
    connect()
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

    const [modalCreateActive, setModalCreateActive] = React.useState(false)
    const [modalJoinActive, setModalJoinActive] = React.useState(false)
    const [name, setName] = React.useState('anonim')
    //const [number, setNumber] = React.useState('')

    function changeName(newName) {
        setName(newName)
    }

    return (
        <div className="main">
            <p style={styles.name}>Nastolka</p>
            <Name onChange={changeName}/>
            <Join onJoin={joinRoom} setModalActive={setModalJoinActive} name={name}/>
            <Create onConnect={createRoom} setModalActive={setModalCreateActive} name={name}/>
            <Modal active={modalCreateActive} setActive={setModalCreateActive}>
                <p>Число игроков должно быть от 2 до 10!</p>
            </Modal>
            <Modal active={modalJoinActive} setActive={setModalJoinActive}>
                <p>Код может состоять только из цифр!</p>
            </Modal>
        </div>
    )
}

export default App;
