import csv
import json
import os

def csv_to_json(input_file: str, output_file: str, key_column: str = 'AD_code') -> None:
    """
    将CSV文件转换为以指定列为键的JSON对象
    
    参数:
        input_file: 输入CSV文件路径
        output_file: 输出JSON文件路径
        key_column: 用作键的列名，默认为'AD_code'
    """
    # 检查输入文件是否存在
    if not os.path.exists(input_file):
        print(f"错误：输入文件不存在 - {input_file}")
        return
    
    # 读取CSV文件并转换为字典
    data_dict = {}
    try:
        with open(input_file, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            
            # 检查关键列是否存在
            if key_column not in reader.fieldnames:
                print(f"错误：CSV文件中不存在列 '{key_column}'")
                return
            
            # 转换为以指定列为键的字典
            for row in reader:
                key = row[key_column]
                if key:  # 跳过键为空的行
                    data_dict[key] = row
    
    except UnicodeDecodeError:
        print(f"警告：尝试使用GBK编码读取文件")
        try:
            with open(input_file, 'r', encoding='gbk') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    key = row[key_column]
                    if key:
                        data_dict[key] = row
        except Exception as e:
            print(f"错误：无法读取文件 - {e}")
            return
    
    # 写入JSON文件
    try:
        with open(output_file, 'w', encoding='utf-8') as jsonfile:
            json.dump(data_dict, jsonfile, ensure_ascii=False, indent=2)
        print(f"成功将 {input_file} 转换为 {output_file}")
        print(f"共处理 {len(data_dict)} 条记录")
    except Exception as e:
        print(f"错误：写入JSON文件失败 - {e}")

# 直接指定文件路径
input_file = "./China-City-List-latest.csv"
output_file = "./China-City-List-latest.json"

# 执行转换
csv_to_json(input_file, output_file)
