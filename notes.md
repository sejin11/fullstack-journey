git status
git clone
git log
git --version
git add
git commit
git push

#故障演练3:检测思路 
先看浏览器这边的错误代码是400还是500还是直接打不开还是证书等错误，然后更换设备、
更换网络环境再次尝试，基本确定是服务端故障，但是你说我进不去服务器，可以尝试服务器端的网页端SSH
或者救援模式，如果能进去的话，整体先看服务器有没有运行问题，正常进入的话，按你说的‘通用四连’
然后去看日志，尽力去按最小修改去修，自己修不好就找LLM，实在没办法了，尝试重启进程。

#进阶挑战：
git log #查看git的操作历史
--since="7 day ago" #限定时间7天前到现在
--name-only #输出改动的文件
--format= #空表示空模版，就不要输出基本的内容了
| #前面的输出到后面的输入
sort -u #进行排序和去重复，和sort | uniq 基本一样

演练1和演练2都已经做完了。


这个检查脚本的内容大概是首先有一个执行的地方供内核去看，当然这个是你执行的操作，如果是你直接bash执行，那他就不看这一行。
下边的第是设置一个安全边界，把有错误的地方让他及时停止，这样刚才发现问题。然后接下来的就是定一个用法函数用法函数里边的主要内容是用法，
然后写这个脚本的名称以及输入它的链接地址，告诉他怎么去用后下边第二行输入检查你的链接地址去接，看他返回是OK还是进入到正文的判断部分，
首先判断用户输入的参数，也就是我们在用法当中所提到的链接地址，如果用户输入的参数不是一个，那么调用我们的用法返回给他同时返回退出代码二，
如果它输入的参数是一个，则进入下面的部分，把它所输入的参数这个值赋予给URL这个变量，然后再边一个code变量，它是运算括号里边的内容，
里面的主要内容就是CURL提取，刚刚输入URL的值，然后再取他的响应代码，最后把这个响应代码的值赋予给CODE，如果5秒还没有响应的话或者链接错误没办法解析，
那就执行后边的把000这个值赋予给DODE变量，进入函数判断判断的这个值是否等于200提取出这个值来等于200那说明是通过了，
所以回OK以及我们当时所赋予的URL的值是用户所输入的第一个参数变量，如果不是的话，则返回和用户的参数变量，然后退出。

