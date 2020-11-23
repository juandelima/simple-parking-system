const openModalAddParking = () => {
    jQuery(document).ready(($) => {
        $("#modal-tambah").modal('show');
    });
};

const closeModalAddParking = () => {
    jQuery(document).ready(($) => {
        $("#modal-tambah").modal('hide');
    });
}

export {
    openModalAddParking,
    closeModalAddParking
}

