import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  nombreUsuario = '';
  constructor(
    private _usuarioService: UsuarioService,
    private _empleadoService: EmpleadoService
  ) {}

  async ngOnInit() {
    await this.consultaEmpleado();
  }

  async consultaEmpleado() {
    this._empleadoService
      .listarEmpleadoPoridEmpleado(
        this._usuarioService.currentUsuarioValue.idEmpleado
      )
      .subscribe((res: any) => {
        this.nombreUsuario = res.nombre + " " + res.apellido;
      });
  }
}
