const app = getApp();
var url = app.globalData.urlBase;
var map = app.globalData.urlMap;
const uuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}
const listDel = images => {
  let appImgs = [];
  for(let i = 0;i < images.length;i++) {
    if(images[i] !== undefined) {
      for(let k = 0;k < images[i].length;k++){
        appImgs.push(images[i][k]);
      }
    }
  }
  return appImgs;
}
const delArticle = (aid, reso, rej) => {
  // 删除文章，返回异步消息
  wx.cloud.init();
  wx.request({
    url: url + map.article_detail + "?aid=" + aid,
    success: function (res) {
      let wos = res.data.data.wos;
      console.log(wos);
      const imagesApp = wos.map((wo, index) => {
        if (wo.whom) {
          return wo.images;
        }
      })
      const imagesWeb = wos.map((wo,index) => {
          if(!wo.whom) {
            return wo.images;
          }
      })
      // 删除图片：
     let appImgs = listDel(imagesApp);
     let webImgs = listDel(imagesWeb);
      console.log(appImgs);
      wx.cloud.deleteFile({
        fileList:appImgs,
        success:function(res) {
          console.log(res);
        }
      })
      wx.request({
        url: url + map.del_img,
        method:'POST',
        data:{
          imgs:webImgs
        }
      })
    }
  })
  wx.request({
    url: url + map.del_wo + "?aid=" + aid,
    success: function (res) {
      if (res.data.code == 1) {
        reso();
      } else {
        console.log("fail")
        rej();
      }
    },
    fail: function (res) {
      console.log("fail")
      rej();
    }
  })
}

module.exports = {
  uuid: uuid,
  delArticle: delArticle
}