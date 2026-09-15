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
