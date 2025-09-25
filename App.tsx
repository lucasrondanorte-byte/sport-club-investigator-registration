
import React, { useState, useCallback, useEffect } from 'react';
import { InvestigatorForm } from './components/InvestigatorForm';
import { SuccessDisplay } from './components/SuccessDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { submitToSheet } from './services/googleSheetsService';
import { generateWelcomeMessage } from './services/geminiService';
import type { InvestigatorData } from './types';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';
type AppView = 'form' | 'admin_login' | 'admin_dashboard';

// ---------------------------------------------------------------------------------
// ¡IMPORTANTE! - ENLACE PARA EL ADMINISTRADOR
// Esta URL es SÓLO un enlace para el botón "Ver y Editar en Google Sheets" en el panel de administrador.
// NO afecta el envío de datos.
// Reemplaza 'YOUR_GOOGLE_SHEET_URL_HERE' con la URL de tu hoja de cálculo.
// Ejemplo: https://docs.google.com/spreadsheets/d/12345abcde.../edit
// ---------------------------------------------------------------------------------
export const ADMIN_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1TuIDDeEjEmPloGu0Q/edit';

// IMPORTANTE: Cambia esto por una contraseña segura para el área de administrador.
const ADMIN_PASSWORD = 'password123'; 

const App: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [welcomeMessage, setWelcomeMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [appView, setAppView] = useState<AppView>('form');
  const [authError, setAuthError] = useState<string>('');

  useEffect(() => {
    // Check for admin query parameter to determine the initial view
    const isAdminView = new URLSearchParams(window.location.search).get('admin') === 'true';
    if (isAdminView) {
      setAppView('admin_login');
    }
  }, []);


  const handleFormSubmit = useCallback(async (data: InvestigatorData) => {
    setSubmissionStatus('submitting');
    try {
      await submitToSheet(data);
      const message = await generateWelcomeMessage(data.nombreCompleto, data.sucursal);
      setWelcomeMessage(message);
      setSubmissionStatus('success');
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred.');
      setSubmissionStatus('error');
    }
  }, []);

  const handleReset = () => {
    setSubmissionStatus('idle');
    setWelcomeMessage('');
    setErrorMessage('');
  };

  const handleAdminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setAppView('admin_dashboard');
      setAuthError('');
    } else {
      setAuthError('Contraseña incorrecta. Por favor, intente de nuevo.');
    }
  };
  
  const handleAdminLogout = () => {
      setAppView('form');
      // Navigate to the base URL to remove the admin query param
      window.history.pushState({}, '', window.location.pathname);
  };

  const renderFormContent = () => {
    switch (submissionStatus) {
      case 'submitting':
      case 'idle':
        return (
          <InvestigatorForm
            onSubmit={handleFormSubmit}
            isLoading={submissionStatus === 'submitting'}
          />
        );
      case 'success':
        return (
          <SuccessDisplay
            message={welcomeMessage}
            onReset={handleReset}
          />
        );
      case 'error':
        return (
          <ErrorDisplay
            message={errorMessage}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (appView) {
        case 'admin_login':
            return <AdminLogin onLogin={handleAdminLogin} error={authError} />;
        case 'admin_dashboard':
            return <AdminDashboard onLogout={handleAdminLogout} />;
        case 'form':
        default:
            return renderFormContent();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
        <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800">Formulario de Registro de Averiguadores</h1>
            <p className="text-lg text-gray-600 mt-2">Bienvenido a Sport Club</p>
        </header>
        <main className="w-full max-w-2xl">
            {renderContent()}
        </main>
        <footer className="mt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Sport Club. Todos los derechos reservados.</p>
        </footer>
    </div>
  );
};

export default App;
