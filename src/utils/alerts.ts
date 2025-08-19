import Swal from 'sweetalert2';

// Configuración base para todas las alertas con el tema de la boda
const baseConfig = {
    customClass: {
        popup: 'wedding-alert-popup',
        title: 'wedding-alert-title',
        content: 'wedding-alert-content',
        confirmButton: 'wedding-alert-confirm',
        cancelButton: 'wedding-alert-cancel'
    },
    confirmButtonColor: '#b19776',
    cancelButtonColor: '#6c757d',
    background: '#fff',
    color: '#333',
    showClass: {
        popup: 'animate__animated animate__fadeInDown animate__faster'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp animate__faster'
    }
};

// Alerta de éxito
export const showSuccessAlert = (title: string, message?: string) => {
    return Swal.fire({
        ...baseConfig,
        icon: 'success',
        title,
        text: message,
        iconColor: '#1a3b34',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
    });
};

// Alerta de error
export const showErrorAlert = (title: string, message?: string) => {
    return Swal.fire({
        ...baseConfig,
        icon: 'error',
        title,
        text: message,
        iconColor: '#dc3545',
        confirmButtonText: 'Entendido'
    });
};

// Alerta de confirmación
export const showConfirmAlert = (title: string, message: string, confirmText = 'Sí', cancelText = 'No') => {
    return Swal.fire({
        ...baseConfig,
        icon: 'question',
        title,
        text: message,
        iconColor: '#b19776',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        reverseButtons: true
    });
};

// Alerta de información
export const showInfoAlert = (title: string, message?: string) => {
    return Swal.fire({
        ...baseConfig,
        icon: 'info',
        title,
        text: message,
        iconColor: '#17a2b8',
        confirmButtonText: 'Entendido'
    });
};

// Alerta de advertencia
export const showWarningAlert = (title: string, message?: string) => {
    return Swal.fire({
        ...baseConfig,
        icon: 'warning',
        title,
        text: message,
        iconColor: '#ffc107',
        confirmButtonText: 'Entendido'
    });
};

// Alerta de cargando
export const showLoadingAlert = (title: string = 'Cargando...') => {
    return Swal.fire({
        ...baseConfig,
        title,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
};

// Cerrar alerta de cargando
export const closeLoadingAlert = () => {
    Swal.close();
};

// Alerta personalizada para confirmación de boda
export const showWeddingConfirmAlert = (guestName: string) => {
    return Swal.fire({
        ...baseConfig,
        title: '💕 ¡Confirmación Recibida!',
        html: `
            <div style="text-align: center; font-family: 'Lora', serif;">
                <p style="font-size: 18px; color: #b19776; margin: 10px 0;">
                    Querido/a <strong>${guestName}</strong>
                </p>
                <p style="color: #666; margin: 15px 0;">
                    ¡Gracias por confirmar tu asistencia a nuestra boda!
                </p>
                <p style="color: #1a3b34; font-weight: 500;">
                    Tu presencia hará este día aún más especial 💍
                </p>
            </div>
        `,
        icon: 'success',
        iconColor: '#1a3b34',
        confirmButtonText: '¡Nos vemos pronto!',
        timer: 10000,
        timerProgressBar: true
    });
};

// Alerta para cuando no puede asistir
export const showRegretAlert = (guestName: string) => {
    return Swal.fire({
        ...baseConfig,
        title: '💙 Gracias por Avisar',
        html: `
            <div style="text-align: center; font-family: 'Lora', serif;">
                <p style="font-size: 18px; color: #b19776; margin: 10px 0;">
                    Querido/a <strong>${guestName}</strong>
                </p>
                <p style="color: #666; margin: 15px 0;">
                    Lamentamos que no puedas acompañarnos
                </p>
                <p style="color: #666; font-weight: 500;">
                    ¡Estarás en nuestros pensamientos! 💕
                </p>
            </div>
        `,
        icon: 'info',
        iconColor: '#17a2b8',
        confirmButtonText: 'Entendido',
        timer: 4000,
        timerProgressBar: true
    });
};
