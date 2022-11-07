let display = document.getElementById("clock");
const audio = new Audio("alarm.wav");
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;

//display the time
function updateTime(){
const date = new Date();
const hour = formatTime(date.getHours());
const minute = formatTime(date.getMinutes());
const second = formatTime(date.getSeconds());
display.innerText = hour + ":" + minute + ":" + second;
}

function formatTime(time){
  if(time<10)
    return "0" + time;
    return time;
}

setInterval(updateTime, 1000); //update the time every second

//set the alarm
function setAlarmTime(value){
  alarmTime = value;
  // alert(alarmTime);
}

function setAlarm(){
  if(alarmTime){
    const date = new Date();
    const alarm = new Date(alarmTime);
    const timeToAlarm = alarm - date;
    if(timeToAlarm >= 0){
      alarmTimeout = setTimeout(() => {
        audio.play();
      }, timeToAlarm);
      alert("Alarm set for " + alarmTime);
    }
  }
}

//clean the alarm
function clearAlarm(){
  if(alarmTimeout){
    clearTimeout(alarmTimeout);
    audio.pause();
    audio.currentTime = 0;
    alert("Alarm cleared");
  }
}

//snooze for 5 minutes
function snoozeAlarm(){
  if(alarmTimeout){
    clearTimeout(alarmTimeout);
    audio.pause();
    audio.currentTime = 0;
    alarmTime = new Date(new Date(alarmTime).getTime() + 5*60000);
    setAlarm();
  }
}