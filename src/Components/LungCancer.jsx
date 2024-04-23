import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { GetInfo } from "../utils/GetInfo";
import Gemini from "./Gemini";

const LungCancer = () => {
  const [model, setModel] = useState(null);
  const [inputImage, setInputImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [predictionLoad, setPredictionLoad] = useState(false);
  const [cancerInfo, setCancerInfo] = useState("");

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("Loading model...");
        const loadedModel = await tf.loadLayersModel(
          "./LungCancerModel/model.json"
        );
        console.log("Model loaded successfully:", loadedModel);
        loadedModel.summary(); // Log model summary
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading the model:", error);
      }
    };

    // Load the model when the component mounts
    loadModel();
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setInputImage(file);
    setPrediction(null); // Reset prediction when a new image is selected
  };
  const cancerTypes = [
    "Adenocarcinoma",
    "Large Cell Carcinoma",
    null, // No cancer type for class 2
    "Squamous Cell Carcinoma",
    ,
  ];
  const handlePrediction = async () => {
    setPredictionLoad(true);
    if (model && inputImage) {
      try {
        // Load the image
        const imgElement = document.createElement("img");
        imgElement.src = URL.createObjectURL(inputImage);
        await imgElement.decode();
        const img = tf.browser.fromPixels(imgElement).toFloat();

        // Preprocess the image (if needed)
        // Example: normalize pixel values to be between 0 and 1
        const normalizedImg = img.div(tf.scalar(255));

        // Resize the image to the expected input shape
        const resizedImg = normalizedImg.resizeBilinear([224, 224]);

        // Reshape the image according to the model's input shape
        const reshapedImg = resizedImg.reshape([1, 224, 224, 3]);

        // Make the prediction
        const predictions = model.predict(reshapedImg);
        const answer = tf.argMax(predictions, 1).dataSync()[0];
        if (answer != null && answer != 2) {
          let info = await GetInfo("Tell me about " + cancerTypes[1]);
          setCancerInfo(info);
        }
        console.log("Class = ", answer);
        // Set the prediction state
        setPrediction(answer);
        setPredictionLoad(false);
        // Clean up resources
        img.dispose();
        normalizedImg.dispose();
        reshapedImg.dispose();
      } catch (error) {
        console.error("Error making prediction:", error);
      }
    }
  };
  function formatResponse(response) {
    const formattedResponse = response.split("*");
    return (
      <div>
        {formattedResponse.map((section, index) =>
          index % 2 === 0 ? ( // Check for even index (heading)
            <h2 className='text-xl font-bold'>{section}</h2>
          ) : (
            <p className='text-base font-mono'>{section}</p>
          )
        )}
      </div>
    );
  }

  return (
    <div className='w-full h-full md:h-screen md:px-10 px-5 flex flex-col items-center justify-center'>
      <h2 className='md:text-6xl text-blue-400  sm:text-4xl text-2xl font-bold py-2 text-center'>
        Lung Cancer Prediction
      </h2>
      <div className='flex flex-col md:flex-row h-full bg-white w-full '>
        <div className='h-full w-full md:w-1/2 py-10 m-3'>
          <h3 className='text-4xl text-center font-extrabold text-black m-3'>
            How It Works?
          </h3>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-center text-black text-lg m-4 '>
              Upload an image to predict the likelihood of lung cancer. Our
              technology is capable of detecting the likelihood of cancer.
            </p>
          </div>
          <Gemini />
        </div>
        <div className='h-full w-full md:w-1/2 py-10 m-3'>
          <h1 className='text-4xl text-center font-extrabold text-black m-3'>
            Drop The Image
          </h1>
          <div className='flex flex-col justify-center items-center'>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='cursor-pointer'
              onClick={() => setPredictionLoad(false)}
            />
            <button
              onClick={handlePrediction}
              className='bg-black font-semibold text-blue-400  w-[200px] rounded-md text-lg my-6 mx-auto md:mx-0 py-2 hover:bg-slate-700'
            >
              Predict
            </button>

            {inputImage === null && predictionLoad === true && (
              <h4 className='font-bold'>Please select an image</h4>
            )}
            {inputImage !== null && predictionLoad === true && (
              <h4 className='font-bold'>Detecting...</h4>
            )}
            {predictionLoad === false && prediction !== null && (
              <>
                {prediction === 2 ? (
                  <p className='text-black font-bold'>
                    Prediction:{" "}
                    <span className='text-[#00df9a] '>
                      No Lung Cancer Detected
                    </span>
                  </p>
                ) : (
                  <div className='flex flex-col gap-10'>
                    <div className='flex-col flex gap-2'>
                      <p className='text-black font-bold'>
                        Prediction:{" "}
                        <span className='text-red-500'>
                          Lung Cancer Detected
                        </span>
                        <p className='text-black font-bold'>
                          Cancer-Type:{" "}
                          <span className='text-red-500'>
                            {cancerTypes[prediction]}
                          </span>
                        </p>
                      </p>
                    </div>
                    <div className='flex flex-col gap-2 overflow-y-auto h-60'>
                      <h2 className='md:text-3xl text-xl font-bold text-center'>
                        Information about {cancerTypes[1]}
                        <br />
                        <span className='text-red-500 text-base'>
                          Powered By - GOOGLE GEMINI
                        </span>
                      </h2>
                      {cancerInfo !== "" && formatResponse(cancerInfo)}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LungCancer;
