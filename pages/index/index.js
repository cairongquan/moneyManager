import * as echarts from '../../ec-canvas/echarts';
var barec = null
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit(canvas, width, height) {
        barec = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barec);
        return barec;
      }
    }
  },
 
  onReady() {
    this.getData();
  },
  onPullDownRefresh(){
    this.getData();
  },
//getData方法里发送ajax
  getData(){
    let date = new Date();
    let month  = parseInt(date.getMonth())>12?1:parseInt(date.getMonth())+1;
     wx.request({
       url: 'http://www.warrior.cool:27091/date/getDayPay',
       type:"GET",
       data:{
          date:date.getFullYear()+'年'+month+'月'+date.getDate()+'日'
       },
       success:function(res){
        let option = {
          title:{
              text:res.data.data.date
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} {b}  {c}元 ({d}%)"
        },
          series:[{
              name:'零钱管理',
              type:'pie',
              radius:'80%',
              data:[
                  {name:"智联招聘",value:600},
                  {name:"51job",value:310},
                  {name:"拉钩",value:200},
                  {name:"Boss直聘",value:800}
              ]
          }]
      };
        let tempArr = [];
        let data = res.data.data;
        data.dateItems.forEach(item=>{
          tempArr.push({
            name:item.name,
            value:item.price
          })
        })
        option.series[0].data = tempArr;
        barec.setOption(option);
       },
       fail: function (res) { },
       complete: function (res) { },
     })
  }
});
