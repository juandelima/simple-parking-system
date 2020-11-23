import Database from './db.js';
import {closeModalAddParking} from './modal-add-parking.js';
import {openModalExitParking, closeModalExitParking} from './modal-bayar-parking.js';
import {toast, toastUpdate} from './toast.js';
import {endTime} from './time.js';

class API {
    constructor() {
        this.db = new Database();
        this.baseUrl = 'http://127.0.0.1:8000/api';
        this.options = {
            headers: {
                'Accept': `application/json`,
                'Content-Type': `application/json`
            },
            mode: 'cors'
        };
    }

    status(response) {
        if (response.status !== 200) {
            console.log('Error : ' + response.status);
            return Promise.reject(new Error(response.statusText));
        } else {
            return Promise.resolve(response);
        }
    }

    json(response) {
        return response.json(); 
    }

    error(error) {
        console.log(error);
    }
}

class DataParking extends API {
    fetchData() {
        this.db.getDataLogin()
        .then(users => {
            if(users[0].role === 'admin') {
                document.getElementById("add-parking").style.display = 'none';
            }
            this.options.method = 'GET';
            this.options.headers.Authorization = `Bearer ${users[0].api_token}`;
            fetch(`${this.baseUrl}/all`, this.options)
            .then(this.status)
            .then(this.json)
            .then(data => {
                document.getElementById("data-parking").innerHTML = '';
                this.skeletonLoad();
                setTimeout(() => {
                    this.renderData(data['data'], users[0].role);
                }, 1500);
            })
            .catch(this.error);
        })
        .catch(this.error);
    }

    renderData(data, role) {
        const dataParking = document.getElementById("data-parking");
        let no = 0;
        let bayar;
        let disable;
        dataParking.innerHTML = '';
        if(data.length != 0) {
            data.forEach(d => {
                if(d.jam_keluar === null) {
                    d.jam_keluar = '-';
                }
                if(d.sudah_bayar === 0) {
                    if(role === 'admin') {
                        disable = 'disabled';
                    } else {
                        disable = '';
                    }
                    bayar = `
                        <button type="button" id="bayar_${d.kode_parkings}" class="btn btn-sm btn-blue _bayar" ${disable}>
                            Bayar
                        </button>
                    `;
                } else {
                    bayar = `<p style="color: #50d890; font-weight: bold;">Sudah Bayar</p>`;
                }
                dataParking.innerHTML += `
                    <tr>
                        <td>${no += 1}</td>
                        <td>${d.kode_parkings}</td>
                        <td>${d.nomor_polisi}</td>
                        <td>${d.tanggal}</td>
                        <td>${d.jam_masuk}</td>
                        <td>${d.jam_keluar}</td>
                        <td>Rp ${this.formatCurrency(d.biaya)}</td>
                        <td>
                            ${bayar}
                        </td>
                    </td>
                `;
            });
        } else {
            dataParking.innerHTML = 'Data Kosong!';
        }

        this.clickBayar();
    }

    saveData() {
        const no_polisi = document.getElementById("no_polisi").value;
        const tgl = document.getElementById("tanggal").value;
        const _biaya = document.getElementById("biaya").value;
        const dataParking = {
            nomor_polisi: no_polisi,
            tanggal: tgl,
            biaya: _biaya
        };
        this.db.getDataLogin()
        .then(users => {
            this.options.method = 'POST';
            this.options.headers.Authorization = `Bearer ${users[0].api_token}`;
            this.options.body = JSON.stringify(dataParking);
            fetch(`${this.baseUrl}/create`, this.options)
            .then(this.status)
            .then(this.json)
            .then(data => {
                document.getElementById("no_polisi").value = '';
                delete this.options.body;
                closeModalAddParking();
                toast();
                this.fetchData();
            })
            .catch(this.error);
        })
        .catch(this.error);
    }

    getDataById(kode_parking) {
        this.db.getDataLogin()
        .then(users => {
            this.options.method = 'GET';
            this.options.headers.Authorization = `Bearer ${users[0].api_token}`;
            fetch(`${this.baseUrl}/edit/${kode_parking}`, this.options)
            .then(this.status)
            .then(this.json)
            .then(data => {
                this.modalBayar(data[0]);
            })
            .catch(this.error);
        })
        .catch(this.error);
    }

    updateData(data) {
        const _biaya = document.getElementById("__biaya").value;
        const dataParking = {
            biaya: parseInt(_biaya)
        };
        this.db.getDataLogin()
        .then(users => {
            this.options.method = 'PUT';
            this.options.headers.Authorization = `Bearer ${users[0].api_token}`;
            this.options.body = JSON.stringify(dataParking);
            fetch(`${this.baseUrl}/update/${data.kode_parkings}`, this.options)
            .then(this.status)
            .then(this.json)
            .then(d => {
                delete this.options.body;
                closeModalExitParking(data.kode_parkings);
                toastUpdate();
                this.fetchData();
            })
            .catch(this.error);
        })
        .catch(this.error);
    }

