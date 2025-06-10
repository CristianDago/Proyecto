// src/components/common/toast-message/toastMessage.tsx
import { toast, ToastOptions } from 'react-toastify';

interface ToastMessageProps {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    options?: ToastOptions;
}

const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};

// Asegúrate de que la exportación sea 'ToastMessage'
export const ToastMessage: React.FC<ToastMessageProps> = ({ type, message, options }) => {
    const mergedOptions = { ...defaultOptions, ...options };

    switch (type) {
        case 'success':
            toast.success(message, mergedOptions);
            break;
        case 'error':
            toast.error(message, mergedOptions);
            break;
        case 'warning':
            toast.warn(message, mergedOptions);
            break;
        case 'info':
            toast.info(message, mergedOptions);
            break;
        default:
            toast(message, mergedOptions); // Mensaje genérico
            break;
    }

    return null;
};