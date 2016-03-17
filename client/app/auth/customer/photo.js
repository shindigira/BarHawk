window.addEventListener("DOMContentLoaded", function () {

  document.getElementById("snap").addEventListener("click", function () {
    context.drawImage(video, 0, 0, 100, 100);


// Converts image to canvas; returns new canvas element
  // function convertImageToCanvas(image) {
  //   var canvas = document.createElement("canvas");
  //   canvas.width = image.width;
  //   canvas.height = image.height;
  //   canvas.getContext("2d").drawImage(image, 0, 0);

  //   return canvas;
  // }
  // convertImageToCanvas(context)


  // Converts canvas to an image
  function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    console.log(image.src)
    console.log(image)
    return image;

  }
convertCanvasToImage(canvas)



  });
  // Grab elements, create settings, etc.
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    video = document.getElementById("video"),
    videoObj = { "video": true },
    errBack = function (error) {
      console.log("Video capture error: ", error.code);
    };
  console.log(context)


  // Put video listeners into place
  if (navigator.getUserMedia) { // Standard
    navigator.getUserMedia(videoObj, function (stream) {
      video.src = stream;
      video.play();
    }, errBack);
  } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(videoObj, function (stream) {
      video.src = window.URL.createObjectURL(stream);
      video.play();
    }, errBack);
  } else if (navigator.mozGetUserMedia) { // Firefox-prefixed
    navigator.mozGetUserMedia(videoObj, function (stream) {
      video.src = window.URL.createObjectURL(stream);
      video.play();
    }, errBack);
  }
}, false);
