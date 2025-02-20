import request from "supertest";
import app from "../app";

//import { QueueProcessor } from "../queues/processor.queue";

describe("Invoice Endpoints", () => {
  it("should create an invoice", async () => {
    const payload = {
      serie: "A",
      numero: "1",
      fecha_expedicion: "19-02-2025",
      tipo_factura: "F1",
      descripcion: "Descripcion de la operacion",
      nif: "A15022510",
      nombre: "Empresa de prueba SL",
      lineas: [
        {
          impuesto: "IVA",
          base_imponible: "200",
          tipo_impositivo: "21",
          cuota_repercutida: "42",
        },
      ],
      importe_total: "242",
    };

    const res = await request(app)
      .post("/api/invoice/create")
      .send({ payload });

    //console.log("res", res.statusCode, res.body);
    expect(res.statusCode).toEqual(200);
    //expect(res.body.success).toBe(true);
  });

  //   it("should cancel an invoice", async () => {
  //     const payload = {
  //       /* mock data for cancel */
  //     };
  //     const res = await request(app)
  //       .post("/api/invoice/cancel")
  //       .send({ payload });
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body.success).toBe(true);
  //   });
});

// afterAll(async () => {
//   await QueueProcessor.closeQueue();
// });
