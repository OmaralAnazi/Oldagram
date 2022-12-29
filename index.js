const postsHolder = document.getElementById("posts-holder")
let posts = [
    {
        name: "Vincent van Gogh",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        postImg: "images/post-vangogh.jpg",
        likes: 21492,
        likeIcon: "images/icon-heart.png",
        userComments: [
            {
                username: "vincey1853",
                comment: "just took a few mushrooms lol"
            }
        ]
    },
    {
        name: "Cat",
        location: "Riyadh, KSA",
        avatar: "images/user-avatar.png",
        postImg: "images/user-avatar.png",
        likes: 3872312,
        likeIcon: "images/icon-heart.png",
        userComments: [
            {
                username: "OmarAlanazi_IS",
                comment: "Okkayy.. 👀"
            }
        ]
    },
    {
        name: "Gustave Courbet",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        postImg: "images/post-courbet.jpg",
        likes: 12502,
        likeIcon: "images/icon-heart.png",
        userComments: [
            {
                username: "gus1819",
                comment: "i'm feelin a bit stressed tbh"
            }
        ]
    },
    {
        name: "Joseph Ducreux",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        postImg: "images/post-ducreux.jpg",
        likes: 15137,
        likeIcon: "images/icon-heart.png",
        userComments: [
            {
                username: "jd1735",
                comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!"
            }
        ]
    }
]
let userLikeStates = new Array(posts.length).fill(false)

getDataFromLocalStorage()
renderPosts()

function getDataFromLocalStorage() {
    let postsArray = localStorage.getItem("posts") 
    let likesArray = localStorage.getItem("likes") 
    if(postsArray) 
        posts = JSON.parse(postsArray) 
    if(likesArray) 
        userLikeStates = JSON.parse(likesArray) 
}

function updateDataToLocalStorage() {
    localStorage.setItem("posts", JSON.stringify(posts)) 
    localStorage.setItem("likes", JSON.stringify(userLikeStates))   
}

function renderPosts() {
    postsHTML = ""
    posts.forEach( (post, index) => {
        postsHTML += 
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
                    <img class="icon-img" src="${post.likeIcon}" alt="like icon" onclick="updateLikes(${index})" id="post${index}-likes-icon">
                    <img class="icon-img" src="images/icon-comment.png" alt="comment icon">
                    <img class="icon-img" src="images/icon-dm.png" alt="share icon">
                </div>

                <p class="post-likes bold" id="post${index}-likes">${post.likes.toLocaleString("en-US")} likes</p>

                ${getCommentTags(post.userComments)}

            </div>
        </section>`
    })
    postsHolder.innerHTML = postsHTML
}

function getCommentTags(userComments) {
    let commentTags = ""
    userComments.forEach(userComment => 
        commentTags += `<p class="post-comments">
                            <span class="bold">${userComment.username}</span> ${userComment.comment}
                        </p>`)
    return commentTags
}

function updateLikes(postIndex) {
    let isPressedBefore = getLikeState(postIndex)
    if (! isPressedBefore)
        posts[postIndex].likes++
    else 
        posts[postIndex].likes--
    
    changeLikeState(postIndex, isPressedBefore)
    likesElement = document.getElementById(`post${postIndex}-likes`)
    likesElement.textContent = `${posts[postIndex].likes.toLocaleString("en-US")} likes`
    runLikeBtnAnimation(postIndex)
    updateDataToLocalStorage()
}

function getLikeState(postIndex) {
    return userLikeStates[postIndex]
}

function changeLikeState(postIndex, isPressedBefore) {
    let likesIcon = document.getElementById(`post${postIndex}-likes-icon`)

    userLikeStates[postIndex] = ! userLikeStates[postIndex]
    let isLiked = userLikeStates[postIndex]
    if (isLiked)
        posts[postIndex].likeIcon = "images/icon-heart-liked.png"
    else 
        posts[postIndex].likeIcon = "images/icon-heart.png"
    likesIcon.src = posts[postIndex].likeIcon
}

function runLikeBtnAnimation(postIndex) {
    // Add an animation here if u want ... 
}