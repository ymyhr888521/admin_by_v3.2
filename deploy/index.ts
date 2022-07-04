// const ora = require("ora") as any;
// const scpClient = require("scp2") as any;
// const chalk = require("chalk") as any;
// const spinner = ora("正在发布到" + (process.env.NODE_ENV === "production" ? "生产" : "测试") + "服务器...") as void | any;
// spinner.start();
// scpClient.scp(
// 	"demo_pro/",
// 	{
// 		host: "124.71.45.235",
// 		port: 22,
// 		username: "root",
// 		password: "wenwu1008611...",
// 		path: "usr/local/nginx/html/demo_pro"
// 	},
// 	function (err): void | boolean | Error {
// 		spinner.stop();
// 		if (err) {
// 			console.log(chalk.red("发布失败.\n"));
// 			return new Error("???");
// 		} else {
// 			console.log(
// 				chalk.green("Success! 成功发布到" + (process.env.NODE_ENV === "production" ? "生产" : "测试") + "服务器! \n")
// 			);
// 		}
// 		return true;
// 	}
// ) as void;
