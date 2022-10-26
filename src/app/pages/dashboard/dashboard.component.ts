import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/interfaces/modulo';
import { Usuario } from 'src/app/interfaces/usuario';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ModuloService } from 'src/app/services/modulo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje, nombre_empresa } from 'src/shared/config';

interface subMenuItem {
  idSubMenu: string;
  nombreSubMenu: string;
  vistaSubMenu: string;
  banner: number;
}
interface menuItem {
  idMenu: string;
  nombreMenu: string;
  showMenu: boolean;
  iconoMenu: string;
  isExpandedMenu: boolean;
  isShowingMenu: boolean;
  vistaMenu: string;
  esPadre: number;
  subMenu: subMenuItem[];
}

export interface ModuloIndex {
  moduloIndex: number;
  submoduloIndex: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  modulos: Modulo[] = [];
  modulo: any;
  menu: menuItem = {
    idMenu: '',
    nombreMenu: '',
    vistaMenu: '',
    iconoMenu: '',
    isExpandedMenu: false,
    isShowingMenu: false,
    showMenu: false,
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
  banner: subMenuItem[] = [];
  nombreUsuario = '';

  constructor(
    private _snackBar: MatSnackBar,
    private _moduloService: ModuloService,
    private router: Router,
    private _usuarioService: UsuarioService,
    private _empleadoService: EmpleadoService
  ) {
    this._usuarioService.currentUsuario.subscribe(
      (x) => (this.currentUsuario = x)
    );
  }

  ngOnInit(): void {
    this.loadModulo();
    this.consultaEmpleado();
  }

  async consultaEmpleado() {
    this._empleadoService
      .listarEmpleadoPoridEmpleado(
        this._usuarioService.currentUsuarioValue.idEmpleado
      )
      .subscribe((res: any) => {
        this.nombreUsuario = res.nombre + ' ' + res.apellido;
      });
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
              iconoModulo: modul.iconoModulo,
              isExpandedModulo: false,
              isShowingModulo: false,
              showModulo: false,
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
                  iconoMenu: modul.iconoMenu,
                  isExpandedMenu: false,
                  isShowingMenu: false,
                  showMenu: false,
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
                if (modul.banner === 1) {
                  this.banner.push(this.submenu);
                }
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

  logout() {
    this._usuarioService.logout();
    this.router.navigate(['/login']);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
