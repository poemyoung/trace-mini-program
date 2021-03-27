const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTimeNoSec = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}
const formatTimeByMail = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1;
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes();
  let d = new Date();
  let s = month + "月" + day + "日";
  let t = (hour < 10 ? ("0" + hour) : hour) + ":" + (minute < 10 ? ("0" + minute) : minute);
  let dayMax = (d - date) /(1000 * 60 * 60 * 24);
  let today = (d.getHours() * 60 * 60 * 1000 + d.getMinutes() * 60 * 1000 + d.getSeconds() * 1000)/(1000 * 60 * 60 * 24);
  let dayDiffer = dayMax - today;
  if(dayDiffer <= 0) {
    return t;
  }else if(dayDiffer <= 1) {
    return "昨天 " + t;
  }else if(dayDiffer <= 2) {
    return "前天 " + t;
  }else{
    return s + " " + t
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTimeByMail : formatTimeByMail,
  formatTimeNoSec : formatTimeNoSec
}