| 用例 | 输入 | 期望 | 实际 | 通过? |
|---|---|---|---|---|
|写内容|printf 内容追加到 /tmp.txt/ | 屏幕无返回|报错zsh: read-only file system: /tmp.txt| 因为路径写错了，导致错误|
|写内容|printf 内容追加到 /tmp.txt/ | 屏幕无返回|通过｜｜
|逐行读文件|while IFS= read -r line; do...done | 输出读到1、读到b| 输出正确｜｜
|模式分支|for...in...; do...done和case...in...esac|输出跳过[]注释和处理example.com|||
|计数器|n=0 n=$((n+1)) n=$((n+1)) echo "n=$n"| n=2 | n=2 || 
|追加和清空|> /tmp/d.log echo 第一条 >> /tmp/d.log echo 第二条 >> /tmp/d.log cat /tmp/d.log|输出第一条和第二条 两个提示|eleven_j@MacBook-Pro-2 fullstack-journey % > /tmp/d.log
echo first >> /tmp/d.log
echo second >> /tmp/d.log
cat /tmp/d.log
^C
eleven_j@MacBook-Pro-2 fullstack-journey % cat /tmp/d.log
echo first >> /tmp/d.log
echo second >> /tmp/d.log
cat /tmp/d.log|因为是zsh充当解释器的原因，导致只有重定向（是吧？）| 
|追加和清空|bash > /tmp/d.log echo 第一条 >> /tmp/d.log echo 第二条 >> /tmp/d.log exit cat /tmp/d.log | 出现第一条、题二条| 通过 || 
|退出码判断|eleven_j@MacBookPro fullstack-journey % if ./scripts/check.sh https://example.com >/dev/null; then
then> echo "成功分支" 
then> else
else> echo "失败分支"
else> fi | 输出成功分支 | 成功分支 || 
|退出码测试|eleven_j@MacBookPro fullstack-journey % bash -c 'if [ ! -f 不存在的文件.txt ]; then
echo "文件不存在";
exit 2;
fi'; echo "退出码：$?"|文件不存在 退出码2|eleven_j@MacBookPro fullstack-journey % bash -c 'if [ ! -f 不存在的文件.txt ]; then
echo "文件不存在";
exit 2;
fi'; echo "退出码：$?"|| 
|参数的默认值|printf ' file="${1:-sites.txt}"\necho "$file"\n' > /tmp/t3.sh |bash /tmp/t3.sh bash /tmp/t3.sh mysites.txt| 没有参数默认用sites,有参数用参数|| 
|---|---|---|---|---| 
|case的多种模式|for f in "a.sh" "b.envsh" "c.txt"; do
for> case "$f" in
for case> *.envsh) echo "$f ---用source方式执行";;
for case> *.sh) echo "$f ---直接运行";;
for case> *) echo "$f ---忽略";;
for case> esac
for> done|a.sh → 直接运行 / b.envsh → 用 source 方式执行 / c.txt → 忽略| 按分类标准正常输出|| 
|source和新进程|printf 'export GREETING="你好"\necho "执行我的进行 是：$0"\n' > /tmp/env.sh|无输出|无输出|| 
|source和新进程|bash /tmp/env.sh; echo "新进程之后 GREETING=[${GREETING:-空}]"  |执行我的进行是：/tmp/env.sh 新进程之后 GREETING=[空]|输出为空||
|source和新进程|ource /tmp/env.sh; echo "source 之后 GREETING=[$GREETING]"|执行我的进程是：/tmp/env.sh source 之后 GREETING=[你好]|输出你好||
|批量处理文件|mkdir -p /tmp/fd && touch /tmp/fd/a.sh /tmp/fd/b.txt /tmp/fd/c.sh find /tmp/fd -type f -name '*.sh' | sort | while read -r f; do echo "找到脚本: $f"; done |找到脚本a.sh c.sh|显示正常||
|字典顺序和版本顺序|"printf "10\n2\n1\n" | sort printf "10\n2\n1\n" | sort -V"|1 10 2\1 2 10|显示正确||
|进程顶替|bash -c 'echo 第一句; exec echo 我被顶替了; echo 这句永远不会执行'|第一句 / 我被顶替了——第三句不打印|第三句话没有打印||
|把参数原样传下去|printf '#!/usr/bin/env bash\necho "脚本名：$0"\necho "参数个数：$#"\nfor a in "$@"; do echo "参数：$a"; done\n' > /tmp/args.sh bash /tmp/args.sh one "two three"|脚本名: /tmp/args.sh / 参数个数: 2 / 参数: one / 参数: two three(引号让 "two three" 算作一个参数)|||
|---|---|---|---|---|
BASH-3 nginx entrypoint test
1.看到了目录为空开始配置、执行脚本的输出、配置完成和最后exec的报错，一共是4行内容
2.因为这个最后要启动nginx服务，我们的项目是没有安装的，自然不会启动然后会报错。但如果不是报错这个，脚本是走不到这里的，会在之前的某个位置停下，比如没有加权脚本的忽略或者脚本错误或者没有脚本，目录为空直接会跳过配置。
3.中间的部分报告是忽略了这个文件。对应case "$f" in ...esac这个构件中的第三个匹配规则命中，然后返回忽略文件。
|---|---|---|---|---|
独立解剖备份脚本
1.做备份和清理备份的；入口在if ! tar --create --gzip --file="$bdir$filename" "${srcdir}" 2>/dev/null; then这句话开始备份，前面主要是校验以及定义变量；if ...; then fi | find ... -name "" .....等，主要是if语法 
2.失效应该是这个部分
  find "$bdir" -name "${bname}*" -type f -printf "${bdir}%P\n" | sort | head -n -"$bnum" | sed "s/.*/\"&\"/" | xargs rm -f
