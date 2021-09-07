var fs = require("fs");
var path = require("path");

const url = './';

const blackList = ["node_modules", ".idea", ".vscode", ".git",".github"];

function handleFullpath(fullpath, spaceNum) {
  const reg1 = /\\/g;
  const reg2 = new RegExp(url + "/", "g");
  const fileOrDir = fullpath
    .replace(reg1, "/")
    .replace(reg2, "")
    .split("/")
    .pop();
  const prefix = new Array(spaceNum).fill("│     ").join("") + "├── ";
  return prefix + fileOrDir + "\n";
}

function travel(dir, spaceNum, resultStr = "") {
  var arr = fs.readdirSync(dir);

  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i];
    if (blackList.indexOf(item) !== -1) {
      continue;
    }

    var fullpath = path.join(dir, item);
    resultStr += handleFullpath(fullpath, spaceNum);
    if (fs.statSync(fullpath).isDirectory()) {
      resultStr += travel(fullpath, spaceNum + 1);
    }
  }

  return resultStr;
}

fs.writeFileSync("result.md", travel(url, 0));
