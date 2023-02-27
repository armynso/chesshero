const SET_MATCH = 'session/SET_MATCH';
const REMOVE_MATCH = 'session/REMOVE_MATCH';
const GET_MATCH = 'session/GET_MATCH'

const setMatch = (data) => ({
    type: SET_MATCH,
    data
});

const getMatch = (match) => ({
    type: GET_MATCH,
    payload: match
});

const removeMatch = (id) => ({
    type: REMOVE_MATCH,
    id
})


export const getMatches = () => async (dispatch) => {
    const response = await fetch('/api/matches/');
    console.log(response, 'this is discourses ah')
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(getMatch(data));
        return 'success'
    }
}

export const createMatch = (f) => async (dispatch) => {
    console.log('this is createforum f, ', f)
    const response = await fetch(`/api/matches/createMatch`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(f)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setMatch(data))
        return 'success'
    }

    const data = await response.json()
    return data.errors || 'Error on createForum'
}

// export const deleteDiscourse = (f) => async (dispatch) => {
//     const res = await fetch(`/api/discourses/deleteDiscourse/${f.id}`, {
//         method: "DELETE"
//     });

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(removeDiscourse(f.id))
//         return data
//     }
// }

const initialState = { matches: null };

export default function reducer(state = initialState, action) {
    let old_matches = {}
    switch (action.type) {
        case GET_MATCH:
            // console.log('what is this', { ...action.payload })
            return { ...action.payload }
        case SET_MATCH:
            old_matches = [...state.matches]
            old_matches.push(action.data)
            return { matches: [...old_matches] }
        case REMOVE_MATCH:
            old_matches = [...state.matches]
            // console.log('inside remove match', old_matches)
            const deleteThis = old_matches.indexOf(old_matches.find(x => x.id == action.id))
            console.log(deleteThis, 'did we get it? ? ??')
            console.log(action.id, old_matches, 'id and old match 1')
            old_matches.splice(deleteThis, 1)
            console.log(action.id, old_matches, 'id and old match 2')
            return { matches: [...old_matches] }
        default:
            return state;
    }
}