其中的 -N识别错误（LLM告诉我的，要不我也不会...），搞不了负数，所以失败。但是这个失败是if判断完之后的，判断完是大于0的参数，退出码是0，他就执行了then，但是then内又失败了，应该就是你说的静默失败了。
下面的部分在LLM的解释和帮助下，测试完最后增加了一些自己的理解，然后改为了这个
find "$bdir" -name "${bname}*" -type f | sort > "$bdir/all.txt"
total=$(wc -l < "$bdir/all.txt")

if [ "$bnum" -gt 0 ]; then
    keep=$((total - bnum))
    if [ "$keep" -gt 0 ]; then
        head -n "$keep" < "$bdir/all.txt" | sed 's#.*#"&"#' | xargs rm -f
    fi
else
    read -r -p "现在的操作会删除现存的共 $total 个备份，请再次确认是否要执行（默认为取消）[y/n]" ans
    echo "你的输入是：[$ans]"
    case "$ans" in
        y|Y) echo "执行全部删除"
        find "$bdir" -name "${bname}*" -type f -delete ;;
        *) echo "删除操作取消" ;
    esac
fi

3.因为退出码看是最后的xargs rm -f这个，前面错了他没错，他没错退出0，if看到就0就走完了，然后在退出0
意味着发现不了问题吧，corn看到的是你正常的说明，然后实际没有执行好清理旧的备份，然后越堆越多。
4.参数1改为/之后我觉得会在这一部分出问题
bname=$(echo "${1}" | sed -r 's#/#-#g' | sed 's#^-##')
因为管道第一步输入/，第一个sed把他改为了-，然后第二个sed给他删掉了，就说明都没有了，这个变量变成了空，然后在下面的查找中会变成"*"匹配了备份目录的所有文件，不能精确控制我们要删除的范围了，如果还有别的备份文件，也会被误删除。
|---|---|---|---|---|
FS-008课程笔记
主线任务A：完成。之前就安装过，然后升级brew update升级到最新版本7.0.2。
我的node不用brew安装，因为不能方便的进行版本控制。所以使用了nvm来安装
eleven_j@MacBookPro node-playground % node -v
v24.15.0
eleven_j@MacBookPro node-playground % which node
/Users/eleven_j/.nvm/versions/node/v24.15.0/bin/node

主线任务B：创建了项目、写了gitignore、加了暂存、已经提交，但是没有push到远端
npm run cow有正常的输出
git status看不到模块
eleven_j@MacBookPro node-playground % git log --oneline
cd4d5b8 (HEAD -> main) FS-008:第一个npm项目（scripts/.gitignore/重建实验）
eleven_j@MacBookPro node-playground %

|---|---|---|---|---|
FS-009笔记

1.已经生成，但是一开始生产的.js用的是之前的require导入模块我看不懂，因为没有学习这个，所以重新写了.mjs的用import来导入了“fs”这个模块。

2.跑了项目根目录下的sites.txt输出如下：
node scripts/check-js.mjs sites.txt                                                  ─╯
DOWN: google.com
DOWN: baidu.com
DOWN: purehikegear.com
DOWN: purehikegear.cn
DOWN: youtube.com
DOWN: a.b
DOWN: b.c
DOWN: instgram.com
OK: https://example.com
OK: https://baidu.com
DOWN: https://this-site-does-not-exist-abc.invalid
共 11 个:OK 2,DOWN 9

其中的OK数量不对或者除网络原因外本来应该OK的没有返回OK值，应该是fetch需要的是完整的地址，不加https://有的没用补全就取不回来了。

3.
#!/usr/bin/env node   //告诉内核用node来执行脚本

import fs from "node:fs";  //从node内置的模块中导入"fs"这个模块

const file = process.argv[2] ?? "sites.txt";  //设置变量file，然后给其赋值（调用程序的参数功能检查是否有输入第一个参数，如果有就把这个参数赋值给变量file，否则使用默认的sites.txt）

