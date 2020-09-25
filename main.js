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
    setTimeout(this.getData, 500);
  },
//getData方法里发送ajax
  getData(){
    wx.showLoading({
      title: '加载中...',
    })
     wx.request({
       url: 'http://192.168.3.81/heart.php',
       herder:{
         "content-type":"json"
       },
       success:function(res){
         console.log(res);
         var data = res.data.info;
         console.log(data);
         barec.setOption({
           grid: {
             left: '3%',
             right: '7%',
             bottom: '3%',
             containLabel: true
           },
           tooltip: {
             // trigger: 'axis',
             showDelay: 0,
             formatter: function (params) {
               if (params.value.length > 1) {
                 return params.seriesName + ' :<br/>'
                   + params.value[0] + 'm '
                   + params.value[1] + 'm ';
               }
               else {
                 return params.seriesName + ' :<br/>'
                   + params.name + ' : '
                   + params.value + 'm ';
               }
             },
             axisPointer: {
               show: true,
               type: 'cross',
               lineStyle: {
                 type: 'dashed',
                 width: 1
               }
             }
           },
           legend: {
             data: ["学生"],
             left: 'center'
           },
           xAxis: [
             {
               type: 'value',
               scale: true,
               axisLabel: {
                 formatter: '{value} m'
               },
               splitLine: {
                 show: false
               }
             }
           ],
           yAxis: [
             {
               type: 'value',
               scale: true,
               axisLabel: {
                 formatter: '{value} m'
               },
               splitLine: {
                 show: false
               }
             }
           ],
           series: [{
             name: '学生',
            //  symbolSize: 20,
             data:data,
             type: 'scatter',
             markArea: {
               silent: true,
               itemStyle: {
                 normal: {
                   color: 'transparent',
                   borderWidth: 1,
                   borderType: 'dashed'
                 }
               },
               data: [[{
                 name: '教室',
                 xAxis: '0',
                 yAxis: '0'
               }, {
                 xAxis: '20',
                 yAxis: '20'
               }]]
             },
             markPoint: {
               // data: [
               //   { type: 'max', name: '最大值' },
               //   { type: 'min', name: '最小值' }
               // ]
             },
             markLine: {
               lineStyle: {
                 normal: {
                   type: 'solid'
                 }
               },
               // data: [
               //   { type: 'average', name: '平均值' },
               //   { xAxis: 160 }
               // ]
             }
           }]
         })
         wx.hideLoading(); 
       },
       fail: function (res) { },
       complete: function (res) { },
     })
  }
});
