import React, { useEffect } from 'react';
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

const connect = ()=>{
    let Sock = new SockJS('https://mem.borodun.works/api/v1/ws')
    stompClient = over(Sock)
    stompClient.connect({},onConnected, onError)
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
        numberOfPlayer: state1.state.numberOfPlayers,
        roomId: state1.state.code
    }
    number = state1.state.numberOfPlayers
    stompClient.subscribe('/user/queue/create', onMessageReceived)
    stompClient.send("/app/create", {}, JSON.stringify(chatMessage))
}

const onMessageReceived = (payload)=>{

    let payloadData = JSON.parse(payload.body)
    console.log(payloadData)
    let chatMessage = {
        roomId: payloadData.roomId,
        playerName: state1.state.name
    };
    gameCode = chatMessage.roomId

    stompClient.send("/app/room/" + chatMessage.roomId.toString(), {}, JSON.stringify(chatMessage))
    stompClient.subscribe('/topic/room/' + chatMessage.roomId.toString(), onWaitMessageReceived)
}

const onJoin = () => {
    let chatMessage = {
        roomId: state1.state.code,
        playerName: state1.state.name
    }
    gameCode = chatMessage.roomId

    stompClient.send("/app/room/" + chatMessage.roomId.toString(), {}, JSON.stringify(chatMessage))
    stompClient.subscribe('/topic/room/' + chatMessage.roomId.toString(), onWaitMessageReceived)
}

const onWaitMessageReceived = (payload)=>{
    let payloadData = JSON.parse(payload.body)
    console.log(payloadData)
    let chatMessage = {
        currentPlayerNumber: payloadData.currentPlayerNumber,
        Action: payloadData.Action
    }
    playerCounter = chatMessage.currentPlayerNumber
    if (chatMessage.Action === "GAMESTART"/* || playerCounter === number*/) {
        navigate('/wait/' + gameCode.toString(), {replace: true, state: {numberOfPlayers: number, gameCode: gameCode, stompClient: 3}})
    }
}

const onError = (err) => {
    console.log(err)
}

function start() {
    console.log(state1)
    connect()
    playerCounter++
}

function Game() {
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

export default Game;
