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
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displayDimensions = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displayDimensions)
    // setInterval method continuously calls the async function at 100 millisecond intervals
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displayDimensions)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    //   console.log("detections = ", detections)
    }, 100)
  })


// startVideo();