const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const quiz = require("./quiz.json");

client.on('ready', () => {
	client.user.setActivity('"경남아 명령어"')
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === '경남아') {
		msg.channel.send("ㅇㅇ?");
	}

	if (msg.content === '경남아 명령어') {
		const embed = new Discord.MessageEmbed()
		.setTitle("명령어")	
		.setColor(0xFFE400)
		.setDescription("```경남아, 경남아 안녕, 경남아 놀자, 경남아 사랑해, 경남아 뒤질래?, 경남아 뒤져, 경남아 꺼져, 경남아 경남이 불러줘, 경남아 내 나이가 어때서, 경남아 명령어```")
		.addField("미니게임", "```경남아 아재개그, 경남아 도박 가입```")
		.addField("도박", "```경남아 도박(ㄷㅂ), 경남아 돈줘, 경남아 잔액```")

		msg.channel.send(embed);
	}

	if (msg.content === '경남아 안녕') {
		msg.channel.send("ㅎㅇ");
	}

	if (msg.content === '경남아 뒤져') {
		msg.channel.send("뒤는 이길 수 있어");
	}

	if (msg.content === '경남아 놀자') {
		msg.channel.send("전 아싸랑 안 놀아요");
	}

	if (msg.content === '경남아 사랑해') {
		msg.channel.send("게이");
	}

	if (msg.content === '경남아 뒤질래?') {
		msg.channel.send("나는 앞질래 깔깔");
	}

	if (msg.content === '경남아 꺼져') {
		msg.channel.send("난 킬건데 깔깔깔");
	}

	if (msg.content === '경남아 경남이 불러줘') {
		msg.channel.send("<@814385904465608704>");
	}

	if (msg.content === '?') {
		msg.channel.send("??");
	}

	if (msg.content === '경남아 아재개그') { //아재개그
		const item = quiz[Math.floor(Math.random() * quiz.length)];
		const limit = 4;

		const filter = (response) => {
			return item.answer.some((answer) => answer === response.content)
		}

		msg.channel.send(`${item.question} (제한시간 : ${limit}초)`)
		.then(() => {
			msg.channel.awaitMessages(filter, { max: 1, time: limit * 1000})
			.then((collected) => {
				msg.channel.send(`${collected.first().author} ⭕정답⭕`);
			})
			.catch((err) => {
				msg.channel.send("에휴 끝남")
			})
		})
	}

	if (msg.content === '경남아 내 나이가 어때서') { // 랜덤 나이 뽑기
		const ran = Math.floor(Math.random() * 101);
		if(ran === 0) {
			d = "태어나지도 않으셨나요?"
		}
		else if (ran === 100) {
			d = "백년인생!"
		}
		else if (ran < 14) {
			d = (`${ran}살 같으세요. 잼민이네`)

		}
		else {
			d = (`${ran}살 같으세요. 삭았넹`)
		}
		
		msg.reply(d);

	}

	if(msg.author.id === client.user.id) return;

	const id = msg.author.id;
	const name = msg.author.username;

	const filePath = `./data/${id}.json`;
	!fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;
	
	const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));

	const howMuch = 100;
	if (msg.content === "경남아 도박 가입") {
		let saveUser = {};
		if(user.id) {
			msg.reply(`너는 이미 이 게임에 가입을 했는 걸? "경남아 도박"으로 게임을 즐겨봐!`)
			saveUser = {id, name, money : user.money};
		}
		else {
			msg.reply(`이 망겜을 시작하게 되었구나. 자, 경남코인 ${howMuch}원을 지급해줄게.`);
			saveUser = {id, name, money : howMuch};
		}

		fs.writeFileSync(filePath, JSON.stringify(saveUser));
	}

	if(msg.content === "경남아 돈줘") {
		let saveUser = {};
		if(user.id) {
			if(user.money < 100) {
				msg.reply(`${howMuch}원이 지급됐어.\n${name}의 현재 잔액은 ${user.money} -> ${user.money + howMuch}이야.`);
				saveUser = {
					id, 
					name,
					money : user.money + howMuch,
				}
			}
			else {
				msg.reply(`너는 돈이 아직 너무 많아. 도박 실패하고 돌아오렴~`);
				saveUser = {id, name, money : user.money};
			}
		}
		else {
			msg.reply(`넌 아직 이 게임에 가입하지 않았어. "경남아 도박 가입"을 먼저 해줘.`);
		}
		
		fs.writeFileSync(filePath, JSON.stringify(saveUser));
	}

	const howDobak = 2;
			
	if(msg.content === "경남아 도박" || msg.content === "경남아 ㄷㅂ") {
		const list = ["도박 성공!", "도박 실패.."];
		const random = Math.floor(Math.random() * 2);
		
		const bot = list[random];
		let saveUser = {};
		
		if(user.id) {
			if(user.money >= 100) {
				if(bot === "도박 성공!") {
					msg.reply(`도박 성공! 너의 경남코인이 두 배가 되었어!`)
					saveUser = {
						id,
						name,
						money : user.money * howDobak,
					}
				}
				else if(bot === "도박 실패..") {
					msg.reply(`도박을 실패했어.. 너의 경남코인이 반으로 줄었어`)
					saveUser = {
						id,
						name,
						money : user.money / howDobak,
					}
				}
			}
			else if(user.money < 100) {
				msg.reply(`너는 도박하기에 너무 적은 경남코인을 갖고 있어. "경남아 돈줘"를 입력해서 돈을 받고 돌아와.`)
				saveUser = {id, name, money : user.money};
			}
		}
		else {
			msg.reply(`너는 이 망겜을 플레이한 기록이 없어. "경남아 도박 가입"를 입력해봐`);
		}
		fs.writeFileSync(filePath, JSON.stringify(saveUser));
	}
	

	if(msg.content === "경남아 잔액") {
		user.id ? msg.reply(`너의 현재 잔액은 ${user.money}이야.`) : msg.reply(`너는 이 망겜을 플레이한 기록이 없어. "경남아 도박 가입"를 입력해봐`);
	}


})

client.login('NjY3MTc2NjY3NzM0ODY3OTcw.Xh-6sQ.M98yuTiBv_XvRcywpCHVc4DDhDo');