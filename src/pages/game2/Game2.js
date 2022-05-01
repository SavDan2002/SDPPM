import React from 'react';
import { useParams } from 'react-router-dom'

function Game2() {
    const {id} = useParams();
    return (
        <div>
            GAME {id} STARTED!
        </div>
    )
}

export default Game2;