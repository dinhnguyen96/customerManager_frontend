function getAllData()
{
    // goi ajax
    $.ajax({

        // Loại phương thức
        type: "GET",
        //tên API
        url: "http://localhost:8080/customer/list",
        //xử lý khi thành công
        // Hiển thị danh sách customer
        success: function (data){
            let content ="";
            if (data !== undefined)
            {
                for (let i = 0; i < data.length; i++)
                {
                    content += "<tr>"+getCustomer(data[i])+"</tr>" ;
                }
            }
            document.getElementById('customerList').innerHTML = content;
        }
    });
}
function getCustomer(customer)
{
    return `<td>${customer.id}</td><td >${customer.lastName}</td><td >${customer.firstName}</td>` +
        `<td><a href="" onclick="infoCustomer(${customer.id})">Edit</a></td>` +
        `<td><a href="" onclick="deleteCustomer(${customer.id})">Delete</a></td>`;
}

function addNewCustomer() {
    //lay du lieu
    let lastName = $('#lastName').val();
    let firstName = $('#firstName').val();
    let newCustomer = {
        lastName: lastName,
        firstName: firstName
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCustomer),
        //tên API
        url: "http://localhost:8080/customer/createCustomer",
        //xử lý khi thành công
        success: getAllData

    });
}

function deleteCustomer(data)
{
    if (confirm('Are you sure you want to delete this?')) {
        // goi ajax
        $.ajax({
            type: "DELETE",
            //tên API
            url: `http://localhost:8080/customer/${data}`,
            //xử lý khi thành công

            success:getAllData

        });
        //chặn sự kiện mặc định của thẻ
        event.preventDefault();
    }
}
function updateCustomer() {
    //lay du lieu
    let customerId = $('#customerId').val();
    let lastName = $('#lastName').val();
    let firstName = $('#firstName').val();
    let updateCustomer = {
        customerId: customerId,
        lastName: lastName,
        firstName: firstName
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(updateCustomer),
        //tên API
        url: "http://localhost:8080/customer/updateCustomer/"+customerId,
        //xử lý khi thành công
        success: function (){
            window.location.href = "http://localhost:63343/customerManager/index.html";
        }

    });
}
function getInfoCustomer(customer)
{
    return `<fieldset><input type="hidden" id="customerId"/><div>
           <label class="label_field">LastName </label>
           <input type="text" id="lastName" /></div>`+
           `<div>
          <label class="label_field">FirstName</label>
          <input type="text" id="firstName"  />
         </div>` +
        ` <div>
         <button class="main_bt" onclick="updateCustomer()">Cập nhật</button>
    </div> </fieldset>`;
}

function infoCustomer(id) {
    // goi ajax
    $.ajax({

        // Loại phương thức
        type: "GET",
        //tên API

        url: "http://localhost:8080/customer/information/" + id,


        //xử lý khi thành công
        // Hiển thị thông tin customer
        success: function (data) {

            // $('#customerInfo').html(getInfoCustomer(data));
            $('#result').html("nguyen dinh nguyen");

            window.location.href = "http://localhost:63343/customerManager/edit.html?id=" + data.id;
        }
    });
}

