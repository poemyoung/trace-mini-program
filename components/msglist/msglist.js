// pages/components/msglist/msglist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articles:{
      type:Array,
      value:[]
    },
    desc:{
      type:String,
      value:'删除'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkDetail:function(event) {
      let aid = event.currentTarget.dataset.aid;
      let article = event.currentTarget.dataset.article;
      let params = "?aid="+aid;
      if(article) {
        wx.navigateTo({
          url: '../../articleshow/article/article' + params
        })
      }else {
        wx.navigateTo({
          url: '../../articleshow/workorder/workorder' + params
        })
      }
  },
  }
})
