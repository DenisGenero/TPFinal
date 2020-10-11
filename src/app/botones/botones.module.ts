import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';

import { BotonesPageRoutingModule } from './botones-routing.module';

import { BotonesPage } from './botones.page';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BotonesPageRoutingModule
  ],
  declarations: [BotonesPage]
})
export class BotonesPageModule {

  constructor(public navCtrl: NavController, private bt: BluetoothSerial,
    private alertCtrl: AlertController, private toasCtrl: ToastController) { }
  
  public Rojo = 0;
  public Verde = 0;
  public Azul = 0;

  public brillo = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  private BRILLO_MAX = 9;
  private APAGADO = 0;
  
  
  public async Desconectar() {
    try {
      await this.bt.disconnect();
      this.mostrarInfo("Dispositivo desconectado");
    } catch (e) {
      this.mostrarError("No se ha podido desconectar");
    }
  }

  //Funciones para el color ROJO
  public AumentarRojo() {
    if (this.Rojo < this.BRILLO_MAX) {
      this.Rojo = this.Rojo + 1;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color ROJO está al máximo");
  }

  public DisminuirRojo() {
    if (this.Rojo > this.APAGADO) {
      this.Rojo = this.Rojo - 1;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color ROJO está apagado");
  }

  public MaxRojo() {
    if (this.Rojo < this.BRILLO_MAX) {
      this.Rojo = this.BRILLO_MAX;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color ROJO ya está al máximo");
  }

  public ApagarRojo() {
    if (this.Rojo > this.APAGADO) {
      this.Rojo = this.APAGADO;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color ROJO ya está apagado");
  }

  //Funciones para el color VERDE
  public AumentarVerde() {
    if (this.Verde < this.BRILLO_MAX) {
      this.Verde = this.Verde + 1;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color VERDE está al máximo");
  }

  public DisminuirVerde() {
    if (this.Verde > this.APAGADO) {
      this.Verde = this.Verde - 1;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color VERDE está apagado");
  }

  public MaxVerde() {
    if (this.Verde < this.BRILLO_MAX) {
      this.Verde = this.BRILLO_MAX;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color VERDE ya está al máximo");
  }

  public ApagarVerde() {
    if (this.Verde > this.APAGADO) {
      this.Verde = this.APAGADO;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color VERDE ya está apagado");
  }

  //Funciones para el color AZUL
  public AumentarAzul() {
    if (this.Azul < this.BRILLO_MAX) {
      this.Azul = this.Azul + 1;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color AZUL está al máximo");
  }

  public DisminuirAzul() {
    if (this.Azul > this.APAGADO) {
      this.Azul = this.Azul - 1;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color AZUL está apagado");
  }

  public MaxAzul() {
    if (this.Azul < this.BRILLO_MAX) {
      this.Azul = this.BRILLO_MAX;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color AZUL ya está al máximo");
  }

  public ApagarAzul() {
    if (this.Azul > this.APAGADO) {
      this.Azul = this.APAGADO;
      this.EnviarComando();
    }
    else
      this.mostrarInfo("El color AZUL ya está apagado");
  }

  //Funciones para todos los leds
  public EncenderTodos() {
    this.Rojo = this.BRILLO_MAX;
    this.Verde = this.BRILLO_MAX;
    this.Azul = this.BRILLO_MAX;
    this.EnviarComando();
  }

  public ApagarTodos() {
    this.Rojo = this.APAGADO;
    this.Verde = this.APAGADO;
    this.Azul = this.APAGADO;
    this.EnviarComando();
    
}

  //Funciones complementarias
  public EnviarComando() {
    this.bt.write(this.brillo[this.Rojo]);
    this.bt.write(this.brillo[this.Verde]);
    this.bt.write(this.brillo[this.Azul]);
  }
  
  public async mostrarError(msg) {
    let alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: 'Algo salió mal:',
      message: msg,
      buttons: ['Ok']
    });
    alert.present();
  }

  public async mostrarInfo(msg) {
    const info = await this.toasCtrl.create({
      message: msg,
      duration: 1000,
    });
    info.present();
  }

}
