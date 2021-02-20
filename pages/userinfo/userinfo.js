// pages/userinfo/userinfo.js
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    cardId: '',
    phone: '',
    address: '',
    detail_addr: '',
    healthFlag: 0,
    status_now: 0,
    symptom: '',
    body_heat: 36,
    show: false,
    positions: [],
    columns: [],
    pickerText : '您当前的居住地'
  },
  locPickerChange: function (event) {
    console.log(event);
    var _this = this;
    const {
      picker,
      value,
      index
    } = event.detail;
    // 从前往后检测是否匹配
    if (_this.data.positions[value[0]][value[1]] === undefined) {
      // 省市不匹配,设置市匹配，县匹配
      let cityList = Object.keys(_this.data.positions[value[0]])
      picker.setColumnValues(1, cityList);
      picker.setColumnIndex(1, 0);
      let countyList = this.data.positions[value[0]][cityList[0]]
      if (countyList.length > 0) {
        picker.setColumnValues(2, countyList)
      }
    } else {
      // 省市匹配，判断县
        let cityList2 = _this.data.positions[value[0]][value[1]];
        if (!cityList2.includes(value[2])) {
          // 市县不匹配
           picker.setColumnValues(2,_this.data.positions[value[0]][value[1]])
        }
    }
  },
  locPickerConfirm :function(event) {
    const {picker, value, index} = event.detail;
    this.setData({
      pickerText : value[0] + ' ' + value[1] + ' ' + (value[2] == undefined ? '' : value[2])
    });
    this.setData({
      show : false
    });
  },
  locPickerCancel : function(event) {
      this.setData({
        show : false
      });
  },
  showPopup: function () {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'RCEBZ-A3PK2-LGHU2-CWQKI-DVM23-NYBQ6'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 调用接口
    var _this = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function (res) { //成功后的回调
        // 设置counties为多列数组
        console.log(res)
        let ps = [];
        for (let i in res.result[0]) {
          // 设置省
          let province = res.result[0][i];
          let citys = res.result[1].slice(
            province.cidx[0], province.cidx[1]
          );
          let provinceCitys = {};
          for (let j in citys) {
            // 设置市
            let city = citys[j];
            let countyNames = [];
            if (city.cidx !== undefined) {
              let counties = res.result[2].slice(
                city.cidx[0], city.cidx[1]
              )
              for (let k in counties) {
                countyNames.push(counties[k].fullname);
              }
            }
            provinceCitys[city.name] = countyNames;
          }
          ps[province.name] = provinceCitys;
        }
        _this.setData({
          positions: ps,
          columns: [{
            values: Object.keys(ps),
            defaultIndex: 1,
            className: 'column1'
          }, {
            values: Object.keys(ps['北京']),
            defaultIndex: 2,
            className: 'column2'
          }, {
            values: ps['北京']['东城'],
            defaultIndex: 3,
            className: 'column3'
          }]
        }, function () {
          const picker1 = this.selectComponent('#picker1');
          picker1.setColumnIndex(
            0, 0
          );
          picker1.setColumnIndex(
            1, 0
          )
          picker1.setColumnIndex(
            2, 0
          )
        })
      },
      fail: function (error) {
        console.error(error);
      }
    });

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

  },
  onChange: function (event) {}
})