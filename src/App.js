import React from 'react'
import {over} from 'stompjs'
import SockJS from 'sockjs-client'
import Name from './elements/Name'
import Join from './elements/Join'
import Create from './elements/Create'
import Modal from "./Modal/Modal"

let stompClient = null
let number = -1     //нехорошо так делать :(
let gameCode = -1
let playerCounter = 1

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
    if (gameCode === -1) {
        stompClient.subscribe('/user/queue/create', onMessageReceived)
        stompClient.send("/app/create", {}, JSON.stringify(chatMessage))
    } else {
        stompClient.subscribe('/topic/room/' + chatMessage.roomId.toString(), onMessageReceived)
    }
}


const onMessageReceived = (payload)=>{

    // сделайте отображение room code
    let payloadData = JSON.parse(payload.body)
    console.log(payloadData)
    let chatMessage = {
        //numberOfPlayer: payloadData.numberOfPlayer,
        playerName: "abob",
        roomId: payloadData.roomId
    };
    gameCode = chatMessage.roomId

    let chatMessage2 = {
        currentPlayerNumber: 2,
        Action:"PLAYERJOIN"
    };
    //stompClient.subscribe('/topic/room/' + chatMessage.roomId.toString(), onMessageReceived)
    //stompClient.send("/app/room/" + chatMessage.roomId.toString(), {}, JSON.stringify(chatMessage2))
    stompClient.subscribe('/topic/room/' + chatMessage.roomId.toString(), onWaitMessageReceived())
    stompClient.send("/app/room/" + chatMessage.roomId.toString(), {}, JSON.stringify(chatMessage))
}

const onWaitMessageReceived = (payload)=>{
    let payloadData = JSON.parse(payload.body)
    console.log(payloadData)
    // let chatMessage = {
    //     currentPlayerNumber: payloadData.roomId,
    //     Action: "PLAYERJOIN"
    // };
    // обновляешь счетчик
    // Проверять не равно ли Action GAMESTART
    // создать новое окон(или как хотите, где будет поле игры, когда приходит Action GAMESTART
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
    const [modalWaitActive, setModalWaitActive] = React.useState(false)
    let [counter, setCounter] = React.useState(0) //нельзя так делать
    let [id, setId] = React.useState(0)
    const [name, setName] = React.useState('anonim' + playerCounter.toString())
    //const [number, setNumber] = React.useState('')

    return (
        <div className="main">
            <p style={styles.name}>Nastolka</p>
            <Name setName={setName}/>
            <Join onJoin={joinRoom} name={name}/>
            <Create onConnect={createRoom} name={name}/>
            <button onClick={()=>setModalWaitActive(true)}></button>
            <Modal active={modalWaitActive} setActive={setModalWaitActive}>
                <ul className='ul'>
                    <li>Ожидание игроков...</li>
                    <li><span>Номер комнаты: </span><em>{gameCode}</em></li>
                    <li><span>Игроков подключилось: </span><em>{counter}/{number}</em></li>
                </ul>
                <button onClick={()=> setCounter(counter++)}></button>
            </Modal>
        </div>
    )
}

export default App;
