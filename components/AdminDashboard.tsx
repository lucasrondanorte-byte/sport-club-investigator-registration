
import React, { useState, useEffect } from 'react';
import { ADMIN_SHEET_URL } from '../App'; 
import { getSheetData } from '../services/googleSheetsService';
import type { InvestigatorData } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { SearchIcon } from './icons/SearchIcon';
import { InvestigatorTable } from './InvestigatorTable';

interface AdminDashboardProps {
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [investigators, setInvestigators] = useState<InvestigatorData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getSheetData();
        setInvestigators(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredInvestigators = investigators.filter(investigator => {
    const term = searchTerm.toLowerCase();
    return (
        investigator.dni.toLowerCase().includes(term) ||
        investigator.nombreCompleto.toLowerCase().includes(term) ||
        investigator.email.toLowerCase().includes(term) ||
        investigator.telefono.toLowerCase().includes(term) ||
        investigator.sucursal.toLowerCase().includes(term)
    );
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-10">
          <SpinnerIcon />
          <span className="ml-3 text-gray-600">Cargando registros...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 px-4 bg-red-50 border border-red-200 rounded-md">
            <p className="font-semibold text-red-700">Ocurrió un error al cargar los datos</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
        </div>
      );
    }
    
    if (investigators.length === 0) {
        return <p className="text-center text-gray-600 py-10">No se han encontrado registros de socios.</p>
    }

    if (filteredInvestigators.length === 0 && searchTerm) {
        return <p className="text-center text-gray-600 py-10">No se encontraron resultados para "{searchTerm}".</p>
    }

    return <InvestigatorTable investigators={filteredInvestigators} />;
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl text-left animate-fade-in">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Panel de Administrador</h2>
            <p className="text-gray-600 mt-1">Visualización de los registros de socios.</p>
        </div>
        <div>
             <button
              onClick={onLogout}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Cerrar Sesión
            </button>
        </div>
      </div>
      
      <div className="mb-6">
        <a
            href={ADMIN_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
            Ver y Editar en Google Sheets
        </a>
      </div>

      <div className="mb-6 relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
        </span>
        <input
            type="text"
            placeholder="Buscar por DNI, nombre, email, teléfono o sucursal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {renderContent()}

    </div>
  );
};
