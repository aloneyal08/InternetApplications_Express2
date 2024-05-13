const getCars = async () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const obj = JSON.parse(xhr.responseText); 
        console.log(obj);
    }
    xhr.getResponseHeader("Content-type", "application/json"); 
    xhr.open("GET", "/cars");
    xhr.send();
}