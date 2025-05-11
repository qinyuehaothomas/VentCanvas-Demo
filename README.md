# VentCanavs

![](/Project%20Descriptions/Demostration.gif)
> With VentCanvas, we keep the emotion, not the negativity.

A place to vent out your emotion, and turn it into artwork.
# Context
HuamnITy challenge 2025 entry of team V-ACe

### Preliminary Round Video (Link)
[![](https://img.youtube.com/vi/Fav5CBbWrhE/0.jpg)](https://www.youtube.com/watch?v=Fav5CBbWrhE)

### [Slides](https://1drv.ms/p/c/891da508c8864d20/IQSXlg13F_0zRLJmbrDL0VptAdwqI3-IZ9sUKbV8YUftpZ0)

very slow, cuz a lot of animations!\
<p style="color: grey"> yall dk how long i spent on ts🙏🙏🙏</p>

### Final round script and slides can be found in `Project Description` folder

# Approach
https://huggingface.co/Dpngtm/wav2vec2-emotion-recognition
A large chunck of the code is copy-pasted from the sample given\
(cuz i have no idea how to use HuggingFace / Transformers)

I'm trying to code <s>Vibe Code</s> the VentCanva feature\
I don't know how to make andriod apps, so i can only make a flask webapp for now...

Pre-trained, Pre-tuned, audio emotion classifier
Just to proof its possible and free.

### Major Problems faced:
- setup venv
- Have to convert the audio to `float32array` with `AudioWorklet`(I have no idea how it works) because browser does not support .wav encoding, but librosa need wav encoding.
- HTTPS Adhoc cert localhost because microphone access in browser need HTTPS
- Deploying to Vercel, didnt work. SO deployed to render.
- Front end illustraion, need to fill the bg of canvas black before drawing.

For more, read [Devlog](/Project%20Descriptions/Devlog.md)

# How to use 🖌️🎨  
A simple webapp deployed on Render (*damn slow*),
1. User press the fat button
2. Start recording, while recording, store the audio as `float32array`
3. When stop is pressed, send POST request to server with the array
3. The server reply a `emotion` json obj\
*It is the confidence of prediction, not the "percentage" of each emotion 
4. a function turns the emotion into different shapes and colours.
5. Record again, and the function will add the results together and normalise, and generate again
6. Right click the image to download!

# How to run the code?
1. clone this repo
2. open cmd in this directory, `pip install requirements.txt`
2. in main directory, `python app.py` or `flask run --cert=adhoc`
3. open the localhost and have fun🎨🎨
*Notice, need a adhoc cert to run on localhost, cuz microphone access requires HTTPS connections.

# Reflection on the competition
<img src="/Project%20Descriptions/Group%20Photo.jpg" width="50%">
It was a eye opening opportunity to engage in discussion with professors, and fellow competitiors.

*Key failures:*
- Failed to fully access the key criteria of the marking scheme, **it is more like a business proposal competition.**
- There are key technical flaws, the access needed is too much.
- There are no key motivation for caregivers to engage with our solution,\
The uniqueness of our solution did not stand out, We need a **hypothetical scenario**
- We completely missed the aspcet of financial.
- They want a full, workable bussiness plan😅

