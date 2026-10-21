function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function testok(){
    alert("Hello World!");

}
/*    for(var i =0;i<result.cwaopendata.dataset.Station.length;i++){
  var ten = result.cwaopendata.dataset.Station[i].RainfallElement.Past10Min.Precipitation;
  var onehour = result.cwaopendata.dataset.Station[i].RainfallElement.Past1hr.Precipitation;
  var threehour = result.cwaopendata.dataset.Station[i].RainfallElement.Past3hr.Precipitation;
  var twehour=result.cwaopendata.dataset.Station[i].RainfallElement.Past12hr.Precipitation;
  var tfhour=result.cwaopendata.dataset.Station[i].RainfallElement.Past24hr.Precipitation;
  */


  var origin =  document.getElementById("raintable").innerHTML;
  function onLoadAll() {
getRain();
getWeather();
getLittle();

  }
function getRain() {
  var url="https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/O-A0002-001?Authorization=CWA-687F5BDC-9EA4-40C3-A8D2-9633373CFCF2&downloadType=WEB&format=JSON";
  fetch(url)
  .then((response) => {
      return response.json()
      //return response.text()
  }).then((myJson) => {

  

    document.getElementById("raintable").innerHTML = origin ;
    
    var obsDateTime = myJson.cwaopendata.dataset.Station[0].ObsTime.DateTime;
    var taiwanTime = new Intl.DateTimeFormat("zh-TW", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).format(new Date(obsDateTime));
    document.getElementById("datatime").innerHTML = "資料點時間: " + taiwanTime + "（台灣時間）";
    var stationIds = ["","","",""];
    for(var i =0;i< myJson.cwaopendata.dataset.Station.length;i++){
       if(myJson.cwaopendata.dataset.Station[i].StationId=='466920'){
        var myresult = 
        `
        <tr>
          <td>${myJson.cwaopendata.dataset.Station[i].GeoInfo.CountyName}</td>
          <td>${myJson.cwaopendata.dataset.Station[i].StationName}</td>
          <td>466920</td>
          <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past10Min.Precipitation}</td>
          <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past1hr.Precipitation}</td>
          <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past3hr.Precipitation}</td>
          <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past12hr.Precipitation}</td>
          <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past24hr.Precipitation}</td>
          <td>A1台北車站</td>
        </tr>
        
        `;
        document.getElementById("raintable").innerHTML += myresult;
        
       }
      }
      for(var i =0;i< myJson.cwaopendata.dataset.Station.length;i++){
        if(myJson.cwaopendata.dataset.Station[i].StationId=='C0AI30'){
          var myresult = 
          `
          <tr>
            <td>${myJson.cwaopendata.dataset.Station[i].GeoInfo.CountyName}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].StationName}</td>
            <td>C0AI30</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past10Min.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past1hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past3hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past12hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past24hr.Precipitation}</td>
            <td>A2三重站</td>
          </tr>
          
          `;
          document.getElementById("raintable").innerHTML += myresult;

        }
      }

      for(var i =0;i< myJson.cwaopendata.dataset.Station.length;i++){
        if(myJson.cwaopendata.dataset.Station[i].StationId=='C0ACA0'){
          var myresult = 
          `
          <tr>
            <td>${myJson.cwaopendata.dataset.Station[i].GeoInfo.CountyName}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].StationName}</td>
            <td>C0ACA0</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past10Min.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past1hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past3hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past12hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past24hr.Precipitation}</td>
            <td>A3新北產業園區站至A6泰山貴和站</td>
          </tr>
          
          `;
          document.getElementById("raintable").innerHTML += myresult;

        }
      
      }
      for(var i =0;i< myJson.cwaopendata.dataset.Station.length;i++){
        if(myJson.cwaopendata.dataset.Station[i].StationId=='C0C680'){
          var myresult = 
          `
          <tr>
            <td>${myJson.cwaopendata.dataset.Station[i].GeoInfo.CountyName}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].StationName}</td>
            <td>C0C680</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past10Min.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past1hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past3hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past12hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past24hr.Precipitation}</td>
            <td>A7體育大學站</td>
          </tr>
          
          `;
          document.getElementById("raintable").innerHTML += myresult;

        }
      }
      for(var i =0;i< myJson.cwaopendata.dataset.Station.length;i++){
        if(myJson.cwaopendata.dataset.Station[i].StationId=='C0C620'){
          var myresult = 
          `
          <tr>
            <td>${myJson.cwaopendata.dataset.Station[i].GeoInfo.CountyName}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].StationName}</td>
            <td>C0C620</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past10Min.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past1hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past3hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past12hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past24hr.Precipitation}</td>
            <td>A10山鼻站至A14a機場旅館站</td>
          </tr>
          
          `;
          document.getElementById("raintable").innerHTML += myresult;

        }
      }
      for(var i =0;i< myJson.cwaopendata.dataset.Station.length;i++){
        if(myJson.cwaopendata.dataset.Station[i].StationId=='CAC060'){
          var myresult = 
          `
          <tr>
            <td>${myJson.cwaopendata.dataset.Station[i].GeoInfo.CountyName}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].StationName}</td>
            <td>CAC060</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past10Min.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past1hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past3hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past12hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past24hr.Precipitation}</td>
            <td>A15大園站、A16橫山站</td>
          </tr>
          
          `;
          document.getElementById("raintable").innerHTML += myresult;

        }
      
      }
      for(var i =0;i< myJson.cwaopendata.dataset.Station.length;i++){
        if(myJson.cwaopendata.dataset.Station[i].StationId=='C0C700'){
          var myresult = 
          `
          <tr>
            <td>${myJson.cwaopendata.dataset.Station[i].GeoInfo.CountyName}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].StationName}</td>
            <td>C0C700</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past10Min.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past1hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past3hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past12hr.Precipitation}</td>
            <td>${myJson.cwaopendata.dataset.Station[i].RainfallElement.Past24hr.Precipitation}</td>
            <td>A17領航站至A22老街溪站</td>
          </tr>
          
          `;
          document.getElementById("raintable").innerHTML += myresult;
        }
      }
     
  })
  
}

