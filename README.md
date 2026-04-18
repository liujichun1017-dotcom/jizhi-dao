# 肌知道 · 医美术后护理知识库

> 涵盖 11 个医美治疗项目的术后注意事项，支持分类筛选、详情弹窗，适配手机和 PC。

---

## 📁 文件结构

```
jizhi-dao/
├── index.html          # 主页面
├── css/style.css       # 样式
├── js/app.js           # 交互逻辑
├── data/treatments.js  # 所有内容数据（修改这里更新内容）
├── admin/index.html    # 后台管理页面
└── .nojekyll           # GitHub Pages 必须
```

---

## 🚀 GitHub Pages 部署步骤

### 第一次部署

1. 在 GitHub 新建仓库，名称随意（如 `jizhi-dao`）
2. 把 `jizhi-dao` 文件夹里的**所有文件**上传到仓库根目录
3. 进入仓库 → **Settings** → **Pages**
4. Source 选 `Deploy from a branch`，Branch 选 `main`，目录选 `/ (root)`
5. 点击 Save，等 1-2 分钟，你的网站就上线了

访问地址：`https://你的用户名.github.io/仓库名/`

---

## ✏️ 如何更新内容

### 方法一：用后台管理（推荐）

1. 打开网站 → 右上角 ⚙ 进入后台
2. 首次使用先设置密码
3. 选择项目编辑 → 保存
4. 点击「导出数据文件」下载 `treatments.js`
5. 打开 GitHub 仓库 → `data/treatments.js` → 点铅笔图标
6. 把下载的文件内容粘贴进去 → Commit changes
7. 等 1-2 分钟网站自动更新

### 方法二：直接编辑 GitHub 文件

打开仓库中的 `data/treatments.js`，直接编辑对应内容后提交即可。

---

## 📱 功能说明

- **首页**：11 个治疗项目卡片，支持按分类筛选
- **详情弹窗**：点击卡片查看项目介绍 + 术后注意事项
- **后台管理**：密码保护，可编辑所有内容，导出更新文件
- **响应式**：手机单列 / 平板双列 / PC 三列

---

*仅供参考，具体请遵医嘱。*
