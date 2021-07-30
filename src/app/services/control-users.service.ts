import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlUsersService {

  private url = 'https://alp-cloud.com:8452/api/'

  constructor(private http: HttpClient) { }

  saveUs(model) {
    return this.http.post( this.url + 'Webappuser/savewebappuser', model );
  }

  getUs(us, id) {
    return this.http.get( this.url + 'Webappuser/getwebappuser/' + us + '/' + id );
  }

  //mensjeria
  saveMensaje(model) {
    return this.http.post( this.url + 'mensajeria/savemensaje', model );
  }

  deleteMensaje(us, id) {
    return this.http.get( this.url + 'mensajeria/delmensaje/' + us + '/' + id );
  }

  getMensaje() {
    return this.http.get( this.url + 'mensajeria/getMensaje/' );
  }


  alert(obj, textTitle, textMessage, display, contentClass){

    // obj.style.width = '280px'
    // obj.style.height = 'auto'
    obj.style.display = display;
    // obj.style.background = '#171717'
    // obj.style.boxShadows = '0px 0px 10px rgba(0,0,0,0.8)';
    obj.setAttribute('class', contentClass)
    //obj.innerHTML = `<h3> ${textTitle} </h3> <hr style="border: solid 1px gray;"> <h6> ${textMessage} </h6> <hr style="border: solid 1px gray;">` 

  }

}
