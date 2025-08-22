import { Routes } from '@angular/router';
import { InicioSesion } from './autenticacion/inicio-sesion/inicio-sesion';
import { Pagina404 } from './paginas/pagina404/pagina404';
import { CargarReclamo } from './paginas/paneles/panel-usuario/cargar-reclamo/cargar-reclamo';
import { VistaUsuario } from './paginas/paneles/panel-usuario/vista-usuario/vista-usuario';
import { VistaAgente } from './paginas/paneles/panel-agente/vista-agente/vista-agente';

export const routes: Routes = [
    {path:"", redirectTo:"/inicio-sesion", pathMatch:"full"},
    {path:"inicio-sesion", component:InicioSesion},
    {path: "cargar-reclamo", component: CargarReclamo},
    {path: "vista-usuario", component: VistaUsuario},
    {path: "vista-agente", component: VistaAgente  },
    {path: '**', component: Pagina404}
];
