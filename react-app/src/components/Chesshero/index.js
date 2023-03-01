import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { deleteMatch, getMatches } from '../../store/match';
import { Chessboard } from 'kokopu-react';
import { io } from 'socket.io-client';
// import { createForum, getForums } from '../../../store/forum';
import './chesshero.css'

let socket;

export default function Chesshero() {

    const [theme, setTheme] = useState("original")
    const [pieces, setPieces] = useState("cburnett")
    const [boardsize, setBoardsize] = useState(82)

    console.log(Chessboard.maxSquareSize(), Chessboard.minSquareSize())

    // console.log(boardsize, 'size')

    const themeList = [
        {
            label: "original",
            value: "original",
        },
        {
            label: "dusk",
            value: "dusk",
        },
        {
            label: "emerald",
            value: "emerald",
        },
        {
            label: "gray",
            value: "gray",
        },
        {
            label: "marine",
            value: "marine",
        },
        {
            label: "sandcastle",
            value: "sandcastle",
        },
        {
            label: "scid",
            value: "scid",
        },
        {
            label: "wheat",
            value: "wheat",
        },
        {
            label: "wikipedia",
            value: "wikipedia",
        },
        {
            label: "xboard",
            value: "xboard",
        }
    ];

    const pieceList = [
        {
            label: "cburnett",
            value: "cburnett",
        },
        {
            label: "celtic",
            value: "celtic",
        },
        {
            label: "eyes",
            value: "eyes",
        },
        {
            label: "fantasy",
            value: "fantasy",
        },
        {
            label: "skulls",
            value: "skulls",
        },
        {
            label: "spatial",
            value: "spatial",
        }
    ];

    return (
        <>
            <h1>Let's jam</h1>
            <div>
                <select
                    value={theme}
                    onChange={e => setTheme(e.target.value)}
                >
                    {themeList.map(x => {
                        return (
                            <option
                                value={x.value}>
                                {x.label}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div>
                <select
                    value={pieces}
                    onChange={e => setPieces(e.target.value)}
                >
                    {pieceList.map(x => {
                        return (
                            <option
                                value={x.value}>
                                {x.label}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className='sliderChessHero'>
                {/* {outputIncrements} {outputIncrements <= '1' ? 'second' : 'seconds'} increment */}
                <input
                    class='inputRange'
                    type='range'
                    min={12}
                    max={96}
                    step={1}
                    defaultValue={82}
                    onChange={e => setBoardsize(Number(e.target.value))}
                />
            </div>
            <Chessboard colorset={theme} pieceset={pieces} squareSize={boardsize} animated={true} interactionMode="playMoves" onMovePlayed={move => (move)} />
            {/* <Chessboard interactionMode="playMoves" position="rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" /> */}
        </>
    )
}