    modalBayar(data) {
        const modal_bayar = document.getElementById("modal-bayar-parking");
        const created_at = new Date(data.created_at);
        const current_date = new Date();
        const hours = Math.ceil(Math.abs(created_at.getTime() - current_date.getTime()) / 36e5);
        const total_bayar = 3000 * hours;
        modal_bayar.innerHTML = `
            <div class="modal fade" id="modal-bayar-${data.kode_parkings}">
                <div class="modal-dialog">
                    <div class="modal-content">
                        
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">Bayar Parking</h4>
                        </div>
                        
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    
                                    <div class="form-group">
                                        <label for="field-1" class="control-label">No.Polisi</label>
                                        
                                        <input type="text" value="${data.nomor_polisi}" class="form-control" id="no_polisi" placeholder="B 0001A" readonly>
                                    </div>	
                                    
                                </div>
                                
                                <div class="col-md-6">
                                    
                                    <div class="form-group">
                                        <label for="field-2" class="control-label">Tanggal</label>
                                        
                                        <input type="text" value="${data.tanggal}" class="form-control" id="tanggal" placeholder="2020-11-19" readonly>
                                    </div>	
                                
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    
                                    <div class="form-group">
                                        <label for="field-1" class="control-label">Jam Masuk</label>
                                        
                                        <input type="text" value="${data.jam_masuk}" class="form-control" id="jam_masuk_" readonly>
                                    </div>	
                                    
                                </div>
                                
                                <div class="col-md-4">
                                    
                                    <div class="form-group">
                                        <label for="field-1" class="control-label">Jam Keluar</label>
                                        
                                        <input type="text" class="form-control" id="jam_keluar" readonly>
                                    </div>	
                                    
                                </div>

                                <div class="col-md-4">
                                    
                                    <div class="form-group">
                                        <label for="field-2" class="control-label">Total Biaya</label>
                                        
                                        <input type="text" class="form-control" id="__biaya" value="${total_bayar}" readonly>
                                    </div>	
                                
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-info" id="update-data">Bayar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const update_data = document.getElementById("update-data");
        update_data.onclick = () => {
            this.updateData(data);
        };
        openModalExitParking(data.kode_parkings);
        endTime();
    }

    clickBayar() {
        jQuery(document).ready(function($) {
            const bayar = $('._bayar');
            bayar.click(function() {
                const getId = this.id;
                const splitId = getId.split('_');
                const kode_parking = splitId[splitId.length - 1];
                helperGetData(kode_parking);
            });
        });

        const helperGetData = (kode_parking) => {
            this.getDataById(kode_parking);
        };
    }

    searchKodeUnik() {
        const kode_unik = document.getElementById("kode_unik").value;
        if(kode_unik !== "") {
            this.db.getDataLogin()
            .then(users => {
                this.options.method = 'GET';
                this.options.headers.Authorization = `Bearer ${users[0].api_token}`;
                fetch(`${this.baseUrl}/edit/${kode_unik}`, this.options)
                .then(this.status)
                .then(this.json)
                .then(data => {
                    document.getElementById("data-parking").innerHTML = '';
                    this.skeletonLoad();
                    setTimeout(() => {
                        this.renderData(data, users[0].role);
                    }, 1500);
                })
                .catch(this.error);
            })
            .catch(this.error);
        } else {
            alert("Kode Unik Tidak Boleh Kosong!");
        }
    }

    searchByDate() {
        const filter_date = document.getElementById("filter-date").value;
        if(filter_date !== '') {
            const split_date = filter_date.split(',');
            const from = split_date[0];
            const to = split_date[split_date.length - 1];
            this.db.getDataLogin()
            .then(users => {
                this.options.method = 'GET';
                this.options.headers.Authorization = `Bearer ${users[0].api_token}`;
                fetch(`${this.baseUrl}/filter-by-date/${from}/${to}`, this.options)
                .then(this.status)
                .then(this.json)
                .then(data => {
                    document.getElementById("data-parking").innerHTML = '';
                    this.skeletonLoad();
                    setTimeout(() => {
                        this.renderData(data, users[0].role);
                    }, 1500);
                })
                .catch(this.error);
            })
            .catch(this.error);
        } else {
            alert("Tanggal tidak boleh kosong!");
        }
    }

    skeletonLoad() {
        const dataParking = document.getElementById("data-parking");
        for(let i = 0; i < 10; i++) {
            dataParking.innerHTML += `
                <tr>
                    <td><div class="line_table"></div></td>
                    <td><div class="line_table"></div></td>
                    <td><div class="line_table"></div></td>
                    <td><div class="line_table"></div></td>
                    <td><div class="line_table"></div></td>
                    <td><div class="line_table"></div></td>
                    <td><div class="line_table"></div></td>
                    <td><div class="line_table"></div></td>
                <tr>
            `;
        }
    }

    formatCurrency(value) {
        return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    }
}

export {
    DataParking
}