function getWeather(){

/*

var url="https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWA-687F5BDC-9EA4-40C3-A8D2-9633373CFCF2&downloadType=WEB&format=JSON";

   var response = UrlFetchApp.fetch(url); // get feed
   var result = JSON.parse(response.getContentText()); 
   var tpeData = result.cwaopendata.dataset.location[0];
   var newtpData = result.cwaopendata.dataset.location[1];
   var tyData = result.cwaopendata.dataset.location[2];

   var tpe=
   `
   【預測時段:${tpeData.weatherElement[0].time[0].startTime} ~ ${tpeData.weatherElement[0].time[0].endTime}】
   縣市:${tpeData.locationName}
   天氣現象:${tpeData.weatherElement[0].time[0].parameter.parameterName}
   降雨機率:${tpeData.weatherElement[1].time[0].parameter.parameterName}%
   溫度:${tpeData.weatherElement[2].time[0].parameter.parameterName}~${tpeData.weatherElement[4].time[0].parameter.parameterName}°C
   舒適度:${tpeData.weatherElement[3].time[0].parameter.parameterName}
   `
   var newtp = 
   `
   縣市:${newtpData.locationName}
   天氣現象:${newtpData.weatherElement[0].time[0].parameter.parameterName}
   降雨機率:${newtpData.weatherElement[1].time[0].parameter.parameterName}%
   溫度:${newtpData.weatherElement[2].time[0].parameter.parameterName}~${newtpData.weatherElement[4].time[0].parameter.parameterName}°C
   舒適度:${newtpData.weatherElement[3].time[0].parameter.parameterName}
   `
   var ty = 
   `
   縣市:${tyData.locationName}
   天氣現象:${tyData.weatherElement[0].time[0].parameter.parameterName}
   降雨機率:${tyData.weatherElement[1].time[0].parameter.parameterName}%
   溫度:${tyData.weatherElement[2].time[0].parameter.parameterName}~${tyData.weatherElement[4].time[0].parameter.parameterName}°C
   舒適度:${tyData.weatherElement[3].time[0].parameter.parameterName}
   `
   var twData = tpe+newtp+ty;
*/
var url="https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWA-687F5BDC-9EA4-40C3-A8D2-9633373CFCF2&downloadType=WEB&format=JSON";

fetch(url)
.then((response) => {
    return response.json()
    //return response.text()
}).then((myJson) => {
  var tpeData = myJson.cwaopendata.dataset.location[0];
  var newtpData = myJson.cwaopendata.dataset.location[1];
  var tyData = myJson.cwaopendata.dataset.location[2];

  var tpe=
  `
  縣市:${tpeData.locationName}
  天氣現象:${tpeData.weatherElement[0].time[0].parameter.parameterName}
  降雨機率:${tpeData.weatherElement[1].time[0].parameter.parameterName}%
  溫度:${tpeData.weatherElement[2].time[0].parameter.parameterName}~${tpeData.weatherElement[4].time[0].parameter.parameterName}°C
  舒適度:${tpeData.weatherElement[3].time[0].parameter.parameterName}
  `
  document.getElementById("tp").innerHTML = tpe;

  
  var newtp = 
  `
  縣市:${newtpData.locationName}
  天氣現象:${newtpData.weatherElement[0].time[0].parameter.parameterName}
  降雨機率:${newtpData.weatherElement[1].time[0].parameter.parameterName}%
  溫度:${newtpData.weatherElement[2].time[0].parameter.parameterName}~${newtpData.weatherElement[4].time[0].parameter.parameterName}°C
  舒適度:${newtpData.weatherElement[3].time[0].parameter.parameterName}
  `
  document.getElementById("ntp").innerHTML = newtp;
  var ty = 
  `
  縣市:${tyData.locationName}
  天氣現象:${tyData.weatherElement[0].time[0].parameter.parameterName}
  降雨機率:${tyData.weatherElement[1].time[0].parameter.parameterName}%
  溫度:${tyData.weatherElement[2].time[0].parameter.parameterName}~${tyData.weatherElement[4].time[0].parameter.parameterName}°C
  舒適度:${tyData.weatherElement[3].time[0].parameter.parameterName}
  `
  document.getElementById("ty").innerHTML = ty;


})



url = "https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/O-A0058-002?Authorization=CWA-687F5BDC-9EA4-40C3-A8D2-9633373CFCF2&downloadType=WEB&format=JSON";
fetch(url)
.then((response) => {
    return response.json()
}).then((myJson) => {

 document.getElementById("raid").innerHTML =
 `
 <a href="${myJson.cwaopendata.dataset.resource.ProductURL}" target="_blank" data-bs-toggle="tooltip" title="點我以查看完整圖片"><img src="${ myJson.cwaopendata.dataset.resource.ProductURL}" class="d-block" style="margin:auto;width:150px;height:150px"></a>
 `;

})
url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=CWA-687F5BDC-9EA4-40C3-A8D2-9633373CFCF2";
fetch(url)
.then((response) => {
    return response.json()
}).then((myJson) => {

 document.getElementById("earth").innerHTML =
 `
 <a href="${myJson.records.Earthquake[0].ReportImageURI}" target="_blank"  data-bs-toggle="tooltip" title="點我以查看完整圖片"><img src="${myJson.records.Earthquake[0].ReportImageURI}" class="d-block" style="margin:auto;width:150px;height:150px"></a>
 `;

})

url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0016-001?Authorization=CWA-687F5BDC-9EA4-40C3-A8D2-9633373CFCF2";
fetch(url)
.then((response) => {
    return response.json()
}).then((myJson) => {

 document.getElementById("earth2").innerHTML =
 `
 <a href="${myJson.records.Earthquake[0].ReportImageURI}" target="_blank"  data-bs-toggle="tooltip" title="點我以查看完整圖片"><img src="${myJson.records.Earthquake[0].ReportImageURI}" class="d-block" style="margin:auto;width:150px;height:150px"></a>
 `;

})


}
setInterval("getLittle()",60000);

