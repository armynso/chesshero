import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
// import { createForum, getForums } from '../../../store/forum';
import './lobby.css'

export default function Lobby() {
    const [header, setHeader] = useState("")
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()



    useEffect(() => {
        const errs = []

    }, [header, content, setValidationErrors])


    return (
        <>
            <div>
                Lobby
            </div>
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
                                armynso
                            </td>
                            <td>
                                2115
                            </td>
                            <td>
                                3+2
                            </td>
                            <td>
                                Rated
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>
        </>
    )
}
