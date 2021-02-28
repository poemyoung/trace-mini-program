// pages/userinfo/userinfo.js
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp();
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
    symptom: '2',
    body_heat: '',
    show: false,
    positions: [],
    columns: [],
    pickerText : '您当前的居住地',
    isSymtomData : 'none',
    province : '',
    city : '',
    county : '',
    hint_list : [],
    addr_inp : true,
    foreign : '2',
    high_risk : '2',
    confirm_patient : '2',
    heat_error : '',
    id_error : '',
    phone_error : ''
  },
  wxReqSubmit : function(sym_type) {
    var _this = this;
    wx.request({
      url: app.globalData.urlBase + app.globalData.urlMap.fill,
      header : {
        'content-type': 'application/json'
      },
      method :'POST',
      data : {
        userId : app.globalData.userId,
        name : _this.data.name,
        idCard : _this.data.cardId,
        phone : _this.data.phone,
        location : {
          province : _this.data.province,
          city : _this.data.city,
          county : _this.data.county,
          detailAddr : _this.data.detail_addr
        },
        symptom : {
          isSymptom : _this.data.symptom == "1",
          type : sym_type
        },
        foreign : _this.data.foreign == "1",
        highRisk : _this.data.high_risk == "1",
        contactPatient : _this.data.confirm_patient == "1",
        bodyHeat : isNaN(_this.data.body_heat) ? parseFloat(_this.data.body_heat) : _this.data.body_heat
      },
      success : function(res) {
        if(res.data.code == "1"){
          wx.navigateTo({
            url: '../index/index',
          })
        }else {
          wx.showToast({
            title: '参数有误',
          })
        }
      },
      fail : function(res) {
        wx.showToast({
          title: '提交错误',
          icon : error
        })
      }
    })
  },
  submit:function(event) {
      // 收集并转换信息
      var _this = this;
      var type = '000000';
      wx.getStorage({
        key: 'symptom_detail',
        success : function(res) {
          type = '';
          for(let i = 1;i <= 6; i++){
              if(res.data.includes(i+'')) {
                type += '1';
              }else {
                type += '0'
              }
            }
          console.log(type)
        },
        fail : function(res) {
         
        },
        complete : function(res) {
          _this.wxReqSubmit(type);
        }
      })
  },
  phoneChange : function(event) {
    var reg = /^1[3-9]\d{9}$/;
    let f1 = reg.test(event.detail);
    if(f1 == false) {
      this.setData({
        phone_error : '请输入正确电话号码'
      })
    }else {
      this.setData({
        phone_error : ''
      })
    }
  },
  idChange : function(event) {
    var reg =/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
    let f = reg.test(event.detail);
    if (f == false) {
      this.setData({
        id_error : '请输入正确身份证号'
      })
    }else {
      this.setData({
        id_error : ''
      })
    }
  },
  heatInp : function(event) {
      if(event.detail < 34 || event.detail > 40 || isNaN(event.detail)){
        this.setData({
          heat_error : '体温输入不正确'
        })
      }else {
        this.setData({
          heat_error : ''
        })
      }
  },
  isConConfirm : function(event) {
    this.setData({
      confirm_patient : event.detail
    })
  },
  isHighRisk : function(event) {
      this.setData({
        high_risk : event.detail
      })
  },
  isOutChina : function(event) {
      this.setData({
        foreign : event.detail
      })
  },
  hintClick : function(event) {
      this.setData({
        detail_addr : event.target.dataset.addr,
        addr_inp : false
      })
  },
  detailAddrChange : function(event) {
    // 详细地址输入
      let key = event.detail;
      var _this = this;
      qqmapsdk.getSuggestion({
        keyword : event.detail,
        region : _this.data.city == null ? '' : _this.data.city,
        region_fix : 1,
        policy : 1,
        success : function(res) {
          let dat = res.data.slice(0,5);
          _this.setData({
            hint_list : dat
          })
        },
        fail : function(res) {
          console.log(res)
        }
      })
  },
  isSymtom : function(event) {
    var _this = this;
    this.setData({
      symptom : event.detail
    },function(){
      if(_this.data.symptom == '1') {
        _this.setData({
          isSymtomData: 'block'
        })
      }else {
        _this.setData({
          isSymtomData: 'none'
        })
      }
    })
  },
  locPickerChange: function (event) {
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
      pickerText : value[0] + ' ' + value[1] + ' ' + (value[2] == undefined ? '' : value[2]),
      province : value[0],
      city : value[1],
      county : (value[2] == undefined ? '' : value[2])
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