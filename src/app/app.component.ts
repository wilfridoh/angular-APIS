import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { User } from './models/user.model';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgUrl = '';

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private filesService: FilesService
  ) {}

  // onLoaded(img: string) {
  //   console.log('log padre', img);
  // }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService
      .create({
      name: 'Sebas',
      email: 'sebas@mail.com',
      password: '1'
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  getProfile() {
    this.authService.profile(this.token).subscribe((rta) => {
      console.log(rta);
    });
  }

  downloadPDF(){
    this.filesService.downloadFile('myFile.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf')
    .subscribe();
  }

  onLoaded(event: Event){ 
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
    this.filesService.uploadFile(new Blob(['Hola mundo'], { type: 'text/plain' }))
    .subscribe(rta => {
      this.imgUrl = rta.location;
    });
    }

  } 
}
