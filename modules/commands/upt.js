module.exports.config = {
  name: "upt",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Quyết Hoàng", //thay cái củ l
  description: "Tiện Ích",
  commandCategory: "xem upt thôi",
  usages: "xem thời gian bot onl",
    cooldowns: 5
};

module.exports.run = async ({ api, event, Users, Threads, args }) => {
const ping = Date.now(); 
async function getDependencyCount() {
            try {
                const packageJsonString = await fs.readFile('package.json', 'utf8');
                const packageJson = JSON.parse(packageJsonString);
                const depCount = Object.keys(packageJson.dependencies).length;
                return depCount;
            } catch (error) {
                console.error('❎ Không thể đọc file package.json:', error);
                return -1;
            }
        }

        function getStatusByPing(pingReal) {
            if (pingReal < 10) {
                return 'Rất Mượt';
            } else if (pingReal< 100) {
                return 'Mượt';
            } else if (pingReal > 100) {
                return 'Delay';
            }
        }

        function getPrimaryIP() {
            const interfaces = os.networkInterfaces();
            for (let iface of Object.values(interfaces)) {
                for (let alias of iface) {
                    if (alias.family === 'IPv4' && !alias.internal) {
                        return alias.address;
                    }
                }
            }
            return '127.0.0.1';
        }

const botStatus = getStatusByPing(ping);
const dependencyCount = await getDependencyCount();
const moment = require("moment-timezone"); 
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var thu =
moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢'
  if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚'
  if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝐓𝐮̛'
  if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦'
  if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮'
  if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲'
  if (!event.body) return;
  var { threadID, messageID } = event;
  const threadname = global.data.threadInfo.get(event.threadID).threadName || ((await Threads.getData(event.threadID)).threadInfo).threadName;
  {
    //getPrefix
    const threadSetting = (await Threads.getData(String(threadID))).data || {};
    const prefix = (threadSetting.hasOwnProperty("Upt")) ? threadSetting.PREFIX : global.config.PREFIX;    
let namee = await Users.getNameUser(event.senderID);
   const pingReal = Date.now() - ping
    const time = process.uptime(),
          hours = Math.floor(time / (60 * 60)),
          minutes = Math.floor((time % (60 * 60)) / 60),
          seconds = Math.floor(time % 60);                   
  const admins = global.config.ADMINBOT;
    const namebot = config.BOTNAME;
    const { commands } = global.client;
  var i = 1;
  var msg = [];
  var msg = []
    for(var a of admins) {
    if (parseInt(a)) {
    var name = await Users.getNameUser(a);
      msg.push(`${i++}. ${name}`);
    }
    }
    api.sendMessage({body:`====「 𝗨𝗣𝗧𝗜𝗠𝗘 𝗥𝗢𝗕𝗢𝗧 」 ====\n▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n⏰𝗧𝗶𝗺𝗲: ${gio}\n🗓𝐓𝐡𝐮̛́: ${thu}\n🤖𝗧𝗲̂𝗻 𝗕𝗼𝘁: ${global.config.BOTNAME}\n📝 𝗗𝗮̂́𝘂 𝗟𝗲̣̂𝗻𝗵 𝗠𝗮̣̆𝗰 Đ𝗶̣𝗻𝗵: ${global.config.PREFIX}\n🌸𝗕𝗼𝘅: ${threadname}\n📇𝗨𝗜𝗗 𝗯𝗼𝘅: ${event.threadID}\n📋𝗧𝗼̂̉𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: ${global.data.allUserID.length}\n📣𝗧𝗼̂̉𝗻𝗴 𝗡𝗵𝗼́𝗺: ${global.data.allThreadID.length}\n📜𝗧𝗼̂̉𝗻𝗴 𝗟𝗲̣̂𝗻𝗵: ${commands.size}\n📡𝗣𝗶𝗻𝗴: ${pingReal} ms\n🔣 𝗧𝗶̀𝗻𝗵 𝗧𝗿𝗮̣𝗻𝗴 𝗕𝗼𝘁: ${botStatus}\n💾𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${global.config.version}\n👤 𝗬𝗲̂𝘂 𝗖𝗮̂̀𝘂 𝗕𝗼̛̉𝗶: ${namee}\n——————————————————\n  𝐁𝐨𝐭 𝐡𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐝𝐚̃ 𝐡𝐨𝐚̣𝐭 𝐝𝐨̣̂𝐧𝐠 𝐝𝐮̛𝐨̛̣𝐜\n  ▱▱${hours} 𝐆𝐢𝐨̛̀ ${minutes} 𝐏𝐡𝐮́𝐭 ${seconds} 𝐆𝐢𝐚̂𝐲▱▱`},event.threadID, event.messageID);
  }
};
