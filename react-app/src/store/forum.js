const SET_FORUM = 'session/SET_FORUM';
const REMOVE_FORUM = 'session/REMOVE_FORUM';
const GET_FORUM = 'session/GET_FORUM'

const setForum = (forum) => ({
    type: SET_FORUM,
    payload: forum
});

const getForum = (forum) => ({
    type: GET_FORUM,
    payload: forum
});

const removeForum = () => ({
    type: REMOVE_FORUM
})


export const getForums = () => async (dispatch) => {
    const response = await fetch('/api/forums/');
    console.log(response, 'this is responseeeeee ah')
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(getForum(data));
        return 'success'
    }
}

export const createForum = (f) => async (dispatch) => {
    console.log('this is createforum f, ', f)
    const response = await fetch('/api/forums/createForum', {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(f)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setForum(f))
        return 'success'
    }

    const data = await response.json()
    return data.errors || 'Error on createForum'
}

const initialState = { forums: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_FORUM:
            return { ...action.payload }
        case SET_FORUM:
            let old_forums = { ...state.forums }
            old_forums[action.payload.id] = action.payload
            return { ...old_forums }
        case REMOVE_FORUM:
            return
        default:
            return state;
    }
}
