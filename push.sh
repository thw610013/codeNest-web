#!/bin/bash
# 自动提交 + 推送到 Gitee 和 GitHub
# 用法: ./push.sh "你的提交信息"

# 判断是否传入了提交信息
if [ -z "$1" ]; then
  echo "❌ 请输入提交信息，例如：./push.sh '修复了bug'"
  exit 1
fi

# 添加远程仓库（只会在第一次运行时生效，之后会提示已存在）
git remote add gitee git@gitee.com:hw_love_666/code-nest-server.git 2>/dev/null
git remote add github git@github.com:thw610013/codeNest-server.git 2>/dev/null

# 拉取最新代码，避免冲突
git pull gitee main --rebase
git pull github main --rebase

# 添加变更
git add .

# 提交代码
git commit -m "$1"

# 推送到 Gitee
echo "🚀 正在推送到 Gitee..."
git push gitee HEAD

# 推送到 GitHub
echo "🚀 正在推送到 GitHub..."
git push github HEAD

echo "✅ 全部推送完成！"