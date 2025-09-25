
import React, { useState } from 'react';
import type { InvestigatorData } from '../types';
import { Origen, Sucursal } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface InvestigatorFormProps {
  onSubmit: (data: InvestigatorData) => void;
  isLoading: boolean;
}

export const InvestigatorForm: React.FC<InvestigatorFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Omit<InvestigatorData, 'fecha'>>({
    dni: '',
    nombreCompleto: '',
    email: '',
    telefono: '',
    origen: Origen.INSTAGRAM,
    sucursal: Sucursal.BARRACAS,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.nombreCompleto.trim()) newErrors.nombreCompleto = 'Nombre completo es requerido.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido.';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'Teléfono es requerido.';
    if (!formData.dni.trim()) newErrors.dni = 'DNI es requerido.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const submissionData: InvestigatorData = {
        ...formData,
        fecha: new Date().toISOString(),
      };
      onSubmit(submissionData);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre Completo */}
          <div>
            <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input type="text" name="nombreCompleto" id="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} className={`w-full px-3 py-2 border ${errors.nombreCompleto ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} required />
            {errors.nombreCompleto && <p className="text-red-500 text-xs mt-1">{errors.nombreCompleto}</p>}
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} required />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          {/* Telefono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input type="tel" name="telefono" id="telefono" value={formData.telefono} onChange={handleChange} className={`w-full px-3 py-2 border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} required />
            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>
          {/* Origen */}
          <div>
            <label htmlFor="origen" className="block text-sm font-medium text-gray-700 mb-1">Origen</label>
            <select name="origen" id="origen" value={formData.origen} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              {Object.values(Origen).map(origenName => (
                <option key={origenName} value={origenName}>{origenName}</option>
              ))}
            </select>
          </div>
          {/* DNI */}
          <div>
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
            <input type="text" name="dni" id="dni" value={formData.dni} onChange={handleChange} className={`w-full px-3 py-2 border ${errors.dni ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} required />
            {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
          </div>
          {/* Sucursal */}
          <div>
            <label htmlFor="sucursal" className="block text-sm font-medium text-gray-700 mb-1">Sucursal de Interés</label>
            <select name="sucursal" id="sucursal" value={formData.sucursal} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              {Object.values(Sucursal).map(sucursalName => (
                <option key={sucursalName} value={sucursalName}>{sucursalName}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-8">
          <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors">
            {isLoading ? <SpinnerIcon /> : 'Registrar'}
          </button>
        </div>
      </form>
    </div>
  );
};
