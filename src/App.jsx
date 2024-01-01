import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as cocoModel from "@tensorflow-models/coco-ssd";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [model, setModel] = useState("")
  const [objectName, setObjectName] = useState("")
  const [objectScore, setObjectScore] = useState("")
  
  async function loadModel() {
    try {
    const dataset = await cocoModel.load()
    setModel(dataset)
    console.log('data set ready...')
    } catch(err) {
      console.log("error")
    }
  }

  useEffect(() => {
    tf.ready().then(() => {
      loadModel()
    })
  }, [])

   async function predict() {
    const detection = await model.detect(document.getElementById("videoSource"))
    if(detection.length > 0) {
      detection.map((result, i) => {
        setObjectName(result.class)
        setObjectScore(result.score)
        console.log(detection)
      })
    }
  }


  const videoOption = {
    width: 720,
    height: 500,
    facingMode: "enviroment"
  }


  return (
    <div className="App">
      <h1>Cam Detection</h1>
     <h3>Nama Objek :</h3> <h3>{objectName ? objectName.toString() : ""}</h3>
      <h3>Tingkat Akurasi Detection :</h3><h3>{objectScore ? objectScore.toString() : ""}</h3><br/>
      <button onClick={() => predict()}>tebak Objeknya bang</button>
      <div class="cam">
      <Webcam
      id="videoSource"
      audio={false}
      videoContraints={videoOption}
      />
      </div>
    </div>


  )
  
}

export default App
