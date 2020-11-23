export default class Database {
    constructor() {
        this.dbPromised = idb.open("parking", 1, (upgradeDb) => {
            const usersObjectStore = upgradeDb.createObjectStore("users", {
                keyPath: "id"
            });
            usersObjectStore.createIndex("username", "username", {
                unique: false
            });
        });
    }

    saveDataLogin(user) {
        this.dbPromised
        .then((db) => {
            const tx = db.transaction("users", "readwrite");
            const store = tx.objectStore("users");
            store.put(user);
            return tx.complete;  
        })
        .then(() => {
            console.log("user berhasil di simpan");
        })
        .catch(error => {
            alert(error);
        });
    }

    getDataLogin() {
        return new Promise((resolve, reject) => {
            this.dbPromised
            .then((db) => {
                const tx = db.transaction("users", "readonly");
                const store = tx.objectStore("users");
                return store.getAll();
            })
            .then((users) => {
                resolve(users);
            })
            .catch(error => {
                alert(error);
            });
        });
    }

    removeDataLogin(id) {
        this.dbPromised
        .then((db) => {
            const tx = db.transaction("users", "readwrite");
            const store = tx.objectStore("users");
            store.delete(id);
            return tx.complete
        })
        .then(() => {
            console.log('User removed');
        })
        .catch(error => {
            alert(error);
        });
    }
}