//按編輯按鈕
$(".nikename-edit").on("click", function() {
    $(".nikename-save").toggleClass("none");
    $(".nikename-v").find(".para").toggleClass("none");
    $(".nikename-update").toggleClass("none");
});

$(".name-edit").on("click", function() {
    $(".name-save").toggleClass("none");
    $(".name-v").find(".para").toggleClass("none");
    $(".name-update").toggleClass("none");
});

$(".pswd-edit").on("click", function() {
    $(".pswd-save").toggleClass("none");
    $(".pswd-v").find(".para").toggleClass("none");
    $(".pswd-update").toggleClass("none");
});

//按儲存按鈕
$(".nikename-save").on("click", function() {
    let nikename = $(".nikename-update").val().trim()
    if (nikename == "") {
        alert("請輸入要更新的暱稱...");
    } else {
        $(".nikename-save").toggleClass("none");
        $(".nikename-v").find(".para").html(nikename);
        $(".nikename-v").find(".para").toggleClass("none");
        $(".nikename-update").toggleClass("none");
    }
});

$(".name-save").on("click", function() {
    let name = $(".name-update").val().trim()
    if (name == "") {
        alert("請輸入要更新的暱稱...");
    } else {
        $(".name-save").toggleClass("none");
        $(".name-v").find(".para").html(name);
        $(".name-v").find(".para").toggleClass("none");
        $(".name-update").toggleClass("none");
    }
});

$(".pswd-save").on("click", function() {
    let pswd = $(".pswd-update").val().trim();
    let star = "";
    let step;
    for (step = 1; step <= pswd.length; step++) {
        star = star + "*";
    }
    if (pswd == "") {
        alert("請輸入要更新的暱稱...");
    } else {
        $(".pswd-save").toggleClass("none");
        $(".pswd-v").find(".para").html(star);
        $(".pswd-v").find(".para").toggleClass("none");
        $(".pswd-update").toggleClass("none");
    }
});

//上傳圖片 var reader = new FileReader();
$(".img-update-input").on("change", function() {
    previewFile(this);
});

function previewFile(input) {
    var file = $("input[type=file]").get(0).files[0];
    console.log(file);
    if (file) {
        var reader = new FileReader();
        reader.onload = function() {
            $(".rounded-circle").attr("src", reader.result);
        }
        reader.readAsDataURL(file);
    }
}
//資料庫select會員的資料
var send_obj = { "account": "test3" };

$.ajax({
    method: "POST",
    url: "http://localhost:8081/FFF/InfoServletSelect",
    data: send_obj,
    dataType: 'json',
    success: function(data) {
        let step;
        let star = "";
        $(".account-v").find(".para").html(data.account);
        $(".email-v").find(".para").html(data.email);
        $(".nikename-v").find(".para").html(data.user_nickname);
        $(".nikename-v").find(".nikename-update").val(data.user_nickname);
        $(".name-v").find(".para").html(data.user_name);
        $(".name-v").find(".name-update").val(data.user_name);
        for (step = 1; step <= data.password.length; step++) {
            star = star + "*";
        }
        $(".pswd-v").find(".para").html(star);
        $(".pswd-v").find(".pswd-update").val(data.password);
        $(".birthday-v").find(".para").html(data.birthday);
        $(".rounded-circle").attr("src", data.photo);
    },
    error: function() {},
    complete: function() {}
});

//更新資料
$("#login-btn").on("click", function() {
    var update_obj = {
        "account": "test3",
        "user_nickname": $(".nikename-v").find(".nikename-update").val().trim(),
        "user_name": $(".name-v").find(".name-update").val().trim(),
        "password": $(".pswd-v").find(".pswd-update").val().trim(),
        "photo": $(".rounded-circle").attr('src')
    }
    $.ajax({
        method: "POST",
        url: "http://localhost:8081/FFF/InfoServletUpdate",
        data: update_obj,
        dataType: 'json',
        success: function(data) {
            alert("成功");
            console.log(data);
        },
        error: function(data) {
            alert("失敗");
            console.log(data);
        },
        complete: function() {}
    });
});