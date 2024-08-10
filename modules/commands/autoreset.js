module. exports. config = {
    name: "autoreset",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Thời gian",
    commandCategory: "Admin",
    cooldowns: 5
}
module. exports. handleEvent = async function({ api, event, args, Users,Threads }) {
  const moment = require("moment-timezone");
  var ngay = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
  var gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
  var color = ['\x1b[38;5;51m'];
  var more = color[Math.floor(Math.random() * color.length)];
  var idad = global.config.ADMINBOT;    
  console.log('\x1b[38;5;51m'+ '[ TIME ] > '+ more + gio + '\x1b[38;5;51m' + ' → ' + '\x1b[37m' +  ngay)
  var seconds = moment.tz("Asia/Ho_Chi_Minh").format("ss");
  var timeRestart_1 = `00:10:${seconds}`
  //console.log(timeNowRestart)
  if ((timeNow == timeRestart_1) && seconds < 5 ) {
    for( let ad of idad) {
  setTimeout(() =>
          api.sendMessage(`[ NOTI ] - bây giờ là: ${timeNow}\nBot sẽ tiến hành reset lại hệ thống!`,ad, () =>process.exit(1)), 1000);
    }
    }
}
module. exports. run = async  ({ api, event, args }) => {
      const moment = require("moment-timezone");
      var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
        api.sendMessage(`${timeNow}`, event.threadID)
}