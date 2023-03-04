import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { deleteMatch, getMatches } from '../../store/match';
import OpenModalButton from '../OpenModalButton';
import CreateGameModal from './createGame';
import { io } from 'socket.io-client';
// import { createForum, getForums } from '../../../store/forum';
import './lobby.css'
import { createGame } from '../../store/game';

let socket;

export default function Lobby() {
    const [header, setHeader] = useState("")
    const [content, setContent] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
    // const [errors, setErrors] = useState([])
    // const [validationErrors, setValidationErrors] = useState([]);
    // const dispatch = useDispatch()
    // const history = useHistory()

    const seekers = Object.values(useSelector(state => state.match))[0];
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        // const errs = []
        // console.log(seekers, 'seekers')
        // (!sessionUser) dispatch(get)
        dispatch(getMatches())
    }, [dispatch])



    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    // const user = useSelector(state => state.session.user)

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            // console.log(chat, 'chat test')
            if (chat?.found == sessionUser.username) {
                // console.log('got in here? /////////////play')
                return history.push('/play', { myColor: chat.player1Color })
            }
            if (chat?.seeking == true && chat?.skip != sessionUser.username) {
                // console.log('hello boss?')
                dispatch(getMatches())
            }
            // setMessages(messages => [...messages, chat])
        })

        // console.log(chatInput, messages, 'messages?')
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [dispatch])

    // const updateChatInput = (e) => {
    //     setChatInput(e.target.value)
    // };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: sessionUser.username, msg: { chatInput } });
        setChatInput("")
    }

    // const temp = () => {
    //     return (
    //         <div>
    //             <div>
    //                 {messages.map((message, ind) => (
    //                     <div key={ind}>{`${message.user}: ${message.msg} ${message.seeking}`}</div>
    //                 ))}
    //             </div>
    //             <form onSubmit={sendChat}>
    //                 <input
    //                     value={chatInput}
    //                     onChange={updateChatInput}
    //                 />
    //                 <button type="submit">Send</button>
    //             </form>
    //         </div>
    //     )
    // }





    const yourCreate = [seekers?.find(x => x?.player1Username == sessionUser?.username)]
    // console.log(yourCreate, 'my create')

    const deleteYourCreate = (id) => {
        dispatch(deleteMatch({ id }))
        socket.emit("chat", { seeking: true });
    }

    const startGame = (user) => {
        if (!sessionUser) return
        // console.log(user, 'user')
        const data = {
            player1: user.player1Username,
            player2: sessionUser.username,
            player1Color: user.player1Color,
            rated: user.rated,
            player1Time: +user.time * 60,
            player2Time: +user.time * 60,
            increment: +user.increment || 0,
            player1Elo: user.player1Elo, //change this later
            player2Elo: +sessionUser.elo,
            id: user.id
        }
        console.log(data, 'this is bad data')
        const player2Color = user.player1Color == 'black' ? 'white' : 'black';
        const check = dispatch(createGame(data))
            .catch(async (_req, res) => {
                console.log('failed to create game')
                return
            })
        // console.log({ found: user.player1Username, player1Color: user.player1Color })
        socket.emit("chat", { found: user.player1Username, player1Color: user.player1Color, seeking: true })
        return history.push('/play', { myColor: player2Color })
    }


    const seekersList = seekers?.filter(x => x?.player1Username != sessionUser?.username).map(x => {

        const realName = 'pairLobby' + (x?.player1Username == sessionUser?.username ? " goGreen" : "");

        return (

            <tr className={realName} onClick={() => startGame(x)}>
                <td>
                    {x.player1Username}
                </td>
                <td>
                    2115
                </td>
                <td>
                    {x.time}{x.increment != '0' ? `+${x.increment}` : null}
                </td>
                <td>
                    {x.rated ? 'Rated' : 'Casual'}
                </td>
            </tr>

        )
    })

    return (
        <>
            {/* {temp()} */}
            {!sessionUser ? <><p className='waiting'>Please sign-in to create your game!</p></> : yourCreate[0] === undefined ?
                <div className='createGameButton'>
                    <OpenModalButton
                        buttonText="CREATE A GAME"
                        modalComponent={<CreateGameModal />}
                    />
                </div>
                : <><p className='waiting'>Waiting to Pair.<br></br>To cancel, please click your game in the table below</p></>}

            <div className='lobbyTable'>

                <table>
                    <thead>
                        <tr>
                            <th>
                                Player
                            </th>
                            <th>
                                Rating
                            </th>
                            <th>
                                Time
                            </th>
                            <th>
                                Mode
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='pairLobby'>
                            <td>
                                Placeholder
                            </td>
                            <td>
                                9999
                            </td>
                            <td>
                                3+2
                            </td>
                            <td>
                                Rated
                            </td>
                        </tr>
                        {yourCreate[0] !== undefined ? yourCreate?.map(x => {

                            return (

                                <tr className='pairLobby goGreen' onClick={() => deleteYourCreate(x.id)}>
                                    <td>
                                        {x.player1Username}
                                    </td>
                                    <td>
                                        2115
                                    </td>
                                    <td>
                                        {x.time}{x.increment != '0' ? `+${x.increment}` : null}
                                    </td>
                                    <td>
                                        {x.rated ? 'Rated' : 'Casual'}
                                    </td>
                                </tr>

                            )
                        }) : null}
                        {seekersList}


                    </tbody>
                </table>
            </div>
        </>
    )
}
