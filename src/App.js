import React from "react"
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import Wait from './pages/Wait'
import Game from './pages/game/Game'
import Layout from './Layout'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="wait" element={<Wait/>}/>
                        <Route path=":id" element={<Game/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}
export default App


