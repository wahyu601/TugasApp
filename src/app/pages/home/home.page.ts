import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  firstName: any;
  lastName: any;
  address: any;
  email: any;
  phone: any;

  myForm: FormGroup;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private emailComposer: EmailComposer
  ) {
    this.myForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
    });
  }
  async sendEmail() {
    if (
      this.firstName &&
      this.lastName &&
      this.address &&
      this.email &&
      this.phone
    ) {
      const email = {
        to: this.email,
        subject: 'Data Diri',
        body: `Nama: ${this.firstName} ${this.lastName}\nAlamat: ${this.address}\nNomor Telepon: ${this.phone}`,
        isHtml: false,
      };

      this.emailComposer
        .open(email)
        .then(() => {
          console.log('Email sent');
        })
        .catch((error) => {
          console.log('Error sending email', error);
        });
    } else {
      console.log('Mohon isi semua input');
    }
  }

  // async sendTelegram() {
  //   if (this.firstName && this.lastName && this.address && this.phone) {
  //     const message = `Data Diri\n\nNama: ${this.firstName} ${this.lastName}\nAlamat: ${this.address}\nNomor Telepon: ${this.phone}`;

  //     await Telegram.sendText(message);
  //   } else {
  //     await this.presentErrorAlert('Mohon isi semua input.');
  //   }
  // }

  saveData() {
    // validasi data
    if (
      this.firstName &&
      this.lastName &&
      this.address &&
      this.email &&
      this.phone
    ) {
      this.presentAlert('Data berhasil disimpan!');
    } else {
      this.presentAlert('Mohon isi semua input.');
    }

    // if (this.myForm.valid) {
    //   // Jika semua validasi sukses, lakukan tindakan lainnya
    //   this.presentAlert('Data berhasil disimpan!');
    // } else {
    //   // Jika validasi gagal, tampilkan pesan error
    //   this.presentAlert('Mohon periksa input email Anda.');
    // }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Info',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {}
}
