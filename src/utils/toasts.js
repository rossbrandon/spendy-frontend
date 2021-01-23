import toastr from 'toastr'

const showToast = (type, message) => {
    toastr.options = {
        positionClass: 'toast-top-center ',
        preventDuplicates: true,
    }

    switch (type) {
        case 'info':
            toastr.info(message)
            break
        case 'success':
            toastr.success(message)
            break
        case 'warning':
            toastr.warning(message)
            break
        case 'error':
            toastr.error(message)
            break
        default:
            toastr.info(message)
    }
}

export { showToast }
