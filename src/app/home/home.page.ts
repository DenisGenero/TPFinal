import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private bt: BluetoothSerial) { }
  public dispositivos;
  public datos;
  
  public async onClick() {
    try {
      await this.bt.isEnabled();
      alert("Bluetooth activado");
      this.listaDispositivos();
      //this.bt.disconnect();
    } catch (e) {
      alert("Por favor, active el Bluetooth");
    }
  }

  public async listaDispositivos() {
    try {
      this.dispositivos = await this.bt.list();
    } catch (e) {
      alert(e);
    }
  }

  public Conectar(address) {
    this.bt.connect(address).subscribe(respuesta => {
      this.bt.write("s");
    }, error => {
        alert(error);
    });
  }

  public LeerDatos() {
    this.datos = this.bt.subscribeRawData().subscribe((datos) => {
      console.log(this.datos)
    });
  }

  //public Desconectar() {
    //this.bt.disconnect();
  //}

}
