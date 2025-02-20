export function getFormattedDate(_date = new Date()): string {
  const date = new Date(_date);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function getFormattedDateTime(_date = new Date()): string {
  // Construir fecha y hora local
  const date = new Date(_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Calcular la zona horaria
  const offset = -date.getTimezoneOffset(); // Offset en minutos
  const sign = offset >= 0 ? "+" : "-";
  const offsetHours = String(Math.abs(Math.floor(offset / 60))).padStart(
    2,
    "0"
  );
  const offsetMinutes = String(Math.abs(offset % 60)).padStart(2, "0");

  // Combinar todo en el formato ISO 8601
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
}
