import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CareersPage from './pages/CareersPage';
import './index.css';

createRoot(document.getElementById('careers-root')!).render(
  <StrictMode>
    <CareersPage />
  </StrictMode>
);