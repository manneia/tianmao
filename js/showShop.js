//获取地址栏 得到图片
$(function () {
  console.log(window.location.href);
  var str = decodeURI(window.location.href);
  var num = str.indexOf("?");
  if (num == -1) return;
  str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

  var arr = str.split("&"); //各个参数放到数组里
  console.log(arr);
  var imgPath = arr[0].substr(8);
  var title = arr[1].substr(6);
  var info = arr[2].substr(5);
  var price = arr[3].substr(6);
  console.log(imgPath);
  console.log(title);
  console.log(info);
  console.log(price);
  $("#middleImg").attr("src", imgPath);
  $("#bigImg").attr("src", imgPath);
  $("#smallImg").attr("src", imgPath);
  $(".showShop-content h1").text(title);
  $("#info").text(info);
  $(".nowPice span").text(price);

  // 更新
  var nowNum = $("#buyNum").val();
  var nowPrice = $(".nowPice").find("span").text();
  $(".oldPice s").text(nowPrice * 1 + 500);
  var SumPrice = nowNum * nowPrice;
  $(".changeNum p span").text(SumPrice);
  $("#huabei-item-one")
    .find("b")
    .text((SumPrice / 2.9).toFixed(1));
  $("#huabei-item-two")
    .find("b")
    .text((SumPrice / 5.5).toFixed(1));
  $("#huabei-item-three")
    .find("b")
    .text((SumPrice / 11).toFixed(1));
});
// 放大镜
$(function () {
  $(".showImg-middle").mousemove(function (e) {
    $(".showImg-big").css({ display: "block", "z-index": "999" });
    $("#cover").css("display", "block");
    var scrollTop = $(document).scrollTop();
    //console.log(scrollTop);

    // 获得鼠标的绝对位置;
    var Mx = e.clientX;
    var My = e.clientY + scrollTop;

    //获得该控件的绝对位置
    var Ty = $("#middleImg").offset().top;
    var Tx = $("#middleImg").offset().left;

    // 图片上面小透明 的x-y
    var CoverX = Mx - Tx - 100;
    var CoverY = My - Ty - 100;

    // 判断当鼠标移出界
    if (CoverX <= 0) CoverX = 0;
    if (CoverY <= 0) CoverY = 0;
    if (CoverX >= 200) CoverX = 200;
    if (CoverY >= 200) CoverY = 200;

    $("#cover").css({ left: CoverX, top: CoverY });

    // 设置大图片的定位 (小图 200*200 原图800*800  相差4倍)
    var x = CoverX * 2;
    var y = CoverY * 2;
    $("#bigImg").css({ top: -y, left: -x });
  });

  $(".showImg-middle").mouseout(function () {
    $(".showImg-big").css("display", "none");
    $("#cover").css("display", "none");
  });
});

//下面图片切换
$(function () {
  $(".imgList li").click(function () {
    $(".imgList li").css("border", "2px solid white");
    $(this).css("border", "2px solid #333");
    var nowCheckImgPath = $(this).find("img").attr("src");
    $("#middleImg").attr("src", nowCheckImgPath);
    $("#bigImg").attr("src", nowCheckImgPath);
  });
});

// 数字调整
$(function () {
  $("#add").click(function () {
    var nowNum = $("#buyNum").val();
    $("#buyNum").attr("value", nowNum * 1 + 1);
    update();
  });
  $("#minus").click(function () {
    var nowNum = $("#buyNum").val();
    if (nowNum == 1) return;
    $("#buyNum").attr("value", nowNum - 1);
    update();
  });
  function update() {
    var nowNum = $("#buyNum").val();
    var nowPrice = $(".nowPice").find("span").text();
    $(".oldPice s").text(nowPrice * 1 + 500);
    var SumPrice = nowNum * nowPrice;
    $(".changeNum p span").text(SumPrice);
    $("#huabei-item-one")
      .find("b")
      .text((SumPrice / 2.9).toFixed(1));
    $("#huabei-item-two")
      .find("b")
      .text((SumPrice / 5.5).toFixed(1));
    $("#huabei-item-three")
      .find("b")
      .text((SumPrice / 11).toFixed(1));
    // console.log(SumPrice)
  }
  $(document).ready(function () {
    $("#buyNow").click(function () {
      window.location.href = "cart.html";
    });
  });
  $(document).ready(function () {
    $("#addCartBut").click(function () {
      window.location.href = "cart.html";
    });
  });
});
