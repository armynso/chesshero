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
    const [topic1, settopic1] = useState(0)
    const [topic2, settopic2] = useState(0)
    const [topic3, settopic3] = useState(0)
    const [topic4, settopic4] = useState(0)
    const [last1, setlast1] = useState(0)
    const [last2, setlast2] = useState(0)
    const [last3, setlast3] = useState(0)
    const [last4, setlast4] = useState(0)
    const [post1, setpost1] = useState(0)
    const [post2, setpost2] = useState(0)
    const [post3, setpost3] = useState(0)
    const [post4, setpost4] = useState(0)

    const forums = Object.values(useSelector(state => state.forum))[0]

    const sessionUser = useSelector(state => state.session.user);

    // console.log('meow', forums || 'hi')
    // console.log(forums[0], '0')

    const countPosts = (n, cat) => {
        if (n == 0) return 0
        let num = 0
        const list = forums?.filter(x => x.category == cat)
        return list?.reduce((acc, curr) => {
            return acc + curr.discourse.length + 1
        }, 0)
    }

    useEffect(() => {
        if (!forums) {
            dispatch(getForums())
        }
        const topic1len = forums?.filter(x => x.category == 'general-chess-discussion').length
        const topic2len = forums?.filter(x => x.category == 'chesshero-feedback').length
        const topic3len = forums?.filter(x => x.category == 'game-analysis').length
        const topic4len = forums?.filter(x => x.category == 'off-topic-discussion').length
        settopic1(topic1len)
        settopic2(topic2len)
        settopic3(topic3len)
        settopic4(topic4len)
        setlast1(topic1len > 0 ? (forums?.filter(x => x.category == 'general-chess-discussion')).slice(-1)[0].username : 'Nobody')
        setlast2(topic2len > 0 ? (forums?.filter(x => x.category == 'chesshero-feedback')).slice(-1)[0].username : 'Nobody')
        setlast3(topic3len > 0 ? (forums?.filter(x => x.category == 'game-analysis')).slice(-1)[0].username : 'Nobody')
        setlast4(topic4len > 0 ? (forums?.filter(x => x.category == 'off-topic-discussion')).slice(-1)[0].username : 'Nobody')
        setpost1(countPosts(topic1len, 'general-chess-discussion'))
        setpost2(countPosts(topic2len, 'chesshero-feedback'))
        setpost3(countPosts(topic3len, 'game-analysis'))
        setpost4(countPosts(topic4len, 'off-topic-discussion'))
    }, [dispatch, forums])

    // console.log(topic1, 'topic 1')

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
                                    <NavLink exact to='/forum/general-chess-discussion' style={{ color: '#3692e7', textDecoration: 'none' }}>General Chess Discussion</NavLink>
                                </h2>
                                <p>The place to discuss general chess topics</p>
                            </td>
                            <td>
                                {topic1}
                            </td>
                            <td>
                                {post1}
                            </td>
                            <td>
                                {last1}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h2>
                                    <NavLink exact to='/forum/chesshero-feedback' activeClassName='active' style={{ color: '#3692e7', textDecoration: 'none' }}>Chesshero Feedback</NavLink>

                                </h2>
                                <p>Bug reports, feature requests, suggestions</p>
                            </td>
                            <td>
                                {topic2}
                            </td>
                            <td>
                                {post2}
                            </td>
                            <td>
                                {last2}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h2>
                                    <NavLink exact to='/forum/game-analysis' activeClassName='active' style={{ color: '#3692e7', textDecoration: 'none' }}>Game analysis</NavLink>


                                </h2>
                                <p>Show your game and analyse it with the community</p>
                            </td>
                            <td>
                                {topic3}
                            </td>
                            <td>
                                {post3}
                            </td>
                            <td>
                                {last3}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h2>
                                    <NavLink exact to='/forum/off-topic-discussion' activeClassName='active' style={{ color: '#3692e7', textDecoration: 'none' }}>Off-Topic Discussion</NavLink>
                                </h2>
                                <p>Everything that isn't related to chess</p>
                            </td>
                            <td>
                                {topic4}
                            </td>
                            <td>
                                {post4}
                            </td>
                            <td>
                                {last4}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
