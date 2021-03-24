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
    articles: [],
    desc: '',
    work_orders_all: [{
        aid: 123,
        headLine: "健康码突然变红问题解决",
        content: "您好，我想问一下我的健康码为什么突然变色了。我最近都在外地没有走动，是因为我们小区出事了吗？",
        time:'2021/3/19 22:03'
      },
      {
        aid: 345,
        headLine: "健康码突然变红问题解决",
        content: "您好，我想问一下我的健康码为什么突然变色了。我最近都在外地没有走动，是因为我们小区出事了吗？",
        time:'3月19日'
      },
      {
        aid: 346,
        headLine: "健康码突然变红问题解决",
        content: "您好，我想问一下我的健康码为什么突然变色了。我最近都在外地没有走动，是因为我们小区出事了吗？",
        time:'3月19日'
      }
    ],
    handled: [],
    unhandle: [],
    mehandle: [],
    readed: [],
    unread:[],
  },
  woChange: function (event) {
    let _this = this;
    this.setData({
      woActive: event.detail.index,
      desc : _this.setDesc(0,event.detail.index)
    })
  },
  headChange: function (event) {
    this.setData({
      headActive: event.detail.index
    })
    if (event.detail == 0) {
      this.setData({
        woActive: 1
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
  setDesc: function (upIdx, downIdx) {
    if (upIdx == 0) {
      switch (downIdx) {
        case 0:
          return '删除';
        case 1:
          return '退单';
        case 2:
          return '结单';
        default:
          return '删除'
      }
    } else {
      switch (downIdx) {
        case 0:
          return '删除'
        case 1:
          return '已读'
        default:
          return '删除'
      }
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
  classifyData : function(articles) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 发起请求
    let _this = this;
    wx.getStorage({
      key: 'userId',
      success:function(storeData) {
          wx.request({
            url: app.globalData.urlBase + app.globalData.urlMap.article_get + "?userId="+storeData.data,
            success:function(res) {
              console.log(res);
              // 分类设置所有data
              if(res.data.code == 1) {
                _this.classifyData(res.data.data);
              }else{
                Toast.fail("服务器错误！")
              }
            },
            fail:function(res) {
              Toast.fail("服务器错误")
            }
          })
      },
      fail:function(res) {
        Toast.fail(res.data);
      }
    })


    this.setData({
      articles: _this.data.work_orders_all,
      desc: '删除'
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