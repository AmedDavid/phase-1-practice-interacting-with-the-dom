// Get DOM elements
const counter = document.getElementById('counter');
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const heartBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const likesList = document.querySelector('.likes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('list');

let count = 0;
let isPaused = false;
let intervalId;




function updateCounter() {
    counter.textContent = count;
}

function startCounter() {
    intervalId = setInterval(() => {
        if (!isPaused) {
            count++;
            updateCounter();
        }
    }, 1000);
}


function togglePause() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'resume' : 'pause';
    
    // Enable/disable buttons (except pause)
    minusBtn.disabled = isPaused;
    plusBtn.disabled = isPaused;
    heartBtn.disabled = isPaused;
}


minusBtn.addEventListener('click', () => {
    count--;
    updateCounter();
});


plusBtn.addEventListener('click', () => {
    count++;
    updateCounter();
});


heartBtn.addEventListener('click', () => {
    const existingLike = document.querySelector(`[data-num="${count}"]`);
    
    if (existingLike) {
        // Increment existing like count
        const likeCount = existingLike.querySelector('span');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    } else {
        // Create new like entry
        const li = document.createElement('li');
        li.setAttribute('data-num', count);
        li.innerHTML = `${count} has been liked <span>1</span> time${count === 1 ? '' : 's'}`;
        likesList.appendChild(li);
    }
});


pauseBtn.addEventListener('click', () => {
    togglePause();
});


commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    
    if (commentText) {
        const comment = document.createElement('p');
        comment.textContent = commentText;
        commentsList.appendChild(comment);
        commentInput.value = ''; 
        
    }
});


updateCounter();
startCounter();