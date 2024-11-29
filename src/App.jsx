import './App.css';
//Importar el React Router Dom:
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';

//Componentes principales.
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';

//Importaciones de los enlaces de Gestión de Proyectos:
import MiniDash from './Components/Dashboard/GestionProyectos/MiniDash';
import MiniDashD from './Components/Dashboard/GestionProyectos/Components/Body_/Detalles/miniDash';
import MiniDashR from './Components/Dashboard/GestionProyectos/Components/Body_/Recursos/miniDash';
//Importaciones de los enlaces de Planificación de Pruebas:
import MiniDashP from './Components/Dashboard/PlanificacionPruebas/MiniDash';
import MiniDashDef from './Components/Dashboard/PlanificacionPruebas/Components/Body_/Definicion/miniDash';
import MiniDashVis from './Components/Dashboard/PlanificacionPruebas/Components/Body_/Visaulizacion/miniDash';
//Importaciones de los enlaces de Ejecución de Pruebas:
import MiniDashEj from './Components/Dashboard/EjecucionPruebas/miniDash';
import MiniDashReg from './Components/Dashboard/EjecucionPruebas/Components/Body_/Registros/miniDash';
import MiniDashE from './Components/Dashboard/EjecucionPruebas/Components/Body_/Estados/miniDash';
//Importaciones de los enlaces de Gestión de Defectos:
import MiniDashDefect from './Components/Dashboard/GestionDefectos/miniDash';
import MiniDashS from './Components/Dashboard/GestionDefectos/Components/Body_/Seguimientos/miniDash';
import MiniDashC from './Components/Dashboard/GestionDefectos/Components/Body_/Correcciones/miniDash';
//Importaciones de los enlaces de Informes y Métricas:
import MiniDashInf from './Components/Dashboard/InformesMetricas/MiniDash';
import MiniDashM from './Components/Dashboard/InformesMetricas/Components/Body_/Metricas/MiniDash';
import MiniDashExp from './Components/Dashboard/InformesMetricas/Components/Body_/Exportaciones/MiniDash';
//Importaciones de los enlaces de Integración Contínua:
import MiniDashConf from './Components/Dashboard/IntegracionContinua/MiniDash';
import MiniDashAut from './Components/Dashboard/IntegracionContinua/Components/Body_/Automaticas/MiniDash';

//Crear los Routers:
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: '/register',
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <div>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </div>
    ),
  },
  //Rutas de Gestión de Proyectos:
  {
    path: '/dashboard/gestionproyectos',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDash />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/detallesproyecto',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashD />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/asignacionrecursos',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashR />
        </ProtectedRoute>
      </div>
    ),
  },
  //Rutas de Planificación de Pruebas:
  {
    path: '/dashboard/planificacion',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashP />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/definicion',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashDef />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/visualizacion',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashVis />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/ejecucion',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashEj />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/registros',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashReg />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/estado',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashE />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/registrodefectos',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashDefect />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/seguimientos',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashS />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/correcciones',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashC />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/informesmetricas',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashInf />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/pruebasmetricas',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashM />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/exportaciones',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashExp />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/integraciones',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashConf />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: '/dashboard/automaticas',
    element: (
      <div>
        <ProtectedRoute>
          <MiniDashAut />
        </ProtectedRoute>
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
