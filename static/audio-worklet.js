class RecorderProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.sampleRate = 16000;
    this.resampler = new Resampler({
      nativeSampleRate: sampleRate,
      targetSampleRate: 16000,
      targetChannels: 1
    });
  }

  process(inputs) {
    if (inputs[0]?.[0]) {
      const resampled = this.resampler.process(inputs[0][0]);
      if (resampled) {
        this.port.postMessage(resampled);
      }
    }
    return true;
  }
}

// Simple resampler (for demo - consider using a proper library)
class Resampler {
  constructor({nativeSampleRate, targetSampleRate, targetChannels}) {
    this.ratio = nativeSampleRate / targetSampleRate;
    this.targetChannels = targetChannels;
    this.buffer = [];
  }

  process(input) {
    // Basic downsampling - replace with proper resampling algorithm
    const result = new Float32Array(Math.floor(input.length / this.ratio));
    for (let i = 0, j = 0; i < input.length && j < result.length; i += this.ratio, j++) {
      result[j] = input[Math.floor(i)];
    }
    return result;
  }
}

registerProcessor('recorder-processor', RecorderProcessor);