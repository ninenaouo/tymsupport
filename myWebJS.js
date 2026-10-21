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


  var origin = document.getElementById("raintable").innerHTML;
  var RAIN_REFRESH_MS = 5 * 60 * 1000;
  var rainAlertIntervalMinutes = 5;
  var rainOverThreshold = false;
  var lastRainAlertAt = 0;
  var rainAlertAudio = new Audio("./audio/rain-alert.mp3");
  var rainTestAudio = new Audio("./audio/rain-alert.mp3");

  rainAlertAudio.preload = "auto";
  rainTestAudio.preload = "auto";

  var rainStations = [
    { id: "466920", station: "A1台北車站" },
    { id: "C0AI30", station: "A2三重站" },
    { id: "C0ACA0", station: "A3新北產業園區站至A6泰山貴和站" },
    { id: "C0C680", station: "A7體育大學站" },
    { id: "C0AH50", station: "A8長庚醫院站、A9林口站" },
    { id: "C0C620", station: "A10山鼻站至A14a機場旅館站" },
    { id: "CAC060", station: "A15大園站、A16橫山站" },
    { id: "C2C590", station: "A15大園站、A16橫山站" },
    { id: "C0C700", station: "A17領航站至A22老街溪站" }
  ];

  function onLoadAll() {
    initRainAlertControls();
    getRain();
    getWeather();
    getLittle();
  }

  function initRainAlertControls() {
    if (document.getElementById("rain-alert-controls")) return;

    var datatime = document.getElementById("datatime");
    var panel = document.createElement("div");
    panel.id = "rain-alert-controls";
    panel.style.cssText = "margin:10px 0 14px 0;padding:12px;border:1px solid #ddd;border-radius:8px;background:#fff;";
    panel.innerHTML =
      '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">' +
      '<strong>雨量警報：</strong>' +
      '<label style="margin:0;">提醒間隔（分鐘） ' +
      '<input id="rain-alert-minutes" type="number" min="1" max="120" value="5" style="width:75px;">' +
      '</label>' +
      '<button id="rain-alert-apply" type="button" class="btn btn-primary btn-sm">套用</button>' +
      '<button id="rain-alert-stop" type="button" class="btn btn-danger btn-sm">停止目前提示音</button>' +
      '<button id="rain-alert-test" type="button" class="btn btn-secondary btn-sm">提示音測試</button>' +
      '<span id="rain-alert-status" style="font-weight:bold;">目前正常</span>' +
      '</div>' +
      '<div style="margin-top:6px;font-size:13px;color:#666;">雨量資料每 5 分鐘更新；任一測站 1 小時雨量 ≥ 40 mm 時，依設定間隔持續提醒。10 分鐘雨量 > 6.67 mm 與 1 小時雨量 ≥ 40 mm 會顯示紅字。</div>';

    datatime.parentNode.insertBefore(panel, datatime.nextSibling);

    document.getElementById("rain-alert-apply").addEventListener("click", function () {
      var value = parseInt(document.getElementById("rain-alert-minutes").value, 10);
      if (isNaN(value) || value < 1) value = 1;
      if (value > 120) value = 120;
      rainAlertIntervalMinutes = value;
      document.getElementById("rain-alert-minutes").value = value;
      updateRainAlertStatus("提醒間隔已設定為 " + value + " 分鐘");
    });

    document.getElementById("rain-alert-stop").addEventListener("click", function () {
      stopRainAlertSound();
      updateRainAlertStatus(
        rainOverThreshold
          ? "已停止目前提示音，雨量仍超標時會依設定時間再次提醒"
          : "目前正常"
      );
    });

    document.getElementById("rain-alert-test").addEventListener("click", function () {
      var button = this;

      if (!rainTestAudio.paused) {
        rainTestAudio.pause();
        rainTestAudio.currentTime = 0;
        button.textContent = "提示音測試";
        updateRainAlertStatus(rainOverThreshold ? "雨量超標監看中" : "測試音已停止");
        return;
      }

      rainTestAudio.currentTime = 0;
      rainTestAudio.play().then(function () {
        button.textContent = "關閉測試音";
        updateRainAlertStatus("正在播放測試音");
      }).catch(function () {
        updateRainAlertStatus("瀏覽器阻擋音訊，請再次按提示音測試");
      });
    });

    rainTestAudio.addEventListener("ended", function () {
      var button = document.getElementById("rain-alert-test");
      if (button) button.textContent = "提示音測試";
      updateRainAlertStatus(rainOverThreshold ? "雨量超標監看中" : "目前正常");
    });
  }

  function updateRainAlertStatus(text) {
    var element = document.getElementById("rain-alert-status");
    if (!element) return;
    element.textContent = text;
    element.style.color = rainOverThreshold ? "#d00000" : "#333";
  }

  function safeRainValue(value) {
    var numberValue = Number(value);
    return isNaN(numberValue) || numberValue <= 0 ? 0 : numberValue;
  }

  function rainCell(value, isAlert) {
    return '<td' + (isAlert ? ' style="color:#d00000;font-weight:bold;"' : '') + '>' + value + '</td>';
  }

  function stopRainAlertSound() {
    rainAlertAudio.pause();
    rainAlertAudio.currentTime = 0;
  }

  function playRainAlertSound() {
    rainAlertAudio.pause();
    rainAlertAudio.currentTime = 0;

    rainAlertAudio.play().then(function () {
      lastRainAlertAt = Date.now();
      updateRainAlertStatus("⚠ 時雨量達 40 mm 以上，提示音播放中");
    }).catch(function () {
      lastRainAlertAt = Date.now();
      updateRainAlertStatus("⚠ 時雨量達 40 mm 以上，但瀏覽器阻擋自動播放，請先按一次提示音測試");
    });
  }

  function checkRainAlertReminder() {
    if (!rainOverThreshold) return;

    var intervalMs = rainAlertIntervalMinutes * 60 * 1000;
    if (!lastRainAlertAt || Date.now() - lastRainAlertAt >= intervalMs) {
      playRainAlertSound();
    }
  }

  function getRain() {
    var url = "https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/O-A0002-001?Authorization=CWA-687F5BDC-9EA4-40C3-A8D2-9633373CFCF2&downloadType=WEB&format=JSON";

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        document.getElementById("raintable").innerHTML = origin;

        var stationData = myJson.cwaopendata.dataset.Station || [];

        if (stationData.length > 0) {
          var obsDateTime = stationData[0].ObsTime.DateTime;
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

          document.getElementById("datatime").innerHTML =
            "資料點時間: " + taiwanTime + "（台灣時間）";
        }

        var dataMap = {};
        for (var i = 0; i < stationData.length; i++) {
          dataMap[stationData[i].StationId] = stationData[i];
        }

        var anyOver40 = false;

        for (var j = 0; j < rainStations.length; j++) {
          var config = rainStations[j];
          var data = dataMap[config.id];
          if (!data) continue;

          var ten = safeRainValue(data.RainfallElement.Past10Min.Precipitation);
          var oneHour = safeRainValue(data.RainfallElement.Past1hr.Precipitation);
          var threeHour = safeRainValue(data.RainfallElement.Past3hr.Precipitation);
          var twelveHour = safeRainValue(data.RainfallElement.Past12hr.Precipitation);
          var twentyFourHour = safeRainValue(data.RainfallElement.Past24hr.Precipitation);

          if (oneHour >= 40) anyOver40 = true;

          var row =
            "<tr>" +
            "<td>" + data.GeoInfo.CountyName + "</td>" +
            "<td>" + data.StationName + "</td>" +
            "<td>" + config.id + "</td>" +
            rainCell(ten, ten > 6.67) +
            rainCell(oneHour, oneHour >= 40) +
            "<td>" + threeHour + "</td>" +
            "<td>" + twelveHour + "</td>" +
            "<td>" + twentyFourHour + "</td>" +
            "<td>" + config.station + "</td>" +
            "</tr>";

          document.getElementById("raintable").innerHTML += row;
        }

        var wasOverThreshold = rainOverThreshold;
        rainOverThreshold = anyOver40;

        if (rainOverThreshold) {
          updateRainAlertStatus("⚠ 有測站 1 小時雨量達 40 mm 以上");

          if (!wasOverThreshold || !lastRainAlertAt) {
            playRainAlertSound();
          }
        } else {
          stopRainAlertSound();
          lastRainAlertAt = 0;
          updateRainAlertStatus("目前正常");
        }
      })
      .catch(function (error) {
        console.error("Rain data fetch failed:", error);
        updateRainAlertStatus("雨量資料取得失敗");
      });
  }

  setInterval(getRain, RAIN_REFRESH_MS);
  setInterval(checkRainAlertReminder, 10000);

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