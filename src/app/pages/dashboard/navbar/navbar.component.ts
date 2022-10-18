import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
// import { Router } from 'express';
import { Modulo } from 'src/app/interfaces/modulo';
import { Usuario } from 'src/app/interfaces/usuario';
import { ModuloService } from 'src/app/services/modulo.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje, nombre_empresa } from 'src/shared/config';
import { MatSnackBar } from '@angular/material/snack-bar';

interface subMenuItem {
  idSubMenu: string;
  nombreSubMenu: string;
  vistaSubMenu: string;
  banner: number;
}
interface menuItem {
  idMenu: string;
  nombreMenu: string;
  vistaMenu: string;
  esPadre: number;
  subMenu: subMenuItem[];
}

export interface ModuloIndex {
  moduloIndex: number;
  submoduloIndex: number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  modulos: Modulo[] = [];
  modulo: any;
  menu: menuItem = {
    idMenu: '',
    nombreMenu: '',
    vistaMenu: '',
    esPadre: 0,
    subMenu: [],
  };
  submenu: subMenuItem = {
    idSubMenu: '',
    nombreSubMenu: '',
    vistaSubMenu: '',
    banner: 0,
  };
  submenus: any;
  listaModulo: any = [];
  nombreEmpresa = nombre_empresa;

  currentUsuario?: Usuario;
  constructor(
    private _snackBar: MatSnackBar,
    private _moduloService: ModuloService,
    private router: Router,
    private _usuarioService: UsuarioService
  ) {
    this._usuarioService.currentUsuario.subscribe(
      (x) => (this.currentUsuario = x)
    );
  }

  ngOnInit(): void {
    this.loadModulo();
  }

  loadModulo() {
    this._moduloService
      .listarModulosPorIdPerfilUsuario(
        this._usuarioService.currentUsuarioValue.idPerfilUsuario === ''
          ? 'P01'
          : this._usuarioService.currentUsuarioValue.idPerfilUsuario,
        'A'
      )
      .subscribe(
        (res) => {
          this.listaModulo = res;
          this.listaModulo.forEach((modul: any) => {
            if (
              this.modulos.length > 0 &&
              this.modulo.idModulo != modul.idModulo
            )
              this.modulos.push(this.modulo);
            if (this.modulos.length === 0) this.modulos.push(this.modulo);
            this.modulo = {
              idModulo: modul.idModulo,
              nombreModulo: modul.nombreModulo,
              vistaModulo: modul.vistaModulo,
              esPrincipal: modul.esPrincipal,
              menu: [],
            };
          });

          this.modulos.push(this.modulo);
          this.modulos.splice(0, 1);

          this.listaModulo.forEach((modul: any) => {
            if (modul.idMenu != '') {
              if (this.menu.idMenu != modul.idMenu) {
                this.menu = {
                  idMenu: modul.idMenu,
                  nombreMenu: modul.nombreMenu,
                  vistaMenu: modul.vistaMenu,
                  esPadre: modul.esPadre,
                  subMenu: [],
                };
                this.modulos.forEach((mod: any) => {
                  if (mod.idModulo === modul.idModulo) {
                    mod.menu.push(this.menu);
                  }
                });
              }
            }
          });

          this.listaModulo.forEach((modul: any) => {
            if (modul.idSubMenu != '') {
              if (this.submenu.idSubMenu != modul.idSubMenu) {
                this.submenu = {
                  idSubMenu: modul.idSubMenu,
                  nombreSubMenu: modul.nombreSubMenu,
                  vistaSubMenu: modul.vistaSubMenu,
                  banner: modul.banner,
                };
                this.modulos.forEach((mod: any) => {
                  if (mod.idModulo === modul.idModulo) {
                    mod.menu.forEach((submod: any) => {
                      if (submod.idMenu === modul.idMenu) {
                        submod.subMenu.push(this.submenu);
                      }
                    });
                  }
                });
              }
            }
          });
        },
        (err) => {
          this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          });
        }
      );
  }

  @Input() public moduloItems: Array<ModuloIndex> = [];
  @Output() public itemSelected = new EventEmitter<ModuloIndex>();

  public onClick(
    event: MouseEvent,
    moduloIndex: number,
    submoduloIndex: number
  ) {
    event.stopPropagation();
    this.itemSelected.emit({
      moduloIndex: moduloIndex,
      submoduloIndex: submoduloIndex,
    });
  }

  logout() {
    this._usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
