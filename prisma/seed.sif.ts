import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const sistemaInformatico = await prisma.sistemaInformatico.create({
    data: {
      nombreRazon: "PEPITO SOFTWARE SL",
      nif: "B99999999",
      nombreSistemaInformatico: "Mi Verifactu Test",
      idSistemaInformatico: "M1",
      version: "1.0",
      numeroInstalacion: "INST001",
      tipoUsoPosibleSoloVerifactu: "S",
      tipoUsoPosibleMultiOT: "S",
      indicadorMultiplesOT: "S",
    },
  });

  console.log("SistemaInformatico creado:", sistemaInformatico);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
