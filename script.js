let model;

async function loadModel() {
  model = await tf.loadLayersModel('tfjs_model/model.json');
  console.log("Model loaded!");
}

loadModel();

async function predict() {
  // Example input (modify to your model's input shape)
  const input = tf.tensor([[1, 2, 3, 4]]);
  
  const prediction = model.predict(input);
  prediction.print();
}
