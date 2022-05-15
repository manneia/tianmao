$(function () {
    let hiden = {
        'transform': 'rotate(0deg)',
        'opacity': '0',
        'transition': 'all 0.5s',
    }
    let show = {
        'transform': 'rotate(360deg)',
        'opacity': '1',
        'transition': 'all 0.5s',
    }
    $(".tab-but-two").click(() => {
        $(".form-one").css(hiden);
        setTimeout(() => {
            $(".form-two").css("display", "none");
            $(".form-one").css("display", "block");
            setTimeout(() => {
                $(".form-one").css(show);
            }, 50);

        }, 200);
    });

    $(".tab-but-one").click(() => {
        $(".form-one").css(hiden);
        setTimeout(() => {
            $(".form-one").css("display", "none");
            $(".form-two").css("display", "block");
            setTimeout(() => {
                $(".form-two").css(show);
            }, 50);

        }, 200);
    });

    //获取数据
    function getData() {
        return JSON.parse(localStorage.getItem('data')) || [];
    };
    //判断账号是否存在
    function checkUsername() {

        let user_data = getData();
        let index = user_data.findIndex((item, index) => {
            return item.RegisterPhone == LoginPhone.value
        });
        let Index = user_data.findIndex((item, index) => {
            return item.UserPassword == LoginPassowrd.value;
        });
        // console.log(index);
        if (index == -1) {
            return alert('账号错误');

        } else {
            if (Index == -1) {
                return alert('密码错误');
            } else {
                window.location.href = '../index.html';
            }
        }
    }
    //判断登录
    $('#submit').click(() => {
        checkUsername();
    });
})