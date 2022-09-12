import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _usuarioService: UsuarioService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser:Usuario={
            idEmpleado:'',
            codigoUsuario:'',
            contrasena:'',
            estado:'',
            idPerfilUsuario:'',fechaCreacion:'',usuarioCreacion:''
        }
        this._usuarioService.currentUsuario.subscribe(res =>{
            currentUser = res;
        })
        // let currentUser = this._usuarioService.currentusuario;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}