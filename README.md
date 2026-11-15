# Eason · TypeScript & SeniorCare

面向高中生的中文编程课件。通过知识讲解、完整案例和教师演示，学习 TypeScript 基础，再逐步进入 SeniorCare 教学项目。

目前第一、二课已经编写，第三课暂时留白。每课 60 分钟，包括 10 分钟开场和 50 分钟核心内容；不安排学生编程练习或课后作业。

## 需要安装什么

| 软件                                                 | 是否必需                      | 用途                                                                                        |
| ---------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| [Node.js](https://nodejs.org/en/download/)           | 必需                          | 安装项目依赖、启动课件。建议使用 Node.js 24；项目最低要求为 20.9。npm 随 Node.js 一起安装。 |
| 浏览器                                               | 必需                          | 使用 Chrome、Edge 等现代浏览器打开课件。                                                    |
| [Git](https://git-scm.com/downloads)                 | 使用 Git 下载、更新代码时需要 | 如果使用 GitHub 的 Download ZIP 下载代码，可以不安装。                                      |
| [Visual Studio Code](https://code.visualstudio.com/) | 可选                          | 阅读和修改代码，也可以使用其他编辑器。                                                      |

React、Next.js、TypeScript 等项目依赖会由 npm 自动安装，无需逐个安装，也无需全局安装 TypeScript。

课程网站不需要数据库、后端服务、账号或 API 密钥。SeniorCare 是课程中的教学案例。

安装 Node.js 后，重新打开终端，确认下面两条命令能显示版本号：

```sh
node --version
npm --version
```

## 下载项目

在本 GitHub 仓库主页点击 **Code**：

- 使用 Git：复制 HTTPS 地址，通过 `git clone` 下载仓库。
- 不使用 Git：选择 **Download ZIP**，下载后解压。

使用 Git 时，可以直接运行：

```sh
git clone https://github.com/yishen734/seniorcare-course.git
cd seniorcare-course
```

用编辑器打开下载得到的项目文件夹，在该文件夹中打开终端。确认当前位置能看到 `package.json` 和 `package-lock.json`，再执行下面的步骤。

## 第一次启动

依次执行：

```sh
# 1. 按锁定的版本安装全部依赖
npm ci

# 2. 从已安装的 TypeScript 依赖生成本地编译器文件
node scripts/prepare-compiler.mjs

# 3. 启动本地开发服务
npm run dev
```

终端提示服务已就绪后，在浏览器中打开：

| 页面                           | 地址                                                                   |
| ------------------------------ | ---------------------------------------------------------------------- |
| 第一课：变量、类型、条件与函数 | [http://127.0.0.1:3003/lessons/1/](http://127.0.0.1:3003/lessons/1/)   |
| 第二课：对象、数组与循环       | [http://127.0.0.1:3003/lessons/2/](http://127.0.0.1:3003/lessons/2/)   |
| 课程目录                       | [http://127.0.0.1:3003/curriculum/](http://127.0.0.1:3003/curriculum/) |

服务运行期间保持终端开启。结束时，在这个终端按 **Ctrl + C** 停止。

下载依赖时需要网络。安装和编译器文件准备好后，课件中的案例使用本地 TypeScript 编译器，不需要调用外部 API 或 CDN。

## 以后如何启动、更新

依赖和编译器文件已经准备好时，每次只需在项目文件夹运行：

```sh
npm run dev
```

如果通过 Git 下载了仓库，可以在确认本地修改已妥善保存后更新代码：

```sh
git pull
npm ci
node scripts/prepare-compiler.mjs
npm run dev
```

`public/compiler/` 是生成的文件，不随源码提交。首次下载项目，或重新安装、更换 TypeScript 依赖后，需要重新执行准备编译器的命令。

## 常见启动问题

- **提示找不到 node 或 npm**：确认已安装 Node.js，并重新打开终端。
- **提示找不到 package.json**：终端没有进入项目根目录。切换到包含 `package.json` 的文件夹。
- **案例提示编译器加载失败**：先运行 `node scripts/prepare-compiler.mjs`，再刷新页面。
- **提示端口 3003 已被占用**：停止之前运行的课件服务，或关闭占用该端口的其他程序，再启动。项目使用的端口是 3003。
- **Windows PowerShell 提示不能运行 npm.ps1**：可以将命令里的 `npm` 写成 `npm.cmd`，例如 `npm.cmd ci`、`npm.cmd run dev`。

## 检查与静态构建

运行全部项目检查：

```sh
npm run check
```

这会依次执行类型检查、lint、测试、格式检查和生产构建。也可以单独运行：

```sh
npm run typecheck
npm run lint
npm test
npm run format:check
npm run build
```

生产构建会自动准备编译器文件，并将静态网站导出到 `out/`。部署时使用支持静态文件的网站托管服务。由于项目使用静态导出，生产预览不使用 `next start`。

## 代码结构

| 位置                           | 内容                                             |
| ------------------------------ | ------------------------------------------------ |
| `src/curriculum/`              | 课程顺序、标题和开放状态                         |
| `src/lessons/`                 | 中文讲义、完整案例和课程注册                     |
| `src/components/`              | 页面布局、导航、代码展示和演示组件               |
| `src/lib/`                     | 可复用的纯逻辑                                   |
| `public/compiler-worker.js`    | 在 Worker 中进行真实的 TypeScript 语法和类型检查 |
| `public/runner-worker.js`      | 在独立 Worker 中运行案例，界面控制两秒超时       |
| `scripts/prepare-compiler.mjs` | 生成本地编译器资源                               |
| `tests/`                       | 类型诊断、案例输出和业务规则的测试               |

演示使用已提供的完整代码，分别展示类型检查反馈和运行结果。支持单文件、同步的控制台案例；不提供 Node.js 或 DOM 运行环境。切换案例会清除上一个案例的演示结果。

项目使用一个 Next.js 应用、严格模式的 TypeScript 和 CSS Modules。新增课件通过 `src/lessons/registry.ts` 注册，讲义内容与路由分开存放。
