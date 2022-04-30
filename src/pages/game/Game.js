import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'

let state
function start() {
    console.log(state.gameCode)
    state.stompClient.subscribe('/topic/room/' + state.gameCode.toString(), onWaitMessageReceived)
    //state.stompClient.send("/app/room/" + chatMessage.roomId.toString(), {}, JSON.stringify(chatMessage))
}

function onWaitMessageReceived() {

}

function Game() {
    const {id} = useParams();
    //state = useNavigationType(state => state);
    state = useLocation()
    return (
        <div>
            <p>Game id: {id}</p>
            {start}
        </div>
    )
}

export default Game;
