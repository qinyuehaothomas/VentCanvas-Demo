from transformers import Wav2Vec2ForSequenceClassification, Wav2Vec2Processor
import torch,librosa
import numpy as np
from io import BytesIO
from flask import Flask, request, jsonify,render_template,send_file,url_for,send_from_directory

# Load model and processor
model = Wav2Vec2ForSequenceClassification.from_pretrained("Dpngtm/wav2vec2-emotion-recognition")
processor = Wav2Vec2Processor.from_pretrained("Dpngtm/wav2vec2-emotion-recognition")
emotion_labels = ["angry", "calm", "disgust", "fearful", "happy", "neutral", "sad", "surprised"]

app=Flask(__name__)

@app.route("/")
def main():
    return render_template(r"index.html")

@app.route("/emotion",methods=["POST"])
def emotion():
    # if 'audio' not in request.files:
    #     return jsonify({"error": "No file uploaded"}), 400
    # data = request.files['audio'].read()  # Raw binary from JS
    # waveform, sr = librosa.load(BytesIO(data), sr=None, dtype=np.float32)

    # print(request.json)
    if 'audio' not in request.json:
        return jsonify({'error': 'No audio file provided'}), 400
    # In your Flask route
    audio_data = request.json['audio']
    waveform = np.array(audio_data, dtype=np.float32)

    # Process audio
    inputs = processor(
        waveform,
        sampling_rate=16000,
        return_tensors="pt",
        padding=True
    )
    
    with torch.no_grad():
        outputs = model(**inputs)
    
    predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
    # print(predictions)
    # predicted_emotion = emotion_labels[predictions.argmax().item()]
    
    top_probs, top_indices = torch.topk(predictions, k=7, dim=-1)
    top_emotions = {
        emotion_labels[idx.item()]: prob.item()\
              for prob, idx in zip(top_probs[0], top_indices[0])
    }
    print({'emotion': top_emotions})
    return jsonify({'emotion': top_emotions})



@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

# if __name__ == "__main__":
    # print("hi!")
    # app.run(debug=True, ssl_context="adhoc")  # Auto-runs with HTTPS