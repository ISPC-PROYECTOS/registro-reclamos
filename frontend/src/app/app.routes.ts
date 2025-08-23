import { Routes } from '@angular/router';
import { InicioSesion } from './autenticacion/inicio-sesion/inicio-sesion';
import { Pagina404 } from './paginas/pagina404/pagina404';
import { SobreNosotros } from './paginas/sobre-nosotros/sobre-nosotros';

export const routes: Routes = [
    {path:"", redirectTo:"/inicio-sesion", pathMatch:"full"},
    {path:"inicio-sesion", component:InicioSesion},
    {path:"sobre-nosotros", component:SobreNosotros},
    {path: '**', component: Pagina404}
];
