"""
Obviously IDK how ts works, 60% Deepseek adn 40% sample code from Hugging face website
"""

from transformers import Wav2Vec2ForSequenceClassification, Wav2Vec2Processor
import torch
import librosa  # Corrected import
import numpy as np

# Load model and processor
model = Wav2Vec2ForSequenceClassification.from_pretrained("Dpngtm/wav2vec2-emotion-recognition")
processor = Wav2Vec2Processor.from_pretrained("Dpngtm/wav2vec2-emotion-recognition")

# Load and preprocess audio with librosa
# speech_array, sampling_rate = librosa.load("TestAudio2.wav", sr=16000, mono=True)  # Fixed librosa usage

def process_audio_segment(segments):

    # Convert numpy array to tensor
    speech_array = torch.from_numpy(segments).float()

    # Process through model
    inputs = processor(
        speech_array.numpy(),  # Processor expects numpy array
        sampling_rate=16000,
        return_tensors="pt",
        padding=True
    )
    with torch.no_grad():
        outputs = model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
    # Get predicted emotion
    emotion_labels = ["angry", "calm", "disgust", "fearful", "happy", "neutral", "sad", "surprised"]
    predicted_emotion = emotion_labels[predictions.argmax().item()]
    return predicted_emotion


def analyze_long_audio(file_path, segment_length=5):
    # Load entire audio file
    audio, rate = librosa.load(file_path, sr=16000)
    
    # Split into segments (5 seconds by default)
    samples_per_segment = rate * segment_length
    num_segments = int(np.ceil(len(audio) / samples_per_segment))
    
    results = []
    
    for i in range(num_segments):
        start = i * samples_per_segment
        end = start + samples_per_segment
        segment = audio[start:end]
        
        # Handle last partial segment
        if len(segment) < samples_per_segment:
            segment = np.pad(segment, (0, samples_per_segment - len(segment)))
        
        emotion = process_audio_segment(segment)
        results.append({
            "start": i * segment_length,
            "end": (i + 1) * segment_length,
            "emotion": emotion
        })
        
        print(f"{ i * segment_length:03d}-{(i + 1) * segment_length:03d}s: {emotion}")
    
    return results


# analyze_long_audio("TestMom.wav")