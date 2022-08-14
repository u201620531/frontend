export interface WayPay {
  id: string;
  description: string;
  abbreviation?: string;
  status: string; //A-Activo, I-Inactivo
  creationDate?: string;
  creationUser?: string;
}
