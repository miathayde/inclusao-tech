import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';
import { HeaderComponent } from './pages/header/header.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { SuaContaComponent } from './pages/sua-conta/sua-conta.component';
import { EditarComponent } from './pages/sua-conta/editar/editar.component';
import { ListaCursosComponent } from './pages/lista-cursos/lista-cursos.component';
import { CursoComponent } from './pages/curso/curso.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    InitialPageComponent,
    HeaderComponent,
    CadastroComponent,
    LoginComponent,
    SuaContaComponent,
    EditarComponent,
    ListaCursosComponent,
    CursoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
