// $(document).ready(function () {
//     console.log("jQuery Connected");
// })
let activeUser = "";

const homePage = function () {
    $("#content").html(`
        <label for="username">Username (email address):</label>
        <input id="username"><br>
        <label for="password">Password:</label>
        <input id="password" type="password"><br>
        <button id="loginButton">Log in</button>
        <button id="signupButton">Sign up</button>
    `)
}

const dashboardPage = function () {
    $("#content").html(`
    <button id="createButton">Create an IOU</button>

    <table>
    <thead>
    <tr>
        <th>Peer</th>
        <th>Status</th>
        <th>Payable</th>
        <th>Receivable</th>
    </tr>
    </thead>
    <tbody id="loansTbody">

    </tbody>
    </table>
    `)

    $.ajax({
        url: `/api/dashboard`,
        method: "POST",
        data:{
            activeUser:activeUser
        }
    }).then(function (response) {
        console.log(response);
        for (i=0;i<response.length;i++) {
            let loanRow = $("<tr>").addClass("loan");
            let peer = $("<td>");
            let status = $("<td>").text(response[i].status);
            let payable = $("<td>");
            let receivable = $("<td>");
            if (response[i].lender === activeUser) {
                peer.text(response[i].borrower);
                receivable.text(response[i].balance);
            } else if (response[i].borrower === activeUser) {
                peer.text(response[i].lender);
                payable.text(response[i].balance);
                if (response[i].balance != 0) {
                    payable.addClass("payable");
                }
            }
            loanRow.append(peer, status, payable, receivable);
            $("#loansTbody").prepend(loanRow);
        }
    })

    // <!-- Schedule
    // Approve / Deny
    // Make a Payment -->
}

const signupPage = function () {
    $("#content").html(`
        <label for="name">Name:</label>
        <input id="name"><br>
        <label for="email">Email address:</label>
        <input id="email"><br>
        <label for="phone">Phone number:</label>
        <input id="phone"><br>
        <label for="password1">Create password:</label>
        <input id="password1"><br>
        <label for="password2">Confirm password:</label>
        <input id="password2"><br>
        <button id="signupSubmit>Sign up</button>
    `)
}

const createPage = function () {
    $("#content").html(`
        <p>Create an IOU</p>
        <p>Purpose
            <select id="purpose">
                <option value="Lend">Lend</option>
                <option value="Borrow">Borrow</option>
            </select>
        </p>
        <label for="otherParty">Other party:</label>
        <input id="otherParty"><br>
        <label for="principal">Principal amount:</label>
        <input id="principal"><br>
        <label for="interest">Interest:</label>
        <input id="interest"><br>
        <label for="start_date">Start date:</label>
        <input id="start_date"><br>
        <label for="end_date">End date:</label>
        <input id="end_date"><br>
        <button>Submit</button>
    `)
    // <!-- Interest
    // Schedule -->
}

const validateUser = function (username, password) {
    console.log(username, password);
    $.ajax({
        url: `/api/login`,
        method: "POST",
        data:{
            username:username,
            password:password
        }
    }).then(function (response) {
        console.log(response);
        if(response.success){
            activeUser = username;
            dashboardPage();
            console.log("active " + activeUser)
        }
        else{
            homePage();
        }
    })
}

const postUser = function () {
    let name = $("#name").val().trim()
    let email = $("#email").val().trim()
    let phone = $("#phone").val().trim()
    let password1 = $("#password1").val().trim()
    let password2 = $("#password2").val().trim()
    if (name && email && phone && password1 && password1 === password2) {
        $.ajax({
            url: "/api/users",
            method: "POST",
            data: {
                email: email,
                password: password1,
                name: name,
                phone: phone}
        }).then(function (response) {
            console.log(response)
        })
    }
}

const getLoan = function () {
    $.ajax({
        url: "/api/loans/:id",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
}

const postLoan = function () {
    let input = {req:$("#input").val().trim()};
    $.ajax({
        url: "/api/loans",
        method: "POST",
        data:input
    }).then(function (response) {
        console.log(response)
    })
}

homePage();

$("#content").on("click", "#loginButton", function (event) {
    event.preventDefault();
    validateUser($("#username").val(), $("#password").val());
})

$("#content").on("click", "#signupButton", function (event) {
    event.preventDefault();
    signupPage();
})

$("#content").on("click", "#signupSubmit", function (event) {
    event.preventDefault();
    postUser();
})

$("#content").on("click", "#createButton", function (event) {
    event.preventDefault();
    createPage();
})

// $("#get1").on("click", function (event) {
//     event.preventDefault();
//     getOne();
// })

// $("#product-view").on("click",".get-product",function(event){
// 	event.preventDefault();
// 	let productId = $(this).data("id");
// 	console.log(productId)
// })