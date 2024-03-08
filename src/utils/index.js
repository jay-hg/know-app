import {BASE_RUL} from "@/utils/request";
export function getAvatar(avatar) {
    if (typeof avatar === 'string' && avatar.startsWith('http')) {
      return avatar; // 假设avatar是一个链接
    } else {
      return BASE_RUL + '/file/image/' + avatar; // 假设avatar是一个id
    }
  }