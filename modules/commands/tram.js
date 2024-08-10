const request = require('request');
const fs = require('fs');
const axios = require('axios');

module.exports.config = {
    name: "trâm",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "nnl",
    description: "Random cos",
    commandCategory: "nsfw",
    usages:"cos",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async ({ api, event }) => {
    const threadID = event.threadID;

    const imageUrl = require('./../../hoang/data/trâm.json');

    const imageUrls = Object.values(imageUrl);

    const randomImageUrls = [];
    while (randomImageUrls.length < 6) {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        if (!randomImageUrls.includes(imageUrls[randomIndex])) {
            randomImageUrls.push(imageUrls[randomIndex]);
        }
    }

    const attachments = [];
    for (const url of randomImageUrls) {
        const response = await axios({
            url,
            method: "GET",
            responseType: "stream"
        });
        attachments.push(response.data);
    }

    api.sendMessage({
        body: `→ 𝑨̉𝒏𝒉 𝒄𝒖̉𝒂 𝑻𝒓𝒂̂𝒎 𝒄𝒖𝒕𝒊𝒊 𝒏𝒆̀ 𝒉𝒊𝒉𝒊 💞`,
        attachment: attachments
    }, threadID);
};

