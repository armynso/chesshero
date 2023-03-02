import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { Range } from 'react-range';
// import { createForum, getForums } from '../../../store/forum';
import './createGame.css'
import { ReactComponent as Bk } from './assets/bK.svg'
import { ReactComponent as WBk } from './assets/wbK.svg'
import { ReactComponent as Wk } from './assets/wK.svg'
import { createMatch } from '../../../store/match';
import { useModal } from '../../../context/Modal';
import { io } from 'socket.io-client';

let socket;

export default function CreateGameModal() {
    const [header, setHeader] = useState("")
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const sessionUser = useSelector(state => state.session.user);
    // const seekers = useSelector(state => state.matches);

    const [check, setCheck] = useState(false)

    const [minutes, setMinutes] = useState('3')
    const [increment, setIncrement] = useState('3')
    const [mode, setMode] = useState('Casual')

    useEffect(() => {
        const errs = []

        socket = io();

        // socket.on("chat", (chat) => {
        //     setMessages(messages => [...messages, chat])
        // })
        // when component unmounts, disconnect
        // console.log(chatInput, messages, 'messages?')

        return (() => {
            socket.disconnect()
        })

    }, [minutes])

    const outputMinutes = (() => {
        if (minutes == 0) return '1'
        if (minutes == 1) return '2'
        if (minutes == 2) return '3'
        if (minutes == 3) return '4'
        if (minutes == 4) return '5'
        if (minutes == 5) return '10'
        if (minutes == 6) return '15'
        return '30'
    })()
    const outputIncrements = (() => {
        if (increment == 0) return '0'
        if (increment == 1) return '1'
        if (increment == 2) return '2'
        if (increment == 3) return '3'
        if (increment == 4) return '4'
        if (increment == 5) return '5'
        if (increment == 6) return '6'
        return '7'
    })()


    // {
    //     if (minutes == 1) {
    //         return 'Hi'
    //     }
    //     return 'Boss'
    // }

    // const temp = () => {
    //     console.log('test')
    // }

    // player1Username = form.data['player1Username'],
    // player1Color = form.data['player1Color'],
    // time = form.data['time'],
    // increment = form.data['increment'],
    // rated = form.data['rated']

    const createGame = (color) => {
        console.log(outputMinutes, increment, check, mode, 'before submit')
        console.log(sessionUser.username, color)
        dispatch(createMatch({ player1Username: sessionUser.username, player1Color: color, time: outputMinutes, increment, rated: check, player1Elo: sessionUser.elo }))
        socket.emit("chat", { seeking: true })
        closeModal()
    }

    return (
        <>
            <div className='createGameModal'>
                <h2 className='createGameHeader'>
                    Create a game
                </h2>


                <div className='sliderInCreateGame'>
                    {outputMinutes} {outputMinutes == '1' ? 'minute' : 'minutes'}
                    <input
                        class='inputRange'
                        type='range'
                        min='0'
                        max='7'
                        step='1'
                        defaultValue={3}
                        onChange={e => setMinutes(e.target.value)}
                    // value={minutes}
                    />
                </div>
                <div className='sliderInCreateGame'>
                    {outputIncrements} {outputIncrements <= '1' ? 'second' : 'seconds'} increment
                    <input
                        class='inputRange'
                        type='range'
                        min='0'
                        max='7'
                        step='1'
                        defaultValue={3}
                        onChange={e => setIncrement(e.target.value)}
                    />
                </div>
                {/* <div>
                    <input
                        type='radio'

                    />
                </div> */}
                {/* <div className='ratedCasual'></div> */}
                <label class="switch">
                    <input type="checkbox"
                        onChange={() => {
                            setCheck(!check)
                            if (!check) setMode('Rated')
                            else setMode('Casual')
                        }}
                    />
                    <span class="slider">

                    </span>
                </label>
                <div className='submitChessPieces'>

                    <button onClick={() => createGame('black')}>
                        <Bk
                            className='Bk'

                        />
                    </button>
                    <button onClick={() => createGame('random')}>
                        <WBk
                            className='Bk'

                        />
                    </button>
                    <button onClick={() => createGame('white')}>
                        <Wk
                            className='Bk'
                        />
                    </button>
                </div>

            </div>
        </>
    )
}
