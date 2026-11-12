# 第三方组件与版权声明 / Third-Party Notices

本仓库（KB727.COM 产业资产信息展示网站）由 KB727.COM 独立开发与维护，
其中使用了下列第三方开源组件。各组件版权归其原作者所有，并依其各自许可证使用。
本文件用于完整保留这些声明，以满足各许可证的署名与保留要求。

This repository is developed and maintained by KB727.COM. It incorporates the
third-party open-source components listed below. All components remain the
property of their respective authors and are used under their respective
licenses. This file preserves those notices as required by the licenses.

目录 / Contents

1. 自有部分 / Original work
2. DesignStack Xenon（界面框架来源）
3. Bootstrap 3.0.0
4. normalize.css 2.1.0
5. Open Sans
6. qrcode.js
7. Font Awesome Free 6.5.2
8. 第三方业务资料 / Third-party documents

---

## 1. 自有部分 / Original work

Copyright (c) 2026 KB727.COM. All rights reserved.

以下内容为 KB727.COM 独立创作，不源自任何第三方模板：

- 全部页面结构与信息架构（首页、20 个资产详情页、404 页）
- `static/js/main.js`（滚动平滑动画、侧边栏开关、卡片点击与键盘可达性、移动端菜单、微信分享弹窗）
- `static/css/assets/nav.css`、`static/css/main.css`、`static/css/animations.css`、
  `static/css/page-header.css`、`static/css/wechat-modal.css`、`static/css/shell/*`
- 全部内联 SVG 图标（首屏入口图标、侧边栏展开按钮、页脚图标）
- 全部业务文案、资产数据整理与表格编排

---

## 2. DesignStack Xenon

本网站界面框架基于 DesignStack 发布的 Xenon Admin 模板二次开发，
原始作品以 MIT 许可证发布。原始版权声明与许可声明如下（依 MIT 要求完整保留）：

```
The MIT License (MIT)

Copyright (c) 2017 DesignStack

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

沿用自模板的部分主要为 CSS 类命名与栅格封装方式（如 `xe-widget`、
`xe-conversations`、`page-container` 等）。页面布局、中文内容本地化、响应式适配、
图标体系、交互逻辑与业务内容均为二次开发成果。

---

## 3. Bootstrap 3.0.0

```
Bootstrap v3.0.0
Copyright 2013 Twitter, Inc
Licensed under the Apache License v2.0
http://www.apache.org/licenses/LICENSE-2.0
```

文件：`static/css/bootstrap.css`（保留原始版权头）
许可证全文：https://www.apache.org/licenses/LICENSE-2.0

---

## 4. normalize.css 2.1.0

```
normalize.css v2.1.0 | MIT License | git.io/normalize
Copyright (c) Nicolas Gallagher and Jonathan Neal
```

文件：内嵌于 `static/css/bootstrap.css` 首部（保留原始版权头）

---

## 5. Open Sans

```
Open Sans
Copyright (c) Google Inc.
Licensed under the Apache License, Version 2.0
```

文件：`static/fonts/open-sans/`（OpenSans-Regular / OpenSans-Bold，woff / woff2）
许可证全文：https://www.apache.org/licenses/LICENSE-2.0

---

## 6. qrcode.js

```
QR Code Generator for JavaScript

Copyright (c) 2009 Kazuhiko Arase

URL: http://www.d-project.com/

Licensed under the MIT license:
http://www.opensource.org/licenses/mit-license.php

The word 'QR Code' is registered trademark of
DENSO WAVE INCORPORATED
http://www.denso-wave.com/qrcode/faqpatent-e.html
```

文件：`static/js/vendor/qrcode.js`（保留原始版权头）

---

## 7. Font Awesome Free 6.5.2

```
Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
Icons: CC BY 4.0 — Copyright (c) Fonticons, Inc.
Fonts: SIL OFL 1.1
Code: MIT License
```

使用方式：图标以 inline SVG 形式内嵌于 HTML（未分发字体文件），
SVG 内已保留 `Font Awesome Free 6.5.2 by @fontawesome` 注释。
许可证全文：https://fontawesome.com/license/free

> 说明：本仓库早期曾使用 Linecons 图标字体，因该字体未附带明确授权声明，
> 已于 2026-11 全部移除并替换为上述 inline SVG 图标及自绘 SVG 图标。

---

## 8. 第三方业务资料 / Third-party documents

以下 PDF 为资产信息提供方提供的原始资料，其著作权归原提供方所有，
KB727.COM 仅在网站中作展示与分发，不对其主张著作权：

- `attachments/Business/philippines-bataan-land.pdf`
- `attachments/Business/Lion-Parcel-Malaysia.pdf`
- `attachments/Business/custom-processing-of-fasteners.pdf`
- `attachments/National/kangqiao.pdf`

上述文件不纳入本仓库自有作品的著作权登记范围。

---

最后更新：2026-11-12
