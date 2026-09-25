#!/usr/bin/env node
// check-js.js —— 批量检查一批网址能不能访问
// 用法:node scripts/check-js.js [文件路径]
//      不给参数时，默认读当前目录下的 sites.txt

const fs = require("node:fs");

// ========== 1. 决定读哪个文件 ==========
// process.argv 是"命令行参数数组"：
//   [0] 是 node 程序自己，[1] 是这个脚本的路径，[2] 才是你传的第一个参数。
// "?? 默认值" 的意思是：如果左边是 undefined（没传），就用右边的默认值。
const file = process.argv[2] ?? "sites.txt";

// ========== 2. 读文件（失败就报错退出）==========
// readFileSync = 同步读文件，直接返回文件内容（字符串）。
// 文件不存在时它会抛错，所以要用 try/catch 接住。
let content;
try {
  content = fs.readFileSync(file, "utf8");
} catch (err) {
  // 错误信息一律走 stderr（标准错误），免得混进正常输出里被当成结果。
  console.error(`错误：读不到文件 ${file}`);
  console.error(`原因：${err.code}`);
  process.exit(2);
}

// ========== 3. 把文件内容切成一行一行 ==========
// split("\n") = 按换行符切开，得到一个字符串数组。
const lines = content.split("\n");

// ========== 4. 挑出真正要检查的网址 ==========
// 规则：跳过空行、跳过以 # 开头的注释行。
const urls = [];
for (const raw of lines) {
  const line = raw.trim();            // 去掉首尾空白（含 Windows 的 \r）
  if (line === "") continue;          // 空行 → 跳过
  if (line.startsWith("#")) continue;
  const linef = line.startsWith("http://") || line.startsWith("https://")
    ? line
    : `https://${line}`;  //再循环内增加一个判断，如果是满足的就用原变量来赋给新的，如果不满足就新增一个头来赋值
  urls.push(linef);
  }
 
// ========== 5. 检查单个网址 ==========
// async 函数 = "里面会有等待操作"；await = "在这儿等结果回来再往下走"。
async function checkOne(url) {
  try {
    const res = await fetch(url, {
      // 5 秒还没回应就主动放弃（抛出异常，走下面的 catch）
      signal: AbortSignal.timeout(5000),
    });
    // 2xx / 3xx 都算活着，和 bash 版里 case "$code" in 2*|3*) 的规则一致。
    return res.status >= 200 && res.status < 400;  //如果是返回码早200到400之间，包括200，不包括400就是正常的，返回布尔值ture，其他的状态吗就是false。这个到bash的0/1不一样，那个是退出码这个是判断的结果，程序的退出码是最后的那个process来决定的，也就是提示程序或者使用者是否全部成功，还是有不成功的链接。
  } catch (err) {
    // 超时、域名解析不了、连不上……都会落到这里，一律算 DOWN。
    console.log(err.message);
    console.log(err.cause);
    return false;
  }
}

// ========== 6. 主流程 ==========
async function main() {
  let ok = 0;
  let down = 0;

  // for...of = 一个一个按顺序检查（和 bash 的 for 循环一样）
  for (const url of urls) {
    const alive = await checkOne(url);
    if (alive) {
      console.log(`OK: ${url}`);
      ok++;
    } else {
      console.log(`DOWN: ${url}`);
      down++;
    }
  }

  // 统计行
  const total = ok + down;
  console.log(`共 ${total} 个:OK ${ok},DOWN ${down}`);

  // ========== 7. 用退出码告诉外界成败 ==========
  // 全成功 → 0；只要有失败的 → 1。这样别的脚本/CI 能靠它判断。
  process.exit(ok === total ? 0 : 1);
}

main();
