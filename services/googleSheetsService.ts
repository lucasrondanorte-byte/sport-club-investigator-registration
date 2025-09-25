import type { InvestigatorData } from '../types';

// ---------------------------------------------------------------------------------
// ¡IMPORTANTE! - URL DE CONEXIÓN A GOOGLE SHEETS
// Esta es la URL de tu "Aplicación web" de Google Apps Script.
// Es el punto de conexión real para ENVIAR y RECIBIR datos del formulario.
// Asegúrate de que esta URL sea la correcta después de implementar tu script.
// ---------------------------------------------------------------------------------
const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyMFAAK9DimjNeV7u0LQZ4SzmbSMwB8fsM27wyjlVc_FCl1jHFJ9dgLOLlPm_pOOImJoA/exec';

export const submitToSheet = async (data: InvestigatorData): Promise<void> => {
    if (GOOGLE_SHEET_WEB_APP_URL.includes('YOUR_DEPLOYMENT_ID')) {
        console.warn('Google Sheets URL is not configured. Simulating a successful submission.');
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });

    try {
        const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to submit to Google Sheets: ${response.status} ${response.statusText}. Details: ${errorText}`);
        }

        const result = await response.json();
        if (result.result !== 'success') {
            throw new Error(`Google Apps Script reported an error: ${result.message}`);
        }

    } catch (error) {
        console.error('Error submitting data to Google Sheets:', error);
        throw new Error('Could not connect to the registration service. Please try again later.');
    }
};

export const getSheetData = async (): Promise<InvestigatorData[]> => {
    if (GOOGLE_SHEET_WEB_APP_URL.includes('YOUR_DEPLOYMENT_ID')) {
        console.warn('Google Sheets URL is not configured. Simulating empty data fetch.');
        return [];
    }

    try {
        const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch from Google Sheets: ${response.status} ${response.statusText}. Details: ${errorText}`);
        }

        const data = await response.json();
        return data as InvestigatorData[];

    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        throw new Error('No se pudieron cargar los datos de los socios. Verifique la URL del script y los permisos.');
    }
};