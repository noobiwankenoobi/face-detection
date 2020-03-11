const video = document.getElementById('myVideo');

const startVideo = () => {
    // promise -- gets two params-- empty object video and what's coming from webcam (stream)
    navigator.getUserMedia( { video: {} }, stream => video.srcObject = stream, err => console.error(err) )
};

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
  ]).then(startVideo)

console.log("faceapi.nets= ", faceapi.nets)



// startVideo();