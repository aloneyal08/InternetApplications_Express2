const getCars = async () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        let txt = "";
        const obj = JSON.parse(xhr.responseText); 
        obj.forEach(car => {
            const carTxt = `
                <div id="${car._id}" class="card">
                    <button onclick="deleteCar(this)">X</button>
                    <h4 class="cardTxt">Name: ${car.name}</h4>
                    <h4 class="cardTxt">Model: ${car.model}</h4>
                    <h4 class="cardTxt">Importer: ${car.importer}</h4>
                    <h4 class="cardTxt">Color:⠀⠀<div class="colorBlock" style="background-color: ${car.color};"></div></h4>
                    <h4 class="cardTxt">Year: ${car.year}</h4>
                    <h4 class="cardTxt">Price: ${car.price}</h4>
                </div>`;
            console.log(carTxt);
            txt += carTxt;
        });
        document.getElementById("carsContainer").innerHTML = txt + document.getElementById("addContainer").outerHTML;
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
const deleteCar = (e) =>{
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/car");
    xhr.setRequestHeader("Content-type", "application/json");
    console.log(JSON.stringify({_id: e.parentElement.id}));
    xhr.send(JSON.stringify({_id: e.parentElement.id}));
}