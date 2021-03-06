//按編輯按鈕
$(".mapping-age-edit").on("click", function() {
    $(".mapping-age-save").toggleClass("none");
    $(".mapping-age-v").find(".para").toggleClass("none");
    $(".mapping-age-update").toggleClass("none");
});

$(".mapping-sex-edit").on("click", function() {
    $(".mapping-sex-save").toggleClass("none");
    $(".mapping-sex-v").find(".para").toggleClass("none");
    $(".mapping-sex-update").toggleClass("none");
});

$(".intro-edit").on("click", function() {
    $(".intro-save").toggleClass("none");
    $(".intro-v").find(".para").toggleClass("none");
    $(".intro-update").toggleClass("none");
});

//按儲存按鈕
$(".mapping-age-save").on("click", function() {
    $(".mapping-age-save").toggleClass("none");
    $(".mapping-age-update").toggleClass("none");
});

$(".mapping-sex-save").on("click", function() {
    let msex = $("input[name=mapping-sex]:checked").val();
    console.log(msex);
    if (msex == "") {
        alert("請選擇要要配對的性別...");
    } else {
        $(".mapping-sex-save").toggleClass("none");
        $("#man").attr("checked", false); //取消打勾
        $("#woman").attr("checked", false); //取消打勾
        $("#all").attr("checked", false); //取消打勾
        if (msex == 0) {
            $(".mapping-sex-v").find(".para").html("女");
            $("#woman").attr("checked", true); //設定打勾
        } else if (msex == 1) {
            $(".mapping-sex-v").find(".para").html("男");
            $("#man").attr("checked", true); //設定打勾
        } else if (msex == 2) {
            $(".mapping-sex-v").find(".para").html("我全都要");
            $("#all").attr("checked", true);
        }

        $(".mapping-sex-v").find(".para").toggleClass("none");
        $(".mapping-sex-update").toggleClass("none");
    }
});

$(".intro-save").on("click", function() {
    let intro = $(".intro-update").val().trim();
    if (intro == "") {
        alert("請輸入要更新的自我介紹...");
    } else {
        $(".intro-save").toggleClass("none");
        $(".intro-v").find(".para").html(intro);
        $(".intro-v").find(".para").toggleClass("none");
        $(".intro-update").toggleClass("none");
    }
});

//開啟配對
$("#togBtn").on('change', function() {
    if ($(this).is(':checked')) {
        $(this).attr('value', 'on');
        // console.log($(this).val());
    } else {
        $(this).attr('value', 'off');
        // console.log($(this).val());
    }
});

//資料庫select會員的資料
var send_obj = { "account": "test2" };

$.ajax({
    method: "GET",
    url: "http://localhost:8081/FFF/MappingServletSelect",
    data: send_obj,
    dataType: 'json',
    success: function(data) {
        switch (data.mapping) {
            case 0:
                break;
            case 1:
                $("#togBtn").click();
                break;
        }
        var min = data.age_min;
        var max = data.age_max;

        $(function() {
            //配對年齡
            $("#slider-range").slider({
                range: true,
                min: 18,
                max: 50,
                values: [min, max],
                slide: function(event, ui) {
                    $("#amount").html(ui.values[0] + " - " + ui.values[1]);
                }
            });
            $("#amount").html($("#slider-range").slider("values", 0) +
                " - " + $("#slider-range").slider("values", 1));

            $("#togBtn").change();
        });
        //性別
        switch (data.sex) {
            case 0:
                $(".sex-v").find(".para").html("男");
                break;
            case 1:
                $(".sex-v").find(".para").html("女");
                break;
        }
        //配對性別
        $(".maping-sex-v").find(".mapping-sex-update").val(data.mapping_sex);
        if (data.mapping_sex == 0) {
            $(".mapping-sex-v").find(".para").html("女");
            $("#woman").attr("checked", true); //設定打勾
        } else if (data.mapping_sex == 1) {
            $(".mapping-sex-v").find(".para").html("男");
            $("#man").attr("checked", true); //設定打勾
        } else if (data.mapping_sex == 2) {
            $(".mapping-sex-v").find(".para").html("我全都要");
            $("#all").attr("checked", true); //設定打勾
        }
        $(".intro-v").find(".para").html(data.intro);
        $(".intro-v").find(".intro-update").val(data.intro);
        $(".rounded-circle").attr("src", data.photo);
        console.log(data);
    },
    error: function() {},
    complete: function() {}
});

var min;
var max;
$(function() {
    //配對年齡
    $("#slider-range").slider({
        range: true,
        min: 18,
        max: 50,
        values: [min, max],
        slide: function(event, ui) {
            $("#amount").html(ui.values[0] + " - " + ui.values[1]);
        }
    });
    $("#amount").html($("#slider-range").slider("values", 0) +
        " - " + $("#slider-range").slider("values", 1));

    $("#togBtn").change();
});

$("#submit-btn").on("click", function() {
    var mapping;
    switch ($(".mapping-v").find("#togBtn").val()) {
        case "off":
            mapping = 0;
            break;
        case "on":
            mapping = 1;
            break;
    }
    var mappingsex;
    switch ($("input[name=mapping-sex]:checked").val()) {
        case "0":
            mappingsex = 0;
            break;
        case "1":
            mappingsex = 1;
            break;
        case "2":
            mappingsex = 2;
            break;
    }

    var update_obj = {
        "account": "test2",
        "mapping": mapping,
        "age_min": $("#slider-range").slider("values", 0),
        "age_max": $("#slider-range").slider("values", 1),
        "mapping_sex": mappingsex,
        "intro": $(".intro-v").find(".intro-update").val().trim(),
    }
    console.log(update_obj);
    $.ajax({
        method: "POST",
        url: "http://localhost:8081/FFF/MappingServletUpdate",
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