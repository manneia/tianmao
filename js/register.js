//获取验证码
jQuery(function () {
    //获取手机号
    function checkPhone() {
        RegisterPhone.value;
        if (!(/^1[3456789]\d{9}$/.test(RegisterPhone.value))) {
            return alert("手机号码有误，请重填");
        }
    }
    let getCode = null;
    //判断验证码
    function checkCode() {
        VerificationCode.value;
        // console.log(VerificationCode.value);
        if (VerificationCode.value == getCode()) {
            return alert('验证码输入错误');
        }
    }
    let CodeArr = new Array();
    jQuery('.getCode').on('click', function () {
        //获取验证码

        function getRandom(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        getCode = function () {
            let code = '';
            for (let i = 0; i < 6; i++) {
                var type = getRandom(1, 3);
                switch (type) {
                    case 1:
                        code += String.fromCharCode(getRandom(48, 57)); //数字
                        break;
                    case 2:
                        code += String.fromCharCode(getRandom(65, 90)); //大写字母
                        break;
                    case 3:
                        code += String.fromCharCode(getRandom(97, 122)); //小写字母
                        break;
                }
            }
            return code;
        }

        jQuery('.numberCode').css(
            "display", "block");
        jQuery('.numberCode').html(getCode());
        timer();
    })
    let flager = true;

    function timer() {
        let time = 60;
        let one = setInterval(function () {
            time--;
            if (time == 0) {
                jQuery('.getCode').html('获取验证码');
                clearInterval(one);
                jQuery('.numberCode').css(
                    "display", "none");
                return flager = false;
            } else {
                jQuery('.getCode').html(`${time}秒`);
            }

        }, 1000);
    }
    //获取数据
    function getData() {
        return JSON.parse(localStorage.getItem('data')) || [];
    }

    // 存储注册信息
    function storage() {
        RegisterPhone.value;
        VerificationCode.value;
        RegisterPassword.value;
        // console.log(RegisterPhone.value);
        let user = {
            RegisterPhone: RegisterPhone.value,
            UserPassword: RegisterPassword.value
        }
        checkPhone();
        checkCode();

        //数据重复验证
        let user_data = getData();
        let flag = false;
        jQuery.each(user_data, function (i, valEle) {
            if (valEle.RegisterPhone === RegisterPhone.value) {
                return flag = true;
            }
        });
        if (flag == true) {
            flag = false;
            return alert('已有该账户');
        }

        if (user_data == null) {
            user_data.push(user);
            // console.log(data);
            localStorage.setItem('data', JSON.stringify(user_data));
        } else {
            user_data.push(user);
            // console.log(user_data);
            localStorage.setItem('data', JSON.stringify(user_data));
        }

    }

    jQuery('#Btn').click(() => {
        // console.log('niaho');
        VerificationCode.value;
        // //验证码失效倒计时
        if (flager == false) {
            return flager = true;
        }
        //验证码一次使用
        let flag = true;
        if (flag) {
            for (let i = 0; i < CodeArr.length; i++) {
                if (VerificationCode.value == CodeArr[i]) {
                    return alert('验证码已失效');
                }
            }
            CodeArr.push(jQuery('.numberCode').html());
            flag = false;
        } else {
            alert('验证码已失效');
            return flag = true;
        }
        //复选框
        if (!jQuery('.checkbox').checked !== true) {
            return false;
        } else {
            storage();
        }
    });
})