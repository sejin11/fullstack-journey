#!/usr/bin/env node

export function analyzeResults(results) {
  let index = 0;
  for (const res of results) {
    if (res.status !=="ok" && res.status !=="down") {
      throw new Error(`不认识的状态:${res.status}(下标${index})`)
    }
  index++;
  }
  try{
    const good = results.filter(res => res.status === "ok").length;
    const bad = results.filter(res => res.status === "down").length;
    return {ok:good, down:bad};
  }  catch(err) {
    console.error(err.cause?.code ?? err.message);
  }
}

/*const results = [
    {status:"ok"}, {status:"down"}, {status:"ok"}, {status:"ok"},
  ];
*/
//console.log(analyzeResults(results));
