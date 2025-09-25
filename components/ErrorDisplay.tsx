
import React from 'react';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface ErrorDisplayProps {
  message: string;
  onReset: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onReset }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
      <div className="flex justify-center items-center mx-auto bg-red-100 rounded-full h-16 w-16">
        <ExclamationTriangleIcon />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mt-6">Ocurrió un Error</h2>
      <p className="text-gray-600 mt-4 bg-red-50 p-3 rounded-md border border-red-200">{message}</p>
      <button
        onClick={onReset}
        className="mt-8 w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        Intentar de Nuevo
      </button>
    </div>
  );
};
