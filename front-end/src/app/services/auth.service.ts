import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";

export interface UserPro {
    username: string;
    uid: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user: UserPro | undefined;

    constructor(public auth: AngularFireAuth) {}

    loginFireauth(value: { email: string; password: string; }) {
    return new Promise<any>((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
    }

    setUser(user: UserPro) {
    this.user = user;
    }

    getUID(): string {
        return this.user?.uid ?? '';
    }

    userRegistration(value: { email: string; password: string; }) {
    return new Promise<any>((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
    }

    cerrarSesion(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
          firebase.auth().signOut() // Utiliza el método de Firebase para cerrar sesión
            .then(() => {
              // Realiza cualquier limpieza adicional, como borrar tokens de usuario o datos de sesión.
              // Por ejemplo, puedes establecer this.user = undefined si lo usas para almacenar el estado del usuario.
              this.user = undefined;
              resolve();
            })
            .catch(error => {
              // Maneja cualquier error que pueda ocurrir al cerrar la sesión.
              reject(error);
            });
        });
      }
}
