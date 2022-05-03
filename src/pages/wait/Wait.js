import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import SockJS from 'sockjs-client'
import {over} from "stompjs";
import "./wait.css"

let stompClient
let state1
let navigate

let number = -1
let gameCode = -1
let playerCounter = 0

const connect = () => {
    let Sock = new SockJS('https://whatmemareyou.tech/api/v1/ws')
    stompClient = over(Sock)
    stompClient.connect({}, onConnected, onError)
}

const onConnected = () => {

    if (state1.state.code === -1) {
        onCreate()
    } else {
        onJoin()
    }
}

const onCreate = () => {
    let chatMessage = {
        type: "Create",
        numberOfPlayer: state1.state.numberOfPlayers
    }
    stompClient.subscribe('/user/queue/create', onMessageReceived)
    stompClient.send("/app/create", {}, JSON.stringify(chatMessage))
}

const onMessageReceived = (payload) => {

    let payloadData = JSON.parse(payload.body)
    console.log(payloadData)
    let chatMessage = {
        type: "Connect",
        playerName: state1.state.name
    };
    gameCode = payloadData.roomID
    number = payloadData.numberOfPlayers

    stompClient.subscribe('/topic/room/' + gameCode.toString(), onWaitMessageReceived)
    stompClient.send("/app/room/" + gameCode.toString(), {}, JSON.stringify(chatMessage))
}

const onJoin = () => {
    let chatMessage = {
        type: "Connect",
        playerName: state1.state.name
    }
    gameCode = state1.state.code

    stompClient.subscribe('/topic/room/' + gameCode.toString(), onWaitMessageReceived)
    stompClient.send("/app/room/" + gameCode.toString(), {}, JSON.stringify(chatMessage))
}

const onWaitMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body)
    console.log(payloadData)
    if (payloadData.type === "GameStart") {
        console.log('Game started')
        navigate('/game/' + gameCode.toString(), {
            replace: true,
            state: {players: payloadData.players}
        })
    }
    let chatMessage = {
        type: payloadData.type,
        current: payloadData.current,
        maxNumber: payloadData.max,
        action: payloadData.action
    }
    playerCounter = chatMessage.current
    number = chatMessage.maxNumber
}

const onError = (err) => {
    console.log(err)
}

function start() {
    console.log(state1)
    connect()
    playerCounter++
}

function Wait() {
    let [temp, setTemp] = React.useState(0)
    navigate = useNavigate()
    state1 = useLocation()
    if (playerCounter === 0) start()
    return (
        <div>
            <p>Username: {state1.state.name}</p>
            <p>Game code: {gameCode}</p>
            <p>Connected players: {playerCounter}/{number}</p>
            <button onClick={() => setTemp(temp++)}>Обновить</button>
        </div>
    )
}

export default Wait;
