import React from "react"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home'
import Wait from './pages/wait/Wait'
import Game from './pages/game/Game'
import Layout from './Layout'
import Players from "./Players";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/game" element={<Players/>}>
                            <Route index element={<Wait/>}/>
                            <Route path="/game/:id" element={<Game/>}/>
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App