let content;  //设置一个可变的变量content，让后面的内容来赋值
/*使用一个保险来执行可能出错的代码，让程序在出错时不至于崩溃直接退出，让其可以执行后面的代码。把刚刚的file变量单作一个参数然后调用fs内部的功能去检查文件内容，把检查的内容结果赋值给content这个变量。如果出错了，就走后面的两个error来错报，然后退出码为2。*/
try {
  content = fs.readFileSync(file, "utf8");
} catch (err) {
  console.error(`错误：读不到文件 ${file}`);
  console.error(`原因：${err.code}`);
  process.exit(2);
}

const lines = content.split("\n");  //设置一个lines的变量，用之前的没有问题的content内容来分成行的形似

const urls = [];  //设置一个urls的变量，但是这个变量时数组的形式，内容后面再填
for (const raw of lines) {  //设置一个循环。循环的内容是从lines里拿行出来，然后下面在调用数据的裁剪功能把前后空白部分裁剪掉赋值给line单个行的变量，然后执行下面的判断说这个line如果是空白和以#开头的就跳过，然后找到真正的链接放在urls这个数组里。
  const line = raw.trim();            
  if (line === "") continue;          
  if (line.startsWith("#")) continue; 
  urls.push(line);                    
}
//调用一个异步函数checkOne,输入的参数是url这个标签。也是在保险里执行代码，设置一个res的变量，内容是异步函数，然后这个函数取回网页的内容清单来，await用清单等待拿回对象，如果超过5秒就放弃，然后返回res的状态码得是200-400的左闭右开的一个返回码区间，如果中间代码出错了就掉catch来返回失败。
async function checkOne(url) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(5000),
    });
    return res.status >= 200 && res.status < 400;
  } catch (err) {
    return false;
  }
}
//这个部分是主函数内容。先设置两个可变变量ok和down,然后执行循环，循环的内容是在urls这个数组里取参数叫做url的标签，然后调用刚刚的checkOne函数和url的参数来执行，结果赋值给alive这个变量，如果alive返回值为ture就打印ok:$url,然后OK的数量就加一，否则返回down:url，然后DOWN的数量加一。
async function main() {
  let ok = 0;
  let down = 0;

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
//循环完了之后设置一个统计变量total，用OK和down的数值来最终赋值，并打印相应的数量。
  const total = ok + down;
  console.log(`共 ${total} 个:OK ${ok},DOWN ${down}`);
//最后给出一个结果，如果全部是OK，那退出码就是0，否则就是1，让别人或者程序知道有不通的网址，也许需要进一步的检查。
  process.exit(ok === total ? 0 : 1);
}
//真正执行主函数
main();

4.我感觉和之前的版本相比之前好像读起来会更容易些，但是现在这个版本它的逻辑性要更强一些，代码更简洁，所以可能是如果比较熟悉读这个速度会更快。之前的注释是加#，现在是//或者/*...*/;超时之前是设置-timeout，现在是也差不多吧，调用的东西不一样。

挑战题

看check-js-conc.mjs这个文件

内化检测点
1.const a = [1, 2, 3 ];
  function const add = (b,c) => b + c;
return在箭头函数里函数体加了花括号的话需要加上，如果没有加会返回return，但是一般还是直接不加花括号和return，更简单一些。

2.const list = ["a", "b", "c"];
  for (const l of list) {
    console.log("Print:"l);
}
(查找资料后：of拿到的是值，in拿到的是下标序号)

3.const obj = {1:"a" ,2:"b", 3:"c" };
console.log(obj.[1]);
console.log(obj["2"])

4.===强制相等，==有些string和数字他也会判断相等，不严谨

5.await用清单等待拿回对象。没有await的话就只有一个清单，没有具体的结果信息

6.两个反常识的点你已经说了，不同点我理解的是curl功能更强用法更多。

7.mjs可以用新的import来导入模块，js不行，需要用之前的require来导入。source的文件相对地址是相对CWD来的，MJS是文件本来的位置，更合理一些，坑更少一些。

8.我认为切开然后打印出来错误信息会更好排错。


FS-009 内化练习:从"读过"到"写得出"
第一部分
1.预测输出应该是a 3，第一个是打印第一个数组的内容，然后是打印数组个数
╭─  ~/projects/fullstack-journey   main !1                                           ─╮
╰─❯ node /tmp/drill-6.js                                                                 ─╯
a 3

