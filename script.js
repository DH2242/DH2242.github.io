let model;
let webcamElement = document.getElementById('webcam');

async function setupWebcam() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  });
  webcamElement.srcObject = stream;

  return new Promise((resolve) => {
    webcamElement.onloadedmetadata = () => {
      resolve();
    };
  });
}

async function loadModel() {
  model = await tf.loadLayersModel('tfjs_model/model.json');
  console.log("Model loaded!");

  // Enable the button now
  document.getElementById("predict-btn").disabled = false;
}

async function init() {
  await setupWebcam();
  await loadModel();
  console.log("Webcam + Model Ready");
}

init();

function predict() {
  // Example: get prediction from your model
  const predictedPose = "Thumbs"; // Replace with actual model output

  // Update text
  const predictionEl = document.getElementById("prediction");
  predictionEl.textContent = "Prediction: " + predictedPose;

  // Hide all images first
  const images = document.querySelectorAll("#pose-row img");
  images.forEach(img => img.classList.remove("active"));

  // Show the corresponding image
  let imgToShow;
  switch(predictedPose) {
    case "Hand Covering Face":
      imgToShow = document.querySelector("#pose-hand-cover + img");
      break;
    case "Thumbs":
      imgToShow = document.querySelector("#pose-thumbs + img");
      break;
    case "Straight Face":
      imgToShow = document.querySelector("#pose-straight-face + img");
      break;
    case "Hand Up":
      imgToShow = document.querySelector("#pose-hand-up + img");
      break;
  }
  if (imgToShow) imgToShow.classList.add("active");
}
