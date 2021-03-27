// pages/tabs/message/message.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
import util from '../../../utils/util'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    isMsg: false,
    woActive: 0,
    msgActive: 1,
    headActive: 0,
    desc: '删除',
    handled: [],
    unhandle: [],
    mehandle: [],
    readed: [],
    unread: [],
  },
  deal: function(event) {
    let aid = event.currentTarget.dataset.aid;
    let type = event.currentTarget.dataset.type;
    // 处理右滑后事件
  },
  woChange: function (event) {
    let _this = this;
    this.setData({
      woActive: event.detail.index,
    })
  },
  msgChange: function (event) {
    let _this = this;
    this.setData({
      msgActive: event.detail.index,
    })
  },
  headChange: function (event) {
    let _this = this;
    this.setData({
      headActive: event.detail.index
    })
    if (event.detail.index == 0) {
      this.setData({
        woActive: 0,
      })
    } else {
      this.setData({
        msgActive: 0
      })
    }
  },
  tabChange: function (event) {
    this.setData({
      active: event.detail
    });
    switch (event.detail) {
      case 0:
        wx.redirectTo({
          url: '../../index/index',
        })
        break;
      case 2:
        wx.redirectTo({
          url: '../mine/mine',
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  classifyData: function (articles) {
    let _this = this;
    let uH = [],
      uR = [],
      h = [],
      mH = [],
      r = [];
    // 遍历articles，进行分类
    articles.map((article, index) => {
      article.time = util.formatTimeByMail(new Date(article.time));
      if (article.headLine.length > 9) {
        article.headLine = article.headLine.substr(0, 9) + "...";
      }
      if (article.content.length > 40) {
        article.content = article.content.substr(0, 40) + "...";
      }
      if (article.article) {
        // 文章
        switch (article.status) {
          case 0:
            r.push(article);
            break;
          case 1:
            uR.push(article);
            break;
          default:
            break;
        }
      } else {
        //  工单
        switch (article.status) {
          case 0:
            h.push(article);
            break;
          case 1:
            mH.push(article);
            break;
          case 2:
            uH.push(article);
            break;
        }
      }
    });

    _this.setData({
      handled: h,
      unhandle: uH,
      mehandle: mH,
      unread: uR,
      readed: r,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 发起请求
    let _this = this;
    wx.getStorage({
      key: 'userId',
      success: function (storeData) {
        wx.request({
          url: app.globalData.urlBase + app.globalData.urlMap.article_get + "?userId=" + storeData.data,
          success: function (res) {
            // 分类设置所有data
            if (res.data.code == 1) {
              _this.classifyData(res.data.data);
            } else {
              Toast.fail("服务器错误！")
            }
          },
          fail: function (res) {
            Toast.fail("服务器错误")
          }
        })
      },
      fail: function (res) {
        Toast.fail(res.data);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})