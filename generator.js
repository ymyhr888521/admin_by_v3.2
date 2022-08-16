let generator = function* () {
	yield 1;
	yield 2;
	yield 3;
};

generator().return = function ({ done, value }) {
	console.log(done, value);
	return {
		done,
		value
	};
};
generator().next = function ({ done, value }) {
	console.log(done, value);
};

generator().throw = function (params) {
	console.log(params);
	return false;
};

generator()._proto_.test = function () {
	console.log("test");
};

generator._proto_.test = function () {
	console.log("test");
};

// console.log(generator().next());
// console.log(generator().next());
// console.log(generator().next());
// console.log(generator().next());
// console.log(generator().next());
// console.log(generator().next());
// console.log(generator().next());
// console.log(generator().return({ done: true, value: "此处return操作" }));
// console.log(generator().throw(new Error("你好啊")));
// console.log("--end--");
