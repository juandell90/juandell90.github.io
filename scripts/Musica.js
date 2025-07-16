const feed = document.getElementById("feed");
feed.innerHTML = "";

const video = document.createElement("video");
video.src = "https://v1.pinimg.com/videos/mc/expMp4/9c/66/8e/9c668e8fe6933bfae04110957477ccbd_t1.mp4";
video.controls = true;
video.autoplay = true;
video.style.width = "100%";
video.style.height = "100vh";
video.style.objectFit = "cover";

feed.appendChild(video);
