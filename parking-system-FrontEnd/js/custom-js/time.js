const startTime = () => {
    const today = new Date();
    const h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('jam_masuk').value = h + ":" + m + ":" + s;
    setTimeout(startTime, 500); //recursive
}

const endTime = () => {
    const today = new Date();
    const h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('jam_keluar').value = h + ":" + m + ":" + s;
    setTimeout(endTime, 500); //recursive
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

export {
    startTime,
    endTime
};