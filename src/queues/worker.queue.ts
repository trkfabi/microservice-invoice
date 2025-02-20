import "../env-loader.js";

import { config } from "../config.js";
import { QueueProcessor } from "./processor.queue.js";

// Inicializa el procesamiento
QueueProcessor.startProcessing();

console.log("AEAT Queue Processor started: ", config.queueName);
