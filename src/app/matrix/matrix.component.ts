import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/src/sweetalert2.js'

import { ControlUsersService } from '../services/control-users.service';
import { TokenCodeService } from '../services/token-code.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {

  public _IMGE;
  public _IMGEChan;
  public bolmat: boolean = true;
  public boolCamp: boolean = false;
  public usuario: string;
  public classAttribute:string;
  public titleAlert: string;
  public textMessage: string;
  public icon: string;
  public alertBool: boolean = false;
  public mensaje: string;
  public colorBorder: string = 'steelblue';
  public bgColor: string = 'transparent';
  public textColor: string = 'steelblue';
  
  constructor( private sendUsers: ControlUsersService, public tok:TokenCodeService ) { }
  
  ngOnInit() {
    this.controlAccess();
    this.usuario = sessionStorage.getItem('User-Nick');
    this.TOKEN = sessionStorage.getItem('Token-User');
    this.getMensajes();
    this.getMenTime(4000)
  }

  getMenTime(time: number) {
    setInterval(() => {
      this.getMensajes();
      this.bgColor = 'steelblue';
      this.textColor = 'white';
      this.colorBorder = 'orange';
    }, time)
  }

  encodeImageFileAsURL() {

    const filesSelected = document.getElementById('fileUp') as HTMLInputElement;
    const fileId = filesSelected.files;
    let base;
    if (fileId.length > 0) {

      const fileToLoad = filesSelected[0];
      const fileReader = new FileReader();

      fileReader.onload = () => {
        base = fileReader.result;
        document.getElementById('imgTest').style.backgroundImage = `url(${base})`;
      };

      fileReader.onloadend = () => {
        this._IMGE = fileReader.result;
        console.log(this._IMGE);
      };

      const a = fileReader.readAsDataURL(fileId[0]);

    }

  }
  public controlAccessBool: boolean = false;
  controlAccess() {
    if( sessionStorage.getItem('User-Nick') == undefined || sessionStorage.getItem('User-Nick') == '' ) {
      this.controlAccessBool = true;
      this.boolCamp = false;
    }
    else {
      this.controlAccessBool = false;
      this.boolCamp = true;
    }
  }

  public userArr: any = [];
  public TOKEN;
  saveUsers() {   
    this.TOKEN = '#'+this.tok.tGenerate(29);
    this.userArr = {
      resp: 1,
      usuario: this.usuario,
      perfil: this._IMGE,
      token_user: this.TOKEN
    }

    if( (this._IMGE == undefined || this._IMGE == '' ) &&
        (this.usuario == undefined || this.usuario == '' || this.usuario == null) ) {      
      //'alert alert-success animated fadeInDown fast'
      this.alertBool = true;
      this.icon = 'report';
      this.classAttribute = 'alert alert-warning';
      this.titleAlert = 'Opps!';
      this.textMessage = 'Para ingresar necesitamos la información requerida.';   
    }

    else {
      sessionStorage.setItem('User-Nick', this.usuario);
      sessionStorage.setItem('Token-User', this.TOKEN);
      this.sendUsers.saveUs(this.userArr).subscribe( x => {
        console.log(x);
        //alerta
        //-------------------------------------------------
        this.alertBool = true;
        this.icon = 'sentiment_satisfied';
        this.classAttribute = 'alert alert-success';
        this.titleAlert = 'Bien!';
        this.textMessage = 'Has ingresado con éxito';        
        setTimeout(() => {
          this.alertBool = false;
        }, 1200);
        //-------------------------------------------------
        
        this.userArr = x;
        
        this.controlAccess();
        this.getUsers(this.userArr[0].usuario, this.userArr[0].id);
        this.usuario = sessionStorage.getItem('User-Nick');

      }, () => {  
        //alerta
        //-------------------------------------------------        
         this.alertBool = true;
         this.icon = 'sentiment_very_dissatisfied';
         this.classAttribute = 'alert alert-danger';
         this.titleAlert = 'Error al conectarse!';
         this.textMessage = 'Revisa tu conexión a internet';        
         setTimeout(() => {
            this.alertBool = false;
         }, 1200);
        //-------------------------------------------------
      })
    }
    
  }
  public arrChanel: any = [];
  public TOKENChanel;
  addChanel() {

    this.TOKENChanel = '#COM-'+ sessionStorage.getItem('Token-User') + this.tok.tGenerate(24)

    this.arrChanel = {
      usuario          : sessionStorage.getItem('User-Nick'), 
      imgcanal         : "", 
      descripcion_canal: "", 
      datetime         : new Date(), 
      estado           : 1, 
      token_canal      : this.TOKENChanel
    } 
  }


  encodeImageFileAsURLChanel() {

    const filesSelected = document.getElementById('fileUpChanel') as HTMLInputElement;
    const fileId = filesSelected.files;
    let base;
    if (fileId.length > 0) {

      const fileToLoad = filesSelected[0];
      const fileReader = new FileReader();

      fileReader.onload = () => {
        base = fileReader.result;
        document.getElementById('imgTestChanel').style.backgroundImage = `url(${base})`;
      };

      fileReader.onloadend = () => {
        this._IMGE = fileReader.result;
        //console.log(this._IMGEChan);
      };

      const a = fileReader.readAsDataURL(fileId[0]);

    }

  }


  public arrUS: any = [];
  getUsers(us, id) {
    this.sendUsers.getUs(us, id).subscribe( y => {
      this.arrUS = y;
      //console.log(this.arrUS);
    })
  }


  public arrMensajeSend: any = [];
  saveMensaje() {

    this.arrMensajeSend = {
      usuario: sessionStorage.getItem('User-Nick'),
      date_mensaje: new Date(),
      mensaje: this.mensaje,
      estado: 1
    }

    this.sendUsers.saveMensaje(this.arrMensajeSend).subscribe( m => {
      this.arrMensajeSend = m;
      this.colorBorder = 'steelblue';
      console.log(this.arrMensajeSend);
      this.getMensajes();
    })

  }

  public mensajesGen:any = []
  getMensajes() {
    
    this.sendUsers.getMensaje().subscribe( mesjesGen => {
      this.mensajesGen = mesjesGen;
      this.colorBorder = 'steelblue';
      //console.log(this.mensajesGen);
    })

  }

  delMensaje(us, id) {
    this.sendUsers.deleteMensaje(us,id).subscribe( l => {
      console.log(l)
      this.getMensajes();
    })
  }

}
