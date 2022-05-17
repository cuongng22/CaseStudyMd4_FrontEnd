let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userInfoId;
let avatarUser;
let name
let idComment;
let today = new Date();
function showWall() {
    $.ajax({
        type : 'GET',
        url : `http://localhost:8080/userInfo/findOne/29`,
        headers: {
            "Authorization" : 'Bearer ' + currentUser.token
        },
        success : function (userInfo) {
            userInfoId = userInfo.id;
            avatarUser = userInfo.avatar
            name = userInfo.name
            let img  = `<img src="http://localhost:8080/image/${userInfo.avatar}" width="300" height="100" >`
            let img123  = `<img src="http://localhost:8080/image/${userInfo.avatar}" width="40" height="40">`
            let bgr  = `<img src="http://localhost:8080/image/${userInfo.background}" width="60"  >`
            $(`#userInfo-name`).html(name);
            $(`#avatar-userinfo`).html(img)
            $(`#background-userInfo`).html(bgr)
            $(`#modal_avt`).html(img)
            $(`#modal_bgr`).html(img)
            $(`#show_Avt`).html(img)
            $(`#show_Bgr`).html(bgr)
            $(`#avatar_user1`).html(img123)
            $(`#avatar_user2`).html(img123)
            $(`#name`).val(name)
            $(`#age`).val(userInfo.age)
            $(`#address`).val(userInfo.address)
        }
    })
}
showWall()