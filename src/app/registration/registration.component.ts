import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls : ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    selectedFile = null;

    constructor(private http: HttpClient){

    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
    }

    onUpload() {
        
    }


    ngOnInit() {
    }

}
