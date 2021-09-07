$("#btnSaveCustomer").click(function () {
    let customerID = $("#id").val();
    let customerName = $("#name").val();
    let customerAddress = $("#address").val();
    let customerContact = $("#contact").val();
//
    $.ajax({
        method: "POST",
        url: "http://localhost:8000/api/customers",
        contentType: false,
        async: true,
        data: JSON.stringify({
            id: customerID,
            name: customerName,
            address: customerAddress,
            contact: customerContact
        }),
        success: function (data) {
            console.log(data);
        }
    });
//     var form = $('fileUploadForm').get(0);
//     var data = new FormData(form);
//     //var data = new FormData(document.getElementById("btnImgUp"));
//     console.log("datas");
//
//     // // If you want to add an extra field for the FormData
//     data.append("id",customerID);
//     data.append("name",customerName);
//     data.append("address",customerAddress);
//     data.append("contact",contact);
//
//
//     $.ajax({
//         type: "POST",
//         enctype: 'multipart/form-data',
//         url: "http://localhost:8000/api/customers",
//         data: data,
//         processData: false,
//         contentType: false,
//         cache: false,
//         timeout: 600000,
//         success: function (data) {
//             console.log("SUCCESS : ", data);
//         },
//         error: function (e) {
//             console.log("ERROR : ", e);
//         }
//     });
});

//Delete Customer
$("#btnDeleteCustomer").click(function () {
    let id = $("#txtNic").val();
    // Get form
    let form = $('form').get(0);
    // Create an FormData object
    let data = new FormData(form);
    data.append("id", id);
    $.ajax({
        method: "DELETE",
        url: "http://localhost:8000/api/customer",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (res) {
            alert("the customer is removed");
            loadAllCustomers()
        },
        error: function (ob, txtStatus, error) {
            console.log(error);
            console.log(txtStatus);
            console.log(ob);
        }
    });
});
/*----------Search Customer---------------------------*/
$("#btnGetCustomer").click(function () {
    let id = $("#txtNIC").val();
    $.ajax({
        method: "GET",
        url: "http://localhost:8000/api/customer/" + id,
        success: function (res) {
            console.log(res);
            let c = res.data;
            if (res.id === id) {
                $("#txtName").val(res.name);
                $("#txtAddress").val(res.address);
                $("#txtSalary").val(res.salary);
            } else {
                alert("sorry!Customer Not found")
            }

        },
        error: function (ob, txtStatus, error) {
            console.log(error);
            console.log(txtStatus);
            console.log(ob);
        }
    });
});