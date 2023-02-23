import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getForums } from '../../store/forum';
import './forumMain.css'

export function AddForumButton({ category }) {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <>
            {
                sessionUser ? <NavLink to={`/forum/${category}/createForum`}>
                    <button className='forumButton'>CREATE A NEW TOPIC</button>
                </NavLink> : <div className='forumSignIn'>Please sign in to create a forum</div>
            }
        </>
    )
}

export default function Forum() {
    const dispatch = useDispatch()
    const [topic1, settopic1] = useState('')

    const forums = Object.values(useSelector(state => state.forum))[0]

    const sessionUser = useSelector(state => state.session.user);

    console.log('meow', forums || 'hi')
    // console.log(forums[0], '0')


    useEffect(() => {
        if (!forums) {
            dispatch(getForums())
        }
        settopic1(forums?.filter(x => x.category == 'general-chess-discussion').length)
    }, [dispatch, forums])

    console.log(topic1, 'topic 1')

    return (
        <>
            <div className='forumGroup'>
                <div></div>
                <div className='forumUpper'>
                    <h1 className='forumHeader'>ChessHero Forum</h1>
                    {/* <AddForumButton /> */} //add search here
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>
                                Topics
                            </th>
                            <th>
                                Posts
                            </th>
                            <th>
                                Last post
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <h2>
                                    <NavLink exact to='/forum/general-chess-discussion' activeClassName='active' style={{ color: '#3692e7' }}>General Chess Discussion</NavLink>
                                </h2>
                                <p>The place to discuss general chess topics</p>
                            </td>
                            <td>
                                {topic1}
                            </td>
                            <td>
                                12345
                            </td>
                            <td>
                                armynso
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h2>
                                    <NavLink exact to='/forum/chesshero-feedback' activeClassName='active' style={{ color: '#3692e7' }}>Chesshero Feedback</NavLink>

                                </h2>
                                <p>Bug reports, feature requests, suggestions</p>
                            </td>
                            <td>
                                123
                            </td>
                            <td>
                                12345
                            </td>
                            <td>
                                armynso
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h2>
                                    <NavLink exact to='/forum/game-analysis' activeClassName='active' style={{ color: '#3692e7' }}>Game analysis</NavLink>


                                </h2>
                                <p>Show your game and analyse it with the community</p>
                            </td>
                            <td>
                                123
                            </td>
                            <td>
                                12345
                            </td>
                            <td>
                                armynso
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h2>
                                    <NavLink exact to='/forum/off-topic-discussion' activeClassName='active' style={{ color: '#3692e7' }}>Off-Topic Discussion</NavLink>
                                </h2>
                                <p>Everything that isn't related to chess</p>
                            </td>
                            <td>
                                123
                            </td>
                            <td>
                                12345
                            </td>
                            <td>
                                armynso
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
