// index.ts
// 获取应用实例

import { SHARE_TITILE } from "../../utils/const";

Page({
  data: {
    devContactImg: "../../images/livetourr.png",
    groupContactImg: "../../images/live_bot.png",
  },

  onLoad() {},

  onShareAppMessage() {
    return {
      title: SHARE_TITILE,
    };
  },

  onShareTimeline() {
    return {
      title: SHARE_TITILE,
    };
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
});
