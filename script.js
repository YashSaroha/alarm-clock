let alarmString = null;

const setAlarm = document.getElementById("setAlarm")
const clearAlarm = document.getElementById("clearAlarm");
const stopAlarm = document.getElementById("stopAlarm");
const alarmText = document.getElementById("alarm-text");
  
// Handle Create Alarm submit
const handleSubmit = (event) => {
    // Prevent default action of reloading the page
    event.preventDefault();
    const { hour, min } = document.forms[0];
    alarmString = getTimeString({
        hour: hour.value,
        min: min.value
    });
    document.forms[0].reset();
    setAlarm.style.display = "none";    
    clearAlarm.style.display = "block"
    alarmText.style.visibility = "visible"
    alarmText.innerHTML = `Alarm will ring at ${alarmString}`;
};
  
const handleClear = () => {
    alarmString = "";
    setAlarm.style.display = "block";
    clearAlarm.style.display = "none"
    stopAlarm.style.display = "none"
    alarmText.style.visibility = "hidden"
};

const handleStop = () => {
    document.getElementById('ringtone').pause();
    handleClear();
}
  
clearAlarm.addEventListener("click", handleClear);
stopAlarm.addEventListener("click", handleStop);
document.forms[0].addEventListener("submit", handleSubmit);
  
const checkAlarm = (timeString) => {
    if (alarmString === timeString) {
        alarmText.innerHTML = `Time's Up, Wake Up`;
        stopAlarm.style.display = "block"
        clearAlarm.style.display = "none"
        document.getElementById('ringtone').play();
    }
};
  

// Function to convert time to string value
const getTimeString = ({ hour, min }) => {
    if (hour > 12) 
        hour = hour - 12
    if (min < 10)
        min = "0" + min

    return `${hour}:${min}`;
};

const update = () => {
    let a = new Date
    let year = a.getFullYear();
    let month = a.getMonth();
    let todayDate = a.getDate();
    let span1 = document.getElementById("date")
    span1.innerHTML = year + "-" + month + "-" + todayDate

    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let zone = document.getElementById("zone");
    if (min < 10)
        min = "0" + min
    if (sec < 10)
        sec = "0" + sec
    if (hour > 12) {
        hour = hour - 12
        zone.innerHTML = "pm"
    }
    else {
        zone.innerHTML = "am"
    }
    let time = document.getElementById("time")
    time.innerHTML = hour + " : " + min + " : " + sec

    const timeString = getTimeString({ hour, min});
    checkAlarm(timeString);
}

setInterval(update, 1000)
