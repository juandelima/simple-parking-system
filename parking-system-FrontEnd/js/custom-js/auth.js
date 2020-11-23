import Database from './db.js';

class Auth {
    constructor() {
        this.db = new Database();
        this.baseUrl = 'http://127.0.0.1:8000/api';
        this.options = {
            method: 'POST',
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
        alert(error);
    }
}

class Login extends Auth {
    mainLogin() {
        const inputUsername = document.getElementById('usrname');
        const inputPassword = document.getElementById('pass');
        const btnLogin = document.getElementById('do-login');
        btnLogin.onclick  = () => {
            if(inputUsername.value !== '' && inputPassword.value !== '') {
                this.doLogin(inputUsername.value, inputPassword.value);
            } else {
                alert("Terjadi Kesalahan!");
            }
        };
    }

    doLogin(usrname, pass) {
        const dataLogin = {
            username: usrname,
            password: pass
        };
        this.options.body = JSON.stringify(dataLogin);
        fetch(`${this.baseUrl}/login`, this.options)
        .then(this.status)
        .then(this.json)
        .then(data => {
            this.db.saveDataLogin(data['data']);
            window.location = "http://127.0.0.1:8686";
        })
        .catch(this.error);
    }

    cekDataLogin() {
        this.db.getDataLogin()
        .then(users => {
            if(users.length === 0) {
                window.location = "http://127.0.0.1:8686/login.html";
            }
        })
        .catch(error => {
            alert(error);
        });
    }
}

class Logout extends Auth {
    doLogout() {
        fetch(`${this.baseUrl}/logout`, this.options)
        .then(this.status)
        .then(this.json)
        .then(data => {
            this.db.getDataLogin()
            .then(users => {
                users.forEach(user => {
                    this.db.removeDataLogin(user.id);
                });
                window.location = "http://127.0.0.1:8686/login.html";
            })
            .catch(this.error);
        })
        .catch(this.error);
    }
}

export {
    Login,
    Logout 
}