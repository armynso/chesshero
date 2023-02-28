import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { deleteMatch, getMatches } from '../../store/match';
import OpenModalButton from '../OpenModalButton';
import CreateGameModal from './createGame';
// import { createForum, getForums } from '../../../store/forum';
import './lobby.css'

export default function Lobby() {
    const [header, setHeader] = useState("")
    const [content, setContent] = useState("")
    const dispatch = useDispatch()
    // const [errors, setErrors] = useState([])
    // const [validationErrors, setValidationErrors] = useState([]);
    // const dispatch = useDispatch()
    // const history = useHistory()

    const seekers = Object.values(useSelector(state => state.match))[0];
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        // const errs = []
        // console.log(seekers, 'seekers')
        dispatch(getMatches())
    }, [dispatch])

    const yourCreate = [seekers?.find(x => x.player1Username == sessionUser.username)]
    // console.log(yourCreate, 'my create')

    const deleteYourCreate = (id) => {
        dispatch(deleteMatch({ id }))
    }


    const seekersList = seekers?.filter(x => x.player1Username != sessionUser?.username).map(x => {

        const realName = 'pairLobby' + (x.player1Username == sessionUser.username ? " goGreen" : "");

        return (

            <tr className={realName}>
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
            {yourCreate[0] === undefined ?
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
