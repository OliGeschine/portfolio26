/**
 * @typedef {Object} Comment
 * @property {string} profile_img - Path to the profile image
 * @property {string} name - Name of the commenter
 * @property {string} comment - The comment text (English fallback)
 * @property {string} position - Professional position of the commenter
 */

/**
 * Array of comment objects containing testimonials.
 * @type {Comment[]}
 */
let comments = [
    {
        profile_img: "./assets/img/profile_img.png",
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
        profile_img: "./assets/img/profile_picture_3.jpg",
        name: "Y. Willemsen",
        comment: "navigation dot function also works fine.",
        position: "CSS Design Tester",
    },
];

/**
 * Index of the currently displayed comment.
 * @type {number}
 * @default 0
 */
let currentCommentCount = 0;

/**
 * Renders the current comment with fade transition effect.
 * Updates the comment text, name, position and profile image based on the current index.
 * Retrieves translated content from the translations object if available.
 * @returns {void}
 */
function renderComments() {
    const commentImg = document.getElementById('comment_img');
    commentImg.classList.add('transition-out');
    setTimeout(() => {
        const currentLang = currentLanguage || 'en';
        const commentKey = `comments.comment${currentCommentCount + 1}.comment`;
        const translatedComment = translations[currentLang]?.[commentKey] || comments[currentCommentCount].comment;
        const translatedPosition = translations[currentLang]?.['comments.position'] || comments[currentCommentCount].position;
        document.getElementById('comment').innerHTML = translatedComment;
        document.getElementById('name').innerHTML = comments[currentCommentCount].name;
        document.getElementById('position').innerHTML = translatedPosition;
        commentImg.src = comments[currentCommentCount].profile_img;
        commentImg.classList.remove('transition-out');
    }, 150);
    updateNavigationDots();
}

/**
 * Changes the displayed comment based on the given direction.
 * Handles infinite loop navigation (wraps around at start/end).
 * @param {number} direction - Direction to navigate: 1 for next, -1 for previous
 * @returns {void}
 * @example
 * // Navigate to next comment
 * changeComment(1);
 *
 * @example
 * // Navigate to previous comment
 * changeComment(-1);
 */
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

/**
 * Updates all navigation dots to the default inactive color.
 * Then highlights the active dot based on the current comment index.
 * @returns {void}
 */
function updateNavigationDots() {
    document.getElementById('navigation_dot_left').style.color = '#9747FF';
    document.getElementById('navigation_dot_middle').style.color = '#9747FF';
    document.getElementById('navigation_dot_right').style.color = '#9747FF';
    getCurrentDot();
}

/**
 * Highlights the navigation dot corresponding to the current comment.
 * Sets the active dot color to green (#70E61C).
 * @returns {void}
 * @private
 */
function getCurrentDot() {
    if (currentCommentCount === 0) {
        document.getElementById('navigation_dot_left').style.color = '#70E61C';
    } else if (currentCommentCount === 1) {
        document.getElementById('navigation_dot_middle').style.color = '#70E61C';
    } else if (currentCommentCount === 2) {
        document.getElementById('navigation_dot_right').style.color = '#70E61C';
    }
}

/**
 * Initializes the scroll animation for the comments headline container.
 * Uses Intersection Observer to trigger slide-in/out animations based on scroll position.
 * Observes the entire comments section for better reliability.
 * @returns {void}
 */
function initCommentsAnimation() {
    const headlineContainer = document.querySelector('.comment-img-container');
    const commentsSection = document.querySelector('.comment-section');
    if (!headlineContainer || !commentsSection) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                headlineContainer.classList.remove('slide-out');
                headlineContainer.classList.add('slide-in');
            } else {
                headlineContainer.classList.remove('slide-in');
                headlineContainer.classList.add('slide-out');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });
    observer.observe(commentsSection);
}

/**
 * Event listener for page load event.
 * Initializes comments headline animation when the page loads.
 */
window.addEventListener('load', initCommentsAnimation);