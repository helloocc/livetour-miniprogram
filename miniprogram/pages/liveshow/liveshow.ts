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
    searchKey: "",
    isNotify: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.doQuery()
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

  },

  onCancle() {
    wx.showToast({
      title: "取消搜索"
    });
    this.doQuery()
  },

  flushData(e: any) {
    this.doQuery(e.detail.value)
  },

  doQuery(searchKey?: string) {
    let that = this
    let query = searchKey != undefined ? searchKey : that.data.searchKey
    wx.request({
      url: URL + LIVESHOW,
      data: { 'query': query },
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
          showData: res.data.data,
          isNotify: true
        })
        console.log(res.data)
      }
    })
  }

})