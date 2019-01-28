import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
@Injectable()
export class NavComponent implements OnInit {
  
  appTitle = 'GrabHealth';
  role = '';
  menuDisplay: boolean;
  currentDate = Date.now();
  datePolling: any;


  constructor(
    private router: Router,
    public authService: AuthService,

    ) { }

  ngOnInit() {
    //menu not opened
    this.menuDisplay = false;
    this.datePolling = setInterval(() =>
      this.loadDate(),2000);

  }

  loadDate(){
    this.currentDate = Date.now();
  }
  
  logout(){
    this.authService.logout();
  }
}
