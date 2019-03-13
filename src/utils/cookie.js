let cookie = {
        /*获取全部cookie*/
        get: function () {
                /*cookie加工为json对象*/
                let cookies_temp = document.cookie.replace(" ", "").split(";"),
                        cookies = {};
                for (let i = 0; i < cookies_temp.length; i++) {
                        let name = cookies_temp[i].split("=")[0].replace(" ", ""),
                                value = cookies_temp[i].split("=")[1];
                        cookies[name] = value;
                }
                return cookies;
        },
        /*设置cookie*/
        set: function (name, value, day) {
                /*设置cookie*/
                if (day !== 0) {
                        let expires = day * 24 * 60 * 60 * 1000;
                        let date = new Date(+new Date() + expires);
                        document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString() + ";Path=/";
                } else {
                        document.cookie = name + "=" + escape(value);
                }
        }
};
export default cookie;