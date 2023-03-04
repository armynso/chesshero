import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Prompt, useHistory, useLocation, useParams } from 'react-router-dom';
import { deleteMatch, getMatches } from '../../store/match';
import { Chessboard, SquareMarkerIcon } from 'kokopu-react';
import { Position } from 'kokopu';
import { io } from 'socket.io-client';
// import { createForum, getForums } from '../../../store/forum';
import './chesshero.css'
import { deleteGame, getGames } from '../../store/game';

let socket;

const position = new Position()

export default function Chesshero() {

    const dispatch = useDispatch()
    const [theme, setTheme] = useState("original")
    const [pieces, setPieces] = useState("cburnett")
    const [boardsize, setBoardsize] = useState(82)
    const [thisMove, setThisMove] = useState()
    const [thisPosition, setThisPosition] = useState('start')
    const [thisGame, setThisGame] = useState(null)

    const sessionUser = useSelector(state => state.session.user);
    const games = Object.values(useSelector(state => state.game))[0];
    const location = useLocation()
    const { myColor } = { ...location.state }

    // console.log(myColor, 'color')

    useEffect(() => {
        console.log('how many')
        if (Array.isArray(games)) {
            socket = io()
            console.log(games, 'this socket game')
            // dispatch(getGames())



            console.log('inside this game')
            console.log({
                room: games?.slice(-1)[0].id,
                player: sessionUser.username
            }, 'right data?')
            socket.emit("join", {
                room: games?.slice(-1)[0].id,
                player: sessionUser.username
            })

            socket.on("move", (data) => {
                console.log(data, 'data')
                dispatch(getGames())
            })


            return (() => {
                socket.disconnect()
            })
        }

    }, [dispatch, games, thisPosition])

    console.log('hello?')

    useEffect(() => {
        console.log('how many 2')
        // setThisPosition(position.fen())
        console.log(thisPosition, 'useEffect')
        console.log(thisGame, 'this  game2')

        // if (!Array.isArray(games)) {
        //     dispatch(getGames())
        // } else {
        //     console.log('does it go here line 115')
        //     console.log(games.slice(-1)[0], 'right after')
        //     setThisGame(games.slice(-1)[0])
        // }

        dispatch(getGames())

        setThisGame(games?.slice(-1)[0])

        // return (() => {
        //     dispatch(deleteGame())
        // })
    }, [position, dispatch, thisGame])



    // console.log(Chessboard.maxSquareSize(), Chessboard.minSquareSize())

    // console.log(boardsize, 'size')

    // const currentPosition = () => {
    //     // setThisPosition(position.fen())
    //     return thisPosition
    // }

    let CurrentBoard = (a) => {
        return (
            <>
                <Chessboard colorset={theme} pieceset={pieces} position={a.thisPosition} move={thisMove} squareSize={boardsize} animated={true} interactionMode="playMoves" onMovePlayed={move => handleMove(move)} />
            </>
        )
    }


    const handleMove = (m) => {
        // console.log(m, 'mmmmmmMmmmmMmmmmM<mmmmmmmmmmmmmmMmmm')
        // setThisMove(m)
        // console.log(m, 'm', Object.keys(m).length === 0)
        // if (thisPosition == 'start' && !m) {
        //     console.log(m, 'test')
        //     return (
        //         <>
        //             <Chessboard colorset={theme} pieceset={pieces} position={'start'} move={thisMove} squareSize={boardsize} animated={true} interactionMode="playMoves" onMovePlayed={move => HandleMove(move)} />
        //         </>
        //     )
        // }

        position.play(m)
        // console.log(position.fen())
        const fen = position.fen()
        setThisPosition(() => fen)
        // setThisMove(() => m)
        // console.log(thisPosition, 'this position %')

        console.log(m, 'boss', games?.slice(-1)[0].id)
        socket.emit("move", {
            move: m,
            fen: fen,
            room: games?.slice(-1)[0].id
        })
        // return (
        //     <>
        //         <Chessboard colorset={theme} pieceset={pieces} position={position.fen()} move={thisMove} squareSize={boardsize} animated={true} interactionMode="playMoves" onMovePlayed={move => HandleMove(move)} />
        //     </>
        // )


    }

    // var handleMove
    // console.log(games, 'games')



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

            <Chessboard colorset={theme} pieceset={pieces} position={thisPosition} flipped={myColor == 'black'} move={thisMove} squareSize={boardsize} interactionMode="playMoves" onMovePlayed={move => handleMove(move)} />
            {/* <Chessboard interactionMode="playMoves" position="rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" /> */}
            {/* <CurrentBoard /> */}
            <Prompt
                when={games?.length > 0}
                message='You will automatically surrender your game when you leave the page. Are you sure you want to leave :('
            />
        </>
    )
}
