import Stories from './pages/stories.js';
import Item from './pages/item.js';
import Favorites from './pages/favorites.js'

// no root path (null), uses hash based routing (true), and uses # as the hash
const router = new Navigo(null, true, '#');


// class that registers routes.
export default class RouterHandler {
  constructor() {
    this.createRoutes()  
  }  


//   function for the routes
  createRoutes() {
    // array of routes, the page is the Stories function.
    const routes = [
      { path: '/', page: Stories },
      { path: '/new', page: Stories }, 
      { path: '/ask', page: Stories },  
      { path: '/show', page: Stories },  
    //   { path: '/', page: Stories }  
      { path: '/item', page: Item},
      { path: '/favorites', page: Favorites}
    ];
    
    // we are looping thorough the routes array and with .on we register the route.
    // when it registers the path, when the user navigates to this path, the callback function will run
    // the callback function is the Stories(path)
    // in this case the routes.path is passed and that is what will be displayed in the Stories view.
    routes.forEach(({path, page}) => {
      router.on(path, () => {
         page(path); // calls the Stories function, passing the routes.path
      }).resolve();
    })
  }
}
