import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController, private bt: BluetoothSerial,
    private alertCtrl: AlertController, private toasCtrl: ToastController) { }
  public dispositivos;
  public datos;
  public conectado = false;
  public desconectado = true;
  
  public async Escanear() {
    try {
      await this.bt.isEnabled();
      this.mostrarInfo("Buscando dispositivos...");
      this.listaDispositivos();
    } catch (e) {
      this.mostrarError("Por favor, antes de comenzar active el Bluetooth del dispositivo");
    }
  }

  public async listaDispositivos() {
    try {
      this.dispositivos = await this.bt.list();
    } catch (e) {
      this.mostrarError(e);
    }
  }

  public Conectar(address) {
    this.bt.connect(address).subscribe(respuesta => {
      this.mostrarInfo("Dispositivo conectado")
      this.conectado = true;
      this.desconectado = false;
    }, error => {
        this.mostrarError("No se pudo conectar con el dispositivo seleccionado. Por favor intente de nuevo");
    });
  }

  public ComHandler(datos) {
    this.bt.write(datos); //Empezar a medir
  }

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
      this.conectado = false;
      this.desconectado = true;
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
    if (!this.bt.isConnected) {
      this.mostrarInfo("Conectese primero a un dispositivo")
    }
    else {
      if (this.Azul > this.APAGADO) {
        this.Azul = this.Azul - 1;
        this.EnviarComando();
      }
      else
        this.mostrarInfo("El color AZUL está apagado");
    }
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
  //public Desconectar() {
    //this.bt.disconnect();
  //}

}
