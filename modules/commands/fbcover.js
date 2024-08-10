const fs = require("fs");
const Deku = require("dekuai");
const deku = new Deku()

module.exports = {
	config: {
		name: "fbcover",
		version: "1.0",
		author: "deku",
		countDown: 1,
		role: 0,
		shortDescription: "Create fb cover",
		longDescription: "",
		category: "image",
		guide: {
			en: "{p}{n} name | last | phone | country | email | color",
		}
	},

	onStart: async function ({ message, args, event, api }){
		try {
			const path = __dirname + "/cache/fbcover.png";
			let t = args.join(" ");
			if (!t) {
				return message.reply("Wrong format\nPlease use " + this.guide.en);
			}
			const z = t.split(" | ")
			const name = z[0],
				last = z[1],
				phone = z[2],
				country = z[3],
				email = z[4],
				color = z[5],
            uid = event.senderID;
			if (!name || !last || !phone || !country || !email || !color) return message.reply('Wrong format\nPlease use ' + this.guide.en);
			const image = await deku.fbcover(name, last, phone, country, email, uid, color)
    fs.writeFileSync(path, image);
			api.sendMessage({body: `•——[ FB COVER ]——•\n\n👤Name: ${name}\n👤Last name: ${last}\n📞Phone number: ${phone}\n🌐Country: ${country}\n📧Email: ${email}\n🎨Color: ${color}\n\n•——[ FB COVER ]——•`, attachment: fs.createReadStream(path)}, event.threadID, event.messageID);
		} catch (e) {
			return message.reply(e.message);
		}
	}
};