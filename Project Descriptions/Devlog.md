
# Devlog

# Day long time ago
Spent the whole weekend grinding the slides from 10am to 5am next day for 4 days straight
Filmed & edited vid in one day in sch.
1/7 in VJ, 8/66 in Singapore worth it

# Pin Of Shame 100% Vibe Code

# Day 1
Settle some basic framework for the project\
start testing Hugging face and transformer locally.
- Setup Virtual Env
- Installed libraries
- Tried a few models
- **Vibe coded a lot**

https://huggingface.co/Dpngtm/wav2vec2-emotion-recognition
I copied a sample code from a wrapper of a fine tuned of a model🤡

Kinda worked for clips online n real-person test,
Next is wrapping and deploy!

# Day 2
Start wrapping the front end ig\
**Problem : Encoding scheme mismatch**\
browser encoding scheme is webm, not wav, but librosa works with wav\
while pydub needs ffmpeg to work,

**Solution:**\
process the audio into the format required by the model (*16kHz mono float32array*)\
then feed it as an array