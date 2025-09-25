
import React from 'react';
import type { InvestigatorData } from '../types';

interface InvestigatorTableProps {
  investigators: InvestigatorData[];
}

export const InvestigatorTable: React.FC<InvestigatorTableProps> = ({ investigators }) => {
  return (
    <div className="overflow-x-auto">
      <div className="align-middle inline-block min-w-full">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origen</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sucursal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {investigators.map((investigator) => (
                <tr key={investigator.dni} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{investigator.nombreCompleto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{investigator.dni}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{investigator.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{investigator.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{investigator.origen}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{investigator.sucursal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(investigator.fecha).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
