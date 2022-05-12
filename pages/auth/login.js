function login123() {
    let username = $(`#username`).val();
    let password = $(`#password`).val();
    let user = {
        username : username,
        password: password
    }
    $.ajax({
        type : 'POST',
        url : `http://localhost:8080/login`,
        data : JSON.stringify(user),
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        success : function (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser))
            let currentUser123 = JSON.parse(localStorage.getItem("currentUser"));
            $.ajax({
                type: 'GET',
                url: `http://localhost:8080/userInfo/findOne/${currentUser123.id}`,
                headers: {
                    "Authorization": 'Bearer ' + currentUser123.token
                },
                success: function (userInfo) {
                    if (userInfo.id % 1 == 0)  {
                        location.href = '../index/about.html'
                    } else {
                        location.href = '../auth/signUpUserInfo.html'
                    }
                }
            })
        },
        error : function () {
            alert("Tài khoản hoặc mật khẩu không chính xác!")
        }
    })
}