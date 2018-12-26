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
  constructor(
    private router: Router,
    private authService: AuthService,

    ) { }

  ngOnInit() {
    //menu not opened
    this.menuDisplay = false;
  }
  
  logout(){
    this.router.navigateByUrl('/login');
    this.authService.deleteToken();

  }
}
