
export enum Origen {
    INSTAGRAM = "Instagram",
    WEB = "Web",
    WHATSAPP = "WhatsApp",
    REFERIDO = "Referido"
}

export enum Sucursal {
    BARRACAS = "Barracas",
    PARAGUAY = "Paraguay",
    DIAGONAL = "Diagonal",
    TRIBUNALES = "Tribunales",
    MUJER_CENTRO = "Mujer Centro",
    ESMERALDA = "Esmeralda"
}

export interface InvestigatorData {
    dni: string;
    nombreCompleto: string;
    email: string;
    telefono: string;
    origen: Origen;
    sucursal: Sucursal;
    fecha: string;
}
