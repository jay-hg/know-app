<template>
  <div class="user-rank-page">
    <van-nav-bar
      title="用户排行榜"
    />

    <div class="rank-list">
      <div class="top-three">
        <div
          v-for="(user, index) in topThreeList"
          :key="user.uid"
          class="rank-item"
          :class="`rank-${index + 1}`"
        >
          <div class="rank-info">
            <img
              :src="base + '/file/image/' + user.avatar"
              alt="头像"
              class="avatar"
            />
            <div class="rank-text">
              <div class="name">{{ user.name }}</div>
              <div class="score">{{ `积分: ${user.score}` }}</div>
            </div>
          </div>
          <div class="medal">
            <div v-if="index === 0" class="gold-medal">金牌</div>
            <div v-else-if="index === 1" class="silver-medal">银牌</div>
            <div v-else-if="index === 2" class="bronze-medal">铜牌</div>
          </div>
        </div>
      </div>

      <van-list v-if="restList.length > 0">
        <van-cell
          v-for="(user, index) in restList"
          :key="user.uid"
          :title="user.name"
          :label="`排名: ${index + 4}`"
          :value="`积分: ${user.score}`"
          :is-link="true"
        >
          <template v-slot:icon>
            <img
              :src="base + '/file/image/' + user.avatar"
              alt="头像"
              class="avatar"
            />
          </template>
        </van-cell>
      </van-list>

      <div v-if="rankList.length === 0" class="empty-text">暂无数据</div>
    </div>
  </div>
</template>
<style>
.user-rank-page {
  height: 100%;
}

.rank-list {
  text-align: center;
  padding: 20px;
}

.top-three {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.rank-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.gold-medal {
  color: gold;
}

.silver-medal {
  color: silver;
}

.bronze-medal {
  color: #cd7f32;
}

.rank-1 {
  background: linear-gradient(to bottom, #ffcc00, #fff);
  height: 120px;
}

.rank-2 {
  background: linear-gradient(to bottom, #c0c0c0, #fff);
  height: 100px;
}

.rank-3 {
  background: linear-gradient(to bottom, #cd7f32, #fff);
  height: 80px;
}

.rank-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.rank-text {
  margin-left: 10px;
}

.name {
  font-weight: bold;
}

.score {
  color: #999;
}

.empty-text {
  text-align: center;
  margin-top: 20px;
}
</style>
<script>
import { RankList } from "@/api/rank";
import { BASE_RUL } from "@/utils/request";
export default {
  data() {
    return {
      rankList: [],
      base: BASE_RUL,
    };
  },
  computed: {
    topThreeList() {
      return this.rankList.slice(0, 3);
    },
    restList() {
      return this.rankList.slice(3);
    },
  },
  mounted() {
    RankList().then((res) => {
      if (res.status) {
        this.rankList = res.data;
      }
    });
  },
};
</script>