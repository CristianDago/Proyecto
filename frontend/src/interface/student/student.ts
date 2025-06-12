export enum Sex {
  Male = "MASCULINO",
  Female = "FEMENINO",
  Other = "OTROS",
}

export enum Source {
  SocialMedia = "REDES SOCIALES",
  InPerson = "CAPTADOR",
}

export enum CommunicationPreference {
  Whatsapp = "WHATSAPP",
  Phone = "TELÉFONO",
}

export enum School {
  Quinta = "QUINTA NORMAL",
  Buin = "BUÍN",
  Granja = "LA GRANJA",
  Nunoa = "ÑUÑOA",
  Pudahuel = "PUDAHUEL",
  Miguel = "SAN MIGUEL",
}

export enum Course {
  NB1 = "1° NIVEL BÁSICO",
  NB2 = "2° NIVEL BÁSICO",
  NB3 = "3° NIVEL BÁSICO",
  NM1 = "1° NIVEL MEDIO",
  NM2 = "2° NIVEL MEDIO",
}

export interface CallStatus {
  completed: boolean;
  comment: string | null;
}

type PositiveFeedbackOptions =
  | ""
  | "AÚN SIN RESPUESTAS"
  | "NO SE MATRICULARÁ"
  | "INCONTACTABLE"
  | "PERSONA INTERESADA QUE ENVIARÁ DOCUMENTACIÓN"
  | "PERSONA QUE ENVIÓ DOCUMENTACIÓN PERO LE FALTA FIRMAR SU MATRÍCULA"
  | "PERSONA QUE IRÁ A MATRICULARSE DIRECTAMENTE A LA ESCUELA"
  | "PERSONA CON DOCUMENTACIÓN Y MATRÍCULA FIRMADA EN ESCUELA"
  | "INTERESADA PARA PRÓXIMO AÑO"
  | "PERSONA QUE ENVÍA DOCUMENTACIÓN Y SE DEBE TRASLADAR A OTRA PLANILLA";

export interface Student {
  id?: string; // ¡CRUCIAL! Asegúrate de que tus datos de backend siempre tengan un ID
  name: string; // Nombre del estudiante (obligatorio)
  lastname: string; // Apellido del estudiante (obligatorio)
  rut?: string; // RUT del estudiante (opcional)
  sex?: Sex; // Sexo del estudiante (opcional)-
  birthdate?: Date; // Fecha de nacimiento (opcional)-
  nationality?: string; // Nacionalidad (opcional)
  address?: string; // Dirección (opcional)
  phone?: string; // Teléfono (opcional)-
  email?: string; // Correo electrónico (obligatorio)
  source?: Source; // Fuente de contacto (opcional)-
  contact?: string; // Cómo se realizó el contacto (opcional)
  contactDate?: string | Date;
  call1?: string; // Estado de la llamada 1 (opcional)-
  call2?: string; // Estado de la llamada 2 (opcional)-
  call3?: string; // Estado de la llamada 3 (opcional)-
  comments1?: string;
  comments2?: string;
  comments3?: string;
  positiveFeedback: PositiveFeedbackOptions;
  studentImage?: string | File | null;
  birthCertificate?: string | File | null;
  studyCertificate?: string | File | null;
  linkDni?: string | File | null;
  school?: School; // Colegios
  course?: Course; // Cursos
  communicationPreference?: CommunicationPreference; // Preferencia de comunicación (opcional)-
  createdAt?: Date; // Fecha de creación (opcional)-
}
