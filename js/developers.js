const HOSTNAME = "http://localhost"
const PORT = 57422
const SECRET_TOKEN = "VerySecretToken1"
const TABLE_CATEGORIES = ["ID", "Name", "Email"]

function createDevTable(categories) {
    let table = $("<table></table>").addClass("table")
    let tableHeaderRow = $("<thead><tr></tr></thead>")
    let tableBody = $("<tbody></tbody")

    categories.forEach(category => {
        let tableHeader = $("<th scope='col'></th>").text(category)
        tableHeaderRow.append(tableHeader)
    })

    table.append(tableBody)

    return table
}

function addDeveloperToTable(developer, table) {
    let row = $("<tr></tr>")
    
    let id = $(`<th scope="row">${developer.Id}</th>`)
    let name = $(`<td>${developer.Name}</td>`)
    let email = $(`<td>${developer.Email}</td>`)

    table.find("tbody").append(row.append(id).append(name).append(email))
}

function getDevelopers(container) {
    let table = createDevTable(TABLE_CATEGORIES)
    container.empty()

    $.ajax({
        method: "GET",
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
            alert("Something went wrong, please contact developers")
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
        $.ajax({
            method: "POST",
            url: HOSTNAME + ":" + PORT + "/api/developers",
            data: $("#add-developer-form").serialize(),
            headers: {
                "centisoft_token": SECRET_TOKEN,
            },
            success: (newDeveloper) => {
                addDeveloperToTable(newDeveloper, $("#dev-container").find("table"))
            },
            error: (data) => {
                console.log(data)
            }
        })
    })
}

$(document).ready(() => {
    setupListeners()
    getDevelopers($("#dev-container"))
})