2.输出预测是8 undefined，因为第二个箭头函数加了花括号但是没写return没东西接住他的内容
╭─  ~/projects/fullstack-journey   main !1                                           ─╮
╰─❯ node /tmp/drill-6.js                                                                 ─╯
8 undefined
(又预测对了嘻嘻)

3.预测输出是https://examle.com 200
╭─  ~/projects/fullstack-journey   main !1                                           ─╮
╰─❯ node /tmp/drill-6.js                                                                 ─╯
https://example.com 200 undefined
(少了一个undefined的返回，我以为是一个默认的方式来着，现在看来是一个没有被定义的键)

4.预测输出第一个不相等第二个相等。第一个数字和字符不相等，第二个则没有那么严格。
╭─  ~/projects/fullstack-journey   main !1                                           ─╮
╰─❯ node /tmp/drill-6.js                                                                 ─╯
false
true
(返回值是布尔值！刚刚没想到呢，不过逻辑是对了的)

5.预测返回
共 ${n} 个
共1个
╭─  ~/projects/fullstack-journey   main !1                                           ─╮
╰─❯ node /tmp/drill-6.js                                                                 ─╯
共 ${n} 个
共 3 个
(逻辑基本对了，但是这里调用的是变量本身，我错理解成了个数了)

6.预测输出
of:x 
of:y 
in:0
in:1 
╭─  ~/projects/fullstack-journey   main !1                                           ─╮
╰─❯ node /tmp/drill-6.js                                                                 ─╯
of: x
of: y
in: 0
in: 1

第二部分
A:
const file = process.argv[2] ?? "sites.txt";
console.log(file);

B:
const results = [
  { url: "a", status: "ok" },
  { url: "b", status: "down" },
  { url: "c", status: "ok" },
];
const ok = results.filter((r) => r.status === "ok").length;
console.log(`OK ${ok},DOWN ${results.length - ok}`);

C:
import fs from "node:fs";
try {
  const content = fs.readFileSync("/tmp/drill2c.txt", "utf8");
  console.log("读到", content.split("\n").length, "行");
} catch (err) {
  console.error(`读不到文件:${err.code}`);
  process.exit(2);
}

第三部分
1.我在检查部分增加了    
console.log(err.message);
console.log(err.cause);
但是测试输出的down中并没有返回原因。
1.1调整了一下顺序，先输出内容再返回false，应该是可以了。推测应该是输出到false之后就不执行后面的catch里的内容了，为什么呢？
输出内容
╭─  ~/projects/fullstack-journey   main !2                                           ─╮
╰─❯ node scripts/check-js.js                                                             ─╯
The operation was aborted due to timeout
undefined
DOWN: https://www.google.com
OK: https://www.baidu.com
OK: https://purehikegear.com
OK: https://purehikegear.cn
The operation was aborted due to timeout
undefined
DOWN: https://www.youtube.com
Failed to parse URL from a.b
TypeError: Invalid URL
    at new URL (node:internal/url:819:25)
    at new Request (node:internal/deps/undici/undici:11832:25)
    at fetch (node:internal/deps/undici/undici:12757:25)
    at fetch (node:internal/deps/undici/undici:17407:10)
    at fetch (node:internal/bootstrap/web/exposed-window-or-worker:83:12)
    at checkOne (/Users/eleven_j/projects/fullstack-journey/scripts/check-js.js:45:23)
    at main (/Users/eleven_j/projects/fullstack-journey/scripts/check-js.js:66:25) {
  code: 'ERR_INVALID_URL',
  input: 'a.b'
}
DOWN: a.b
Failed to parse URL from b.c
TypeError: Invalid URL
    at new URL (node:internal/url:819:25)
    at new Request (node:internal/deps/undici/undici:11832:25)
    at fetch (node:internal/deps/undici/undici:12757:25)
    at fetch (node:internal/deps/undici/undici:17407:10)
    at fetch (node:internal/bootstrap/web/exposed-window-or-worker:83:12)
    at checkOne (/Users/eleven_j/projects/fullstack-journey/scripts/check-js.js:45:23)
    at main (/Users/eleven_j/projects/fullstack-journey/scripts/check-js.js:66:25) {
  code: 'ERR_INVALID_URL',
  input: 'b.c'
}
DOWN: b.c
The operation was aborted due to timeout
undefined
DOWN: https://www.instgram.com
OK: https://example.com
OK: https://baidu.com
fetch failed
Error: getaddrinfo ENOTFOUND this-site-does-not-exist-abc.invalid
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26) {
  errno: -3008,
  code: 'ENOTFOUND',
  syscall: 'getaddrinfo',
  hostname: 'this-site-does-not-exist-abc.invalid'
}
DOWN: https://this-site-does-not-exist-abc.invalid
共 11 个:OK 5,DOWN 6

