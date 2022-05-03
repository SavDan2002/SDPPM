import React, {useState} from 'react';
import {useParams, useLocation} from 'react-router-dom'
import Player from "./Player";

function Game() {
    const {id} = useParams();
    const state1 = useLocation()
    let [players, setPlayers] = useState(state1.state.players)

    return (
        <div>
            <h3>GAME {id} STARTED!</h3>
            <ul>
                {players.map((player) => {
                    return (
                        <Player
                            player={player.name}
                            id={player.id}
                            onChange={setPlayers}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default Game;