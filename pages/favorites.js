import view from '../utils/view.js'
import checkFavorite from '../utils/checkFavorite.js'
import store from '../store.js'
import Story from '../components/Story.js'


export default function Favorites() {
    const { favorites } = store.getState();
    const hasFavorites = favorites.length > 0;

    view.innerHTML = `<div>
        ${hasFavorites ? favorites.map((story) => {
            return Story({
                ...story,
                isFavorite: checkFavorite(favorites, story)
            })
        }).join('') : "no favorites"}
    </div>`


    document.querySelectorAll('.favorite').forEach(favoriteButton => {
        favoriteButton.addEventListener('click', function() {
            const story = JSON.parse(this.dataset.story);
            const isFavorited = checkFavorite(favorites, story);
                store.dispatch({type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: {favorite: story}})
            Favorites()
        })
    })

}