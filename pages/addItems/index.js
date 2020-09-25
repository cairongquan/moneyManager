//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dateNow:'',
    options:[],
    itemName:'',
    itemPrice:'',
    hidden:true,
    isItems:[]
  },

  getDateNow(){
    let date = new Date();
    let month  = parseInt(date.getMonth())>12?1:parseInt(date.getMonth())+1;
    this.setData({
      dateNow:date.getFullYear()+'年'+month+'月'+date.getDate()+'日'
    })
  },

  // 页面加载完成时的钩子函数
  onLoad(){
    this.getDateNow();
    this.getItems();
  },
  // 添加按钮
  pushData(){
    // 表单验证
    // 消费名称
    if(this.data.itemName == ''){
      return wx.showToast({
        title: '请输入消费名称!',
        icon: 'none',
        duration: 1200
    })
    }
    // 消费金额
    if(this.data.itemPrice == ''){
      return wx.showToast({
        title: '请输入消费金额!',
        icon: 'none',
        duration: 1200
      })
    }
    let date = new Date();
    let month  = parseInt(date.getMonth())>12?1:parseInt(date.getMonth())+1;
    // 发送添加请求
    this.setData({
      hidden:false
    })
    let that = this;
    wx.request({
      url: 'http://www.warrior.cool:27091/date',
      method: 'POST',
      data:{
        name:this.data.itemName,
        price:this.data.itemPrice,
        date:date.getFullYear()+'年'+month+'月'+date.getDate()+'日'
      },
      success(res) {
        // 清除加载动画
        that.setData({
          hidden:true
        })
        // 清空输入框
        that.setData({
          itemPrice:'',
          itemName:''
        })
        // 弹出成功框
        wx.showToast({
          title: '添加数据成功',  // 标题
          icon: 'success',   // 图标类型，默认success
          duration: 1300   // 提示窗停留时间，默认1500ms
      })
      that.getItems();
      }
  })
},
  // 修改项目名称
  ChangeItemName(e){
    this.setData({
      itemName:e.detail.value
    })
  },
  // 修改项目金额
  changeItemPrice(e){
    this.setData({
      itemPrice:e.detail.value
    })
  },
  // 获取已选items
  getItems(){
    let that = this;
    wx.request({
      url: 'http://www.warrior.cool:27091/date/getItems',
      method: 'GET',
      success(res) {
        let tempArr = [];
        res.data.data.forEach(item=>{
          tempArr.push({
            name:item.selectName,
            status:false
          });
        })
        that.setData({
          isItems:tempArr
        })
      }
  })
  },
  // 为item绑定点击事件
  itemClickEvnet(e){
        let name = e.target.dataset.itemname;
        let index = e.target.dataset.itemindex;
        let tempArr = this.data.isItems;
        tempArr.forEach(item=>{
          item.status = false;
        })
        tempArr[index].status = !name.status;
        this.setData({
          isItems:tempArr,
          itemName:!name.status?name.name:''
        })
  }
})
