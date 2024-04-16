import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from './common/Loader';
import EndpointBuild from './pages/ThreatBuilder/endpoint/windows';
import ThreatBuilderLayout from './layout/ThreatBuilderLayout';
import axios from 'axios';
import { AppContext } from './context';
import Simulate from './pages/SimulateThreat/simulate';
import Agents from './pages/Agents';
import Index from './pages';
import AgentInfo from './pages/Agents/AgentInfo';
import AttackLibrary from './pages/AttacksLibrary';
import CreateAttack from './pages/CreateAttack';

axios.defaults.baseURL = (import.meta as any).env.VITE_API_URL;

const ThreatBuilder = lazy(() => import('./pages/ThreatBuilder'));
const SimulateThreat = lazy(() => import('./pages/SimulateThreat'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

function App() {
  const { token, setToken } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem('token')) setToken(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {loading ? (
        <Loader />
      ) : !token ? (
        <LoginPage />
      ) : (
        <>
          <Routes>
            <Route path='/create-attack' element={<CreateAttack />} />
            <Route element={<ThreatBuilderLayout />}>
              <Route path='/simulate-threat/:id' element={<EndpointBuild />} />
              <Route
                path='/simulate-threat/:id/:simulation_guid'
                element={<Simulate />}
              />
            </Route>
            <Route element={<DefaultLayout />}>
              <Route path='/threat_builder' element={<ThreatBuilder />} />
              <Route path='/simulate-threat' element={<SimulateThreat />} />
              <Route path='/' element={<Index />} />
              <Route path='/agents' element={<Agents />} />
              <Route path='/agents/:id' element={<AgentInfo />} />
              <Route path='/attacks-library' element={<AttackLibrary />} />
            </Route>
          </Routes>
        </>
      )}
    </Suspense>
  );
}

export default App;
