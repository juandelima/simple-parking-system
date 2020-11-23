const printPdf = () => {
    jQuery(document).ready(function($) {
        $('#data-parkir').printThis({
            importCSS: true,
            pageTitle: "",
            header: null,
            footer: null 
        })
    });
};

export default printPdf;