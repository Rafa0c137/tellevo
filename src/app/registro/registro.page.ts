import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(
    public fb:FormBuilder,
    public alertController:AlertController,
    private navCtrl: NavController
  ) {
    
    this.formularioRegistro = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'confirmacionPassword': new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
    
  }
  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        message: 'Por favor rellene todos los campos',
        buttons: ['Aceptar']
      });
      
      await alert.present();
      return;
    }
      }
    
      irLogin() {
        this.navCtrl.back(); 
      }

    }

