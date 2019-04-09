# Blockflats

简单易用可自己独立部署的 github stars 管理项目；

![img](./blockflats.gif)

## Install

```bash
$ cd frontend
$ yarn
```

```bash
$ cd backend
$ yarn
```

## Develop

- frontend 属于前端工程
- backend 属于后端工程

### Service 配置

在 backend/app 目录下创建 `app_config.ts` 文件：

```js
export const GITHUB_CLIENT_ID = '';
export const GITHUB_CLIENT_SECRET = '';
export const LEANCLOUD_DB_APP_ID = '';
export const LEANCLOUD_DB_APP_KEY = '';
```

- Github 创建一个 Application 将 clientId 和 client Secret 添加到 GITHUB_CLIENT_ID 和 GITHUB_CLIENT_SECRET 常量中
- 使用 LeanCloud 创建一个应用 将 AppId 和 AppKey 添加到 LEANCLOUD_DB_APP_ID 和 LEANCLOUD_DB_APP_KEY 常量中
- Github Application Authorization callback URL 请填写 `http://localhost:8999/path`（本地开发阶段）

### 如何启动

启动后端工程

```bash
$ cd backend
$ npm run dev
```

启动前端工程

```bash
$ cd frontend
$ npm start
```

- 在浏览器中先使用 `http://localhost:8999/` 进行授权验证
- 授权验证通过后使用 `http://localhost:3000/` 进行开发