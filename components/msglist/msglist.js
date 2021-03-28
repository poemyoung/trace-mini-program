// pages/components/msglist/msglist.js
import ArticleReq from '../../api/article_req'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articles: {
      type: Array,
      value: []
    },
    desc: {
      type: String,
      value: '删除'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkDetail: function (event) {
      let aid = event.currentTarget.dataset.aid;
      let article = event.currentTarget.dataset.article;
      let params = "?aid=" + aid;
      if (article) {
        wx.navigateTo({
          url: '../../articleshow/article/article' + params
        })
      } else {
        wx.navigateTo({
          url: '../../articleshow/workorder/workorder' + params
        })
      }
    },
    del: function (event) {
      let _this = this;
      // 后端发起请求删除工单列表
      ArticleReq.delArticle(event.currentTarget.dataset.aid,(res) => {
        _this.triggerEvent('del',res)
      },() => {
        Toast.fail("删除失败！");
      })
    }
  }
})