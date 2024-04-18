import Swal from "sweetalert2";
export const toast = (text: string, color: 'primary'| 'success' | 'info' | 'warning' | 'danger' = 'primary') => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: false,
        customClass: {
            popup: `color-${color}`,
        },
    });
    toast.fire({
        title: text,
    });
}