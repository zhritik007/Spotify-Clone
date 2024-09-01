console.log("hello there");

// Variables to keep track of the current song and audio elements
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.querySelector("#masterPlay");
let myProgressBar = document.querySelector("#myProgressBar");
let gif = document.querySelector("#gif");
let songItems = document.querySelectorAll(".songItem");
let masterSongName = document.querySelector("#masterSongName");

// Array containing song details like name, file path, and cover image path
let songs = [
    { songName: "1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "8", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "9", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "10", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

// Update the UI with song information
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; // Set cover image
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; // Set song name
});

// Play/Pause button functionality for the main play button
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        // Play the audio if it's paused or hasn't started
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1; // Show the playing gif
        masterSongName.innerText = songs[songIndex].songName; // Update the song name display
    } else {
        // Pause the audio if it's currently playing
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0; // Hide the playing gif
    }
});

// Update the progress bar as the audio plays
audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); // Calculate progress
    myProgressBar.value = progress; // Update the progress bar value
});

// Seek functionality for the progress bar
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100; // Update audio time
});

// Function to reset all play icons to play state
function makeAllPlays() {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    });
}

// Play/Pause functionality for individual song items
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, index) => {
    element.addEventListener("click", (e) => {
        if (songIndex === index) {
            // Toggle play/pause if the same song is clicked again
            if (audioElement.paused) {
                e.target.classList.remove("fa-play");
                e.target.classList.add("fa-pause");
                audioElement.play();
                masterPlay.classList.remove("fa-play");
                masterPlay.classList.add("fa-pause");
            } else {
                e.target.classList.remove("fa-pause");
                e.target.classList.add("fa-play");
                audioElement.pause();
                masterPlay.classList.remove("fa-pause");
                masterPlay.classList.add("fa-play");
            }
        } else {
            // Play the new song if a different song is clicked
            makeAllPlays(); // Reset all play icons
            songIndex = index; // Update the current song index
            e.target.classList.remove("fa-play");
            e.target.classList.add("fa-pause");
            audioElement.src = songs[songIndex].filePath; // Set the audio source to the new song
            audioElement.currentTime = 0; // Reset current time
            masterSongName.innerText = songs[songIndex].songName; // Update the song name display
            audioElement.play(); // Play the new song
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
        }
    });
});

// Previous button functionality
document.querySelector("#previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1; // Loop to the last song if at the beginning
    } else {
        songIndex -= 1; // Go to the previous song
    }
    audioElement.src = songs[songIndex].filePath; // Update the audio source
    audioElement.currentTime = 0; // Reset current time
    masterSongName.innerText = songs[songIndex].songName; // Update the song name display
    audioElement.play(); // Play the previous song
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});

// Next button functionality
document.querySelector("#next").addEventListener("click", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0; // Loop to the first song if at the end
    } else {
        songIndex += 1; // Go to the next song
    }
    audioElement.src = songs[songIndex].filePath; // Update the audio source
    audioElement.currentTime = 0; // Reset current time
    masterSongName.innerText = songs[songIndex].songName; // Update the song name display
    audioElement.play(); // Play the next song
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});
