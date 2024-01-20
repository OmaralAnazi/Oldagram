import postsData from './postsData.js';

const postsHolder = document.getElementById('posts-holder');

let posts = [...postsData];
let userLikeStates = new Array(posts.length).fill(false);

getDataFromLocalStorage();
renderPosts();

function getDataFromLocalStorage() {
    const postsArray = localStorage.getItem('posts');
    const likesArray = localStorage.getItem('likes');
    if(postsArray) 
        posts = JSON.parse(postsArray);
    if(likesArray) 
        userLikeStates = JSON.parse(likesArray);
}

function updateDataToLocalStorage() {
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('likes', JSON.stringify(userLikeStates));
}

function renderPosts() {
    const postsHTML = posts.map((post, index) =>
        `<section>
            <div class="app-boundaries padding container">
                <div class="post-title">
                    <img class="user-img" src="${post.avatar}" alt="${post.name} avatar">
                    <div>
                        <p class="bold left-margin">${post.name}</p>
                        <p class="left-margin">${post.location}</p>
                    </div>
                </div>
                
                <img class="post-img" src="${post.postImg}" alt="${post.name} post">

                <div class="post-icons">
                    <img class="icon-img" src="${post.likeIcon}" alt="like icon" id="${index}-post-likes-icon" data-like-icon="true">
                    <img class="icon-img" src='images/icon-comment.png' alt="comment icon">
                    <img class="icon-img" src='images/icon-dm.png' alt="share icon">
                </div>

                <p class="post-likes bold" id="post${index}-likes">${post.likes.toLocaleString('en-US')} likes</p>

                ${getCommentTags(post.userComments)}

            </div>
        </section>`
    ).join('');
    postsHolder.innerHTML = postsHTML;

    postsHolder.addEventListener('click', e => {
        if (e.target.dataset.likeIcon) {
            const postIndex = parseInt(e.target.id[0]);
            updateLikes(postIndex);
        }
    });
}

function getCommentTags(userComments) {
    return userComments.map(userComment => `
    <p class="post-comments">
        <span class="bold">${userComment.username}</span> ${userComment.comment}
    </p>`).join('');
}

function updateLikes(postIndex) {
    userLikeStates[postIndex] = !userLikeStates[postIndex];

    const isLiked = userLikeStates[postIndex];
    isLiked ? posts[postIndex].likes++ : posts[postIndex].likes--;

    const likesElement = document.getElementById(`post${postIndex}-likes`);
    likesElement.textContent = `${posts[postIndex].likes.toLocaleString('en-US')} likes`;

    changeLikeIconState(postIndex, isLiked);
    updateDataToLocalStorage();
}

function changeLikeIconState(postIndex, isLiked) {
    const newIconPath = isLiked ? 'images/icon-heart-liked.png' : 'images/icon-heart.png';
    const likesIcon = document.getElementById(`${postIndex}-post-likes-icon`);
    posts[postIndex].likeIcon = newIconPath;
    likesIcon.src = newIconPath;
}