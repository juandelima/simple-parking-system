const dateNow = () => {
    const date = new Date();
    const fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    document.getElementById("tanggal").value = fullDate;
};

export default dateNow;