# 安装与运行

## 安装软件

- [Node.js 24](https://nodejs.org/en/download/)（自带 npm）
- [Git](https://git-scm.com/downloads)

## 下载项目

```sh
git clone https://github.com/yishen734/seniorcare-course.git
cd seniorcare-course
```

## 安装依赖并启动

```sh
npm ci
node scripts/prepare-compiler.mjs
npm run dev
```

浏览器打开 [http://127.0.0.1:3003](http://127.0.0.1:3003)。

以后启动只需运行 `npm run dev`，停止时按 `Ctrl + C`。

Windows PowerShell 如果提示不能运行 `npm.ps1`，把命令中的 `npm` 换成 `npm.cmd`。
