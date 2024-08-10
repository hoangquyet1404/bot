module.exports.config = {
    name: "ảnh",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "TpkTáo",
    description: "Xem tất cả các ảnh trên bot",
    commandCategory: "THÀNH VIÊN",
    usages: "số thứ tự",
    cooldowns: 0,
    envConfig: {
      cooldownTime: 1200000
    }
  };
  module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "anh.gif")) request("https://i.imgur.com/ZzUJ2Z1.gif").pipe(fs.createWriteStream(dirMaterial + "anh.gif"));
  }
  module.exports.run = async function ({ event, api , args, Users, Threads}){
    const fs = require("fs");
    let name1 = await Users.getNameUser(event.senderID)
    var name = ["Sexy", "Gái nga", "Ganyu", "Twitter", "LGBT", "Loli", "Blackpink", "Tát", "Wallpaper", "Trai", "Jack", "Nude", "Instagram", "Kiss", "Ngực", "Meme", "Hentai", "Gái", "Mông", "Cosplay", "Kurumi", "Liên quân", "Lucy", "Sagiri", "Chitanda", "Rem", "Anime", "Naughty", "Wibu", "Beo", "Ausand", "Shiba", "Khánh Huyền", "Ngọc Trinh", "Linh Ngọc Đàm", "Jimmy", "Lê Bống", "Sex", "Độ Mixi", "Cặp đôi", "Streamer Hanna", "Nobra", "Gái Sexy", "Gái Xinh", "Trai đẹp", "Background 4K", "Anime Hot", "Gái Japan", "Gái China", "Hololive", "Hot Twitter", "Hot Instagram", "Gái VSBG", "Ảnh Phan TrầnAnh Tâm", "Ảnh Sex 18+", "Japan", "VSBG Hot"]
    var b = name.length;
    var page = 1;
    page = parseInt(args[0]) || 1;
    page < -1 ? page = 1 : "";
    var limit = 10;
    var numPage = Math.ceil(b / limit);
    var msg = `===「 𝗟𝗶𝘀𝘁 𝗔̉𝗻𝗵 + 𝗩𝗗 」===\n━━━━━━━━━━━━━━━━━━\n`;
    var x = 1;
    for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
        if (i >= b) break;
        msg += ``;
    }
    msg += `𝟭. 𝗔̉𝗻𝗵 𝗴𝗮́𝗶 💞\n𝟮. 𝗔̉𝗻𝗵 𝗧𝗿𝗮𝗶 💓\n𝟯. 𝗰𝗼𝘀𝗽𝗹𝗮𝘆 🦄\n𝟰. 𝗖𝗼̂𝗻𝗴 𝗖𝗵𝘂́𝗮 👑\n𝟱. 𝗔̉𝗻𝗵 𝗜𝗴 🌐\n𝟲. 𝗴𝗮́𝗶 𝗻𝗴𝗮 🌹\n𝟳. 𝗴𝗮́𝗶 𝗻𝗵𝗮̣̂𝘁 💝\n𝟴. 𝗔̉𝗻𝗵 𝗺𝗲𝗺𝗲 😹\n𝟵. 𝗦𝗮́𝘂 𝗺𝘂𝗶 🌚\n𝟭𝟬. 𝗔̉𝗻𝗵 𝗺𝗼̂𝗻𝗴 🍑\n𝟭𝟭. 𝗔̉𝗻𝗵 𝗱𝘂́ 👀\n𝟭𝟮. 𝗔̉𝗻𝗵 𝗻𝘂𝗱𝗲 💫\n𝟭𝟯. 𝗰𝗼𝗻 𝗰𝘂 🙈\n𝟭𝟰. 𝗚𝗮́𝗶 𝗮́𝗼 𝗱𝗮̀𝗶 🌸\n𝟭𝟱. 𝗛𝗼̣𝗰 𝘀𝗶𝗻𝗵 👩‍🏫\n💞 ==== 𝗔̉𝗻𝗵 𝗔𝗻𝗶𝗺𝗲 ==== 💞\n𝟭𝟲. Đ𝘂̛́𝗮 𝗖𝗼𝗻 𝗰𝘂̉𝗮 𝗧𝗵𝗼̛̀𝗶 𝗧𝗶𝗲̂́𝘁 🌷\n𝟭𝟳. 𝗖𝗵𝗶𝘁𝗮𝗻𝗱𝗮 🧸\n𝟭𝟴. 𝗔̉𝗻𝗵 𝗡𝗶𝗻𝗼 🎶\n𝟭𝟵. 𝗔̉𝗻𝗵 𝗶𝘁𝘀𝘂𝗸𝗶 🍁\n𝟮𝟬. 𝗔̉𝗻𝗵 𝗹𝗼𝗹𝗶 🎼\n𝟮𝟭. 𝗔̉𝗻𝗵 𝗸𝗮𝗻𝗮 💐\n𝟮𝟮. 𝘁𝗮𝗸𝘁𝗼𝗽𝗱𝗲𝘀𝘁𝗶𝗻𝘆 🎀\n𝟮𝟯. 𝗔̉𝗻𝗵 𝗮𝗻𝘆𝗮 💌\n𝟮𝟰. 𝗔̉𝗻𝗵 𝗺𝗶𝗿𝗮𝗶 🛸\n𝟮𝟱. 𝗔̉𝗻𝗵 𝘃𝗶𝗼𝗹𝗲𝘁 🌟\n𝟮𝟲. 𝗔̉𝗻𝗵 𝗴𝘂𝗿𝗮 🍄\n𝟮𝟳. 𝗔̉𝗻𝗵 𝗿𝗲𝗺 ⚜️\n𝟮𝟴. 𝗔̉𝗻𝗵 𝗬𝘂𝘂 𝗹𝘇𝘂𝗺𝗶 🧩\n𝟮𝟵. 𝗠𝗶𝗰𝗰𝗵𝗼𝗻 𝘀𝗵𝗶𝗸𝗶𝗺𝗼𝗿𝗶 😽\n𝟯𝟬. 𝗔̉𝗻𝗵 𝗣𝗵𝗼𝗻𝗴 𝗰𝗮̉𝗻𝗵 🎢\n🎼 ==== 𝗩𝗶𝗱𝗲𝗼 ==== 🎼\n𝟯𝟭. 𝗩𝗶𝗱𝗲𝗼 𝗚𝗮́𝗶 📺\n𝟯𝟮. 𝗩𝗶𝗱𝗲𝗼 𝗧𝗿𝗮𝗶 📷\n𝟯𝟯. 𝗩𝗶𝗱𝗲𝗼 𝘀𝗲𝘅 🤤\n𝟯𝟰. 𝗠𝘂𝘀𝗶𝗰 𝗰𝗵𝗶𝗹\n𝟯𝟱. 𝗩𝗶𝗱𝗲𝗼 𝗮𝗻𝗶𝗺𝗲 🌺\n𝟯𝟲. 𝘃𝗶𝗱𝗲𝗼 𝗯𝗮̂̀𝘂 𝘁𝗿𝗼̛̀𝗶 🌄\n𝟯𝟳. 𝗻𝘂̛̃ 𝗮́𝗼 𝗱𝗮̀𝗶 💗\n𝟯𝟴. 𝗩𝗶𝗱𝗲𝗼 𝗱𝗼𝗿𝗮𝗲𝗺𝗼𝗻 🎞️\n𝟯𝟵. 𝗔𝘂𝗱𝗶𝗼 𝗠𝗽𝟯 💙\n━━━━━━━━━━━━━━━━━━\n${name1} 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝗵𝗲𝗼 𝘀𝗼̂́ 𝘁𝗵𝘂̛́ 𝘁𝘂̛̣ 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 đ𝗲̂̉ 𝗰𝗵𝗼̣𝗻 𝗻𝗵𝗮 💜`;
    return api.sendMessage({body: msg, attachment: fs.createReadStream(__dirname + `/noprefix/anh.gif`)}, event.threadID, (error, info) =>
    {
      global.client.handleReply.push(
      {
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        type: "choose"
      });
    }, event.messageID);
  }
  module.exports.handleReply = async function ({ event, api , args, handleReply, Users}){
    const axios = require("axios");
    
            if(event.body == "1"){
         var url = "https://apipreium.onrender.com/images/girl"
}
         else if(event.body == "2"){
         var url = "https://apipreium.onrender.com/images/trai"
}
         else if(event.body == "3"){
         var url = "https://apipreium.onrender.com/images/cosplay"
}
          else if(event.body == "4"){
          var url = "https://apipreium.onrender.com/images/ig"
}
          else if(event.body == "5"){
          var url = "https://apipreium.onrender.com/images/nude"
}
         else if(event.body == "6"){
          var url = "https://apipreium.onrender.com/images/girlsexy"
}
         else if(event.body == "7"){
          var url = "https://apipreium.onrender.com/images/tw"
}
         else if(event.body == "8"){
          var url = "https://apipreium.onrender.com/images/meme"
}
         else if(event.body == "9"){
         var url = "https://apipreium.onrender.com/images/saumui"
}
         else if(event.body == "10"){
         var url = "https://apipreium.onrender.com/images/mong"
}
         else if(event.body == "11"){
         var url = "https://apipreium.onrender.com/images/du"
}
        else if(event.body == "12"){
          var  url = "https://apipreium.onrender.com/images/nude"
}
         else if(event.body == "13"){
          var  url = "http://shophdq.click/images/cu"
}
         else if(event.body == "14"){
         var url = "https://apipreium.onrender.com/images/gentle"
}
         else if(event.body == "15"){
         var url = "https://apipreium.onrender.com/image/naughty"
}
         else if(event.body == "16"){
         var url = "https://apipreium.onrender.com/images/anime"
}
         else if(event.body == "17"){
         var url = "https://apipreium.onrender.com/image/chitanda"
}
         else if(event.body == "18"){
          var url = "https://apipreium.onrender.com/image/nino"
}
         else if(event.body == "19"){
           var url = "https://apipreium.onrender.com/image/itsuki"
}
         else if(event.body == "20"){
          var url = "https://apipreium.onrender.com/images/lucy"
}
         else if(event.body == "21"){
           var url = "https://apipreium.onrender.com/image/kana"
}
         else if(event.body == "22"){
          var url = "https://apipreium.onrender.com/image/taktopdestiny"
}
        else if(event.body == "23"){
          var url = "https://apipreium.onrender.com/image/anya"
}
       else if(event.body == "24"){
          var url = "https://apipreium.onrender.com/image/mirai"
}
       else if(event.body == "25"){
          var url = "https://apipreium.onrender.com/image/violet"
}
       else if(event.body == "26"){
          var url = "https://apipreium.onrender.com/image/gura"
}
       else if(event.body == "27"){
          var url = "https://Api-TaoTPk.last-namename.repl.co/image/rem"
}
       else if(event.body == "28"){
           var url = "https://apipreium.onrender.com/image/yuulzumi"
}
       else if(event.body == "29"){
         var  url = "https://apipreium.onrender.com/image/micchonshikimori"
}
       else if(event.body == "30"){
           var url = "https://hoanghao.me/api/images/phongcanh "
           }
           else if(event.body == "31"){
           var url = "https://apipreium.onrender.com/video/videogaixinh"
 }
           else if(event.body == "32"){
           var url = "https://apipreium.onrender.com/image/vdtrai"
 }
           else if(event.body == "33"){
           var url = "https://apipreium.onrender.com/image/vdsex"
            }
           else if(event.body == "34"){
           var url = "https://apipreium.onrender.com/image/vdmschil"
}
else if(event.body == "35"){
           var url = "https://hoanghao.me/api/images/vdanime"
}
else if(event.body == "36"){
           var url = "https://hoanghao.me/api/images/videochill"
}
else if(event.body == "37"){
           var url = "https://apipreium.onrender.com/image/vdnuaodai"
}
    else if(event.body == "38"){
           var url = "https://hoanghao.me/api/images/vddoraemon"
  }
    else if(event.body == "39"){
           var url = "https://apipreium.onrender.com/image/t"
  }

    switch(handleReply.type){
    case "choose":{
      //
      let { author, answer, messageID } = handleReply;
    if (event.senderID != author) return api.sendMessage("→ 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗺𝗼̛́𝗶 𝗹𝗮̂́𝘆 đ𝘂̛𝗼̛̣𝗰 𝗻𝗵𝗮 :))", event.threadID, event.messageID);
      //phần này để cho bot ngăn thằng khác chọn dùm
    api.unsendMessage(handleReply.messageID);
    const res = await axios.get(url);
    const fs = require ("fs");
    let name = await Users.getNameUser(event.senderID)
    const data = res.data.url;
    const download = (await axios.get(data, {
        responseType: "stream"
    })).data;
    return api.sendMessage({body: `→ 𝗖𝘂̉𝗮 𝗯𝗮̣𝗻 𝗰𝗵𝗼̣𝗻 𝗻𝗲̀ ( ${name} )`, attachment : download}, event.threadID)
}
    }
    }