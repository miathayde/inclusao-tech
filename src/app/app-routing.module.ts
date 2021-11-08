import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';
import { LoginComponent } from './pages/login/login.component';
import { EditarComponent } from './pages/sua-conta/editar/editar.component';
import { SuaContaComponent } from './pages/sua-conta/sua-conta.component';

const routes: Routes = [
  { path: '', component: InitialPageComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sua-conta', component: SuaContaComponent },
  { path: 'editar/:modo/:id', component: EditarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
