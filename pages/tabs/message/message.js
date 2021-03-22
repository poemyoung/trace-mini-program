// pages/tabs/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      active : 1,
      isMsg : false,
      woActive: 0,
      msgActive: 1,
      headActive: 0,
      work_orders_all:[
        {
          aid : 123,
          headLine : "健康码突然变红问题解决",
          content : "您好，我想问一下我的健康码为什么突然变色了。我最近都在外地没有走动，是因为我们小区出事了吗？"
        },
        {
          aid : 345,
          headLine : "健康码突然变红问题解决",
          content : "您好，我想问一下我的健康码为什么突然变色了。我最近都在外地没有走动，是因为我们小区出事了吗？"
        },
        {
          aid : 346,
          headLine : "健康码突然变红问题解决",
          content : "您好，我想问一下我的健康码为什么突然变色了。我最近都在外地没有走动，是因为我们小区出事了吗？"
        }
      ],
      unhandle:[
        {
          aid : 123,
          headLine : "健康码突然变红问题解决",
          content : "您好，我想问一下我的健康码为什么突然变色了。我最近都在外地没有走动，是因为我们小区出事了吗？"
        },
        {
          aid : 345,
          headLine : "健康码突然变红问题解决",
          content : "您好，我想问一下我的健康码为什么突然变色了。我最近都在外地没有走动，是因为我们小区出事了吗？"
        },
        {
          aid : 346,
          headLine : "健康码突然变红问题解决",
          content : "您好，我想问一下我的健康码为什么突然变色了。我最近都在外地没有走动，是因为我们小区出事了吗？"
        }
      ]
  },
  woChange:function(event) {
      this.setData({
        woActive : event.detail.index
      })
  },
  headChange: function(event) {
      this.setData({
        headActive : event.detail.index
      })
      if(event.detail == 0) {
        this.setData({
          woActive : 1
        })
      }else{
        this.setData({
          msgActive : 0
        })
      }
  },




  tabChange : function(event) {
    this.setData({
      active : event.detail
    });
    switch(event.detail) {
      case 0 :
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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