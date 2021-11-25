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
  idCurso: number;
  idUsuario: number;
  rotaCursos: string;
  rotaSuaConta: string;

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

          var url = event.url.replace(/[^0-9]/g, '');
          if(url.length == 1) {
            this.idUsuario = url;
          } else {
            this.idUsuario = url.substr(0,1);
            this.idCurso = url.substr(-1,1);
          }
          
          this.rotaCursos = `/lista-cursos/${this.idUsuario}`;
          this.rotaSuaConta = `/sua-conta/${this.idUsuario}`;
      });
  }

  ngOnInit(): void {
    
  }

}
