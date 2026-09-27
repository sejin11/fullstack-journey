#!/usr/bin/env node 

import { analyzeResults } from "./analyze-results.mjs";

let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`正确:${name}`);
  } catch(err) {
    failed++;
    console.log(`这个错了:${name}`);
    console.error(`原因是:${err.message}`);
  }
}

test("两个OK一个DOWN的情况",() => {
  const got = analyzeResults([{status:"ok"}, {status:"down"}, {status:"ok"}]);
  if (got.ok !==2) throw new Error(`期望是2，实际是${got.ok}`);
});

test("空数组",() => {
  const got = analyzeResults([]);
  if (got.ok !==0) throw new Error(`期望是0，实际是${got.ok}`);
});

test("不认识的状态情况",() => {
  let threw = false;
  try {
  analyzeResults([{status:"ok"}, {status:"down"},{status:"这是一个未知的值"}]);
  } catch(err){
    threw = true;
    if(!err.message.includes("这是一个未知的值")) {
      throw new Error(`错误信息没带上状态:${err.message}`)
    }
  }
  if (!threw) throw new Error("没有抛错,应该抛错");
});

test("两个DOWN没有OK的情况",() => {
  const got = analyzeResults([{status:"down"}, {status:"down"}]);
  if (got.ok !==0) throw new Error(`期望是0，实际是${got.ok}`);
});

console.log(failed == 0 ? "全部通过检查" : `有${failed}个失败，请检查`);
process.exit(failed === 0 ? 0 : 1);
