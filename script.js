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

async function predict() {
  if (!model) {
    console.log("Model not loaded yet!");
    return;  // <-- just return if model not ready
  }

  // Get image from webcam and preprocess
  const img = tf.browser.fromPixels(webcamElement)
    .resizeNearestNeighbor([224, 224]) // match your model input size
    .toFloat()
    .div(255) // normalize 0-1
    .expandDims();

  // Run prediction
  const prediction = model.predict(img);

  // Convert tensor to array
  const predArray = prediction.arraySync()[0];

  // Map prediction to class names (update with your classes)
  const classNames = ["Class A", "Class B", "Class C"];
  const predictedIndex = predArray.indexOf(Math.max(...predArray));
  const predictedClass = classNames[predictedIndex];
  const probability = (predArray[predictedIndex] * 100).toFixed(1);

  // Show prediction on the page
  document.getElementById("prediction").innerText =
    `Prediction: ${predictedClass} (${probability}%)`;

  // Optional: print tensor to console
  prediction.print();

  // Clean up memory
  prediction.dispose();
  img.dispose();
}

  const prediction = model.predict(img);
  prediction.print();
}
