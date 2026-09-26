#!/usr/bin/env node
// check-js.mjs —— 批量检查一批网址能不能访问
// 用法:node scripts/check-js.mjs [文件路径]
//      不给参数时，默认读当前目录下的 sites.txt

import fs from "node:fs";

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
  console.error(`原因：${err.code ?? err.message}`);
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
  if (line.startsWith("#")) continue; // 注释行 → 跳过
  urls.push(line);                    // 剩下的才算网址
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
    return res.status >= 200 && res.status < 400;
  } catch (err) {
    // 超时、域名解析不了、连不上……都会落到这里，一律算 DOWN。
    return false;
  }
}

async function main_conc() {
  let ok = 0;
  let down = 0;
  const results = await Promise.all(
      urls.map(
         async(url) => ({url, alive_conc: await checkOne(url)}
      )
    )
  );
  for (const r of results ) {
    if (r.alive_conc) { console.log(`OK:${r.url}`); ok++;}
    else {console.log(`DOWN:${r.url}`);down++;}
  }
  // 统计行
  const total = ok + down;
  console.log(`共 ${total} 个:OK ${ok},DOWN ${down}`);

  process.exit(ok === total ? 0 : 1);
}

main_conc();
