import {DataParking} from './api.js'; 

export default class Navigation {
    constructor() {
        this.page = window.location.hash.substr(1);
    }
  
    main() {
      this.loadNav();
      if(this.page == "") this.page = "dashboard";
      this.loadPage(this.page);
    }

    loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4) {
                if(this.status != 200) return;
                document.querySelectorAll(".main-menu").forEach(elm => {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".main-menu a").forEach(elm => {
                    elm.addEventListener("click", (event) => {
                        this.page = event.target.getAttribute("href").substr(1);
                        const data = new DataParking();
                        const tambah_parking = document.getElementById("tambah_parking");
                        if(this.page === 'dashboard') {
                            tambah_parking.style.display = 'block';
                            data.fetchData();
                        } else if(this.page === 'user') {
                            tambah_parking.style.display = 'none';
                        }
                        helperLoadPage(this.page);
                    });
                });
            }
        }

        xhttp.open("GET", "nav.html", true);
        xhttp.send();

        const helperLoadPage = (page) => {
            this.loadPage(page);
        };
    }

    loadPage(page) {
        const xhttp = new XMLHttpRequest();
        const dashboard = document.getElementById('dashboard-page');
        const user = document.getElementById('user-page');
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4) {
                const content = document.querySelector("#main-pages");
                if(this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                    if(page === 'dashboard') {
                        tambah_parking.style.display = 'block';
                        dashboard.classList.add('active');
                        user.classList.remove('active');
                    } else if(page === 'user') {
                        tambah_parking.style.display = 'none';
                        user.classList.add('active');
                        dashboard.classList.remove('active');
                    }
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        }

        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();
    }
}