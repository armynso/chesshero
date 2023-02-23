import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { AddForumButton } from '..';
import { getForums } from '../../../store/forum';
import './forumCat.css'


export default function ForumCategory() {
    const dispatch = useDispatch()

    const forums = Object.values(useSelector(state => state.forum))[0]

    const sessionUser = useSelector(state => state.session.user);

    const { category } = useParams()

    useEffect(() => {
        if (!forums) {
            dispatch(getForums())
        }
        // console.log(forums)
    }, [dispatch, forums])

    console.log(forums, 'this si forum')
    //blank replies last post
    const forumList = forums?.filter(x => x.category == category).map(forum => {
        // console.log(forum.header, 'actual headre')
        console.log(encodeURIComponent(forum.header), 'test encode')
        return (
            <NavLink to={`/forum/${category}/${encodeURI(forum.header)}`} style={{ textDecoration: 'none' }}>
                <div key={forum?.id} className='forumSingle'>
                    <div>{forum?.header}</div>
                    {/* <div>{forum?.content}</div> */}
                </div>
            </NavLink>
        )
    })
    return (
        <>
            <div className='forumGroup'>
                <div></div>
                <div className='forumUpperCat'>
                    <div className='makeFlexCat'>
                        <NavLink exact to='/forum' style={{ color: '#57aeff' }}><div><i class="fa-solid fa-chevron-left fa-2xl"></i></div></NavLink>
                        <h1 className='forumHeader'>{category == 'general-chess-discussion' ? 'General Chess Discussion' : category == 'chesshero-feedback' ? 'Chesshero Feedback' : category == 'game-analysis' ? 'Game Analysis' : 'Off-Topic Discussion'}</h1>
                    </div>
                    <AddForumButton category={category} />
                </div>
                <div >{forumList}</div>
            </div>
        </>
    )
}
