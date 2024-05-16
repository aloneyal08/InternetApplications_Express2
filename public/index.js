const getCars = async () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const obj = JSON.parse(xhr.responseText); 
        console.log(obj);
    }
    xhr.open("GET", "/cars");
    xhr.setRequestHeader("Content-type", "application/json"); 
    xhr.send();
}
const submit = () => {
    const xhr = new XMLHttpRequest();
    const inputs = document.querySelectorAll(".formPart");
    const obj = {
        name: inputs[1].value,
        model: inputs[3].value,
        importer: inputs[5].value,
        color: inputs[7].value,
        year: inputs[9].value,
        price: inputs[11].value
    };
    xhr.open("POST", "/cars");
    xhr.setRequestHeader("Content-type", "application/json"); 
    xhr.send(JSON.stringify(obj));
};
const replaceAdd = () => {
    let form = document.getElementById("addForm");
    let btn = document.getElementById("add");
    if(form.style.display == "flex"){
        btn.classList.remove("popdown");
        btn.classList.add("popup");
        form.classList.add("popdown");
        form.classList.remove("popup");
        setTimeout(() => {
            form.style.display = "none";
            btn.style.display = "block";}, 900);
    }else{
        form.classList.remove("popdown");
        form.classList.add("popup");
        btn.classList.add("popdown");
        btn.classList.remove("popup");
        setTimeout(() => {
        form.style.display = "flex";
        btn.style.display = "none";}, 900);
    }
};