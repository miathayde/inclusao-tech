import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: InitialPageComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
