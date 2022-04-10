import { DocumentType } from "./document-type";
import { FormatType } from "./format-type";
import { WayPay } from "./way-pay";

export interface DigitalizedElectronicDocument {
  Id: number;
  Name: string;
  FileRoute: string;
  FileContent: string;
  FileType: string;
  DocumentType?: DocumentType;
  FormatType?: FormatType;
  WayPay?: WayPay;
  FileSize: string;
  State: string;
  Detail?: string;
  DigitalizedDate: string; //Fecha de creación
  DigitalizedUser: string;
}
