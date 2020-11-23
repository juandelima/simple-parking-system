import Navigation from './nav.js';
import {openModalAddParking} from './modal-add-parking.js';
import {startTime} from './time.js';
import dateNow from './date.js';
import {DataParking} from './api.js';
import {Login, Logout} from './auth.js';
import printPdf from './print-pdf.js';

const main = () => {
    const data = new DataParking();
    const login = new Login();
    const logout = new Logout();
    const nav = new Navigation();
    const btnLogout = document.getElementById("do-logout");
    const btnAdd = document.getElementById("add-parking");
    const saveData = document.getElementById("save-data");
    const btnSearchKodeUnik = document.getElementById("search-kode");
    const btnSearchDate = document.getElementById("search-date");
    const btnPrintPdf = document.getElementById("print-pdf");
    login.cekDataLogin();
    nav.main();
    data.fetchData();
    btnLogout.onclick = () => {
        logout.doLogout();
    };

    btnAdd.onclick = () => {
        startTime();
        dateNow();
        openModalAddParking();
    };

    saveData.onclick = () => {
        data.saveData();
    };

    btnSearchKodeUnik.onclick = () => {
        data.searchKodeUnik();
    };

    btnSearchDate.onclick = () => {
        data.searchByDate();
    };

    btnPrintPdf.onclick = () => {
        printPdf();
    };
};

export default main;