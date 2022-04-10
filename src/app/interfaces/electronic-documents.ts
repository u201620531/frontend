import { Customer } from './customer';
import { DocumentType } from './document-type';
import { FormatType } from './format-type';
import { Money } from './money';
import { Supplier } from './supplier';
import { TransactionType } from './transaction-type';
import { WayPay } from './way-pay';

export interface ElectronicDocuments {
  Id: number;
  Serie: string;
  Number: string;
  TransactionType: TransactionType; //V-Venta, C-Compra
  Customer?: Customer;
  Supplier?: Supplier;
  DocumentType: DocumentType;
  FormatType: FormatType;
  WayPay: WayPay;
  Money: Money;
  Total: number;
  State: string;
  ScanDate: string;//Fecha de creación
  ScanUser: string;
  DataUploadDate?: string;
  DataUploadUser?: string;
  DateOfIssue?: string;
  CancellationDate?: string;
  DueDate?: string;
  PaymentDate?: string;
}
