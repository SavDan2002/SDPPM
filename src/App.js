import React from "react"
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import Game from './pages/wait/Game'
import Game2 from './pages/game2/Game2'
import Layout from './Layout'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="game" element={<Game/>}/>
                        <Route path="game/:id" element={<Game2/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}
export default App


