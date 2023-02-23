const SET_DISCOURSE = 'session/SET_DISCOURSE';
const REMOVE_DISCOURSE = 'session/REMOVE_DISCOURSE';
const GET_DISCOURSE = 'session/GET_DISCOURSE'

const setDiscourse = (discourse) => ({
    type: SET_DISCOURSE,
    payload: discourse
});

const getDiscourse = (discourse) => ({
    type: GET_DISCOURSE,
    payload: discourse
});

const removeDiscourse = () => ({
    type: REMOVE_DISCOURSE
})


export const getDiscourses = () => async (dispatch) => {
    const response = await fetch('/api/discourses/');
    console.log(response, 'this is discourses ah')
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(getDiscourse(data));
        return 'success'
    }
}

export const createDiscourse = (f) => async (dispatch) => {
    console.log('this is createforum f, ', f)
    const response = await fetch(`/api/discourses/createDiscourse/${f.id}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(f)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setDiscourse(data))
        return 'success'
    }

    const data = await response.json()
    return data.errors || 'Error on createForum'
}

// export const editDiscourse = (f) => async (dispatch) => {
//     const response = await fetch(`/api/forums/editForum/${f.id}`, {
//         method: 'PUT',
//         headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify(f)
//     });

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(setDiscourse(data))
//         return 'success'
//     }

//     const data = await response.json()
//     return data.errors || 'Error on editForum'
// }

const initialState = { discourses: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DISCOURSE:
            return { ...action.payload }
        case SET_DISCOURSE:
            let old_discourses = { ...state.discourses }
            old_discourses[action.payload.id] = action.payload
            return { ...old_discourses }
        case REMOVE_DISCOURSE:
            return
        default:
            return state;
    }
}
