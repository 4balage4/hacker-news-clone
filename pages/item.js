import Story from '../components/Story.js';
import view from '../utils/view.js';
import baseURL from '../utils/baseURL.js';
import Comment from '../components/Comment.js';


// this comes when we are clicking on a comment.
// we need an id of the item to display the comments. (fetching the comments) 
export default async function Item() {
    let story = null;
    let hasComments = false;
    let hasError = false;

    try {
        story = await getStory()
        hasComments = story.comments.length > 0

    } catch(error) {
        hasError = true
        console.log(error)
    }
    if (hasError) {
        view.innerHTML = `<div class="error">Error fetching story</div>`
    }

    view.innerHTML = `<div>${Story(story)}</div>
    <hr/>
    ${hasComments ? story.comments.map((comment) => {
        return Comment(comment)
    }).join('') : 'no comments'}    
    `
}

async function getStory() {
    // we are getting the id from the url
    // example: http://localhost:5500/#/item?id=43360320
    const storyId = window.location.hash.split('?id=')[1];
    const response = await fetch(`${baseURL}/item/${storyId}`)
    const data = await response.json();
    return data;
}