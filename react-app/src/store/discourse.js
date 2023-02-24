const SET_DISCOURSE = 'session/SET_DISCOURSE';
const REMOVE_DISCOURSE = 'session/REMOVE_DISCOURSE';
const GET_DISCOURSE = 'session/GET_DISCOURSE'

const setDiscourse = (data) => ({
    type: SET_DISCOURSE,
    data
});

const getDiscourse = (discourse) => ({
    type: GET_DISCOURSE,
    payload: discourse
});

const removeDiscourse = (id) => ({
    type: REMOVE_DISCOURSE,
    id
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

export const deleteDiscourse = (f) => async (dispatch) => {
    const res = await fetch(`/api/discourses/deleteDiscourse/${f.id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeDiscourse(f.id))
        return data
    }
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
    let old_discourses = {}
    switch (action.type) {
        case GET_DISCOURSE:
            // console.log('what is this', { ...action.payload })
            return { ...action.payload }
        case SET_DISCOURSE:
            old_discourses = [...state.discourses]
            old_discourses.push(action.data)
            return { discourses: [...old_discourses] }
        case REMOVE_DISCOURSE:
            old_discourses = [...state.discourses]
            // console.log('inside remove discourse', old_discourses)
            const deleteThis = old_discourses.indexOf(old_discourses.find(x => x.id == action.id))
            console.log(deleteThis, 'did we get it? ? ??')
            console.log(action.id, old_discourses, 'id and old discourse 1')
            old_discourses.splice(deleteThis, 1)
            console.log(action.id, old_discourses, 'id and old discourse 2')
            return { discourses: [...old_discourses] }
        default:
            return state;
    }
}
