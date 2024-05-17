function getTextColor(color) {
    if (color.match(/^rgb/)) {
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
  
      r = color[1];
      g = color[2];
      b = color[3];
    } 
    else {
      color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'
      ));
      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    }
    hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );
    if (hsp>127.5)
      return 'black';
    return 'white';
  }

var emptyCar = "";
const getCars = async () => {
    if(emptyCar == ""){
        emptyCar = document.getElementById("carsContainer").innerHTML;
    }
    document.getElementById("carsContainer").innerHTML = emptyCar;
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        let txt = "";
        const obj = JSON.parse(xhr.responseText);
        obj.forEach(car => {
            const photo = car.photo && car.photo!="" ? car.photo : "https://media.istockphoto.com/id/1133431051/vector/car-line-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=E9t9aitIGYdX-cggrORFCY1dZR-Y8ff37MbXXLDrv9I=";
            const carTxt = `
                <div id="${car._id}" class="card" style="background-color: ${car.color}; color: ${getTextColor(car.color.toUpperCase())}">
                    <div class="actContainer">
                        <button onclick="deleteCar(this)" class="deleteButton"></button>
                        <button onclick="showFormUpdate(this)" class="updateButton"></button>
                    </div>
                    <img src="${photo}" alt="Car photo" class="carPhoto">
                    <h4 class="cardTxt carName">${car.name} - ${car.model}</h4>
                    <h4 class="cardTxt carYear">${car.year}</h4>
                    <h4 class="cardTxt carImporter">Importer: ${car.importer}</h4>
                    <h4 class="cardTxt carPrice">${car.price}₪</h4>
                    <img src="${car.logo}" alt=" " class="logo">
                </div>`;
            txt += carTxt;
        });
        document.getElementById("carsContainer").innerHTML = txt + document.getElementById("carsContainer").innerHTML;
     }

    xhr.open("GET", `/cars/?key=${document.getElementById("search").value}`);
    xhr.setRequestHeader("Content-type", "application/json"); 
    xhr.send();
}
var isUpdate = false;
const submit = () => {
    const xhr = new XMLHttpRequest();
    const inputs = document.querySelectorAll(".formPart");
    const obj = {
        name: inputs[1].value,
        model: inputs[3].value,
        importer: inputs[5].value,
        color: inputs[7].value,
        year: inputs[9].value,
        price: inputs[11].value,
        photo: inputs[13].value
    };
    getCars();
    if(isUpdate){
        xhr.open("PATCH", "/car");
    }else{
        xhr.open("POST", "/cars");
    }
    xhr.setRequestHeader("Content-type", "application/json"); 
    xhr.send(JSON.stringify(obj));
    replaceAdd();
};
let formOpen = false;
const replaceAdd = () => {
    let form = document.getElementById("addForm");
    let btn = document.getElementById("add");
    if(formOpen){
        btn.classList.remove("popdown");
        btn.classList.add("popup");
        form.classList.add("popdown");
        form.classList.remove("popup");
        setTimeout(() => {
            isUpdate = false;
            formOpen = false;
            form.style.display = "none";
            btn.style.display = "block";}, 400);
    }else{
        form.classList.remove("popdown");
        form.classList.add("popup");
        btn.classList.add("popdown");
        btn.classList.remove("popup");
        setTimeout(() => {
            formOpen = true;
            let sub = document.getElementById("submit");
            if(isUpdate){
                sub.value = "Update Car";

            }else{
                sub.value = "Add Car";
            }
            form.style.display = "flex";
            btn.style.display = "none";}, 400);
    }
};
const deleteCar = (e) =>{
    const xhr = new XMLHttpRequest();
    xhr.onload = () =>{
        getCars();
    };
    xhr.open("DELETE", "/car");
    xhr.setRequestHeader("Content-type", "application/json");
    console.log(JSON.stringify({_id: e.parentElement.id}));
    xhr.send(JSON.stringify({_id: e.parentElement.id}));
}
const showFormUpdate = (e) => {
    if(!formOpen){
        isUpdate = true;
        const inputs = document.querySelectorAll(".formPart");
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            let obj = JSON.parse(xhr.responseText);
            inputs[1] = obj.name;
            inputs[3] = obj.model;
            inputs[5] = obj.importer;
            inputs[7] = obj.color;
            inputs[9] = obj.year;
            inputs[11] = obj.price;
            inputs[13] = obj.photo;
        };
        xhr.open("GET", "/car");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({_id: e.parentElement.id}));
        replaceAdd();

    }

}