2.兜底这个部分在筛选链接的时候尝试加了下面的判断语句
const urls = [];
for (const raw of lines) {
  const line = raw.trim();            // 去掉首尾空白（含 Windows 的 \r）
  if (line === "") continue;          // 空行 → 跳过
  if (line.startsWith("#")) continue;
  if (!line.startsWith("http://" || "https://")) {
    const linef = `https://${line}`;
  };
  urls.push(line);
  urls.push(linef);// 剩下的才算网址
}
但是运行报错。
╭─  ~/projects/fullstack-journey   main !3                                           ─╮
╰─❯ node scripts/check-js.js                                                             ─╯
/Users/eleven_j/projects/fullstack-journey/scripts/check-js.js:42
  urls.push(linef);// 剩下的才算网址
            ^

ReferenceError: linef is not defined
    at Object.<anonymous> (/Users/eleven_j/projects/fullstack-journey/scripts/check-js.js:42:13)
    at Module._compile (node:internal/modules/cjs/loader:1830:14)
    at Object..js (node:internal/modules/cjs/loader:1961:10)
    at Module.load (node:internal/modules/cjs/loader:1553:32)
    at Module._load (node:internal/modules/cjs/loader:1355:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47

Node.js v24.15.0

说是linef这个变量没有定义，我放在循环里的，不是很清楚为什么这样不行。接下来要去询问LLM看看原因。
得到的结果是花括号内的变量传不出去，需要在外面设置一个可变变量在用内部的去填充。或者直接在内部当做一个值来使用。用？来判断有没有头，有就用line没有就用加了头的新的变量。有点类似于之前的BASH判断是否有参数输入，没有就用默认指定的某个参数。
除此之外还有一些用法错误比如||要用在外面，内部会被先进行运算，不能达到我们的要求。
修改后还是不太行。可变变量会残留上次的值，导致数据出问题。
const urls = [];
let linef;
for (const raw of lines) {
  const line = raw.trim();            // 去掉首尾空白（含 Windows 的 \r）
  if (line === "") continue;          // 空行 → 跳过
  if (line.startsWith("#")) continue;
  if (!line.startsWith("http://") && !line.startsWith("https://")) {
    const linef = `https://${line}`;
  };
  urls.push(line);
  urls.push(linef);// 剩下的才算网址
}
还是得再次修改。
这次不应该再修修补补了，因为收益并不大。还是换成直接判断的形式来解决。更简洁也更易读
const urls = [];
for (const raw of lines) {
  const line = raw.trim();            // 去掉首尾空白（含 Windows 的 \r）
  if (line === "") continue;          // 空行 → 跳过
  if (line.startsWith("#")) continue;
  const linef = line.startsWith("http://") || line.startsWith("https://")
    ? line : `https://${line}`;
  urls.push(linef);
  }
这次改为了再循环内部的值当作一个判判断，然后只留下一个值，满足条件的用原line来赋值，不满足的加一个头来重新赋值，但最终都是这个变量。

3.async function checkOne(url) {
    try {
      const res = await fetch(url, {
        // 5 秒还没回应就主动放弃（抛出异常，走下面的 catch）
        signal: AbortSignal.timeout(5000),
      });
      // 2xx / 3xx 都算活着，和 bash 版里 case "$code" in 2*|3*) 的规则一致。
      return res.status >= 200 && res.status < 400;  //如果是返回码早200到400之间，包括
  200，不包括400就是正常的，返回布尔值ture，其他的状态吗就是false。这个到bash的0/1不一样，
  那个是退出码这个是判断的结果，程序的退出码是最后的那个process来决定的，也就是提示程序或者
  使用者是否全部成功，还是有不成功的链接。
    } catch (err) {
      // 超时、域名解析不了、连不上……都会落到这里，一律算 DOWN。
      console.log(err.message);
      console.log(err.cause);
      return false;
    }
  }

第四部分
第一次写
#!/usr/bin/env node

type webstatus = "ok" | "down";

interface Res {
  status: webstatus;
}

function analyzeResults(results: Res[]) {
  ok = 0
  down = 0
  for (s of results) {
    if (s.status) === "ok" ok++ ;
    else continue;
    if (s.status) === "down" down++ ;
    else {
        console.log(`错误的信息:${s.status}`);
      }
    }
  console.log(`{ok:${ok}, down:${down}}`)
  }

const input: Res[] = [
  {status:"ok", status:"down", status:"ok", status:"BINGO"}
];

有很多错误，不列举了，继续改
第二部分重写
决定使用其他的方法，for循环好像不是很合适，因为还要使用try和catch来做保险
#!/usr/bin/env node

function analyzeResults(results) {
  try{
    const good = results.filter(res => res.status === "ok").length;
    const bad = results.filter(res => res.status === "down").length;
  }  catch(err) {
    throw new Error("不认识的状态")
    console.log(err.message);
  }
  console.log(`{ok:${good}, down:${bad}}`);
}

const results = [
    {stauts:"ok"}, {status:"down"}, {status:"ok"}, {status:"BINGO"},
  ];

analyzeResults(results);
提示我没有定义变量

把打印换到花括号内以后，能跑了，但是不对哈哈哈哈哈哈哈
╭─  ~/projects/fullstack-journey   main !4 ?1                                        ─╮
╰─❯ node scripts/analyze-results.js                                                      ─╯
{ok:1, down:1}

ok 应该是2才对，以及不认识的状态没报，继续改

第三次写
前一个内容有写错了的部分
改了几次以后
#!/usr/bin/env node

function analyzeResults(results) {
  let index = 0;
  for (const res of results) {
    if (res.status !=="ok" && res.status !=="down") {
      throw new Error(`不认识的状态:${res.status}(下标${index})`)
      console.log(err.message);
    }
  index++;
  }
  try{
    const good = results.filter(res => res.status === "ok").length;
    const bad = results.filter(res => res.status === "down").length;
    console.log(`{ok:${good}, down:${bad}}`);
  }  catch(err) {
    console.log(err.message);
  }
}

const results = [
{status:"ok"}, {status:"down"}, {status:"ok"}, {status:"BINGO"},
  ];

analyzeResults(results);

╭─  ~/projects/fullstack-journey   main !4 ?1                                        ─╮
╰─❯ node scripts/analyze-results.js                                                      ─╯
/Users/eleven_j/projects/fullstack-journey/scripts/analyze-results.js:7
      throw new Error(`不认识的状态:${res.status}(下标${index})`)
      ^

Error: 不认识的状态:BINGO(下标3)
    at analyzeResults (/Users/eleven_j/projects/fullstack-journey/scripts/analyze-results.js:7:13)
    at Object.<anonymous> (/Users/eleven_j/projects/fullstack-journey/scripts/analyze-results.js:25:1)
    at Module._compile (node:internal/modules/cjs/loader:1830:14)
    at Object..js (node:internal/modules/cjs/loader:1961:10)
    at Module.load (node:internal/modules/cjs/loader:1553:32)
    at Module._load (node:internal/modules/cjs/loader:1355:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47

Node.js v24.15.0
没有错误状态时运行时正常的。有错误时抛出了错误。应该对了。

第四次修改 
因为返回的内容不是对象还是字符，只是我把输出做成了那个样子，但其实不是对象。
所以应该返回也就是return一个对象
然后在主函数里打印，这样就能在终端看到
#!/usr/bin/env node

function analyzeResults(results) {
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
    console.log(err.message);
  }
}

const results = [
    {status:"ok"}, {status:"down"}, {status:"ok"}, {status:"ok"},
  ];

console.log(analyzeResults(results));


第五部分 
1.===强制等于，==字符和数字看起来相等时也是会判定相等，预测输出第一个不相等第二个相等
2.等待清单上的结果，没有就只能得到一个promise清单
3.fetch不能自动补全协议头
4.变量在花括号内的传不出去。报错发现的。

|--|--|--|--|--|--|
FS-101笔记

先修改之前的一些不足
1.把错误信息输出到标准输出改为输出到标准错误，然后再调用错误信息的message。原因改为打印特定的信息。
2.函数前增加了export，然后把数据和执行函数注释掉了。还得改一下后缀。
3.拼写基本都改了。使用了grep和sed

正式的课程笔记
前面三步看完之后增强了理解。
第四步骤再/tmp目录下测试完
第五步实战任务
用例一：
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
  const got = analyzeResults([{status:"ok"}, {status:"down"}, {status:"ok"}]);
  return got.ok;
  if (got.ok !==2) throw new Error(`期望是2，实际是${got.ok}`);
});

