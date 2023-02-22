import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getForums } from '../../store/forum';
import './forumMain.css'

export default function Forum() {
    const dispatch = useDispatch()

    const forums = Object.values(useSelector(state => state.forum))[0]

    console.log('meow', forums || 'hi')
    // console.log(forums[0], '0')

    useEffect(() => {
        dispatch(getForums())
        // console.log(forums)
    }, [dispatch])

    console.log(forums, 'this si forum')

    const forumList = forums?.map(forum => {
        return (
            <div key={forum?.id} className='forumSingle'>
                <div>{forum?.header}</div>
                {/* <div>{forum?.content}</div> */}
            </div>
        )
    })

    console.log(forumList || 'nope')

    return (
        <>
            <div className='forumGroup'>
                <div></div>
                <div className='forumUpper'>
                    <h1 className='forumHeader'>ChessHero Forum</h1>
                    <NavLink to='createForum'>
                        <button className='forumButton'>CREATE A NEW TOPIC</button>
                    </NavLink>
                </div>
                <div >{forumList}</div>
            </div>
        </>
    )
}
