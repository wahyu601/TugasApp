import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nama: any;
  nik: any;
  tempatLahir: any;
  tanggalLahir: any;
  alamat: any;

  constructor(
    private route: Router
  ) {}

  submitForm() {
    // Lakukan tindakan yang diinginkan dengan data yang diisi
    console.log('Nama:', this.nama);
    console.log('NIK:', this.nik);
    console.log('Tempat Lahir:', this.tempatLahir);
    console.log('Tanggal Lahir:', this.tanggalLahir);
    console.log('Alamat:', this.alamat);

    // Simpan data di localStorage
    const ktpData = {
      nama: this.nama,
      nik: this.nik,
      tempatLahir: this.tempatLahir,
      tanggalLahir: this.tanggalLahir,
      alamat: this.alamat
    };

    localStorage.setItem('ktpData', JSON.stringify(ktpData));

    // Tampilkan pesan sukses
    alert('Data KTP berhasil disimpan.');

    // Reset form
    this.clearForm();
  }

  clearForm() {
    this.nama = '';
    this.nik = '';
    this.tempatLahir = '';
    this.tanggalLahir = '';
    this.alamat = '';
  }

  submitView(){
    this.route.navigate(['view']);
  }

}
