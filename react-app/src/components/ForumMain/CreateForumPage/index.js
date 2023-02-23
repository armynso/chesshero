import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { createForum, getForums } from '../../../store/forum';
import './createforum.css'

export default function CreateForumPage() {
    const [header, setHeader] = useState()
    const [content, setContent] = useState()
    const [errors, setErrors] = useState([])
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()

    const { category } = useParams()

    const submit = async (e) => {
        // console.log(e, 'e')
        e.preventDefault()

        setErrors([]);
        const check = await dispatch(createForum({ header, content, category }))
            .then(() => dispatch(getForums()))
            .catch(async (_req, res) => {
                if (res && res.errors) {
                    // console.log('something here??')
                    setErrors(res.errors);
                }

            })
        // console.log('history dot push?')
        if (check) return history.push('/forum');
    }

    useEffect(() => {
        const errs = []

    }, [header, content, setValidationErrors])

    return (
        <>
            <div className='create-form-main'>
                <h1>Create Your Chess Discussion </h1>
                <form onSubmit={submit} >
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <ul className="errors">
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <label className="forum-label">
                        Subject
                        <input
                            // placeholder=""
                            type="text"
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                            required
                        />
                    </label>
                    <label className="forum-label">
                        Message
                        <textarea
                            // placeholder=""
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </label>
                    {!!validationErrors.length && (
                        <div style={{ textAlign: 'center' }}>
                            Please provide valid information before submitting.
                        </div>
                    )}
                    <button type="submit" className="submit-forum" disabled={!!validationErrors.length}>Confirm</button>

                </form>
            </div>

        </>
    )
}
