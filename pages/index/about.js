let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userInfoId;
let avatarUser;
let name
let idComment;
let today = new Date();
function showUserInfo() {
    $.ajax({
        type : 'GET',
        url : `http://localhost:8080/userInfo/findOne/${currentUser.id}`,
        headers: {
            "Authorization" : 'Bearer ' + currentUser.token
        },
        success : function (userInfo) {
            userInfoId = userInfo.id;
            avatarUser = userInfo.avatar
            name = userInfo.name
            let img  = `<img src="http://localhost:8080/image/${userInfo.avatar}" width="2000" height="100" >`
            let img123  = `<img src="http://localhost:8080/image/${userInfo.avatar}" width="40" height="40">`
            let bgr  = `<img src="http://localhost:8080/image/${userInfo.background}" width="400"  >`
            $(`#userInfo-name`).html(name);
            $(`#avatar-userinfo`).html(img)
            $(`#background-userInfo`).html(bgr)
            $(`#modal_avt`).html(img)
            $(`#modal_bgr`).html(img)
            $(`#show_Avt`).html(img)
            $(`#show_Bgr`).html(bgr)
            $(`#avatar_user1`).html(img123)
            $(`#avatar_user2`).html(img123)
        }
    })
}
function editAvatar() {
    let avt = $(`#edit_avt`)
    let avtForm = new FormData();
    avtForm.append('avatar', avt.prop('files')[0])
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/userInfo/setAvatar/${userInfoId}`,
        data : avtForm,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        headers : {
            "Authorization" : 'Bearer ' + currentUser.token
        },
        success : function () {
            alert("done");
            location.href = "../index/about.html"
        },
        error : function () {
            alert("error")
        }
    })
}
function editBackground() {
    let bgr = $(`#edit_bgr`)
    let avtForm = new FormData();
    avtForm.append('background', bgr.prop('files')[0])
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/userInfo/setBackground/${userInfoId}`,
        data : avtForm,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        headers : {
            "Authorization" : 'Bearer ' + currentUser.token
        },
        success : function () {
            alert("done");
            location.href = "../index/about.html"
        },
        error : function () {
            alert("error")
        }
    })
}

function showAllPostUser() {
    $.ajax({
        type : 'GET',
        url : `http://localhost:8080/post_user/${currentUser.id}`,
        headers: {
            "Authorization" : 'Bearer ' + currentUser.token
        },
        success : function (post) {
            let content = '';
            for (let i = 0; i < post.length; i++) {
                 idComment = "commentPostUser"+`${i}`;
                let allImg = '';
                for (let j = 0; j < post[i].image.length; j++) {
                    allImg += `<img src="http://localhost:8080/image/${((post[i].image)[j]).image}" width="300" , height="100" alt=""/>`
                }
                let comment = ``;
                for (let j = 0; j < post[i].commentPostUsers.length; j++) {
                    let hour = (post[i].commentPostUsers)[j].dateCreated;
                        comment +=`<div class="comet-avatar">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="http://localhost:8080/image/${(post[i].commentPostUsers)[j].userInfo.avatar}" alt="">
\t\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="we-comment">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="coment-head">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5><a href="time-line.html" title="">${(post[i].commentPostUsers)[j].userInfo.name}</a></h5>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>${hour}</span>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>${(post[i].commentPostUsers)[j].content}</p>
\t\t\t\t\t\t\t\t\t\t\t\t\t</div>
<br>
`

                }
                content += `  <div class="loadMore">
                                        <div class="central-meta item">
                                            <div class="user-post">
                                                <div class="friend-info">
                                                    <figure>
                                                        <img src="http://localhost:8080/image/${avatarUser}" alt="">
                                                    </figure>
                                                    <div class="friend-name">
                                                        <ins><a href="time-line.html" title="">${name}</a href="time-line.html" title=""></ins>
                                                        <span>published: ${post[i].dateCreater}</span>
                                                        <span id="status_post">${post[i].statusPostUser?.name}</span>
                                                    </div>
                                                    <div class="post-meta">
                                                    <div>
                                                   ${post[i].content}
                                                        </div>
                                                    <div>   
                                                  ${allImg}
                                                    </div>
                                                        <div class="we-video-info">
                                                            <ul>
                                                                <li>
                                            <span class="like" data-toggle="tooltip" title="like">
                                           <i onclick="likePostUser(${currentUser.id}, ${post[i].id})"  class="ti-heart"  ></i>
                                            <ins >${post[i].totalLike}</ins>
                                                                    </span>
                                                                </li>
                                                        <span class="comment" data-toggle="tooltip" title="Comments">
                                        <i class="fa fa-comments-o"></i>
                                                        <ins>${post[i].totalComment}</ins>
                                        </span>
                                                                </li>

                                                                <li>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="description">

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="coment-area">
                                                    <ul class="we-comet">
                                                        <li>
                                                            <a href="#" title="" class="showmore underline">Show comments</a>
                                                        </li >
                                                        <li id="comment_postUser">
                                                           ${comment}
                                                           </li>
                                                        <li class="post-comment">
                                                            <div class="comet-avatar">
                                                                <img src="http://localhost:8080/image/${avatarUser}" alt="">
                                                            </div>
                                                            <div class="post-comt-box">
                                                                <form>
                                                                    <textarea id = ${idComment} placeholder="Nhập bình luận của bạn"></textarea>
                                                                    <div class="add-smiles">
                                                                       <i onclick="createCommentPost(${currentUser.id}, ${post[i].id},  ${i})" class="fa-solid fa-paper-plane" ></i>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
            }
            $(`#showPostUserInAbout`).html(content)
        }
    })
}
function likePostUser(userId, postUserId) {
    $.ajax({
        type : 'POST',
        url : `http://localhost:8080/like_postUser/${userId}/${postUserId}`,
        headers: {
            "Authorization" : 'Bearer ' + currentUser.token
        },
        success : function () {
            showAllPostUser()
        }
    })
}



function createCommentPost(userId, postUserId , i) {
    let cmt = "commentPostUser" + i;
    let comment = $(`#${cmt}`).val();
    let commentForm = {
        content : comment
    }
    $.ajax({
        type : 'POST',
        url : `http://localhost:8080/commentUser/${userId}/${postUserId}`,
        data : JSON.stringify(commentForm),
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            "Authorization" : 'Bearer ' + currentUser.token
        },
        success : function () {
            $(`#commentPostUser`).val(null);
            showAllPostUser()
        }
    })
}

function createNewPost() {
    let content = $(`#contentPostUser`).val();
    let status = $(`#select_status`).val()
    let image = $(`#image_postUser`);
    let postForm = new FormData();
    if (image.prop('files').length === 0) {
        postForm.append('content', content);
        postForm.append('status', status);
    } else {
        for (let i = 0; i < image.prop('files').length; i++) {
            postForm.append('content', content);
            postForm.append('status', status);
            postForm.append('image',image.prop('files')[i]);
        }
    }

    $.ajax({
        type: "POST",
        url: `http://localhost:8080/post_user/${currentUser.id}`,
        data : postForm,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        headers: {
            "Authorization" : 'Bearer ' + currentUser.token
        },
        success : function () {
            $(`#contentPostUser`).val(null);
            $(`#image_postUser`).val(null);
            showAllPostUser()
        }
    })

}

function logOut() {
    window.localStorage.clear();
    location.href = '../auth/login.html';
}
showUserInfo()
showAllPostUser()