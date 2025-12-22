# 日期自动更新脚本

这个脚本用于自动更新网站的`robots.txt`和`sitemap.xml`文件中的日期。

## 功能

1. **更新robots.txt**：更新文件末尾的"# Updated on"注释中的日期
2. **更新sitemap.xml**：更新所有`<lastmod>`标签中的日期

## 使用方法

1. 确保脚本文件`update_dates_en.ps1`与`robots.txt`和`sitemap.xml`文件位于同一目录
2. 双击运行`update_dates_en.ps1`文件，或在PowerShell中执行以下命令：

```powershell
powershell -ExecutionPolicy Bypass -File update_dates_en.ps1
```

## 脚本原理

- 获取当前日期（格式：YYYY-MM-DD）
- 使用正则表达式替换`robots.txt`中的更新日期注释
- 使用正则表达式替换`sitemap.xml`中所有`<lastmod>`标签的日期

## 注意事项

- 脚本需要在Windows系统上运行
- 确保具有文件的读写权限
- 脚本使用UTF-8编码以确保中文兼容性

## 手动更新说明

如果不想使用脚本，也可以手动更新：

### 更新robots.txt
找到文件末尾的"# Updated on"行，将日期改为当前日期。

### 更新sitemap.xml
找到所有`<lastmod>`标签，将其中的日期改为当前日期。

---

This script is designed to automatically update the dates in the website's `robots.txt` and `sitemap.xml` files.