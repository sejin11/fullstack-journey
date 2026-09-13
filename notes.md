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
|||||| 
|||||| 
|||||| 
