import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController, private bt: BluetoothSerial, private alertCtrl: AlertController,
    private toasCtrl: ToastController) { }
  public dispositivos;
  public datos: string;
  
  public async Escanear() {
    try {
      await this.bt.isEnabled();
      this.mostrarInfo("Bluetooth activado");
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
    }, error => {
        this.mostrarError("No se pudo conectar con el dispositivo seleccionado. Por favor intente de nuevo");
    });
  }

  public ComHandler(datos) {
    this.bt.write(datos); //Empezar a medir
  }

 /* public LeerDatos() {
    this.bt.available().then((number: any) => {
      this.bt.read().then((data: any) => {
        this.datos = parseFloat(data[0]);
        this.bt.clear();
      })
    })
    //this.datos = this.bt.subscribeRawData().subscribe((datos) => {
      //console.log(this.datos)
    //});
  }*/

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