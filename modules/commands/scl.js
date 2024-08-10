const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const moment = require('moment-timezone');

async function scl_download(url) {
  const res = await axios.get('https://soundcloudmp3.org/id');
  const $ = cheerio.load(res.data);
  const _token = $('form#conversionForm > input[type=hidden]').attr('value');

  const conver = await axios.post('https://soundcloudmp3.org/converter',
    new URLSearchParams(Object.entries({ _token, url })),
    {
      headers: {
        cookie: res.headers['set-cookie'],
        accept: 'UTF-8',
      },
    }
  );

  const $$ = cheerio.load(conver.data);
  const datadl = {
    thumb: $$('div.info.clearfix > img').attr('src'),
    title: $$('div.info.clearfix > p:nth-child(2)').text().replace('Title:', '').trim(),
    duration: $$('div.info.clearfix > p:nth-child(3)').text().replace(/Length:|Minutes/gi, '').trim(),
    quality: $$('div.info.clearfix > p:nth-child(4)').text().replace('Quality:', '').trim(),
    url: $$('a#download-btn').attr('href'),
  };

  return datadl;
}

module.exports.config = {
  name: 'scl',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'DongDev',
  description: 'Tìm kiếm nhạc trên SoundCloud',
  commandCategory: 'Music',
  usages: '[]',
  cooldowns: 5,
  images: [],
};

module.exports.run = async function ({ api, event, args }) {
  const query = args.join(" ").trim();
  const { threadID, messageID } = event;
  const linkURL = `https://soundcloud.com`;
  const headers = {
    Accept: "application/json",
    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36",
  };

  if (!query) {
    api.sendMessage("⚠️ Vui lòng nhập từ khóa tìm kiếm", threadID, messageID);
    return;
  }

  try {
    const response = await axios.get(`https://m.soundcloud.com/search?q=${encodeURIComponent(query)}`, {
      headers
    });
    const htmlContent = response.data;

    const $ = cheerio.load(htmlContent);
    const dataaa = [];

    $("div > ul > li > div").each(function (index, element) {
      if (index < 10) {
        const title = $(element).find("a").attr("aria-label")?.trim() || "";
        const url = linkURL + ($(element).find("a").attr("href") || "").trim();
        const thumb = $(element).find("a > div > div > div > picture > img").attr("src")?.trim() || "";
        const artist = $(element).find("a > div > div > div").eq(1).text()?.trim() || "";
        const views = $(element).find("a > div > div > div > div > div").eq(0).text()?.trim() || "";
        const timestamp = $(element).find("a > div > div > div > div > div").eq(1).text()?.trim() || "";
        const release = $(element).find("a > div > div > div > div > div").eq(2).text()?.trim() || "";

        dataaa.push({
          title,
          url,
          thumb,
          artist,
          views,
          release,
          timestamp,
        });
      }
    });

    if (dataaa.length === 0) {
      api.sendMessage(`❎ Không tìm thấy kết quả cho từ khóa "${query}"`, threadID, messageID);
      return;
    }

    const messages = dataaa.map((item, index) => {
      return `┣➤${index + 1}『 👤 』➠ 𝘼𝙪𝙩𝙝𝙤𝙧: ${item.artist}\n┣➤『 🎬 』➠ 𝙏𝙞𝙩𝙡𝙚: ${item.title}\n┣➤『 ⏱ 』➠ 𝙏𝙞𝙢𝙚: ${item.timestamp} giây\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`;
    });

    const listMessage = `               》『 𝙎𝙚𝙖𝙧𝙘𝙝 𝙇𝙞𝙨𝙩 : ${query} 』《\n\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n${messages.join("\n")}\n               》『 𝙍𝙚𝙥𝙡𝙮 𝙎𝙩𝙩 』《`;

    api.sendMessage(listMessage, event.threadID, (error, info) => {
      global.client.handleReply.push({
        type: "choosee",
        name: this.config.name,
        author: info.senderID,
        messageID: info.messageID,
        dataaa: dataaa,
      });
    });
  } catch (error) {
    console.error("❎ Lỗi trong quá trình tìm kiếm:", error);
    api.sendMessage(`❎ Đã xảy ra lỗi trong quá trình tìm kiếm`, threadID, messageID);
  }
};

module.exports.handleReply = async function ({ event, api, handleReply, args }) {
  const { threadID: tid, messageID: mid, body } = event;

  switch (handleReply.type) {
    case 'choosee':
      const choose = parseInt(body);
      api.unsendMessage(handleReply.messageID);

      if (isNaN(choose)) {
        return api.sendMessage('⚠️ Vui lòng nhập 1 con số', tid, mid);
      }

      if (choose > 10 || choose < 1) {
        return api.sendMessage('❎ Lựa chọn không nằm trong danh sách', tid, mid);
      }

      const chosenItem = handleReply.dataaa[choose - 1];
      const urlaudio = chosenItem.url;
      const dataPromise = await scl_download(urlaudio);
setTimeout(async () => {
        const bit = dataPromise.quality;
        const audioURL = dataPromise.url;
        const stream = (await axios.get(audioURL, { responseType: 'arraybuffer' })).data;
        const path = __dirname + `/cache/${Date.now()}.mp3`;

        fs.writeFileSync(path, Buffer.from(stream, 'binary'));

        api.sendMessage({
          body: `           》『 𝙎𝙊𝙐𝙉𝘿𝘾𝙇𝙊𝙐𝘿 - 𝙈𝙋𝟯 』《\n━━━━━━━━━━━━━━━━\n┣➤『 👤 』➠ 𝘼𝙪𝙩𝙝𝙤𝙧: ${chosenItem.artist}\n┣➤『 🎬 』➠ 𝙏𝙞𝙩𝙡𝙚: ${chosenItem.title}\n┣➤『 ⏱ 』➠ 𝙏𝙞𝙢𝙚: ${chosenItem.timestamp} giây\n┣➤『 🎧 』➠ 𝙋𝙡𝙖𝙮𝙨: ${chosenItem.views}\n┣➤『 🗓️ 』➠ 𝙏𝙞𝙢𝙚 𝙐𝙥: ${chosenItem.release}\n┣➤『 📶 』➠ 𝘽𝙞𝙩 𝙍𝙖𝙩𝙚: ${bit}\n 》『 ⏰ 』➠ 𝙏𝙞𝙢𝙚: ${moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss")}《 `,
          attachment: fs.createReadStream(path)
        }, tid, () => {
          setTimeout(() => {
            fs.unlinkSync(path);
          }, 2 * 60 * 1000);
        });
      }, 5000);
      break;
    default:
  }
};