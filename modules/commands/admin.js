var request = require("request");const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
module.exports.config = {
	name: "admin",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "Mirai Team",//Mod by H.Thanh
	description: "Tùy chỉnh các chế độ cho các ADMIN",
	commandCategory: "Admin",
	usages: "< add/remove | Super Admin & Admin > | < list/only/ibrieng >",
    cooldowns: 2,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": `===== 𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧 =====\n━━━━━━━━━━━━━━━━━━\n%1\n\n===== 𝗦𝗨𝗣𝗣𝗢𝗥𝗧𝗘𝗥 =====\n\n%2`,
        "notHavePermssion": '[ 𝗠𝗢𝗗𝗘 ] → Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": '[ 𝗠𝗢𝗗𝗘 ] → Đã thêm thành công %1 người dùng trở thành ADMIN BOT\n\n%2',
      "addedNewNDH": '[ 𝗠𝗢𝗗𝗘 ] → Đã thêm thành công %1 người dùng trở thành Người Hỗ Trợ\n\n%2',
        "removedAdmin": '[ 𝗠𝗢𝗗𝗘 ] → Đã gỡ thành công vai trò ADMIN BOT %1 người dùng trở lại làm thành viên\n\n%2',
      "removedNDH": '[ 𝗠𝗢𝗗𝗘 ] → Đã gỡ thành công vai trò Người Hỗ Trợ %1 người dùng trở lại làm thành viên\n\n%2'

    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermssion": '[Admin] You have no permission to use "%1"',
        "addedNewAdmin": '[Admin] Added %1 Admin :\n\n%2',
        "removedAdmin": '[Admin] Remove %1 Admin:\n\n%2'
    }
}
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {  
    const content = args.slice(1, args.length);
    if (args.length == 0) return api.sendMessage(`=== 𝗔𝗗𝗠𝗜𝗡 𝗖𝗢𝗡𝗙𝗜𝗚 ===\n━━━━━━━━━━━━━━━━━━\n𝗠𝗢𝗗𝗘 - admin add → Thêm người dùng làm Admin\n\n𝗠𝗢𝗗𝗘 - admin remove → Gỡ vai trò admin\n\n𝗠𝗢𝗗𝗘 - admin addndh → Thêm người dùng làm Người Hỗ Trợ\n\n𝗠𝗢𝗗𝗘 - admin removendh → Gỡ vai trò Người hỗ trợ\n\n𝗠𝗢𝗗𝗘 - admin list → Xem danh sách admin và người hỗ trợ\n\n𝗠𝗢𝗗𝗘 - admin qtvonly → Bật tắt chế độ quản trị viên\n\n𝗠𝗢𝗗𝗘 - admin ndhonly → Bật tắt chế độ người hỗ trợ\n\n𝗠𝗢𝗗𝗘 - admin only → Bật tắt chế độ vô cực cho 1 nhóm\n\n𝗠𝗢𝗗𝗘 - admin alladonly → Bật Tắt chế độ vô cực allbox\n\n𝗠𝗢𝗗𝗘 - admin ibrieng → Bật tắt chế độ cấm người dùng nhắn tin với bot\n━━━━━━━━━━━━━━━━━━\n𝗛𝗗𝗦𝗗 → ${global.config.PREFIX}admin lệnh cần dùng `, event.threadID, event.messageID); 
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { NDH } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);

    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    switch (args[0]) {
        case "list":
        case "all":
        case "-a": { 
          listAdmin = ADMINBOT || config.ADMINBOT ||  [];
            var msg = [];
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  const name = (await Users.getData(idAdmin)).name
                    msg.push(`→ Tên: ${name}\n→ Liên hệ: https://www.facebook.com/profile.php?id=${idAdmin}`);
                }
            }
          listNDH = NDH || config.NDH ||  [];
            var msg1 = [];
            for (const idNDH of listNDH) {
                if (parseInt(idNDH)) {
                  const name1 = (await Users.getData(idNDH)).name
                    msg1.push(`→ Tên: ${name1}\n→ Liên hệ: https://www.facebook.com/profile.php?id=${idNDH}`);
                }
            }

            return api.sendMessage(getText("listAdmin", msg.join("\n\n"), msg1.join("\n\n")), threadID, messageID);
        }

       
        case "add": { 
            if (event.senderID != 100009801367183) return api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Cần quyền Admin để thực hiện lệnh`, event.threadID, event.messageID)
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `ADMIN BOT - ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
        case "addndh": { 
          if (event.senderID != 100009801367183) return api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Cần quyền ADMIN để thực hiện lệnh`, event.threadID, event.messageID)
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "addndh"), threadID, messageID);
          if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];
                for (const id of mention) {
                    NDH.push(id);
                    config.NDH.push(id);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewNDH", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                NDH.push(content[0]);
                config.NDH.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewNDH", 1, `Người Hỗ trợ  - ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
                  }
                case "removeAdmin":
        case "rm":
        case "delete": {
            if (event.senderID != 100009801367183) return api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Cần quyền ADMIN để thực hiện lệnh`, event.threadID, event.messageID)
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "removeAdmin"), threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `${content[0]} - ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
            }

        case "removendh":{
          if (event.senderID != 100009801367183) return api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Cần quyền ADMIN để thực hiện lệnh`, event.threadID, event.messageID)
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "removendh"), threadID, messageID);
                    if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.NDH.findIndex(item => item == id);
                    NDH.splice(index, 1);
                    config.NDH.splice(index, 1);
                    listAdd.push(`${id} -${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedNDH", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.NDH.findIndex(item => item.toString() == content[0]);
                NDH.splice(index, 1);
                config.NDH.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedNDH", 1, `${content[0]} - ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
  }
        case 'qtvonly': {
       const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;   
          if (permssion < 1) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Cần quyền Quản trị viên trở lên để thực hiện lệnh", threadID, messageID);
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Tắt thành công chế độ Quản trị viên cho nhóm này, tất cả thành viên có thể sử dụng Bot", threadID, messageID);
        } else {
            adminbox[threadID] = true;
            api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Kích hoạt thành công chế độ Quản trị viên cho nhóm này, chỉ Quản trị viên nhóm có thể sử dụng Bot", threadID, messageID);
    }
        writeFileSync(pathData, JSON.stringify(database, null, 4));
        break;
    }
   case 'alladmonly':
        case '-aadm': {
            //---> CODE ADMIN ONLY<---//
   if (permssion != 3) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Cần quyền ADMIN để thực hiện lệnh", threadID, messageID);       
            if (config.alladmOnly == false) {
                config.alladmOnly = true;
                api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Kích hoạt thành công chế độ ADMIN cho tất cả các nhóm, chỉ ADMIN được sử dụng Bot`, threadID, messageID);
            } else {
                config.alladmOnly = false;
                api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Tắt thành công chế độ ADMIN cho tất cả các nhóm, tất cả thành viên có thể sử dụng Bot`, threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
              }
        case 'ndhonly': {
        if (permssion < 2) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Cần quyền ADMIN trở lên để thực hiện lệnh", threadID, messageID);
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { admonly } = database;
     if (admonly[threadID] == true) {
            admonly[threadID] = false;
                api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Tắt chế độ Người Hỗ Trợ thành công cho nhóm này, tất cả thành viên có thể sử dụng Bot`, threadID, messageID);
           } else {
            admonly[threadID] = true;
                api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Kích hoạt chế độ Người Hỗ Trợ thành công cho nhóm này, chỉ Người Hỗ Trợ được sử dụng Bot`, threadID, messageID);
            }
                writeFileSync(pathData, JSON.stringify(database, null, 4));
        break;
        }
        case 'allonly':
        case '-ao': {
            //---> CODE ADMIN ONLY<---//
          if (permssion != 3) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Cần quyền ADMIN để thực hiện lệnh", threadID, messageID);
            if (config.allspadmOnly == false) {
                config.allspadmOnly = true;
                api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Kích hoạt chế độ vô cực thành công cho tất cả các nhóm, chỉ ADMIN được sử dụng Bot`, threadID, messageID);
            } else {
                config.allspadmOnly = false;
                api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Tắt chế độ vô cực thành công cho tất cả các nhóm, tất cả thành viên có thể sử dụng Bot`, threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
              }
        case 'only': {
         if (permssion != 3) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Cần quyền ADMIN để thực hiện lệnh", threadID, messageID);
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { spadmonly } = database;
     if (spadmonly[threadID] == true) {
            spadmonly[threadID] = false;
                api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Tắt chế độ vô cực thành công cho nhóm này, tất cả thành viên có thể sử dụng Bot`, threadID, messageID);
           } else {
            spadmonly[threadID] = true;
                api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Kích hoạt chế độ vô cực thành công cho nhóm này, chỉ ADMIN được sử dụng Bot`, threadID, messageID);
            }
                writeFileSync(pathData, JSON.stringify(database, null, 4));
        break;
      }
        case 'ibrieng':
        case '-ib': {
            //---> CODE ADMIN ONLY<---//
            if (permssion != 3) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Cần quyền ADMIN để thực hiện lệnh", threadID, messageID);
               if (config.spadmPaseOnly == false) {
                config.spadmPaseOnly = true;
                api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Kích hoạt thành công chế độ chỉ ADMIN mới chat riêng được với Bot", threadID, messageID);
            } else {
                config.spadmPaseOnly = false;
                api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Tắt thành công chế độ chỉ ADMIN mới chat riêng được với Bot", threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
              }
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}