document.addEventListener('DOMContentLoaded', (e)=>{
    fetch('http://localhost:3000/blogs')
    .then(res=>res.json())
    .then(blogs=>{
        displayPosts(blogs)
        displayListings()
        createComment()
        allComments()
function displayPosts() {
    let frame = document.getElementById('left-pane')
    for(let post of blogs){
        let placeHolder = document.createElement('div')
        placeHolder.innerHTML =  `
        <img src=${post.image} >
        <p>${post.clickBait}<p>
        `
        frame.appendChild(placeHolder)
        placeHolder.addEventListener('click', pasteContent)
        let title = document.createElement('h3')
        title.innerHTML = post.description

function pasteContent(){
    let blogContent = document.getElementById('centre-pane')
    blogContent.innerHTML = `
    <h2> ${post.description}</h2>
    <p> ${post.blogContent}</p>`
}
}
}
    })
})

function displayListings(){
fetch('http://localhost:3000/listings')
.then(resp=>resp.json())
.then(listings=>{
    let listingFrame = document.getElementById('card-images')
    listings.forEach(listing => {
        let card = document.createElement('div')
        card.setAttribute('class', 'div-card')
        card.innerHTML =`<img src=${listing.image} class=listing-imgs>
                    <p class="card-cat">${listing.category}</p>
                    <p class="card-tagline">${listing.tagline}</p>
                    <p class="card-location">${listing.location}
                    <p class="card-price">Ksh.<span>${listing.price}</span></p>
                    <span class="card-favorite">♡</span>`
    listingFrame.append(card)
    let liker=card.querySelector('.card-favorite')
    liker.addEventListener('click', likerFunc)
    filterListings(listings)
 
function likerFunc(){
let EMPTY_HEART = '♡'
let FULL_HEART = '♥'
 
console.log(liker.innerText)

  likePress = async () => {
    let isLiked = false;
    if (liker.innerHTML === EMPTY_HEART) {
        liker.innerHTML = FULL_HEART
        liker.className = "activated-heart"
        isLiked = true;
    }
    if (isLiked) {
        try {
            const response = await fetch(`http://localhost:3000/listings/${listing.id}`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    "like": liker
                })
            });
            const json = await response.json();
            this.setState({
                likeIcon: "red",
                data: json
            });
            console.log(_id, "id");
            console.log(
                result,
                JSON.stringify({
                    like: this.state.product._id
                })
            );
        } catch (error) {
            console.error(error);
        }
    }
}
}
    });

function filterListings(listings) {
let buildBuyDropdown = document.getElementById('build-rent')
buildBuyDropdown.addEventListener('change',e=>{
    let newArray = []
    newArray = listings.filter(listing=>listing.category===e.target.value)
    if(e.target.value!=="--All--") {
        document.getElementById('card-images').innerHTML = ''
        newArray.forEach(listing => {
       let newDiv = document.createElement('div')
        newDiv.innerHTML = `<img src=${listing.image} class=listing-imgs>
                            <p class="card-cat">${listing.category}</p>
                            <p class="card-tagline">${listing.tagLine}</p>
                            <p class="card-location">${listing.location}
                            <p class="card-price">Ksh.<span>${listing.price}</span></p>
                            <span class="card-favorite">♡</span>`
        document.getElementById('card-images').appendChild(newDiv)    
         });
    }
})
}
     
})
function addLocalListing () {
    let form = document.getElementById('new-listing')
    form.addEventListener('submit', e=>{
        e.preventDefault()
    let listingObj = {
      "image": `${document.getElementById('form-image').value}`,
      "category": `${document.getElementById('form-category').value}`,
      "price": `${document.getElementById('form-price').value}`,
      "like": "♡",
      "location": `${document.getElementById('form-location').value}`,
      "tagline": `${document.getElementById('form-tagline').value}`,
      "description": `${document.getElementById('form-description').value}`
    }
    fetch(`http://localhost:3000/listings`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify(listingObj)
    })
    .then(resp=>resp.json())
    .then(data=>console.log(data))
    })
}
addLocalListing()
}

function createComment() {
let form = document.querySelector('form#add-comment')
form.addEventListener('submit',e=>{
    e.preventDefault()
    let liComment = document.createElement('li')
    liComment.innerHTML = `<li>${document.getElementById('text-area').value}</li>`
    document.getElementById('comments').append(liComment)
let commentObj = {
    "comment":`${document.getElementById('text-area').value}`,
    
}
form.reset()
fetch(`http://localhost:3000/comments`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
    },
    body: JSON.stringify(commentObj)
})
.then(resp=>{
    resp.json()
    alert('comment added!')
})
.then(data=>console.log(data))
})
}
function allComments(){
fetch('http://localhost:3000/comments')
.then(res=>res.json())
.then(comments=>{
    comments.forEach(myComment => {
        let ulComments = document.getElementById('comments')
        let savedComment = document.createElement('li')
        savedComment.innerHTML =`<li>${myComment.comment}</li>
        <button hidden=hidden class=delete-button name=delete>x</button>`
        savedComment.addEventListener('click',deleteComment)
        ulComments.appendChild(savedComment)
    
function deleteComment(){
// let deleteBtn = document.getElementsByClassName('delete-button')
// deleteBtn.setAttribute('hidden',"")
// // deleteBtn.addEventListener('click',e=>{
//     console.log(deleteBtn.innerHTML)
// })
}   

});

}) 
}