import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocationService } from "../location.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-view",
  templateUrl: "view.page.html",
  styleUrls: ["view.page.scss"],
})
export class ViewPage {
  ktpData: any;

  constructor(
    private router: Router,
    private LocationService: LocationService,
    private alert: AlertController
  ) {}

  async getLocation() {
    const positition = await this.LocationService.getLocation();
    const { latitude, longitude, accuracy } = positition.coords;

    // get address
    const getAddress = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const address = await getAddress.json();

    return address;
  }

  async sendToWhatssapp() {
    if (this.validateForm()) {
      this.alert
        .create({
          message: "isi form dengan benar",
          buttons: ["ok"],
        })
        .then((a) => {
          a.present();
        });
      return;
    }

    this.getLocation();
    console.log(this.getLocation());

    const pesan = `Nama: ${this.ktpData.nama}
    NIK: ${this.ktpData.nik}
    Tempat Lahir: ${this.ktpData.tempatLahir}
    Tanggal Lahir: ${this.ktpData.tanggalLahir}
    Alamat: ${this.ktpData.alamat}`;

    window.open(
      `https://api.whatsapp.com/send?phone=+6281236699877&text=${encodeURIComponent(
        pesan
      )}`,
      "_blank"
    );
  }

  ionViewWillEnter() {
    // Mendapatkan data KTP dari localStorage saat halaman dimuat
    const ktpData = localStorage.getItem("ktpData");
    if (ktpData) {
      this.ktpData = JSON.parse(ktpData);
    }
  }

  redirectToForm() {
    this.router.navigate(["/home"]);
  }

  validateForm() {
    if (
      !this.ktpData.nama ||
      !this.ktpData.nik ||
      !this.ktpData.tempatLahir ||
      !this.ktpData.tanggalLahir ||
      !this.ktpData.Alamat
    ) {
      return false;
    }
    return true;
  }
}
