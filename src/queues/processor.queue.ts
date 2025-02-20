import Bull from "bull";
import { config } from "../config/config.js";
import { sendRecordToAEAT } from "../services/invoice.service.js";
import { InvoiceQueueItem } from "../types/enums.js";

export class QueueProcessor {
  private static queue = new Bull(config.queueName, {
    redis: {
      host: config.redisHost,
      port: config.redisPort,
    },
  });
  // Método para cerrar la cola
  public static async closeQueue() {
    await this.queue.close();
  }
  private static maxBatchSize: number = config.maxBatchSize; // Máximo de 1000 elementos por batch
  private static delay: number = config.delay; // Retraso de procesamiento (en milisegundos)
  private static processing: boolean = false;

  // Agrega un ítem a la cola
  public static async addToQueue(item: InvoiceQueueItem) {
    console.log("[processor.queue] Added to queue");
    await this.queue.add(item, { removeOnComplete: true });
  }

  // Inicializa el procesador
  public static startProcessing() {
    // Inicia un ciclo de procesamiento
    setInterval(async () => {
      console.log("[processor.queue] checking queue", config.queueName);
      if (!this.processing) {
        this.processing = true;

        try {
          // Obtén todos los trabajos en espera
          const jobs = await this.queue.getJobs(["waiting"]);
          console.log("[processor.queue] found jobs:", jobs.length);

          // Procesa en lotes si hay suficientes trabajos o si hay cualquier cantidad de trabajos pendientes
          if (jobs.length > 0) {
            const batch = jobs
              .slice(0, this.maxBatchSize) // Toma hasta el tamaño máximo de lote
              .map((job) => job.data);

            await this.processBatch(batch);

            // Elimina los trabajos procesados de la cola
            for (const job of jobs.slice(0, this.maxBatchSize)) {
              await job.remove();
            }
          }
        } catch (error) {
          console.error(
            "[processor.queue] Error processing AEAT queue:",
            error
          );
        } finally {
          this.processing = false;
        }
      }
    }, this.delay);
  }

  // Procesa un batch de trabajos
  private static async processBatch(batch: InvoiceQueueItem[]) {
    console.log("Sending batch to AEAT:", batch);
    const result = await sendRecordToAEAT(batch);
    console.log("Result: ", result);
    return result;
  }
}
