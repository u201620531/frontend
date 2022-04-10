export interface Menu {
    Id: string;
    Name: string;
    IdFather?: string;
    Level: number; //1-principal,2-hijo 1,3-hijo 2,.....
    Redirect: string;
    CreationDate: string;
    creationUser: string;
    State: string; //A-Activo, I-Inactivo
}