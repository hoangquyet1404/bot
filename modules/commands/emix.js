const axios = require('axios');
const fs = require('fs');

module.exports.config = {
    name: "emix",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "HungCTer",
    description: "Mix 2 emoji",
    commandCategory: "Giải Trí",
    usages: "[emoji1 emoji2]",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const content = args.join(" ").split(" ").map(item => item.trim());
    let hung = content[0];
    let cter = content[1];

    if (!hung) return api.sendMessage('Thiếu emoji 1', event.threadID, event.messageID);
    if (!cter) return api.sendMessage('Thiếu emoji 2', event.threadID, event.messageID);

    let emojiPath = __dirname + '/cache/emoji.png';

    try {
        let { data } = await axios.get(`https://hoanghao.me/api/emojimix?emoji=${encodeURIComponent(hung)}&emojii=${encodeURIComponent(cter)}`);

        if (!data || !data.results || !data.results[0] || !data.results[0].url) {
            return api.sendMessage('Không tìm thấy kết quả.', event.threadID, event.messageID);
        }

        let mixed = data.results[0].url;
        if (!mixed) return api.sendMessage('Không tìm thấy kết quả.', event.threadID, event.messageID);

        let img = (await axios.get(mixed, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(emojiPath, Buffer.from(img, "utf-8"));

        return api.sendMessage({ attachment: fs.createReadStream(emojiPath) }, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage('Đã xảy ra lỗi', event.threadID, event.messageID);
    }
};