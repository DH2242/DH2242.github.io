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
  
  // Enable the button
  document.getElementById("predict-btn").disabled = false;
}

async function init() {
  await setupWebcam();
  await loadModel();
  console.log("Webcam + Model Ready");
}

init();

async function predict() {
  const img = tf.browser.fromPixels(webcamElement)
    .resizeNearestNeighbor([224, 224]) // adjust to your model input size
    .toFloat()
    .expandDims();

  const prediction = model.predict(img);
  prediction.print();
}
