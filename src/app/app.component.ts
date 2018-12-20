import { Component } from '@angular/core';
import { ElectronService } from "ngx-electron";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GrabHealth';

  constructor(private _electronService: ElectronService, private router: Router) {}

  menuDisplay: boolean;

  ngOnInit() {
    //menu not opened
   this.menuDisplay = false;
  
    }
  
  toggleMenu() {
    //if menu is closed, open it
    if(this.menuDisplay == false) {
      this.menuDisplay = true;
    } else {
      //if menu is opened, close it
      this.menuDisplay = false;
    }
  }



}
