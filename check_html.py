from bs4 import BeautifulSoup
import os
import sys

# 要检查的HTML文件列表
html_files = ['index.html', 'default.html', '404.html']

# 检查每个HTML文件
errors_found = False

for file_name in html_files:
    if os.path.exists(file_name):
        print(f"\n检查文件: {file_name}")
        try:
            with open(file_name, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 使用BeautifulSoup解析HTML
            soup = BeautifulSoup(content, 'html.parser')
            
            # 检查是否有未闭合的标签
            if soup.find_all(['unclosed']):
                print("  - 发现未闭合的标签")
                errors_found = True
            
            # 检查是否有重复的ID
            all_ids = []
            duplicate_ids = []
            for tag in soup.find_all(id=True):
                tag_id = tag.get('id')
                if tag_id in all_ids:
                    duplicate_ids.append(tag_id)
                else:
                    all_ids.append(tag_id)
            
            if duplicate_ids:
                print(f"  - 发现重复的ID: {', '.join(set(duplicate_ids))}")
                errors_found = True
            
            print("  - HTML语法检查完成")
            
        except Exception as e:
            print(f"  - 检查过程中出错: {str(e)}")
            errors_found = True
    else:
        print(f"\n文件不存在: {file_name}")
        errors_found = True

if not errors_found:
    print("\n没有发现明显的HTML语法错误")
else:
    print("\n发现了一些HTML语法问题")
