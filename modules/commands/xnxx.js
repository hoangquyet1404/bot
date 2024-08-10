const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { createWriteStream } = require('fs');

module.exports.config = {
  name: "xnxx",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "HungCTer",
  description: "XEM SEX TRÊN XNXX.COM",
  commandCategory: "NSFW",
  usages: "x",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
  const query = args.join(" ");
  if (!query) return api.sendMessage("⚠️ Vui lòng nhập từ khoá tìm kiếm.", event.threadID, event.messageID);

  try {
    const response = await axios.get(`https://8d2c-101-32-128-19.ngrok-free.app/api/search/xnxxsearch?query=${encodeURIComponent(query)}`);
    const data = res.result;

    if (!data || data.length === 0) {
      return api.sendMessage("⚠️ Không tìm thấy kết quả nào.", event.threadID, event.messageID);
    }

    let message = "[ XNXX - SEARCH ]\n\n";
    data.slice(0, 6).forEach((item, index) => {
      message += `${index + 1}.📝 Tiêu Đề: ${item.title}\nℹ️ Thông Tin:${item.link}\n`;
    });

    api.sendMessage(message, event.threadID, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        data
      });
    });
  } catch (error) {
    console.error(error);
    api.sendMessage("Đã có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại sau.", event.threadID, event.messageID);
  }
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  const choice = parseInt(event.body);
  if (isNaN(choice) || choice < 1 || choice > handleReply.data.length) {
    return api.sendMessage("⚠️ Lựa chọn không hợp lệ", event.threadID, event.messageID);
  }

  const selected = handleReply.data[choice - 1];
  api.unsendMessage(handleReply.messageID);

  try {
    const response = await axios.get(`https://api.fgmods.xyz/api/downloader/xnxxdl?url=${encodeURIComponent(selected.link)}&apikey=vQTmzp7i`);
    const result = response.data.result;

    if (!result || !result.files || !result.files.high) {
      return api.sendMessage("⚠️ Không thể tải xuống file. Vui lòng thử lại sau.", event.threadID, event.messageID);
    }

    const filePath = path.resolve(__dirname, 'cache', `${Date.now()}.mp4`);
    const writer = createWriteStream(filePath);

    const fileResponse = await axios({
      url: result.files.high,
      method: 'GET',
      responseType: 'stream'
    });

    fileResponse.data.pipe(writer);

    writer.on('finish', async () => {
      const duration = parseInt(result.duration);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;

      const msg = {
        body: `[ XNXX - DOWNLOAD ]\n\n📝 Tiêu đề:${result.title}\n⏳ Thời lượng: ${minutes}:${seconds}`,
        attachment: fs.createReadStream(filePath)
      };

      await api.sendMessage(msg, event.threadID, () => {
        fs.unlinkSync(filePath);
      });
    });

    writer.on('error', (err) => {
      fs.unlinkSync(filePath);
      console.error(err);
      api.sendMessage("Đã có lỗi xảy ra khi tải file. Vui lòng thử lại sau.", event.threadID, event.messageID);
    });

  } catch (error) {
    console.error(error);
    api.sendMessage("Đã có lỗi xảy ra khi lấy thông tin chi tiết. Vui lòng thử lại sau.", event.threadID, event.messageID);
  }
};
