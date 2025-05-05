import { AudioRecorder } from './audio-recorder.js';

const recorder = new AudioRecorder();

// Pin of Shame
// 100% vibe code🤡
let mediaRecorder;
let audioChunks = [];
var isRecording = false;

var statusDiv = document.getElementById('status');
var startBtn = document.getElementById('startBtn');
var HEADING = document.getElementById("heading");

function animate_heading(){
    startBtn.disabled=true;
    HEADING.style.animationPlayState="running";
    startBtn.parentElement.style.animationPlayState="running";
    setTimeout(() => {
        startBtn.disabled=false;
        HEADING.style.animationPlayState="paused";
        startBtn.parentElement.style.animationPlayState="paused";
        
        
    }, 1000);
}

document.addEventListener("DOMContentLoaded", (event) => {
    statusDiv = document.getElementById('status');
    startBtn = document.getElementById('startBtn');
    HEADING=document.getElementById("heading");
    animate_heading();
    startBtn.addEventListener('click', async () => {
        animate_heading();
        if (!isRecording) {
            document.getElementById("mic-icon").hidden=true;
            document.getElementById("pause-icon").hidden=false;

            console.log("Hi");
            // vibe check
            recorder.start()
              .catch(error => {
                console.error('Recording error:', error);
                isRecording = false;
              });
        } else {
            document.getElementById("mic-icon").hidden=false;
            document.getElementById("pause-icon").hidden=true;
            // stopRecording();

            console.log("Bye");
            // vibe check
            const audioData = await recorder.stop();
            const result = await sendAudioData(audioData);
            console.log('Analysis result:', result);
        
        }
        isRecording=!isRecording
    });
});


function startRecording(){

}

function stopRecording(){

}


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
        
        // If you want to display it on the page
        const output = JSON.stringify(result, null, 2);

        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Usage with previous recorder:
// await AudioRecorder.start()
// ... later ...
// const audioData = await AudioRecorder.stop()
// await sendAudioData(audioData)