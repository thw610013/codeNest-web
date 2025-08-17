#!/bin/bash

set -e

# ========= 配置区 =========
PROJECT_PATH="/Users/tianhaowen/Desktop/codeNest/code-nest"   # 项目根目录
DIST_DIR="$PROJECT_PATH/dist"

REMOTE_USER="root"
REMOTE_HOST="47.105.121.110"
# 注意：这里不要以 /dist 结尾！脚本会把 dist 目录整体上传进去
REMOTE_PATH="/var/code-nest/code-nest-web"
# ========================

echo ">>> 进入项目目录"
cd "$PROJECT_PATH" || exit 1

echo ">>> 开始打包 Vite 项目"
npm run build || { echo "❌ 打包失败"; exit 1; }

echo ">>> 确保远端目录存在：$REMOTE_PATH"
ssh "${REMOTE_USER}@${REMOTE_HOST}" "mkdir -p '$REMOTE_PATH'"

echo ">>> 上传整个 dist 目录到服务器（保持为 /dist）"
# 这行会在远端得到：/var/code-nest/code-nest-web/dist
scp -r "$DIST_DIR" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

if [ $? -eq 0 ]; then
  echo "✅ 部署完成！已上传到 ${REMOTE_HOST}:${REMOTE_PATH}/dist"
  echo ">>> 按你的要求：清理本地 dist 目录"
  rm -rf "$DIST_DIR"
  echo "✅ 清理完成"
else
  echo "❌ 上传失败，本地 dist 保留以便排查"
  exit 1
fi