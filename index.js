document.addEventListener('DOMContentLoaded', (e)=>{
    fetch('http://localhost:3000/blogs')
    .then(res=>res.json())
    .then(blogs=>{

        displayPosts(blogs)
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
function contentLoad(){
    blogContent = document.getElementById('centre-pane')
    blogContent.innerHTML = `
    <h2> ${blogs[0].description}</h2>
    <p> ${blogs[0].blogContent}</p>`
    let commentContent = document.getElementById('comments')
    fetch(`http://localhost:3000/comments`)
    .then(res=>res.json())
    .then(comments=>{
        
        console.log(comments)
        commentContent.innerHTML = `${comments[0].text}`
    })
}
contentLoad()
}
}
    })
})
function addComments(){
    let form = document.getElementById('add-comment')
    form.addEventListener ('submit', e=>{
    e.preventDefault()
    let li = document.createElement('li')
    li.innerHTML = document.getElementById('text-area').value
    document.getElementById('comments').append(li)
    form.reset()
//function postComment()
})

// fetch(`http://localhost:3000/comments`),{
//             method: 'POST',
//             headers: {
//                 "content-type": "application/json",
//                 "accept": "application/json",
//             },
//             body: JSON.stringify({
//                 'text' : `${li}`, 
//             })
//         }
//         .then(res=>res.json())
//         .then(obj=>{console.log(obj.id)
//         })
//         .catch(function (error) {
//             alert("Unauthorized Access");
//             console.log(error.message);
//         })
}
addComments()