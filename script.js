
const video = document.getElementById('myVideo');

const startVideo = () => {
    // gets two params-- empty object video and what's coming from webcam (stream)
    navigator.getUserMedia(
        { video: {} }, 
        stream => video.srcObject = stream,
        err => console.error(err)
    )
};

startVideo();