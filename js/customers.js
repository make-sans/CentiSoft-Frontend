const URL = 'http://localhost:57422/api/customers/';


$(document).ready(() => {
    const req = new XMLHttpRequest();
    req.open("GET", URL);
    req.setRequestHeader('centisoft_token', 'VerySecretToken1')
    req.send();
    req.onreadystatechange = (e) => {
        handleResponse(req.responseText)
    }   

    $(".deleteButton").click(()=>{console.log("aha")})
})

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.setRequestHeader('centisoft_token', 'VerySecretToken1')


    xmlHttp.send(null);

}

function handleResponse(responseText) {
    let tBody = document.getElementById("tableBody");
    let tHead = document.getElementById("tHead");

    $("tHead").empty();
    $("tBody").empty();

    let respObj = JSON.parse(responseText)

    //generationg table heads from response object
    Object.keys(respObj[0]).forEach((item) => {
        $("tHead").append("<th>" + item + "</th>")
    })
    $("tHead").append("<th>Delete</th>")

    //for each response object create a row in table
    respObj.forEach((obj) => {
        let tRow = document.createElement("tr");

        //for each key-value in object create a table data
        Object.keys(obj).forEach((value) => {
            let tData = document.createElement("td");
            tData.innerHTML = obj[value];
            tRow.appendChild(tData);
        })
        let tData = document.createElement("td");
        let cont = document.createElement("div")
        let icon = document.createElement("i");
        icon.classList.add("fas", "fa-trash")
        cont.classList.add("deleteButton")
        cont.appendChild(icon);
        tData.appendChild(cont);
        tRow.appendChild(tData);
        tBody.appendChild(tRow);

        $( ".deleteButton" ).click(function() {
            console.log("asdasd")
          });    })
}

function searchCustomers() {
    const query = $("#searchInput").val();
    if (typeof query !== 'number') {
        console.log("nothanumber")
        return;
    }
    const callUrl = URL + query;

    httpGetAsync(callUrl, (responseText) => {
        if (responseText == null) {
            console.log("em")
            $("#tableBody").empty();
        }
        else {
            
        }
    })
}


$('#createForm').submit(function () {
    let customerArray = $('#createForm').serializeArray();
    let customer = {};
    customerArray.map((item) => {
        customer[item['name']] = item['value']
    })
    postCustomer(customer)
    return true;
});


function deleteCustomer(){
}

function postCustomer(customer){
    const req = new XMLHttpRequest();
    let json = JSON.stringify(customer);
    const endPoint = URL+1;

    req.open("POST", endPoint, true);
    req.setRequestHeader('centisoft_token', 'VerySecretToken1')
    req.setRequestHeader('Content-Type', 'application/json')

    req.onload = ()=>{
        console.log("customer posted")
    }
    req.send(json);
}



function showInput() {
    var div = document.getElementById("create-customer-input");
    if (div.style.display === "none") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}