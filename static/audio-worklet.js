class RecorderProcessor extends AudioWorkletProcessor {
    process(inputs) {
      if (inputs[0]?.[0]) {
        this.port.postMessage(inputs[0][0].slice());
      }
      return true;
    }
  }
  
  registerProcessor('recorder-processor', RecorderProcessor);