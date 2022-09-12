import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Usuario } from '../interfaces/usuario';

const usuarios: Usuario[] = [{ idEmpleado: 'E001', codigoUsuario: 'test', contrasena: 'test', idPerfilUsuario: 'P01', estado:'A',fechaCreacion:'',usuarioCreacion:'' }];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/usuarios/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/usuarios') && method === 'GET':
                    return getusuarios();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { codigoUsuario, contrasena } = body;
            const usuario = usuarios.find(x => x.codigoUsuario === codigoUsuario && x.contrasena === contrasena);
            if (!usuario) return error('codigoUsuario or contrasena is incorrect');
            return ok({
                idEmpleado: usuario.idEmpleado,
                codigoUsuario: usuario.codigoUsuario,
                idPerfilUsuario: usuario.idPerfilUsuario,
                estado: usuario.estado,
                token: 'fake-jwt-token'
            })
        }

        function getusuarios() {
            if (!isLoggedIn()) return unauthorized();
            return ok(usuarios);
        }

        // helper functions

        function ok(body?:any) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message:any) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};