let activeUser = "";
let activeName = "";

const homePage = function () {
    $("#content").html(`
        <div class="right400">
            <h3>Log in</h3>
            <label for="username">Username (email address):</label>
            <input id="username"><br>
            <label for="password">Password:</label>
            <input id="password" type="password"><br>
            <button id="loginButton">Log in</button>
            <button id="signupButton">Sign up</button><br><br><br><br>
        </div>
        <h2>I.O.U is the online ledger for peer to peer lending.</h2>
    `)
}

const dashboardPage = function () {
    $("#content").html(`
        <div class="center400">
            <h3 id="hello">Hello, </h3>
            <button id="createButton">Create an I.O.U</button>
            <button id="logoutButton">Logout</button>
        </div>
        <table>
        <thead>
        <tr>
            <th>Peer</th>
            <th>Status</th>
            <th>Payable</th>
            <th>Receivable</th>
            <th>Details</th>
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
        $("#hello").append(activeName);
        if (response.length === 0) {
            $("#loansTbody").html(`<tr><td colspan="5">No loans to display.</td></tr>`);
        }
        for (i=0;i<response.length;i++) {
            let loanRow = $("<tr>").addClass("loan");
            let peer = $("<td>");
            let status = $("<td>").text(response[i].status);
            let payable = $("<td>");
            let receivable = $("<td>");
            let details = $("<td>").html(`<button class="details" loanId=${response[i].id}>View</button>`);
            if (response[i].lender === activeUser) {
                peer.text(response[i].borrower);
                receivable.text(response[i].balance);
            } else if (response[i].borrower === activeUser) {
                peer.text(response[i].lender);
                payable.text(response[i].balance);
                if (response[i].balance != 0.00) {
                    payable.addClass("payable");
                }
            }
            loanRow.append(peer, status, payable, receivable, details);
            $("#loansTbody").prepend(loanRow);
        }
    })
}

const signupPage = function () {
    $("#content").html(`
        <div class="right400">
            <h3>Sign up</h3>
            <label for="name">Name:</label>
            <input id="name"><br>
            <label for="email">Email address:</label>
            <input id="email"><br>
            <label for="phone">Phone number:</label>
            <input id="phone"><br>
            <label for="password1">Create password:</label>
            <input id="password1" type="password"><br>
            <label for="password2">Confirm password:</label>
            <input id="password2" type="password"><br>
            <button id="logoutButton">Cancel</button>
            <button id="signupSubmit">Submit</button>
        </div>
    `)
}

const createPage = function () {
    $("#content").html(`
        <div class="right400">
            <h3>Create an IOU</h3>
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
            <label for="startDate">Start date:</label>
            <input id="startDate"><br>
            <label for="endDate">End date:</label>
            <input id="endDate"><br>
            <label for="notes">Notes:</label>
            <textarea id="notes"></textarea><br>
            <button id="dashboardButton">Cancel</button>
            <button id="createSubmit">Submit</button>
        </div>
    `)
}

const validateUser = function (username, password) {
    $.ajax({
        url: `/api/login`,
        method: "POST",
        data:{
            username:username,
            password:password
        }
    }).then(function (response) {
        if(response.success){
            activeUser = username;
            activeName = response.name;
            dashboardPage();
        }
        else{
            homePage();
        }
    })
}

const postUser = function () {
    let name = $("#name").val().trim();
    let email = $("#email").val().trim();
    let phone = $("#phone").val().trim();
    let password1 = $("#password1").val().trim();
    let password2 = $("#password2").val().trim();
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
            if(response.success){
                activeUser = email;
                activeName = name;
                dashboardPage();
            }

        })
    }
}

const logout = function () {
    activeUser = "";
    activeName = "";
    homePage();
}

const postLoan = function () {
    let lender = "";
    let borrower = "";
    let purpose = $("#purpose").val();
    let otherParty = $("#otherParty").val().trim();
    let principal = $("#principal").val().trim();
    let interest = $("#interest").val().trim();
    let startDate = $("#startDate").val().trim();
    let endDate = $("#endDate").val().trim();
    let notes1 = `${activeUser}: ${$("#notes").val().trim()}`;
    let authority = otherParty;
    if (purpose === "Lend") {
        lender = activeUser;
        borrower = otherParty;
    } else if (purpose === "Borrow") {
        lender = otherParty;
        borrower = activeUser;
    }
    if (lender && borrower && principal && interest && startDate && endDate && authority) {
        $.ajax({
            url: "/api/loans",
            method: "POST",
            data: {
                lender: lender,
                borrower: borrower,
                status: "Pending",
                principal: principal,
                interest: interest,
                startDate: startDate,
                endDate: endDate,
                notes1: notes1,
                authority: authority
            }
        }).then(function (response) {
            if(response.success){
                dashboardPage();
            }
        })
    }
}

const viewDetails = function (loanId) {
    $.ajax({
        url: `/api/loans/${loanId}`,
        method: "GET",
        data: {
            id: loanId
        }
    }).then(function (response) {
        let balance = parseFloat(response.principal) + parseFloat(response.interest);
        $("#content").html(`
            <div class="center400">
                <h3>Loan Details</h3>
                <button id="dashboardButton">Back to Dashboard</button>
            </div>
            <div class="left400">
                <p>Lender: ${response.lender}</p>
                <p>Borrower: ${response.borrower}</p>
                <p>Status: ${response.status}</p>
                <p>Principal: ${response.principal}</p>
                <p>Interest: ${response.interest}</p>
                <p>Balance: ${response.balance || "Pending"}</p>
                <p>Start Date: ${response.startDate}</p>
                <p>End Date: ${response.endDate}</p>
                <p>Notes:</p><p>${response.notes1}</p>
            </div>
        `)
        if (response.notes2) {
            $(".left400").append(`
                <p>${response.notes2}</p>
            `)
        }
        if (activeUser === response.authority) {
            $(".left400").append(`
                <label for="notes">Notes:</label>
                <textarea id="notes"></textarea><br>
            `)
            $("#content").append(`
                <button id="approveButton" balance=${balance} loanId=${loanId}>Approve</button>
                <button id="denyButton" loanId=${loanId}>Deny</button>
            `)
        }
    })
}

const approve = function (loanId, balance) {
    let notes2 = `${activeUser}: ${$("#notes").val().trim()}`;
    $.ajax({
        url: "/api/loans",
        method: "PUT",
        data: {
            loanId: loanId,
            status: "Active",
            balance: balance,
            notes2: notes2,
            authority: null
        }
    }).then(function (response) {
        if(response.success){
            viewDetails(loanId);
        }
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

$("#content").on("click", "#logoutButton", function (event) {
    event.preventDefault();
    logout();
})

$("#content").on("click", "#createButton", function (event) {
    event.preventDefault();
    createPage();
})

$("#content").on("click", "#createSubmit", function (event) {
    event.preventDefault();
    postLoan();
})

$("#content").on("click", ".details", function (event) {
    event.preventDefault();
    viewDetails($(this).attr("loanId"));
})

$("#content").on("click", "#approveButton", function (event) {
    event.preventDefault();
    approve($(this).attr("loanId"), $(this).attr("balance"));
})

$("#content").on("click", "#denyButton", function (event) {
    event.preventDefault();
    deny($(this).attr("loanId"));
})

$("#content").on("click", "#dashboardButton", function (event) {
    event.preventDefault();
    dashboardPage();
})
