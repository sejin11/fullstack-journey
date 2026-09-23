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
|source和新进程|source /tmp/env.sh; echo "source 之后 GREETING=[$GREETING]"|执行我的进程是：/tmp/env.sh source 之后 GREETING=[你好]|输出你好||
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
//这个部分是主函数内容。先设置两个可变变量ok和down,然后执行循环，循环的内容是在urls这个数组里取参数叫做url的标签，然后调用刚刚的checkOne函数和url的参数来执行，结果赋值给alive这个变量，如果alive返回值为TURE就打印ok:$url,然后OK的数量就加一，否则返回down:url，然后DOWN的数量加一。
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

3.const obj = {1:a ,2:b, 3:c };
console.log(obj.1);
console.log(obj["2"])

4.===强制相等，==有些string和数字他也会判断相等，不严谨

5.await用清单等待拿回对象。没有await的话就只有一个清单，没有具体的结果信息

6.两个反常识的点你已经说了，不同点我理解的是curl功能更强用法更多。

7.mjs可以用新的import来导入模块，js不行，需要用之前的require来导入。source会弄一个新的进程来运行，但是mjs和js不需要，就在里面就导入了，以及source的文件相对地址是相对CWD来的，MJS是文件本来的位置，更合理一些，坑更少一些。

8.我认为切开然后打印出来错误信息会更好排错。
