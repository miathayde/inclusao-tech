import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mostrarSubmenu: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // if(this.router.url == '/' || this.router.url == '/cadastro' || this.router.url == '/login') {
    //   this.mostrarSubmenu = false;
    // } else {
    //   this.mostrarSubmenu = true;
    // }
  }

}
