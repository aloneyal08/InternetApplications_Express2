const getCars = async () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const obj = JSON.parse(xhr.responseText); 
        console.log(obj);
    }
    xhr.setRequestHeader("Content-type", "application/json"); 
    xhr.open("GET", "/cars");
    xhr.send();
}
const submit = () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const inputs = document.querySelectorAll(".formPart");
        console.log(inputs[7].value);
        const obj = {
            name: inputs[1].value,
            model: inputs[3].value,
            importer: inputs[5].value,
            color: inputs[7].value,
            year: inputs[9].value,
            price: inputs[11].value
        };
    }
    xhr.setRequestHeader("Content-type", "application/json"); 
    xhr.open("POST", "/cars");
    xhr.send();
}