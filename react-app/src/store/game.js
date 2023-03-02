const SET_GAME = 'session/SET_GAME';
const REMOVE_GAME = 'session/REMOVE_GAME';
const GET_GAME = 'session/GET_GAME'
const PUT_GAME = 'session/PUT_GAME'

const setGame = (data) => ({
    type: SET_GAME,
    data
});

const getGame = (game) => ({
    type: GET_GAME,
    payload: game
});

const putGame = (game) => ({
    type: GET_GAME,
    payload: game
});

const removeGame = (id) => ({
    type: REMOVE_GAME,
    id
})


export const getGames = () => async (dispatch) => {
    const response = await fetch('/api/games/');
    console.log(response, 'this is game ah')
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(getGame(data));
        return 'success'
    }
}

export const createGame = (f) => async (dispatch) => {
    console.log('this is createGame f, ', f)
    const response = await fetch(`/api/games/createGame/${f.id}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(f)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setGame(data))
        return 'success'
    }
    throw response

    // const data = await response.json()
    // console.log(data, 'see this')
    // return data.errors || 'Error on creatGame'
}

export const editGame = (f) => async (dispatch) => {
    console.log('this is createGame f, ', f)
    const response = await fetch(`/api/games/createGame`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(f)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(putGame(data))
        return 'success'
    }

    const data = await response.json()
    console.log(data, 'see this')
    return data.errors || 'Error on creatGame'
}

export const deleteGame = (f) => async (dispatch) => {
    const res = await fetch(`/api/games/deleteGame/${f.id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeGame(f.id))
        return data
    }
}

const initialState = { games: null };

export default function reducer(state = initialState, action) {
    let old_games = {}
    switch (action.type) {
        case GET_GAME:
            // console.log('what is this', { ...action.payload })
            return { ...action.payload }
        case SET_GAME:
            old_games = [...state.games]
            old_games.push(action.data)
            return { games: [...old_games] }
        case PUT_GAME:
            old_games = [...state.games]
            const editThis = old_games.indexOf(old_games.find(x => x.id == action.id))
            old_games.splice(editThis, 1, action.data)
            return { games: [...old_games] }
        case REMOVE_GAME:
            old_games = [...state.games]
            // console.log('inside remove game', old_games)
            const deleteThis = old_games.indexOf(old_games.find(x => x.id == action.id))
            console.log(deleteThis, 'did we get it? ? ??')
            console.log(action.id, old_games, 'id and old game 1')
            old_games.splice(deleteThis, 1)
            console.log(action.id, old_games, 'id and old game 2')
            return { games: [...old_games] }
        default:
            return state;
    }
}