console.log(failed == 0 ? "全部通过检查" : `有${failed}个失败，请检查`);
process.exit(failed === 0 ? 0 : 1);

╭─  ~/projects/fullstack-journey   main !4 ?2                                        ─╮
╰─❯ node scripts/analyze-results.test.mjs                                                ─╯
正确:OK的个数为:2个
全部通过检查

用例二：
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
  const got = analyzeResults([]);
  //const got = analyzeResults([{status:"ok"}, {status:"down"}, {status:"ok"}]);
  return got.ok;
  if (got.ok !==0) throw new Error(`期望是0，实际是${got.ok}`);
  //if (got.ok !==2) throw new Error(`期望是1，实际是${got.ok}`);
});

console.log(failed == 0 ? "全部通过检查" : `有${failed}个失败，请检查`);
process.exit(failed === 0 ? 0 : 1);

╭─  ~/projects/fullstack-journey   main !4 ?2                                        ─╮
╰─❯ node scripts/analyze-results.test.mjs                                                ─╯
正确:OK的个数为:0个
全部通过检查

用例三:
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
  const got = analyzeResults([{status:"ok"}, {status:"down"},{status:"这是一个未知的值"}]);
  //const got = analyzeResults([]);
  //const got = analyzeResults([{status:"ok"}, {status:"down"}, {status:"ok"}]);
  return got.ok;
  if (got.ok !==1) throw new Error(`期望是1，实际是${got.ok}`);
  //if (got.ok !==0) throw new Error(`期望是0，实际是${got.ok}`);
  //if (got.ok !==2) throw new Error(`期望是2，实际是${got.ok}`);
});

console.log(failed == 0 ? "全部通过检查" : `有${failed}个失败，请检查`);
process.exit(failed === 0 ? 0 : 1);

╭─  ~/projects/fullstack-journey   main !4 ?2                                        ─╮
╰─❯ node scripts/analyze-results.test.mjs                                                ─╯
这个错了:OK的个数为:
原因是:不认识的状态:这是一个未知的值(下标2)
有1个失败，请检查

到这里其实我想到一个点，这个name的parameter设置成现在这个不是很合适，因为在出错的时候显示不够清晰，还是该改为一个名称更合适一些，现在就不改了先这样，无伤大雅。
顺利走到错误的部分，导入函数和实际运行的test均给出错误信息。

用例四:
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

╭─  ~/projects/fullstack-journey   main !4 ?2                                        ─╮
╰─❯ node scripts/analyze-results.test.mjs                                                ─╯
正确:OK的个数为:0个
全部通过检查

没有不认识的状态，但全部都是down的状态，程序也在正常运行，因为他不能决定链接的状态，所以他认为检查完了，是正常的。只不过这个数量都是0，也就是链接挂了的意思。我认为合理。
