const openModalExitParking = (kode_parking) => {
    jQuery(document).ready(($) => {
        $(`#modal-bayar-${kode_parking}`).modal('show');
    });
};

const closeModalExitParking = (kode_parking) => {
    jQuery(document).ready(($) => {
        $(`#modal-bayar-${kode_parking}`).modal('hide');
    });
}

export {
    openModalExitParking,
    closeModalExitParking
}