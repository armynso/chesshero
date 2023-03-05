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

    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);

    const [player1Color, setplayer1Color] = useState('')
    const [player2Color, setplayer2Color] = useState('')
    const [player1Name, setplayer1Name] = useState('')
    const [player2Name, setplayer2Name] = useState('')
    const [player1Elo, setplayer1Elo] = useState(0)
    const [player2Elo, setplayer2Elo] = useState(0)



    const sessionUser = useSelector(state => state.session.user);
    const games = Object.values(useSelector(state => state.game))[0];
    const location = useLocation()
    const { myColor, maxTime, maxInc, isRated } = { ...location.state }

    // console.log(myColor, 'color')

    let currentGame = {}

    useEffect(() => {
        console.log('how many')
        socket = io()
        // if (Array.isArray(games)) {
        //     console.log(games, 'this socket game')
        //     // dispatch(getGames())

        //     currentGame = games.slice(-1)[0]
        //     // setThisGame(games?.slice(-1)[0])
        //     setplayer1Color(currentGame.player1Color)

        //     console.log('inside this game')
        //     console.log({
        //         room: currentGame.id,
        //         player: sessionUser.username
        //     }, 'right data?')
        //     socket.emit("join", {
        //         room: currentGame.id,
        //         player: sessionUser.username
        //     })

        //     socket.on("move", (data) => {
        //         console.log(data, 'just moved')
        //         dispatch(getGames())
        //     })



        //     return (() => {
        //         socket.disconnect()
        //     })
        // }

        socket.on("chatroom", (data) => {
            console.log(data, 'message')
            if (data.move) {
                position.play(data.move)
                const fen = position.fen()
                setThisPosition(() => fen)
            }
            setMessages(messages => [...messages, data])
        })
        return (() => {
            socket.disconnect()
        })

    }, [dispatch, thisPosition])


    // console.log(games?.slice(-1)[0], 'games real')
    // console.log(thisGame, 'games real')

    useEffect(() => {
        console.log('how many 2')
        // setThisPosition(position.fen())
        console.log(thisPosition, 'useEffect')
        console.log(thisGame, 'this  game2')
        if (Array.isArray(games)) {
            currentGame = games.slice(-1)[0]
            setThisGame(games?.slice(-1)[0])
            setplayer1Color(currentGame.player1Color)
            setplayer2Color(currentGame.player1Color == 'white' ? 'black' : 'white')
            setplayer1Name(currentGame.player1)
            setplayer2Name(currentGame.player2)
            setplayer1Elo(currentGame.player1Elo)
            setplayer2Elo(currentGame.player2Elo)
        }
        if (!thisGame) {
            console.log(thisGame, '88')
            dispatch(getGames())
        }

        // if (!Array.isArray(games)) {
        //     dispatch(getGames())
        // } else {
        //     console.log('does it go here line 115')
        //     console.log(games.slice(-1)[0], 'right after')
        //     setThisGame(games.slice(-1)[0])
        // }

        // dispatch(getGames())


        // return (() => {
        //     dispatch(deleteGame())
        // })
    }, [position, dispatch, games])



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
        // socket.emit("move", {
        //     move: m,
        //     fen: fen,
        //     room: games?.slice(-1)[0].id
        // })
        socket.emit("chatroom", { move: m, fen: fen });
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

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chatroom", { user: sessionUser.username, msg: chatInput, room: currentGame.id });
        setChatInput("")
    }

    const chatMessages = () => {
        return (
            <>
                {messages.filter(x => [thisGame?.player1, thisGame?.player2].includes(x.user)).map((message, ind) => (
                    <tr key={ind}>
                        <td>
                            [{message.user}]
                        </td>
                        <td>
                            {message.msg}
                        </td>
                    </tr>
                ))}

            </>
        )
    }

    return (
        <><div className='chessboard-main'>
            {/* <h1>Let's jam</h1> */}
            <div className='labels'>
                <div>
                    <label>Theme</label>
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
                    <label>Pieces</label>
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
                    <label>Board Size</label>
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
            </div>
            <div className='infoBoard'>
                <div >
                    <div className='playerInfo'>
                        <div>
                            {player1Color == 'white' ? <i class="fa-regular fa-circle"></i> : <i class="fa-solid fa-circle"></i>}
                            {' '}
                            {player1Name}
                        </div>
                        <div>
                            {player2Color == 'white' ? <i class="fa-regular fa-circle"></i> : <i class="fa-solid fa-circle"></i>}
                            {' '}
                            {player2Name}
                        </div>
                        <div className='timeControl'>
                            {`Time control: ${maxTime}+${maxInc}`}
                        </div>
                        <div className='isRated'>
                            {isRated ? 'Rated' : 'Casual'}
                        </div>
                    </div>
                    <div className='chatRoom'>
                        <h3>Chat Room!</h3>
                        <hr></hr>
                        <table>
                            {/* <thead>
                                <tr>
                                    <th>Chat Room</th>
                                </tr>
                            </thead> */}
                            <tbody>
                                {chatMessages()}
                            </tbody>
                        </table>
                    </div>
                    <div className='chatInput'>
                        <form onSubmit={sendChat}>
                            <input
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
                <Chessboard colorset={theme} pieceset={pieces} position={thisPosition} flipped={myColor == 'black'} move={thisMove} squareSize={boardsize} interactionMode="playMoves" onMovePlayed={move => handleMove(move)} />
                {/* <Chessboard interactionMode="playMoves" position="rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" /> */}
                {/* <CurrentBoard /> */}
                <div className='elobox'>
                    <div>
                        <div>
                            {sessionUser.username != player1Name ? player1Name : player2Name}
                            <div>{sessionUser.username == player1Name ? player1Elo : player2Elo}</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            {sessionUser.username == player1Name ? player1Name : player2Name}
                            <div>{sessionUser.username != player1Name ? player1Elo : player2Elo}</div>
                        </div>
                    </div>
                </div>
                <Prompt
                    when={games?.length > 0}
                    message='You will automatically surrender your game when you leave the page. Are you sure you want to leave :('
                />
            </div>
        </div>
        </>
    )
}
