<template>
  <div>
    <div class="header">
      <div style="display: flex">
        <van-icon
          @click="handleBack"
          size="23"
          class="left-icon"
          name="arrow-left"
        />
        <van-image
          class="avatar"
          round
          width="37"
          height="37"
          :src="base + '/file/image/' + data.author.avatar"
        />
        <div class="des">
          <div class="des-name">{{ data.author.nickname }}</div>
          <div class="des-school">
            {{ data.author.school }}
          </div>
        </div>
      </div>
      <div class="follow" @click="showShare = true">
        <van-icon name="share" />
        分享
      </div>
    </div>
    <div class="content">
      <div class="content-title">给楚老板送上一份礼物吧</div>
      <van-divider />
      <div class="gifts">
        <div class="gift-item">
          <img src="@/assets/荣誉证书.jpg"/>
          <div class="gift-title">
            <h3>荣誉证书</h3>
            <p>抵658票</p>
            <p class="addition-vote">(加赠120票)</p>
          </div>
        </div>
        <div class="gift-item">
          <img src="@/assets/荣誉证书.jpg"/>
          <div class="gift-title">
            <h3>荣誉证书</h3>
            <p>抵658票</p>
            <p>(加赠120票)</p>
          </div>
        </div>
        <div class="gift-item">
          <img src="@/assets/荣誉证书.jpg"/>
          <div class="gift-title">
            <h3>荣誉证书</h3>
            <p>抵658票</p>
            <p>(加赠120票)</p>
          </div>
        </div>
      </div>
      <div class="gift-nums" style="float: right">
        <van-stepper
          v-model="vote_num"
          :min="1"
          :max="10000"
          label="描述文字"
        />
      </div>
    </div>

    <div class="bottom-bar">
      <van-row justify="space-between">
        <van-col span="17"><p>29元，抵180票</p></van-col>
        <van-col span="6"><van-button type="success" color="green">微信支付</van-button></van-col>
      </van-row>
    </div>

    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import MarkdownContent from "@/components/MarkdownContent";
import { Agree, FindArticleById } from "@/api/article";
import { BASE_RUL } from "@/utils/request";
import { FindAllComment, SaveComment } from "@/api/comment";

export default {
  components: { MarkdownContent },

  data() {
    return {
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      agreeLoading: false,
      commentForm: {
        uid: localStorage.getItem("uid"),
        aid: this.$route.params.id,
        content: "",
      },
      commentList: [],
      base: BASE_RUL,
      data: {
        article: {},
        author: {},
      },
      content: "",
      show: false,
      vote_num: 180,
    };
  },

  mounted() {
    FindArticleById(this.$route.params.id).then((res) => {
      if (res.status) this.data = res.data;
      this.content = this.data.article.content.toString();
    });
    FindAllComment(this.$route.params.id).then((res) => {
      if (res.status) this.commentList = res.data;
    });
  },

  methods: {
    handleBack() {
      this.$router.back();
    },

    submitComment() {
      SaveComment(this.commentForm).then((res) => {
        if (res.status) {
          this.commentList.push(res.data);
          this.data.article.commentCount = this.data.article.commentCount + 1;
          this.$toast.success("感谢你的评论");
        }
      });
    },

    agree() {
      this.agreeLoading = true;
      Agree(this.$route.params.id).then((res) => {
        if (res.status) {
          this.data.article.agreeCount = this.data.article.agreeCount + 1;
        }
        setTimeout(() => {
          this.$toast.success("谢谢你的赞同");
          this.agreeLoading = false;
        }, 700);
      });
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 70px;
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.left-icon {
  padding-top: 23px;
  padding-left: 15px;
  margin-right: 20px;
}

.avatar {
  margin-top: 16px;
}

.des {
  font-size: 12px;
  padding-top: 13px;
  padding-left: 10px;
  letter-spacing: 1px;
  width: 47vw;
}

.des-name {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
}

.des-school {
  display: flex;
  padding-top: 5px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
}

.follow {
  float: right;
  margin-top: -28px;
  margin-right: 15px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #0066ff;
}

.content {
  padding: 15px;
}

.content-title {
  padding-top: 10px;
  font-size: 20px;
  font-weight: bold;
  line-height: 30px;
  letter-spacing: 2px;
}

.gifts {
  display: grid;
  grid-template-columns: auto auto auto;
}
.gift-item {
  background-color: rgba(206, 198, 198, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.8);
  padding: 2px;
  font-size: 10px;
  text-align: center;
}
.gift-item img {
  width: 70%;
  height: 60%;
}
.gift-item h3 {
  margin: 0;
  border: 0;
  padding: auto;
}
.gift-item p {
  margin: 0;
  border: 0;
  padding: auto;
}

.addition-vote {
  color: red;
}

.gift-nums {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.4);
  letter-spacing: 1px;
  padding: 20px 0;
}

.bottom-bar {
  width: 100%;
  height: 45px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  padding: 10px 10px;
}

.bottom-bar-icon {
  transform: rotate(-90deg);
}

.s1 {
  font-size: 15px;
  letter-spacing: 2px;
  padding-left: 10px;
}

.comments-icon {
  float: right;
  padding-right: 5px;
  padding-top: 8px;
}

.comments-count {
  float: right;
  padding-right: 25px;
  color: #909399;
  letter-spacing: 1px;
  padding-top: 11px;
  font-size: 13px;
}

.bottom-bar-input {
  height: 40px;
  font-size: 13px;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 13px;
  margin-left: 20px;
  width: 70%;
  border: none;
}

.comments-item {
  display: flex;
  margin-bottom: 20px;
  font-size: 13px;
  letter-spacing: 1px;
  line-height: 20px;
}

.comments-item-d1 {
  color: rgba(0, 0, 0, 0.9);
}

.comments-item-d2 {
  color: rgba(0, 0, 0, 0.7);
  padding: 4px 0;
}

.comments-item-d3 {
  color: rgba(0, 0, 0, 0.4);
  font-size: 11px;
}
</style>