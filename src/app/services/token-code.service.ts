import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenCodeService {

  constructor() { }

  tGenerate(cant: number) {

    let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ1234567890";
    let contrasenia = "";
    
    for (let i=0; i<cant; i++) {
      contrasenia += caracteres.charAt(Math.floor(Math.random()*caracteres.length));   
    }

    return contrasenia;
    
  }

}
