export interface Menu {
    Id: string;
    Name: string;
    HasItems: string;
    Level: number; //1-principal,2-hijo 1,3-hijo 2,.....
    Redirect: string;
    CreationDate: string;
    creationUser: string;
    State: string; //A-Activo, I-Inactivo
    SubMenu: Array<{
        Id: string;
        Name: string;
        Redirect: string;
        banner: string,
        HasChild: string,
        Items: Array<{
            Name:string,
            Redirect:string,
            banner:string
        }>
    }>
}