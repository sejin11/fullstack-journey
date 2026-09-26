#!/usr/bin/env node 

import { analyzeResults } from "./analyze-results.mjs";

let failed = 0;

function test(name, fn) {
  try {
    fn();
    const okCount = fn();
    console.log(`正确:${name}${okCount}个`);
  } catch(err) {
    failed++;
    console.log(`这个错了:${name}`);
    console.error(`原因是:${err.message}`);
  }
}

test("OK的个数为:",() => {
  const got = analyzeResults([{status:"down"}, {status:"down"}]);
  //const got = analyzeResults([{status:"ok"}, {status:"down"},{status:"这是一个未知的值"}]);
  //const got = analyzeResults([]);
  //const got = analyzeResults([{status:"ok"}, {status:"down"}, {status:"ok"}]);
  return got.ok;
  if (got.ok !==0) throw new Error(`期望是0，实际是${got.ok}`);
  //if (got.ok !==0) throw new Error(`期望是0，实际是${got.ok}`);
  //if (got.ok !==2) throw new Error(`期望是2，实际是${got.ok}`);
});

console.log(failed == 0 ? "全部通过检查" : `有${failed}个失败，请检查`);
process.exit(failed === 0 ? 0 : 1);
