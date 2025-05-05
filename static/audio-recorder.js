export class AudioRecorder {
    constructor() {
      this.audioContext = null;
      this.mediaStream = null;
      this.workletNode = null;
      this.audioChunks = [];
    }
  
    async start() {
      try {

        console.log("did you call me??");

        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioContext = new AudioContext();
        
        await this.audioContext.audioWorklet.addModule('/static/audio-worklet.js');
        
        const source = this.audioContext.createMediaStreamSource(this.mediaStream);
        this.workletNode = new AudioWorkletNode(this.audioContext, 'recorder-processor');
        
        this.workletNode.port.onmessage = ({ data }) => {
          this.audioChunks.push(data);
        };
  
        source.connect(this.workletNode);
        this.workletNode.connect(this.audioContext.destination);
      } catch (error) {
        this.cleanup();
        throw error;
      }
    }
  
    async stop() {
      if (!this.audioContext) return null;

      console.log("did you call me??");
      
      // Disconnect and cleanup
      this.workletNode?.disconnect();
      this.audioContext?.close();
      this.mediaStream?.getTracks().forEach(track => track.stop());
      
      // Combine chunks
      const audioData = new Float32Array(
        this.audioChunks.reduce((acc, chunk) => acc + chunk.length, 0)
      );
      let offset = 0;
      this.audioChunks.forEach(chunk => {
        audioData.set(chunk, offset);
        offset += chunk.length;
      });
      
      this.cleanup();
      return audioData;
    }
  
    cleanup() {
      this.audioChunks = [];
      this.workletNode = null;
      this.mediaStream = null;
      this.audioContext = null;
    }
  }