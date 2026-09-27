#!/usr/bin/env node

export function analyzeResults(results) {
  let index = 0;
  for (const res of results) {
    if (res.status !=="ok" && res.status !=="down") {
      throw new Error(`不认识的状态:${res.status}(下标${index})`)
    }
  index++;
  }
    const good = results.filter(res => res.status === "ok").length;
    const bad = results.filter(res => res.status === "down").length;
    return {ok:good, down:bad};
  }

