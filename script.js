const video = document.getElementById('myVideo');



const startVideo = () => {
    // promise -- gets two params-- empty object video and what's coming from webcam (stream)
    navigator.getUserMedia( { video: {} }, stream => video.srcObject = stream, err => console.error(err) )
};

// const startVideo2 = () => {
//     navigator.mediaDevices.getUserMedia({video: {})
//         .then(function(stream) {
//   /* use the stream */
//         })
//         .catch(function(err) {
//   /* handle the error */
//         });
// }

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
  ]).then(startVideo)



// console.log("faceapi.nets= ", faceapi.nets)

// const clearAndDrawCanvas = () => {

// }


video.addEventListener('play', () => {
    let canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    let displayDimensions = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displayDimensions)
    // setInterval method continuously calls the function at 100 millisecond intervals
    setInterval(async () => {
      let detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      let resizedDetections = faceapi.resizeResults(detections, displayDimensions)
    //   clears the canvas before drawing onto it
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //   draws the resized detections onto canvas the detec
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    //   console.log("detections = ", detections)
    }, 100)
  })


// startVideo();