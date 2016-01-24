#!/usr/bin/env node

var fs = require("fs"),
	path = process.cwd();
var exec = require('child_process').exec;


var run = function(obj) {

	switch (obj[0]) {
		case "-v":
			console.log('\tversion is 1.0.0|当前版本');
			break;
		case "-h":
			consoleFun();
			break;
		case "-help":
			exec('forever -h', function(error, stdout, stderr) {
				var s = stdout.replace(/\help:/g, "帮助:")
				console.log(s);
			})
			break
		case "-s":
			startclient(obj[1]);
			break;
		case "-l":
			exec('forever list', function(error, stdout, stderr) {
				console.log(stdout);
			})
			break
		case "-stopa":
			exec('forever stopall', function(error, stdout, stderr) {
				console.log(stdout);
			})
			break
		case "-stop":
			if (!obj[1]) {
				console.log("错误的操作-h 查看帮助")
			} else {
				exec('forever stop ' + obj[1], function(error, stdout, stderr) {
					console.log(stdout);
				})
			}
			break
		case "-rs":
			if (!obj[1]) {
				console.log("错误的操作-h 查看帮助")
			} else {
				exec('forever restart ' + obj[1], function(error, stdout, stderr) {
					console.log(stdout);
				})
			}
			break
		case "-rsa":
			exec('forever restartall', function(error, stdout, stderr) {
				console.log(stdout);
			})
			break
		default:
			console.log("错误操作，请-h查看帮助")
			break
	}
};
//获取除第一个命令以后的参数，使用空格拆分
run(process.argv.slice(2))
	function consoleFun() {
		console.log("\n帮助手册:以下为【forever】便捷命令与原生同时使用\n");
		console.log("\t-v\t\t：检测版本");
		console.log("\t-h\t\t：帮助");
		console.log("\t-s 文件名\t：例如：-s server.js");
		console.log("\t-l\t\t：获取启动列表");
		console.log("\t-rs PID\t\t：重启当前node服务");
		console.log("\t-rsa\t\t：重启所有服务");
		console.log("\t-stopa\t\t：终止所有进程");
		console.log("\t-stop PID\t\t：终止当前进程");
		console.log("\t-help\t\t：forever原生命令");
	}

	function startclient(js) {
		if (!js) {
			console.log("错误的操作-h 查看帮助")
		} else {
			exec('forever start ' + js, function(error, stdout, stderr) {
				console.log(error);
				console.log(stderr);
				console.log(stdout);
			})
		}
	}