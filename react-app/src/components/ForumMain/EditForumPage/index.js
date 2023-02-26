import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import { createForum, editForum, getForums } from '../../../store/forum';
import './editforum.css'

export default function EditForumPage() {
    const [errors, setErrors] = useState([])
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    // console.log(location, 'this is location')
    // console.log(location.state)

    const { id: oldId, category: oldCategory, content: oldContent, header: oldHeader } = location.state.thisForum
    console.log(oldId, oldContent, oldCategory, oldHeader)

    const [header, setHeader] = useState(oldHeader)
    const [content, setContent] = useState(oldContent)

    // const { category } = useParams()

    const onChange = e => {
        const input = e.currentTarget.value;
        if (/^[^!-\/:-@\[-`{-~]+$/.test(input) || input === "") {
            setHeader(input);
        }
    }

    const submit = async (e) => {
        // console.log(e, 'e')
        e.preventDefault()

        setErrors([]);
        const check = await dispatch(editForum({ header, content, category: oldCategory, id: oldId }))
            .then(() => dispatch(getForums()))
            .catch(async (res) => {
                // console.log(res, 'this is res 24')
                setErrors(res)
                // console.log(errors, 'errors')

            })
        // console.log('history dot push?')
        if (check) return history.push(`/forum/${oldCategory}/${header}`);
    }

    useEffect(() => {
        const errs = []
    }, [header, content, setValidationErrors])

    const maxLength = 52
    console.log(header, 'what is header')
    return (
        <>
            <div className='create-form-main'>
                <h1>Edit Your Chess Discussion </h1>
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
                            // placeholder={oldHeader}
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
                            // placeholder={oldContent}
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
