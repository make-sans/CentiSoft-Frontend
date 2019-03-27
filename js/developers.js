const HOSTNAME = "http://localhost"
const PORT = 5000
const SECRET_TOKEN = "VerySecretToken1"
const TABLE_CATEGORIES = ["ID", "Name", "Email"]

function createDevTable(categories) {
    let table = $("<table></table>").addClass("table")
    let tableHead = $("<thead></thead>")
    let tableHeadRow = $("<tr></tr>")
    let tableBody = $("<tbody></tbody")

    categories.forEach(category => {
        console.log(category)
        let tableHeader = $("<th scope='col'></th>").text(category)
        tableHeadRow.append(tableHeader)
    })
    table.append(tableHead.append(tableHeadRow))
    table.append(tableBody)

    return table
}

function addDeveloperToTable(developer, table) {
    let row = $("<tr></tr>")
    
    let id = $(`<th scope="row">${developer._id}</th>`)
    let name = $(`<td>${developer.name}</td>`)
    let email = $(`<td>${developer.email}</td>`)

    table.find("tbody").append(row.append(id).append(name).append(email))
}

function getDevelopers(container) {
    let table = createDevTable(TABLE_CATEGORIES)
    container.empty()
    console.log(HOSTNAME + ":" + PORT + "/api/developers")

    $.ajax({
        method: "get",
        url: HOSTNAME + ":" + PORT + "/api/developers",
        dataType: "json",
        headers: {
            "centisoft_token": SECRET_TOKEN,
        },
        success: (developers) => {
            developers.forEach((dev) => {
                addDeveloperToTable(dev, table)
            })
        },
        error: (data) => {
            alert("Can't connect to server")
            console.error(data)
        },
    })

    container.append(table)
}

function setupListeners() {
    $("#add-developer-toggle-button").click(() => {
        $("#add-developer-form").slideToggle("fast")
    })

    $("#submit-developer").click((event) => {
        event.preventDefault()

        let jsondata = {};
        let serializedArray = $("#add-developer-form").serializeArray()

        serializedArray.forEach((field) => {
            jsondata[field['name']] = field['value']
        })

        console.log(JSON.stringify(jsondata))
        
        $.ajax({
            method: "POST",
            url: HOSTNAME + ":" + PORT + "/api/developers",
            data: JSON.stringify(jsondata),
            headers: {
                "content-type": "application/json",
                "centisoft_token": SECRET_TOKEN,
            },
            success: (newDeveloper) => {
                addDeveloperToTable(newDeveloper, $("#dev-container").find("table"))
            },
            error: (err) => {
                console.log(err)
            }
        })
        
    })
}

$(document).ready(() => {
    setupListeners()
    getDevelopers($("#dev-container"))
})