setInterval("getWeather()",60000);

setInterval("getRain()",60000);
function getLittle(){
var url1 = "https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-010?Authorization=CWA-687F5BDC-9EA4-40C3-A8D2-9633373CFCF2&downloadType=WEB&format=JSON";
fetch(url1)
.then((response) => {
    return response.json()
}).then((myJson) => {
  document.getElementById("ntp").innerHTML+=
  
  `
  ${myJson.cwaopendata.dataset.parameterSet.parameter[0].parameterValue}
  ${myJson.cwaopendata.dataset.parameterSet.parameter[1].parameterValue}
  ${myJson.cwaopendata.dataset.parameterSet.parameter[2].parameterValue}
  `;

})

var url2 = "https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-009?Authorization=CWA-687F5BDC-9EA4-40C3-A8D2-9633373CFCF2&downloadType=WEB&format=JSON";
fetch(url2)
.then((response) => {
    return response.json()
}).then((myJson) => {
  document.getElementById("tp").innerHTML+=
  
  `
  ${myJson.cwaopendata.dataset.parameterSet.parameter[0].parameterValue}
  ${myJson.cwaopendata.dataset.parameterSet.parameter[1].parameterValue}
  ${myJson.cwaopendata.dataset.parameterSet.parameter[2].parameterValue}
  `;

})
var url3 = "https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-022?Authorization=CWA-687F5BDC-9EA4-40C3-A8D2-9633373CFCF2&downloadType=WEB&format=JSON";
fetch(url3)
.then((response) => {
    return response.json()
}).then((myJson) => {
  document.getElementById("ty").innerHTML+=
  
  `
  ${myJson.cwaopendata.dataset.parameterSet.parameter[0].parameterValue}
  ${myJson.cwaopendata.dataset.parameterSet.parameter[1].parameterValue}
  ${myJson.cwaopendata.dataset.parameterSet.parameter[2].parameterValue}
  `;

})


}


