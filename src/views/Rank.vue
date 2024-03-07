<template>
  <div class="rankings">
    <div class="podium">
      <div v-if="players.length > 0" class="first-place">
        <div class="medal gold">1</div>
        <div class="player">
          <van-image
            class="avatar"
            round
            width="37"
            height="37"
            :src="base + '/file/image/' + players[0].avatar"
          />
          <div class="details">
            <span class="name">{{ players[0].name }}</span>
            <span class="votes">{{ players[0].agreeCount }} 票</span>
          </div>
        </div>
      </div>
      <div v-if="players.length > 1" class="second-place">
        <div class="medal silver">2</div>
        <div class="player">
          <van-image
            class="avatar"
            round
            width="37"
            height="37"
            :src="base + '/file/image/' + players[1].avatar"
          />
          <div class="details">
            <span class="name">{{ players[1].name }}</span>
            <span class="votes">{{ players[1].agreeCount }} 票</span>
          </div>
        </div>
      </div>
      <div v-if="players.length > 2" class="third-place">
        <div class="medal bronze">3</div>
        <div class="player">
          <van-image
            class="avatar"
            round
            width="37"
            height="37"
            :src="base + '/file/image/' + players[2].avatar"
          />
          <div class="details">
            <span class="name">{{ players[2].name }}</span>
            <span class="votes">{{ players[2].agreeCount }} 票</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <ul>
        <li v-for="(player, index) in players.slice(3)" :key="index">
          <div class="player">
            <span class="rank">{{ index + 4 }}</span>
            <van-image
              class="avatar"
              round
              width="37"
              height="37"
              :src="base + '/file/image/' + player.avatar"
            />
            <div class="details">
              <span class="name">{{ player.name }}</span>
              <span class="votes">{{ player.agreeCount }} 票</span>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="players.length === 0" class="empty-message">暂无数据</div>
    </div>
  </div>
</template>

<style>
.rankings {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.podium {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.first-place,
.second-place,
.third-place {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.medal {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
}

.gold {
  background-color: gold;
}

.silver {
  background-color: silver;
}

.bronze {
  background-color: #cd7f32;
}

.player {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.player .img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.details {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: bold;
  margin-bottom: 5px;
}

.votes {
  color: #999;
}

.list {
  width: 100%;
  max-width: 600px;
}

.list li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.rank {
  width: 30px;
  font-weight: bold;
  margin-right: 10px;
}

.empty-message {
  margin-top: 20px;
  text-align: center;
  color: #999;
}
</style>
<script>
import { RankList } from "@/api/rank";
import { BASE_RUL } from "@/utils/request";
export default {
  data() {
    return {
      players: [],
      base: BASE_RUL,
    };
  },
  mounted() {
    RankList().then((res) => {
      if (res.status) {
        this.players = res.data;
        console.log(this.players);
      }
    });
  },
};
</script>