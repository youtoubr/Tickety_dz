const Discord  = require('discord.js');
const client     = new Discord.Client();
const prefix   = "*";
const category = "569576665563267072";
const devs     = ["4406039166959353857"];
let ticc   = true;
let tchannels  = [];
let current    = 0;

client.login(process.env.Dream_TOKEN);

client.on('ready',async () => console.log(`   - " ${client.user.username} " , Tickety is ready to work.1`));
client.on('message',async message => {
    const emojis   = { yes: `${client.guilds.find(r => r.id === '525792863846662164').✅.find(e => e.name === 'Yes')}`, wrong: `${client.guilds.find(r => r.id === '525792863846662164').emojis.find(e => e.name === 'Wrong')}` };
    if(message.author.bot || message.channel.type === 'dm') return;
    let args = message.content.split(" ");
    let author = message.author.id;
    if(args[0].toLowerCase() === `${prefix}help`) {
            let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setThumbnail(message.author.avatarURL)
            .setColor("#36393e")
            .addField(`❯ لعمل تكت, \`${prefix}new\``, `» Syntax: \`${prefix}new [Reason]\`\n» Description: **لعمل روم فقط يظهر لك ولأدارة السيرفر.**`)
            .addField(`❯ لإيقاف الأعضاء من عمل تكتات, \`${prefix}ticc\``, `» Syntax: \`${prefix}ticc [Disable/Enable]\`\n» Description: **لجعل جميع اعضاء السيرفر غير قادرون على عمل تكت.**`)
			.addField(`❯ لأقفال جميع التكتات المفتوحة, \`${prefix}deleteall\``, `» Syntax: \`${prefix}deleteall\`\n» Description: **لمسح جميع رومات التكتات المفتوحة في السيرفر**`)
            .addField(`❯ لقفل التكت المفتوح, \`${prefix}close\``, `» Syntax: \`${prefix}close\`\n» Description: **لأقفال تكت.**\n\n Test bot`)
            await message.channel.send(`${emojis.yes}, **هذه قائمة بجميع اوامر البووت.**`);
            await message.channel.send(embed);
    } else if(args[0].toLowerCase() === `${prefix}new`) {
        if(ticc === false) return message.channel.send(`${emojis.wrong}, **تم ايقاف هذه الخاصية من قبل احد ادارة السيرفر**`);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${emojis.wrong}, **البوت لا يملك صلاحيات لصنع الروم**`);
		console.log(current);
		let openReason = "";
		current++;
    	message.guild.createChannel(`ticket-${current}`, 'text').then(c => {
		tchannels.push(c.id);
		c.setParent(category);
		message.channel.send(`${✅.yes}, **تم عمل التكت.**`);
		c.overwritePermissions(message.guild.id, {
			READ_MESSAGES: false,
			SEND_MESSAGES: false
		});
		c.overwritePermissions(message.author.id, {
			READ_MESSAGES: true,
			SEND_MESSAGES: true
		});
		
		if(args[1]) openReason = `\nسبب فتح التكت , " **${args.slice(1).join(" ")}** "`;
		let embed = new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.avatarURL)
		.setColor("#36393e")
		.setDescription(`**انتظر قليلا الى حين رد الادارة عليك**${openReason}`);
		c.send(`${message.author}`);
		c.send(embed);
	});
    } else if(args[0].toLowerCase() === `${prefix}ticc`) {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${✅.wrong}, **أنت لست من ادارة السيرفر لتنفيذ هذا الأمر.**`);
		if(args[1] && args[1].toLowerCase() === "enable") {
			ticc = true;
			message.channel.send(`${emojis.yes}, **تم تفعيل التكتات , الاَن يمكن لأعضاء السيرفر استخدام امر انشاء التكت**`);
		} else if(args[1] && args[1].toLowerCase() === "disable") {
			ticc = false;
			message.channel.send(`${✅.yes}, **تم اغلاق نظام التكتات , الاَن لا يمكن لأي عضو استخدام هذا الأمر**`);
		} else if(!args[1]) {
			if(ticc === true) {
			ticc = false;
			message.channel.send(`${✅.yes}, **تم اغلاق نظام التكتات , الاَن لا يمكن لأي عضو استخدام هذا الأمر**`);
			} else if(ticc === false) {
			ticc = true;
			message.channel.send(`${✅.yes}, **تم تفعيل التكتات , الاَن يمكن لأعضاء السيرفر استخدام امر انشاء التكت**`);
			}
		}
    } else if(args[0].toLowerCase() === `${prefix}close`) {
		if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${emojis.wrong}, **أنت لست من ادارة السيرفر لتنفيذ هذا الأمر.**`);
		if(!message.channel.name.startsWith('rgticket-') && !tchannels.includes(message.channel.id)) return message.channel.send(`${emojis.wrong}, **هذا الروم ليس من رومات التكت.**`);
		
		message.channel.send(`${emojis.yes}, **سيتم اغلاق الروم في 3 ثواني من الاَن.**`);
		tchannels.splice( tchannels.indexOf(message.channel.id), 1 );
		setTimeout(() => message.channel.delete(), 3000);
	} else if(args[0].toLowerCase() === `${prefix}restart`) {
		if(!devs.includes(message.author.id)) return message.channel.send(`${emojis.wrong}, **أنت لست من ادارة السيرفر لأستخدام هذا الأمر.**`);
		message.channel.send(`${emojis.yes}, **جارى اعادة تشغيل البوت.**`);
		client.destroy();
		client.login(process.env.Dream_TOKEN);
	} else if(args[0].toLowerCase() === `${prefix}deleteall`) {
		let iq = 0;
		for(let q = 0; q < tchannels.length; q++) {
			let c = message.guild.channels.get(tchannels[q]);
			if(c) {
				c.delete();
				tchannels.splice( tchannels[q], 1 );
				iq++;
			}
			if(q === tchannels.length - 1 || q === tchannels.lengh + 1) {
				message.channel.send(`${✅.yes}, **تم مسح \`${iq}\` من التكتات.**`);
			}
		}
	}
});
