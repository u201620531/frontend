export interface ScannedElectronicDocument {
  Id: number;
  Name: string;
  FileRouteOrigin: string;
  FileContent: string;
  FileType: string;
  FileSize: string;
  State: string;
  Detail?: string;
  ScanDate: string; //Fecha de creación
  ScanUser: string;
}
