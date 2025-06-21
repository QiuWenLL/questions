# 面试问题练习项目

一个基于Vue.js 3 + TypeScript + Vite的前端应用程序，用于练习面试问题。

## 功能特性

- 使用Vue 3组合式API
- TypeScript支持
- Vite构建工具
- Vue Router实现路由导航
- Pinia状态管理

## 项目设置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
question-practice/
├── frontend/          # 前端应用
│   ├── public/        # 静态文件
│   ├── src/           # 源代码
│   │   ├── assets/    # 资源文件(图片、样式)
│   │   ├── components/# Vue组件
│   │   ├── router/    # 路由配置
│   │   ├── stores/    # Pinia状态管理
│   │   ├── views/     # 页面组件
│   │   ├── App.vue    # 主应用组件
│   │   └── main.ts    # 应用入口
│   ├── index.html     # 主HTML文件
│   └── vite.config.ts # Vite配置
├── README.md          # 英文说明文件
├── README.zh-CN.md    # 中文说明文件
└── package.json       # 项目依赖
```

## 许可协议

MIT