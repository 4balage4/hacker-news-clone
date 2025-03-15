// using the pattern which is in redux and many other libraries

function createStore(reducer) {
    let currentState = reducer(undefined, {})

    return {
        getState: () => currentState,
        dispatch: (action) => {
            currentState = reducer(currentState, action)
        }
    }
}


const initialState = {
    favorites: []
}


function favoritesReducer(state = initialState, action) {
    switch (action.type) {
       case "ADD_FAVORITE":{
        return {
            ...state,
            favorites: [...state.favorites, action.payload.favorite]
            }
        }
        
       case "REMOVE_FAVORITE":{ 
        return {
            ...state,
            favorites: state.favorites.filter(favorite => favorite.id !== action.payload.favorite.id)
        }
            }
       default:
            return state;
    }
}

// const action = {type: "ADD_FAVORITE", payload: {favorite: { id: 1, title: 'story1'}}}
// const action2 = {type: "REMOVE_FAVORITE", payload: {favorite: {id: 2,  title: 232}}}

const store = createStore(favoritesReducer)

// store.dispatch(action)
// console.log(store.getState())
// store.dispatch(action)
// console.log(store.getState())

// store.dispatch(action2)
// console.log(store.getState())

export default store;