import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder) { 
    
    this.formularioLogin = this.fb.group({
    'usuario': new FormControl("",Validators.required),
    'contraseña': new FormControl("",Validators.required)
  })
  }

  ngOnInit() {
  }
  Ingresar(){
    if(this.formularioLogin.valid){
      const{usuario,password}=this.formularioLogin.value;

      console.log('Usuario:',usuario);
      console.log('password:',password);
    }else{
      console.log('datos invalidos');
    }
  }

}
