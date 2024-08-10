const axios = require("axios");
const fs = require("fs");
module.exports.config = {
	name: "cap",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Tpk - táo",
	description: "Cap màn hình",
	commandCategory: "Người dùng",
    cooldowns: 5
}
module.exports.onLoad = async () => {
    const { existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];

    const path = resolve(__dirname, "cache", "pornlist.txt");

    if (!existsSync(path)) return await global.utils.downloadFile("https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt", path);
    else return;
}

module.exports.run = async ({ event, api, args, Currencies }) => {
  const request = require("request");
const fs = require("fs");

   const { threadID, messageID, senderID } = event;
    var cc = [
      "https://i.imgur.com/J2I4Bi0.jpeg",
      "https://i.imgur.com/H38PlsR.jpeg",
      "https://i.imgur.com/lPECpc0.jpeg",
      "https://i.imgur.com/82TcaN5.jpeg",
              ];
let image = [];
 for(let i = 0; i < 4; i++) {
    const stream = (await axios.get(cc[i], {
        responseType: "stream"
    })).data;
    image.push(stream);
};
  const ccc = {
    body: `🌐== [ CAP FACEBOOK ] ==🌐
────────────────────
1. cap wall dạng điện thoại nền trắng 
2. cap wwall dạng PC nền trắng 
3. cap wall dạng điện thoại nền đen 
4. cap wwall dạng PC nền trắng

➜ Reply tin nhắn kèm STT bạn chọn
 `,
    attachment: image
};
    if (!args[0]) {        
        return api.sendMessage(ccc, event.threadID, (error, info) => {
        
            global.client.handleReply.push({
                type: "choosee",
                name: this.config.name,
                author: event.senderID,
                messageID: info.messageID
            })
        })
    }
}
    module.exports.handleReply = async function ({
    args,
    event,
    Users,
    api,
    handleReply,
    Currencies,
    __GLOBAL
}) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const request = require("request");
  let data = (await Currencies.getData(event.senderID)).ghepTime;
 
    
    switch (handleReply.type) {
    case "choosee": {
        switch (event.body) {
        case "1": {
          const axios = require('axios');
          const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss - DD/MM/YYYY");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `Vui lòng đợi ${name} bot đang cap`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `datr=FdVvZuQ5uL5B2EieAyfKoG6P;sb=FdVvZkfNPsa5DY0vV3wU1iPy;ps_n=1;ps_l=1;vpd=v1%3B668x375x1.9240320920944214;dpr=1.9240320920944214;wl_cbv=v2%3Bclient_version%3A2571%3Btimestamp%3A1721864113;wd=375x668;c_user=100060164381723;xs=18%3ApO1OHoeDhkhTBQ%3A2%3A1721864429%3A-1%3A6277;fr=0sVDFQL5oggJriUoW.AWWlZJbGqxJeZVqqFR0OfyiCzLM.Bmb9UV..AAA.0.0.BmoZDv.AWU5ssH6DJE;i_user=61563282449587;locale=en_US;m_page_voice=61563282449587;fbl_st=101620574%3BT%3A28701111;|Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `datr=FdVvZuQ5uL5B2EieAyfKoG6P;sb=FdVvZkfNPsa5DY0vV3wU1iPy;ps_n=1;ps_l=1;vpd=v1%3B668x375x1.9240320920944214;dpr=1.9240320920944214;wl_cbv=v2%3Bclient_version%3A2571%3Btimestamp%3A1721864113;m_pixel_ratio=1.9240320920944214;wd=375x668;c_user=100060164381723;fr=0sVDFQL5oggJriUoW.AWWaujS3-AiD0rRd443Ve-Dy3dY.Bmb9UV..AAA.0.0.BmpKia.AWX9zeFjY9Q;xs=17%3AlcY52oH06SmBrw%3A2%3A1722067099%3A-1%3A6277;locale=en_GB;fbl_st=100620793%3BT%3A28701118;|Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://gaudev-api.onrender.com/sreenshort/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=4ec4c7&url=${url}&dimension=480x800`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `Cap trang cá nhân facebook dạng nền điện thoại trắng của bạn đây`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
            break;
        case "2": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss - DD/MM/YYYY");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `Vui lòng đợi ${name} bot đang cap`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `sb=56yKZp83wUWK2SfUmNRA94Se;datr=56yKZkNPQp0RJLs1BcSn7U4o;ps_n=1;ps_l=1;c_user=100005739870915;wd=1920x953;usida=eyJ2ZXIiOjEsImlkIjoiQXNoYm1xZHppa2htMyIsInRpbWUiOjE3MjIxNDkwNzd9;fr=1rB9RiEokEOzn3AAE.AWWaNVqeTU6C5YFh2TVkhYAqmLg.BmpenM..AAA.0.0.BmpenM.AWWyrc_eq18;xs=36%3Axk3NkK17Vffjag%3A2%3A1721489649%3A-1%3A6297%3A%3AAcW0X1zWf7uHmmovPnJh8hw6ZxKE7tbl6qF4VsqpGyQ;presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1722149325179%2C%22v%22%3A1%7D;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=56yKZp83wUWK2SfUmNRA94Se;datr=56yKZkNPQp0RJLs1BcSn7U4o;ps_n=1;ps_l=1;c_user=100005739870915;wd=1920x953;usida=eyJ2ZXIiOjEsImlkIjoiQXNoYm1xZHppa2htMyIsInRpbWUiOjE3MjIxNDkwNzd9;fr=1rB9RiEokEOzn3AAE.AWWaNVqeTU6C5YFh2TVkhYAqmLg.BmpenM..AAA.0.0.BmpenM.AWWyrc_eq18;xs=36%3Axk3NkK17Vffjag%3A2%3A1721489649%3A-1%3A6297%3A%3AAcW0X1zWf7uHmmovPnJh8hw6ZxKE7tbl6qF4VsqpGyQ;presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1722149325179%2C%22v%22%3A1%7D;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://gaudev-api.onrender.com/sreenshort/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=4ec4c7&url=${url}&dimension=1920x1080`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `Cap trang cá nhân facebook dạng pc nền trắng của bạn đây`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
            break;
        case "3": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss - DD/MM/YYYY");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `Vui lòng đợi ${name} bot đang cap`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `sb=56yKZp83wUWK2SfUmNRA94Se;datr=56yKZkNPQp0RJLs1BcSn7U4o;ps_n=1;ps_l=1;c_user=100005739870915;wd=1920x953;usida=eyJ2ZXIiOjEsImlkIjoiQXNoYm1xZHppa2htMyIsInRpbWUiOjE3MjIxNDkwNzd9;fr=1rB9RiEokEOzn3AAE.AWWaNVqeTU6C5YFh2TVkhYAqmLg.BmpenM..AAA.0.0.BmpenM.AWWyrc_eq18;xs=36%3Axk3NkK17Vffjag%3A2%3A1721489649%3A-1%3A6297%3A%3AAcW0X1zWf7uHmmovPnJh8hw6ZxKE7tbl6qF4VsqpGyQ;presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1722149325179%2C%22v%22%3A1%7D;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=56yKZp83wUWK2SfUmNRA94Se;datr=56yKZkNPQp0RJLs1BcSn7U4o;ps_n=1;ps_l=1;c_user=100005739870915;wd=1920x953;usida=eyJ2ZXIiOjEsImlkIjoiQXNoYm1xZHppa2htMyIsInRpbWUiOjE3MjIxNDkwNzd9;fr=1rB9RiEokEOzn3AAE.AWWaNVqeTU6C5YFh2TVkhYAqmLg.BmpenM..AAA.0.0.BmpenM.AWWyrc_eq18;xs=36%3Axk3NkK17Vffjag%3A2%3A1721489649%3A-1%3A6297%3A%3AAcW0X1zWf7uHmmovPnJh8hw6ZxKE7tbl6qF4VsqpGyQ;presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1722149325179%2C%22v%22%3A1%7D;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://gaudev-api.onrender.com/sreenshort/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `
        https://api.screenshotmachine.com/?key=4ec4c7&url=${url}&dimension=480x800`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `Cap trang cá nhân facebook dạng nền điện thoại trắng của bạn đây`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
            break;
        case "4": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss - DD/MM/YYYY");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `Vui lòng đợi ${name} bot đang cap`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `sb=56yKZp83wUWK2SfUmNRA94Se;datr=56yKZkNPQp0RJLs1BcSn7U4o;ps_n=1;ps_l=1;c_user=100005739870915;wd=1920x953;usida=eyJ2ZXIiOjEsImlkIjoiQXNoYm1xZHppa2htMyIsInRpbWUiOjE3MjIxNDkwNzd9;fr=1rB9RiEokEOzn3AAE.AWWaNVqeTU6C5YFh2TVkhYAqmLg.BmpenM..AAA.0.0.BmpenM.AWWyrc_eq18;xs=36%3Axk3NkK17Vffjag%3A2%3A1721489649%3A-1%3A6297%3A%3AAcW0X1zWf7uHmmovPnJh8hw6ZxKE7tbl6qF4VsqpGyQ;presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1722149325179%2C%22v%22%3A1%7D;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=56yKZp83wUWK2SfUmNRA94Se;datr=56yKZkNPQp0RJLs1BcSn7U4o;ps_n=1;ps_l=1;c_user=100005739870915;wd=1920x953;usida=eyJ2ZXIiOjEsImlkIjoiQXNoYm1xZHppa2htMyIsInRpbWUiOjE3MjIxNDkwNzd9;fr=1rB9RiEokEOzn3AAE.AWWaNVqeTU6C5YFh2TVkhYAqmLg.BmpenM..AAA.0.0.BmpenM.AWWyrc_eq18;xs=36%3Axk3NkK17Vffjag%3A2%3A1721489649%3A-1%3A6297%3A%3AAcW0X1zWf7uHmmovPnJh8hw6ZxKE7tbl6qF4VsqpGyQ;presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1722149325179%2C%22v%22%3A1%7D;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://gaudev-api.onrender.com/sreenshort/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `
        https://api.screenshotmachine.com/?key=4ec4c7&url=${url}&dimension=1920x1080`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `Cap trang cá nhân facebook dạng pc nền đen của bạn đây`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
          }
            break;
					default:
           const choose = parseInt(event.body);
            	if (isNaN(event.body)) return api.sendMessage("n", event.threadID, event.messageID);
            	if (choose > 2 || choose < 1) return api.sendMessage("u", event.threadID, event.messageID); 
    }
    }
}
      }