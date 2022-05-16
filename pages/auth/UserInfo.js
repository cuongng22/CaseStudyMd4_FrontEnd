let currentUser = JSON.parse(localStorage.getItem("currentUser"));
function registerUserInfo() {
    let name = $(`#name`).val();
    let age = $(`#age`).val();
    let sex = $(`#sex`).val();
    if (sex === 1) {
        sex = "Nam"
    } else {
        sex = "Nữ"
    }
    let address = $(`#address`).val();
    let user_id = currentUser.id;
    let userForm = new FormData();
    userForm.append('name', name);
    userForm.append('age', age);
    userForm.append('sex', sex);
    userForm.append('address', address);
    userForm.append('user', user_id);
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/userInfo`,
        data: userForm,
        processData: false,
        contentType: false,
        headers: {
            "Authorization" : 'Bearer ' + currentUser.token
        },
        success : function () {
            location.href = '../index/about.html'
        },
        error : function () {
            alert("oh no")
        }
    })
}