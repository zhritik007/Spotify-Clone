console.log("hello there");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.querySelector("#masterPlay");
let myProgressBar = document.querySelector("#myProgressBar");
let gif = document.querySelector("#gif");
let songItems = document.querySelectorAll(".songItem");
let masterSongName = document.querySelector("#masterSongName");

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

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName; 
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

function makeAllPlays() {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    });
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, index) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = index; 
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src = songs[songIndex].filePath; 
        audioElement.currentTime = 0;
        masterSongName.innerText = songs[songIndex].songName; 
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
    });
});

document.querySelector("#previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName; 
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});

document.querySelector("#next").addEventListener("click", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName; 
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});
