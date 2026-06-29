# 才干测评

一个简洁、可部署到 GitHub Pages 的才干/优势测评网页应用。

## 功能

- 32 道情境测评题，覆盖 8 大才干维度
- 计分后生成 TOP 5 核心才干
- 可视化才干雷达图
- 维度详解与发展建议
- 可下载文本版报告
- 响应式设计，支持手机与桌面

## 八大才干维度

1. 执行力
2. 影响力
3. 关系建立
4. 战略思维
5. 学习力
6. 适应力
7. 分析力
8. 创造力

## 本地预览

直接用浏览器打开 index.html 即可。

## 部署到 GitHub Pages

1. 在 GitHub 创建仓库（例如 yourname/talent-assessment）。
2. 将本仓库推送到 GitHub。
3. 进入仓库 Settings → Pages → Source，选择 Deploy from a branch，分支选 main，文件夹选 / (root)。
4. 保存后即可通过 https://yourname.github.io/talent-assessment 访问。

## 自定义题库

编辑 js/app.js 中的 THEMES 对象，修改各维度下的 questions、description 和 tip。
