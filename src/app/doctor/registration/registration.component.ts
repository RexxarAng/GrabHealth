import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:4560/doctor/registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL, itemAlias: 'photo', allowedMimeType: ['image/jpeg', 'image/png', 'image/jpg'], maxFileSize: 5 * 1024 * 1024 // 5 MB
});
  constructor() { }

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      alert(response);

    };
  }
  }

