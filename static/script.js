import { AudioRecorder } from './audio-recorder.js';
import { drawEmotionShapes } from './draw-canvas.js';
const recorder = new AudioRecorder();

// Pin of Shame
// 100% vibe code🤡
let mediaRecorder;
let audioChunks = [];
var isRecording = "Start";
// "Loading"
// "Show"

var statusDiv = document.getElementById('status');
var startBtn = document.getElementById('startBtn');
var HEADING = document.getElementById("heading");
var loader =  document.getElementById("load");
var canvas=document.getElementById("canvas");
var animations=[];
var result= {
    "emotion": {
    "angry": 0,
    "calm": 0,
    "disgust": 0,
    "fearful": 0,
    "neutral": 0,
    "sad": 0,
    "surprised": 0
    }
};
// function animate_heading(){
//     startBtn.disabled=true;
//     HEADING.getAnimations()[0].play();
//     HEADING.getAnimations()[0].play();
//     // startBtn.parentElement.style.animationPlayState="running";
//     setTimeout(() => {
//         startBtn.disabled=false;
//         HEADING.style.animationPlayState="paused";
//         startBtn.parentElement.style.animationPlayState="paused";
        
        
//     }, 1000);
// }


function show_icon(name){
    Array.from(document.getElementsByClassName("icon")).forEach((e)=>{
        if(e.id===name){e.hidden=false;}
        else{e.hidden=true;}
    });
}

function updateResult(newData) {
    const emotions = Object.keys(result.emotion);
    const summedEmotions = {};
    let total = 0;

    // Sum corresponding values from both objects
    for (const emotion of emotions) {
        summedEmotions[emotion] = result.emotion[emotion] + newData.emotion[emotion];
        total += summedEmotions[emotion];
    }
    // console.log(newData,summedEmotions);
    // Normalize and update the result
    for (const emotion of emotions) {
        result.emotion[emotion] = summedEmotions[emotion] / total;
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    statusDiv = document.getElementById('status');
    startBtn = document.getElementById('startBtn');
    HEADING = document.getElementById("heading");
    loader = document.getElementById("load");
    canvas = document.getElementById("canvas");
    // loader.classList.toggle("loader");

    
    animations=[
        HEADING.getAnimations()[0],
        startBtn.parentElement.getAnimations()[0]
    ]

    startBtn.addEventListener('click', async () => {
        // animate_heading();
        if (isRecording=="Start") {
            animations[0].reverse();
            animations[1].reverse();

            show_icon("pause");

            // vibe check
            recorder.start()
              .catch(error => {
                console.error('Recording error:', error);
                isRecording = "Start";
              });
            
            statusDiv.innerText="Recording";
            loader.classList.toggle("loader");
            isRecording="Loading";
        } else if(isRecording=="Loading"){

            console.log("Bye");
            // vibe check
            const audioData = await recorder.stop();
            
            statusDiv.innerText="Sending Response";
            let newData = await sendAudioData(audioData)

            updateResult(newData);
            
            console.log(result);
            loader.classList.toggle("loader");
            
            HEADING.hidden=true;
            canvas.hidden=false;
            drawEmotionShapes(result);


            statusDiv.innerHTML="Right Click / Long Press to save image!";
            isRecording="Start";
            
            animations[0].reverse();
            animations[1].reverse();
            show_icon("mic");

            // initially wanted a download button
            // Now is just long press / right click download
            // isRecording="Download";
            // show_icon("download");
            
        
        } 
        // isRecording=!isRecording
    });
});



// 100% vibe code...

async function sendAudioData(audioData) {
    try {
        const response = await fetch('/emotion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                audio: Array.from(audioData) // Convert Float32Array to regular array
            })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Usage with previous recorder:
// await AudioRecorder.start()
// ... later ...
// const audioData = await AudioRecorder.stop()
// await sendAudioData(audioData)

