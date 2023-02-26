import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { createForum, getForums } from '../../../store/forum';
import './createforum.css'

export default function CreateForumPage() {
    const [header, setHeader] = useState("")
    const [content, setContent] = useState("")
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
            .catch(async (res) => {
                // console.log(res, 'this is res 25')
                setErrors(res)
                // console.log(errors, 'errors')
                // if (res && res.errors) {
                //     console.log('something here??', res)
                //     setErrors(res.errors);
                // }

            })
        // console.log('history dot push?')
        console.log(check, 'checky')
        if (check) return history.push(`/forum/${category}`);
    }

    useEffect(() => {
        const errs = []

    }, [header, content, setValidationErrors])

    const onChange = e => {
        const input = e.currentTarget.value;
        if (/^[^!-\/:-@\[-`{-~]+$/.test(input) || input === "") {
            setHeader(input);
        }
    }
    const maxLength = 52
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
                            onChange={onChange}
                            maxLength='52'
                            required
                        />
                        <div>Characters left: {maxLength - header.length}</div>
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
