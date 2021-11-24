import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mostrarSubmenu: boolean = true;

  constructor(private router: Router) { 
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
  )
      .subscribe(event => {
          if(event.url == '/' || event.url == '/cadastro' || event.url == '/login') {
            this.mostrarSubmenu = false;
          } else {
            this.mostrarSubmenu = true;
          }
      });
  }

  ngOnInit(): void {
    
  }

}
