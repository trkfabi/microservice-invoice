import express from "express";
import InvoiceController from "../controllers/invoice.controller.js";

const router = express.Router();

router.post("/status", InvoiceController.invoiceStatusHandler); // estado de la factura en la AEAT
router.get("/status", InvoiceController.invoiceRecordStatusHandler); // estado de un registro de factura (puede estar en la AEAT o no)
router.post("/create", InvoiceController.createInvoiceHandler);
router.put("/modify", InvoiceController.modifyInvoiceHandler);
router.post("/cancel", InvoiceController.cancelInvoiceHandler);
router.post("/list", InvoiceController.listInvoicesHandler);
router.post("/download", InvoiceController.downloadInvoiceHandler);

export default router;
