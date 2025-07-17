export function getFormattedDate(dateString: string): string {
  const [day, month, year] = dateString.split("-"); // Desestructura el string en día, mes y año
  // Asegura que el día y mes tengan siempre dos dígitos
  const formattedDay = day.padStart(2, "0"); // Asegura 2 dígitos para el día
  const formattedMonth = month.padStart(2, "0"); // Asegura 2 dígitos para el mes

  // Reensambla la fecha en formato YYYY-MM-DD
  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

  return formattedDate;
}

export function getFormattedDateTime(): string {
  // Construir fecha y hora local
  const date = new Date();
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
