import React from 'react';
import {useParams} from 'react-router-dom'

function Game() {
    const {id} = useParams();
    return (
        <div>
            GAME {id} STARTED!
        </div>
    )
}

export default Game;