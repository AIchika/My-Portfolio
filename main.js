//hamburger menu
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav");

    hamburger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});

//typing effect ----------------------------------------------------------------
const typingText = document.querySelector('.typing-text');

// Words and their corresponding colors
const words = [
    { text: "Web Developer (3years experience.)", color: "#f39c12" },
    { text: "UX/UI Design (2years experience.) ", color: "#3498db" },
    { text: "Currently learning Python for Backend.", color: "#e74c3c" },
    { text: "3D Design (4years experience.)", color: "#9b59b6" },
    { text: "Microsoft Office (8years experience.)", color: "#2ecc71" }
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    const currentText = currentWord.text.slice(0, charIndex);

    // Set text content and color
    typingText.textContent = currentText;
    typingText.style.color = currentWord.color;

    if (!isDeleting && charIndex < currentWord.text.length) {
        charIndex++;
        setTimeout(typeEffect, 100); // Typing speed
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50); // Deleting speed
    } else if (!isDeleting && charIndex === currentWord.text.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Move to the next word
        setTimeout(typeEffect, 500); // Pause before typing the next word
    }
}

// Start the typing effect when the page loads
document.addEventListener('DOMContentLoaded', typeEffect);

// Create the cursor element----------------------------------------------------------------
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Update cursor position on mouse move
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Add 'grow' effect for all clickable elements
const clickableElements = ['button', 'a', 'img', 'video'];

clickableElements.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });
});
// sticky navigation----------------------------------------------------------------
function showProject(projectId) {
    // Prevent the default behavior of scrolling to the top
    event.preventDefault();

    // Hide all project iframes
    const projectIframes = document.querySelectorAll('.project-iframe');
    projectIframes.forEach(iframe => iframe.style.display = 'none');

    // Remove active class from all navigation items
    const navItems = document.querySelectorAll('.site-nav ul li');
    navItems.forEach(item => item.classList.remove('active'));

    // Show the selected project iframe
    const selectedProject = document.getElementById(projectId);
    if (selectedProject) {
        selectedProject.style.display = 'block';
    }

    // Add active class to the clicked navigation item
    const clickedNavItem = event.target.parentElement;
    if (clickedNavItem) {
        clickedNavItem.classList.add('active');
    }
}
// form ----------------------------------------------------------------
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);

    try {
        const response = await fetch("send_mail.php", {  // Update to the new PHP file name
            method: "POST",
            body: formData,
        });

        const result = await response.text();
        if (result === "success") {
            showPopup("Message sent successfully!");
        } else {
            showPopup("Failed to send the message. Please try again.");
        }
    } catch (error) {
        showPopup("An error occurred. Please try again.");
    }
});

// Function to show the pop-up
function showPopup(message) {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.backgroundColor = "#4f0612";
    popup.style.color = "#fff";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "15px";
    popup.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    popup.style.zIndex = "1000";
    popup.style.fontSize = "12px";

    document.body.appendChild(popup);

    // Remove the pop-up after 3 seconds
    setTimeout(() => {
        popup.remove();
    }, 3000);
}
// video frame
// Array of local video file paths
const videoFiles = [
    "videos/video1.mp4", // Video 1
    "videos/video2.mp4", // Video 2
    "videos/video3.mp4"  // Video 3
];

let currentVideoIndex = 0; // Track the current video index

// Function to load the current video
function loadVideo() {
    const videoElement = document.getElementById("videoFrame");
    videoElement.src = videoFiles[currentVideoIndex];
    videoElement.load(); // Reload the video
}

// Function to go to the previous video
function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videoFiles.length) % videoFiles.length;
    loadVideo();
}

// Function to go to the next video
function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoFiles.length;
    loadVideo();
}

// Load the first video when the page loads
document.addEventListener("DOMContentLoaded", loadVideo);                                                     
