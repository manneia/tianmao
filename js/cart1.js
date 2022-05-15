$(function () {
  // 全选
  getTotal();
  $(".checkBoxAll").change(function () {
    $(".checkBox").prop("checked", $(this).prop("checked"));
    $(".checkBoxAll").prop("checked", $(this).prop("checked"));
    if ($(this).prop("checked")) {
      // 让所有的商品添加 check-cart-item 类名
      $("tr").addClass("bg");
    } else {
      // check-cart-item 移除
      $("tr").removeClass("bg");
    }
    getTotal();
  });
  //  反选
  $(".checkBox").change(function () {
    if ($(".checkBox:checked").length === $(".checkBox").length) {
      $(".checkBoxAll").prop("checked", true);
    } else {
      $(".checkBoxAll").prop("checked", false);
    }
    if ($(this).prop("checked")) {
      // 找到它所在的cart-item 加上背景色类名
      $(this).parents("tr").addClass("bg");
    } else {
      // 找到它所在的cart-item  清除背景色类名
      $(this).parents("tr").removeClass("bg");
    }

    getTotal();
  });
  //  增减商品数量模块

  $(".itxt").click(function () {
    var count = $(this).siblings("input").val();
    count++;

    $(this).siblings("input").val(count);
    var price = $(this).parents("td").siblings(".goodsprice").html().substr(1);
    console.log(price); // '¥12.06'
    var totlPrice = count * price;
    console.log(totlPrice);
    $(this)
      .parents("td")
      .siblings(".goodssnum")
      .html("¥" + totlPrice.toFixed(2));
    getTotal();
  });
  //  减少 .reduce
  $(".reduce").click(function () {
    var count = $(this).siblings("input").val();
    if (count == 1) {
      return false;
    }
    count--;

    $(this).siblings("input").val(count);
    var price = $(this).parents("td").siblings(".goodsprice").html().substr(1);
    console.log(price); // '¥12.06'
    var totlPrice = count * price;
    $(this)
      .parents("td")
      .siblings(".goodssnum")
      .html("¥" + totlPrice.toFixed(2));
    getTotal();
  });
  //【5】input修改数量，计算小计
  $(".goodsnum").change(function () {
    // 【5.1】获取单价
    var price = $(this).parents("td").siblings(".goodsprice").html().substr(1);

    // 【5.2】获取数量
    var count = $(this).val();
    console.log(count);
    // 【5.3】计算小计，修改页面元素内容
    var totlPrice = price * count;
    $(this)
      .parents("td")
      .siblings(".goodssnum")
      .html("¥" + totlPrice.toFixed(2));
    getTotal();
  });
  getTotal();
  function getTotal() {
    // 【6.1】求总数量
    var totalCount = 0;
    var totalPrice = 0;

    $(".goodsnum").each(function (i, domEle) {
      // if (复选框是勾选状态) {
      if ($(domEle).parents("tr").find(".checkBox").prop("checked")) {
        // i: 索引号   domEle: dom元素对象
        totalCount += parseInt($(domEle).val());
      }
    });

    $(".amount-sum em").html(totalCount);

    // 【6.2】求总价
    $(".goodssnum").each(function (i, domEle) {
      // if (复选框是勾选状态) {
      if ($(domEle).parents("tr").find(".checkBox").prop("checked")) {
        var price = $(domEle).html().substr(1);

        totalPrice += parseFloat(price);
      }
    });
    $("#allmoney").html("¥" + totalPrice.toFixed(2));
  }
  //  2个删除
  $(".dle").click(function () {
    // 找到a所在的商品 删除掉
    $(this).parents("tr").remove();
    getTotal();
  });

  // (2) 删除选中的商品
  $(".bottomDle").click(function () {
    // 删除的是小的复选框选中的商品
    $(".checkbox:checked").parents("td").remove();
    getTotal();
  });
  // 删除已经选中的商品
  $(".bottomDle").click(function () {
    // $(".checkbox:checked").parents("tbody").remove("tr");
    $(".checkBox:checked").parents("tr").remove();
    getTotal();
  });
  //  存储数据

  // $("#jiesuan").on("click", function () {
  //   var obj = {};
  //   obj = $(".checkBox:checked").parents("tr").html();
  //   localStorage.setItem(JSON.stringify("unname", obj));
  //   localStorage.getItem(JSON.parse(unname));
  // });
  (function () {
    var modalBox = {};

    modalBox.modal = document.getElementById("myModal");
    //
    modalBox.triggerBtn = document.getElementById("jiesuan");

    modalBox.closeBtn = document.getElementById("closeBtn");
    modalBox.show = function () {
      console.log(this.modal);
      this.modal.style.display = "block";
    };
    modalBox.close = function () {
      this.modal.style.display = "none";
    };
    modalBox.outsideClick = function () {
      var modal = this.modal;
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    };
    modalBox.init = function () {
      var that = this;
      this.triggerBtn.onclick = function () {
        that.show();
      };
      this.closeBtn.onclick = function () {
        that.close();
      };
      this.outsideClick();
    };
    modalBox.init();
  })();
});