// 起始時間(計時器的啟動時間)。
const startTime = new Date().getTime();

var date=  new Date();
var enddate = new Date();
var shift = "a";
if(date.getHours()==7&& date.getMinutes()>40|| date.getHours()==15 && date.getMinutes() <=20||date.getHours()>7 && date.getHours()<15 ){
  $(".freeTime").text("你目前是早班! 值班進度:");
  enddate.setHours(15);
  enddate.setMinutes(20);
  enddate.setSeconds(0);  
}
else if(date.getHours()==15 && date.getMinutes()>20||date.getHours()>15 && date.getHours()<23){
  $(".freeTime").text("你目前是午班! 值班進度:");
  enddate.setHours(23);
  enddate.setMinutes(0);
  enddate.setSeconds(0);  

}else{
  $(".freeTime").text("你目前是夜班! 值班進度:");
  if(date.getHours()==23){
    
    enddate.setDate(enddate.getDate()+1);
    enddate.setHours(7);
    enddate.setMinutes(40);
    enddate.setSeconds(0); 

  }else{
    enddate.setHours(7);
    enddate.setMinutes(40);
    enddate.setSeconds(0);  
  }
}
console.log(enddate);
// 目標時間(要倒數幾秒)。
var targetSeconds = enddate.getTime()-date.getTime();
targetSeconds /= 1000 ;
// 初始化。
init(targetSeconds);

// timer.
var timer = function (startTime) {
  // 當前時間。
var currentTime = new Date().getTime();

  // 當前時間 - 起始時間 = 經過時間。(因為不需要毫秒，所以將結果除以1000。)
  var diffSec = Math.round((currentTime - startTime) / 1000);
  
  // 目標時間 - 經過時間 = 剩餘時間。
  var remainingTime = targetSeconds - diffSec;
  
  // update progess.  
  update(remainingTime);   
  
  if (remainingTime <= 0) {
    // stop the timer.
    clearInterval(timerId);
    
    // 確保最後顯示的時間為00:00
    update(0);
    
    // do anything you want to.
    $(".msg").text("完成!!");
  } 
}

// start the timer.
var timerId = setInterval( function () { timer(startTime); }, 1000);

// 初始化。此處借用update函式來初次設定進度條。
function init(seconds) {
  update(seconds);
}

// update progess with the timer.
function update (seconds) {
  barRenderer(seconds);
  textRenderer(seconds);
}

// refresh the bar.
function barRenderer (seconds) {
  var percent = (seconds / targetSeconds) * 100;
  $(".bar").css("width", percent + "%");
  $(".progress-bar").css("width", percent + "%");
}

// refresh the text of the bar.
function textRenderer (seconds) {
  var sec = seconds % 60;  
  var min = Math.floor(seconds / 60); 
  var hour = seconds/3600;
  if(seconds>3600){
    hour = parseInt(hour);
    min = min- hour*60;
   
    $(".text").text(hour+"小時:"+min + "分:" + sec+"秒");		

  }else{

    $(".text").text(min + "分:" + sec+"秒");		

  }

}


var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})