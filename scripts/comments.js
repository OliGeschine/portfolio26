let comments = [
    {
        profile_img: "./assets/img/profile_picture.png",
        name: "O. Geschine",
        comment: "This is the test comment, to see if everything works fine.",
        position: "Software Developer",
    },
    {
        profile_img: "./assets/img/profile_picture_2.jpg",
        name: "G. Oliver",
        comment: "Comment change function works fine.",
        position: "Software Tester",
    },
    {
        profile_img: "./assets/img/profile_picture_3.jpeg",
        name: "Y. Willemsen",
        comment: "navigation dot function also works fine.",
        position: "CSS Design Tester",
    },
]

let currentCommentCount = 0;

function renderComments() {
    document.getElementById('comment').innerHTML = comments[currentCommentCount].comment;
    document.getElementById('name').innerHTML = comments[currentCommentCount].name;
    document.getElementById('comment_img').src = comments[currentCommentCount].profile_img;
    document.getElementById('position').innerHTML = comments[currentCommentCount].position;
    updateNavigationDots();
}

function changeComment(direction) {
    if (direction === 1) {
        currentCommentCount++;
    } else if (direction === -1) {
        currentCommentCount--;
    }
    if (currentCommentCount >= comments.length) {
        currentCommentCount = 0;
    }
    if (currentCommentCount < 0) {
        currentCommentCount = comments.length - 1;
    }
    renderComments();
}

function updateNavigationDots() {
    document.getElementById('navigation_dot_left').style.color = '#9747FF';
    document.getElementById('navigation_dot_middle').style.color = '#9747FF';
    document.getElementById('navigation_dot_right').style.color = '#9747FF';
    getCurrentDot();
}

function getCurrentDot() {
    if (currentCommentCount === 0) {
        document.getElementById('navigation_dot_left').style.color = '#70E61C';
    } else if (currentCommentCount === 1) {
        document.getElementById('navigation_dot_middle').style.color = '#70E61C';
    } else if (currentCommentCount === 2) {
        document.getElementById('navigation_dot_right').style.color = '#70E61C';
    }
}