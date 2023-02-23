import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
// import { AddForumButton } from '..';
import { getForums } from '../../../store/forum';
import { getDiscourses, createDiscourse } from '../../../store/discourse';
import EditForumPage from '../EditForumPage';
import './forumSingle.css'

export default function SingleForumPage() {
    const [thisForum, setThisForum] = useState()
    const [edited, setEdited] = useState(false)
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()

    const forums = Object.values(useSelector(state => state.forum))[0]
    const discourses = Object.values(useSelector(state => state.discourse))[0]
    console.log(discourses, 'discourses ?')

    const sessionUser = useSelector(state => state.session.user);

    const { category, header } = useParams()
    console.log(header, 'this is header')


    // console.log('test%20subject', decodeURI('test%20subject'))

    const longAgo = (time) => {
        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 }
        ];
        let seconds = Math.floor((Date.now() - Date.parse(time)) / 1000)
        // console.log(time, thisForum?.updated_at)
        if (edited) {
            seconds = Math.floor((Date.now() - Date.parse(thisForum?.updated_at)) / 1000)
        }
        // console.log(seconds, 'seconds', Date.now(), Date.parse(time))
        const interval = intervals.find(i => i.seconds < seconds);
        const count = Math.floor(seconds / interval.seconds);
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }

    useEffect(() => {
        if (!forums) {
            dispatch(getForums())
        }
        console.log(decodeURI(header), 'test header')
        setThisForum(forums?.find(x => x.header == decodeURI(header)))
        console.log(thisForum, 'this forum')
        if (thisForum?.created_at != thisForum?.updated_at) {
            setEdited(true)
        }
    }, [dispatch, forums, thisForum, edited])

    const editForum = (e) => {
        history.push('/forum/edit', { thisForum })
    }

    const submit = async (e) => {
        e.preventDefault()
        const check = await dispatch(createDiscourse({ id: thisForum.id, post: comment }))
            .then(() => dispatch(getDiscourses()))
            .catch(async (_req, res) => {
                if (res && res.errors) {
                    setErrors(res.errors);
                }
            })
        if (check) setComment('')
    }

    const allComments = () => {
        
    }

    return (
        <>
            <div className='forumGroupSingleForum'>
                <div></div>
                <div className='forumUpperCat'>
                    <div className='makeFlexCat'>
                        <NavLink exact to={`/forum/${category}`} style={{ color: '#57aeff' }}><div><i class="fa-solid fa-chevron-left fa-2xl"></i></div></NavLink>
                        <h1 className='forumHeader'>{header}</h1>
                    </div>
                    {/* <AddForumButton category={category} /> */}
                </div>
                <div className='comment'>
                    <div className='usernameHeaderSingle'>
                        <div className='usernameSingleForum'>{thisForum?.username}</div>
                        <div className='timeSingleForum'>{edited ? 'Edited' : null} {thisForum ? longAgo(thisForum?.created_at || 0) : null}</div>
                        {sessionUser?.username == thisForum?.username ? <button onClick={() => editForum()}>Edit</button> : null}
                    </div>
                    <p>{thisForum?.content}</p>
                    <hr classname='hrLine'></hr>
                </div>
                <div>
                    <form onSubmit={submit}>
                        <label className='commentLabel'>
                            <div>Reply to this topic</div>
                            <textarea
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                        </label>
                        <button className="replyButton">Reply</button>
                    </form>
                </div>
            </div>
        </>
    )
}
