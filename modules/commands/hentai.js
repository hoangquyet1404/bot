const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "hent",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Dũngkon",
    description: "",
    commandCategory: "tiện ích",
    usages: "search",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs": ""
    }
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, senderID } = event;
    const out = (msg) => api.sendMessage(msg, threadID);

    if (args.length === 0) return out("Thiếu dữ liệu. Vui lòng nhập từ khóa tìm kiếm.");

    const search = args.join(" ");
    const searchResults = [];

    try {
        const res = await axios.get(`https://joshweb.click/api/nhntais?q=${encodeURIComponent(search)}`);
        const data = res.data.result;

        if (!data || data.length === 0) {
            return out("Không tìm thấy kết quả nào.");
        }

        data.slice(0, 10).forEach((item, index) => {
            searchResults.push(`ID: ${index + 1}\n📝 Tiêu đề: ${item.title}\n⊱ ⋅ ────────── ⋅ ⊰`);
        });

        api.sendMessage({
            body: "[TÌM KIẾM TRÊN NHENTAI]\n" + searchResults.join("\n\n") + "\n\n» Hãy reply (phản hồi) chọn một trong những tìm kiếm trên.",
        }, threadID, (error, info) => {
            if (error) return console.error(error);
            global.client.handleReply.push({
                name: exports.config.name,
                author: senderID,
                messageID: info.messageID,
                result: data
            });
        });
    } catch (error) {
        console.error("Đã xảy ra lỗi:", error.message);
        out("Đã xảy ra lỗi khi tìm kiếm.");
    }
};

module.exports.handleReply = async function ({ event, api, handleReply }) {
    const { threadID, messageID, body, senderID } = event;
    const out = (msg) => api.sendMessage(msg, threadID, messageID);

    if (senderID !== handleReply.author) {
        return out("Bạn không phải người dùng lệnh.");
    }

    const choice = parseInt(body.trim());
    if (isNaN(choice)) return out("⚠️ Vui lòng nhập một con số.");
    if (choice < 1 || choice > handleReply.result.length) return out("❎ Lựa chọn không nằm trong danh sách.");

    const chosenItem = handleReply.result[choice - 1];

    api.sendMessage("LOADING...!", threadID, (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 10000));

    try {
        const res = await axios.get(`https://joshweb.click/api/nhntaidl?q=${encodeURIComponent(chosenItem.link)}`);
        console.log(res);
        const { images, categories } = res.data.result;

        if (!images || images.length === 0) {
            return out("Không tìm thấy URL ảnh.");
        }

        const numImages = parseInt(categories) || images.length;
        const attachments = await Promise.all(images.slice(0, numImages).map(async (url, index) => {
            if (!url) return null; // Bỏ qua URL ảnh rỗng
            const imagePath = path.join(__dirname, `cache/image_${index}.jpg`);
            const imageRes = await axios.get(url, { responseType: "arraybuffer" });
            fs.writeFileSync(imagePath, Buffer.from(imageRes.data));
            return { path: imagePath, stream: fs.createReadStream(imagePath) };
        })).then(results => results.filter(file => file)); // Loại bỏ các file rỗng

        if (attachments.length === 0) {
            return out("Không có ảnh hợp lệ để tải.");
        }

        api.sendMessage({
            body: "TRUYỆN HENTAI",
            attachment: attachments.map(att => att.stream)
        }, threadID, (error) => {
            if (error) console.error(error);
            // Xóa các tệp ảnh sau khi gửi
            attachments.forEach(file => {
                fs.unlinkSync(file.path);
            });
        }, messageID);
    } catch (error) {
        console.error("Error:", error.message);
        out("Đã xảy ra lỗi khi tải ảnh. " + error);
    }
};
