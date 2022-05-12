function register() {
    let username = $(`#signup_username`).val();
    let password = $(`#signup_password`).val();
    let confirmPassword = $(`#confirmPassword`).val();
    let user = {
        username : username ,
        passwordForm : {
            password : password,
            confirmPassword : confirmPassword
        }
    }
    $.ajax({
        type : 'POST',
        url : `http://localhost:8080/register`,
        data : JSON.stringify(user),
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        success : function () {
           alert("Tạo thành công")
            $(`#signup_username`).val(null);
            $(`#signup_password`).val(null);
            $(`#confirmPassword`).val(null);
        },
        error : function () {
            alert("Tài khoản đã tồn tại hoặc mật khẩu ko khớp")
        }
    })
}

