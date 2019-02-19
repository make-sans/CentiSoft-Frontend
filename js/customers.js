const req = new XMLHttpRequest();
const url = 'http://localhost:57422/api/customers/';

req.open("GET", url);
req.setRequestHeader('centisoft_token', 'VerySecretToken1')
req.send();
req.onreadystatechange = (e) => {
    handleResponse()
}

function handleResponse() {
    let tBody = document.getElementById("tableBody");
    let tHead = document.getElementById("tHead");

    tHead.innerHTML = ""
    tBody.innerHTML = "";

    let respObj = JSON.parse(req.responseText)

    //generationg table heads from response object
    Object.keys(respObj[0]).forEach((item) => {
        let th = document.createElement("th");
        console.log(item)
        let text = document.createTextNode(item)
        th.appendChild(text);
        tHead.appendChild(th);
    })

    //for each response object create a row in table
    respObj.forEach((obj) => {
        let tRow = document.createElement("tr");

        //for each key-value in object create a table data
        Object.keys(obj).forEach((value)=>{
            let tData = document.createElement("td");
            tData.innerHTML = obj[value];
            tRow.appendChild(tData)

        })
        tBody.appendChild(tRow)


    })









}

function showInput(){
    var div = document.getElementById("create-customer-input");
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}