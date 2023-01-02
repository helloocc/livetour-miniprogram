// pages/index/live_info.ts
import moment from 'moment';

const URL = "https://www.chenyunfei.cn"
const LIVESHOW = "/liveshow_list"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showData: [],
    searchKey: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.doQuery()
  },

  flushData: function (e: any) {
    this.setData({
      searchKey: e.detail.value
    })
    this.doQuery()
    wx.showToast({
      title: this.data.searchKey + "搜索成功"
    });
  },

  doQuery() {
    let that = this
    wx.request({
      url: URL + LIVESHOW,
      data: { 'query': that.data.searchKey },
      header: {
        'content-type': 'application/json'
      },
      success(res: any) {
        for (let month_data of res.data.data) {
          for (let item of month_data.month_show) {
            item.show_day = moment(item.show_time * 1000).format('MM.DD')
            item.show_time = moment(item.show_time * 1000).format('YYYY.MM.DD HH:mm')
          }
        }
        that.setData({
          showData: res.data.data
        })
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})