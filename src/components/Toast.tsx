import Swal, { SweetAlertOptions } from "sweetalert2";
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

export const simpleCfm = (text: string, confirmed: Function, canceled?: Function) => {
    return confirm({text}, confirmed, canceled)
}

export const confirm = (options: SweetAlertOptions, confirmed: Function, canceled?: Function) => {
    Swal.fire({
        ...options,
        confirmButtonText: options.confirmButtonText || '确认',
        showCancelButton: options.showCancelButton || true,
        cancelButtonText: options.cancelButtonText || '取消',
        padding: '2em',
        customClass: 'sweet-alerts',
    }).then((result) => {
        if (result.value) confirmed()
        else{
            if (canceled) canceled()
        } 
    });
}