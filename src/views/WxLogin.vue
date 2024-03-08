<template>
  <h1>微信授权登录</h1>
</template>
<script>
import service from "../utils/request";
// const APPID = process.env.VUE_APP_WX_APPID;
const WX_AUTH_URL =
  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
  "wxe05bcbd16155d028" +
  "&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect";

export default {
  components: {},
  data() {
    return {
      wxOpenid: "",
    };
  },
  mounted() {
    this.wxAuth();
  },
  methods: {
    wxAuth() {
      let openid = localStorage.getItem("openid");
      if (openid) {
        resolve(openid);
        return;
      }
      let code = this.getUrlParam("code");
      if (!code) {
        //未经过微信授权
        let currentUrl = encodeURIComponent(window.location.href);
        window.location.replace(
          WX_AUTH_URL.replace("REDIRECT_URI", currentUrl)
        );
      } else {
        var auth = {
          code: code,
        };
        service({
          url: "/auth/wx-login",
          method: "post",
          data: auth,
        }).then((res) => {
          if (res.status) {
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("uid", res.data.id);
            this.$toast.success("登录成功");
            this.$router.push("/");
          } else {
            console.log("登录失败");
          }
        });
      }
    },
    getUrlParam(key) {
      //获取当前页面url中的参数
      var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
      var result = window.location.search.substr(1).match(reg);
      return result ? decodeURIComponent(result[2]) : "";
    },
  },
};
</script>
