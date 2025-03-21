import store from '../store.js'
import Story from '../components/Story.js';
import view from '../utils/view.js';
import checkFavorite from '../utils/checkFavorite.js'
import baseURL from '../utils/baseURL.js';

export default async function Stories(path) {
    const { favorites } = store.getState();
    const stories = await getStories(path);
    // setting the innerHTML of the view to the path
    const hasStories = stories.length > 0;

    view.innerHTML = `<div> 
        ${hasStories ? stories.map((story, i) => Story({
            ...story,
            index: i + 1,
            isFavorite: checkFavorite(favorites, story)
         })
        ).join('') : 'no stories'}
    </div>`

    document.querySelectorAll('.favorite').forEach(favoriteButton => {
        favoriteButton.addEventListener('click', async function() {
            const story = JSON.parse(this.dataset.story);
            const isFavorited = checkFavorite(favorites, story);
                store.dispatch({type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: {favorite: story}})
            await Stories(path)
        })
    })
}


// this is the fetch for the news. 
async function getStories(path) {
    const isHomeRoute = path === '/';
    const isNewRoute = path === '/new';
    if (isHomeRoute) {
        path = '/news';
    } else if (isNewRoute) {
        path = '/newest';
    }


    const response = await fetch(`${baseURL}${path}`)
    const data = await response.json();
    console.log(data)
    return data;
}