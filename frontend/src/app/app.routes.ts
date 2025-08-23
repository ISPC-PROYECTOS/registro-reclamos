import { Routes } from '@angular/router';
import { InicioSesion } from './autenticacion/inicio-sesion/inicio-sesion';
import { Pagina404 } from './paginas/pagina404/pagina404';
import { Registro } from './autenticacion/registro/registro';
import { CargarReclamo } from './paginas/paneles/panel-usuario/cargar-reclamo/cargar-reclamo';
import { SobreNosotros } from './paginas/sobre-nosotros/sobre-nosotros';
import { VistaUsuario } from './paginas/paneles/panel-usuario/vista-usuario/vista-usuario';
import { VistaAgente } from './paginas/paneles/panel-agente/vista-agente/vista-agente';


export const routes: Routes = [
    {path:"", redirectTo:"/inicio-sesion", pathMatch:"full"},
    {path:"inicio-sesion", component:InicioSesion},
    {path:"registro", component:Registro},
    {path:"vista-usuario", component:VistaUsuario},
    {path:"vista-agente", component:VistaAgente},
    {path:"cargar-reclamo", component:CargarReclamo},
    {path:"sobre-nosotros", component:SobreNosotros},
    {path: '**', component: Pagina404}
];
