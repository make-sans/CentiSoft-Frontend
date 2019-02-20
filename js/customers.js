const URL_CUSTOMER = 'http://localhost:57422/api/customers/';
const CENTISOFT_TOKEN = 'VerySecretToken1'
const tableHeader = ['Id','Name','Email', 'ClientId', 'Delete','Show']

//after loading fetch customers and populate the table
$(document).ready(() => {
    fetchCustomers(URL_CUSTOMER,populateTable);
    $("#searchButton").click(()=>searchCustomers())
})

//get customers ajax
function fetchCustomers(url, callback, fail){
    $.ajax({
        url : url,
        headers : {'centisoft_token' : CENTISOFT_TOKEN}
    }).done((data)=>callback(data))
    .fail((data)=>fail(data))
}

//delete ajax
function deleteCustomer(obj){
    const id = obj.Id;
    const endpoint = URL_CUSTOMER+id;
    
    $.ajax({
        method: "DELETE",
        url: endpoint ,
        headers: {
            "centisoft_token": CENTISOFT_TOKEN,
        }
    })
    .done(()=> location.reload()) 
}

//post ajax - works for update and create
function postCustomer(customer, id=11){
    let json = JSON.stringify(customer);
    const endPoint = URL_CUSTOMER+id;

    console.log("beforeajax")
    $.ajax({
        method: "POST",
        url: endPoint ,
        data: json,
        dataType: 'json',
        headers: {
            "centisoft_token": CENTISOFT_TOKEN,

            "Content-Type": "application/json"
        }
    })
}

function populateTable(respObj) {
    let tBody = document.getElementById("tableBody");
    
    $("tHead").empty();
    $("tBody").empty();
    
    //generating table heads
    tableHeader.forEach((item) => {
        $("tHead").append("<th>" + item + "</th>")
    })
    
    if(respObj==null || respObj[0]==null){
        let tRow = document.createElement("tr");
        let tD = document.createElement("td");
        tD.innerHTML = 'No customers found';
        tD.setAttribute("colspan",tableHeader.length)
        tD.classList.add("text-center")

        tRow.appendChild(tD);
        tBody.appendChild(tRow)
        return;
    }
    
    //for each response object create a row in table
    respObj.forEach((obj) => {
        let tRow = document.createElement("tr");
        // //for each key-value in object create a table data
        // Object.keys(obj).forEach((value) => {
            //     let tData = document.createElement("td");
            //     tData.innerHTML = obj[value];
            //     tRow.appendChild(tData);
            // })
            let tData = document.createElement("td");
            tData.innerHTML = obj.Id;
            tRow.appendChild(tData);
            
        tData = document.createElement("td");
        tData.innerHTML = obj['Name'];
        tRow.appendChild(tData);

        tData = document.createElement("td");
        tData.innerHTML = obj['Email'];
        tRow.appendChild(tData);
        
        tData = document.createElement("td");
        tData.innerHTML = obj['ClientId'];
        tRow.appendChild(tData);
        
        
        tData = document.createElement("td");
        let icon = document.createElement("i");
        icon.classList.add("fas", "fa-trash")
        icon.onclick = ()=> deleteCustomer(obj);
        tData.appendChild(icon);
        tRow.appendChild(tData);

        let showData = document.createElement("td");
        let showIcon = document.createElement("i");
        showIcon.classList.add("fas", "fa-plus");
        showIcon.onclick = ()=> showDetails(obj);
        showData.appendChild(showIcon)
        tRow.appendChild(showData)
        
        tBody.appendChild(tRow);
    })
} 

function showDetails(obj){
    console.log("clicked")
    $(".fa-times").click(()=>{
        $("#myModal").hide();
    })
            $("#myModal #id").val(obj.Id)
            $("#myModal #name").val(obj.Name)
            $("#myModal #address").val(obj.Address)
            $("#myModal #address2").val(obj.Address2)
            $("#myModal #zip").val(obj.Zip)
            $("#myModal #city").val(obj.City)
            $("#myModal #country").val(obj.Country)
            $("#myModal #email").val(obj.Email)
            $("#myModal #phone").val(obj.Phone)
            $("#myModal").show();
        }

        function searchCustomers() {
            const query = $("#searchInput").val();
            
            if(query===""){
                fetchCustomers(URL_CUSTOMER, (data)=>populateTable(data))
                return;
            }
            if (isNaN(query)) {
                console.log('notnumber');
        populateTable(null)
        return;
    }
    const url = URL_CUSTOMER + query;
    fetchCustomers(url, (data)=> populateTable([data]), (e)=>console.log(e)) 
}

//after submitting the create form this gets called
$('#createForm').submit(function () {
    let customerArray = $('#createForm').serializeArray();
    let customer = {};
    customerArray.map((item) => {
        customer[item['name']] = item['value']
    })
    postCustomer(customer)
    return true;
});

//after submitting the update form this gets called
$('#updateForm').submit(function () {
    let customerArray = $('#updateForm').serializeArray();
    let customer = {};
    customerArray.map((item) => {
        customer[item['name']] = item['value']
    })
    postCustomer(customer, customer.id)
    return true;
});

//show-hide the create customer form
function showInput() {
    var div = document.getElementById("create-customer-input");
    if (div.style.display === "none") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}