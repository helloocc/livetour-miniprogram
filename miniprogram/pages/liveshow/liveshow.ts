// pages/liveshow/liveshow.ts
import moment from "moment";
import { SHARE_TITILE, URL, LIVESHOW } from "../../utils/const";
import { getWeek } from "../../utils/util";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showData: [],
    searchKey: "",
    isNotify: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.doQuery();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.doQuery();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
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

  onCancle() {
    wx.showToast({
      title: "取消搜索",
    });
    this.setData({
      searchKey: "",
    });
    this.doQuery();
  },

  flushData(e: any) {
    this.setData({
      searchKey: e.detail.value,
    });
    this.doQuery();
  },

  doQuery() {
    let that = this;
    wx.request({
      url: URL + LIVESHOW,
      data: { query: this.data.searchKey },
      header: {
        "content-type": "application/json",
      },
      success(res: any) {
        for (let month_data of res.data.data) {
          for (let item of month_data.month_show) {
            let show_time = item.show_time * 1000;
            item.show_day = moment(show_time).format("MM.DD");
            item.show_time = moment(show_time).format("YYYY.MM.DD HH:mm");
            item.show_weekday = getWeek(show_time);
            item.is_festival = item.title.includes("音乐节") ? true : false;
            item.show_title = item.is_festival ? item.title : item.performers;
          }
        }
        that.setData({
          showData: res.data.data,
          isNotify: true,
        });
        console.log(res.data);
      },
    });
  },

  copyText(e: any) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res: any) {
        wx.getClipboardData({
          success: function (res: any) {
            wx.showToast({
              title: "复制成功",
            });
            console.log(res);
          },
        });
        console.log(res);
      },
    });
  },
});
