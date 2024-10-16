// components/Dialog.js
import Swal from 'sweetalert2';

const Dialog = {
    confirm: async (title, text) => {
        const result = await Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
        });
        return result.isConfirmed;
    },
    success: async (title, text) => {
        await Swal.fire({
            title,
            text,
            icon: 'success',
            confirmButtonText: 'OK',
        });
    },
    error: async (title, text) => {
        await Swal.fire({
            title,
            text,
            icon: 'error',
            confirmButtonText: 'OK',
        });
    },
};

export default Dialog;
