from PIL import Image, ImageDraw
import os

# 图片路径
input_path = "./static/images/himalayas.png"
output_path = "./static/images/himalayas_no_text.png"

# 检查文件是否存在
if not os.path.exists(input_path):
    print(f"Error: File {input_path} does not exist.")
    exit(1)

# 打开图片
image = Image.open(input_path)
width, height = image.size

# 创建一个新的图片对象
new_image = Image.new("RGB", (width, height), "white")
new_image.paste(image, (0, 0))

draw = ImageDraw.Draw(new_image)

# 假设文字在图片的底部，绘制一个白色矩形覆盖
# 可以根据实际文字位置和大小调整参数
text_area_height = 100
text_area = (0, height - text_area_height, width, height)
draw.rectangle(text_area, fill="white")

# 保存处理后的图片
new_image.save(output_path)

# 替换原图片
os.remove(input_path)
os.rename(output_path, input_path)

print(f"Success: Text removed from {input_path}")
print(f"Image saved to {input_path}")
