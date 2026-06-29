    # fetch_contests.py
import requests
import json
from datetime import datetime, timezone
import re

def fetch_codeforces():
    """从 Codeforces API 获取即将开始的比赛"""
    url = "https://codeforces.com/api/contest.list"
    try:
        response = requests.get(url)
        data = response.json()
        contests = []
        if data['status'] == 'OK':
            for contest in data['result']:
                if contest['phase'] == 'BEFORE':
                    start_time = datetime.fromtimestamp(
                        contest['startTimeSeconds'], tz=timezone.utc
                    )
                    contests.append({
                        "name": contest['name'],
                        "platform": "Codeforces",
                        "start_time": start_time.isoformat(),
                        "duration": f"{contest['durationSeconds'] // 3600}h",
                        "url": f"https://codeforces.com/contests/{contest['id']}"
                    })
        return contests
    except Exception as e:
        print(f"Error fetching Codeforces: {e}")
        return []

def fetch_atcoder():
    """从 AtCoder 网站解析即将开始的比赛（AtCoder 没有官方公开 API）"""
    url = "https://atcoder.jp/contests"
    try:
        response = requests.get(url)
        # 简单的HTML解析，提取比赛信息
        import re
        from html import unescape
        
        # 寻找比赛列表的HTML结构（这里是一个简化的示例，实际可能需要更健壮的解析）
        contests = []
        # 使用正则表达式从HTML中提取比赛信息（仅供参考，实际建议使用BeautifulSoup）
        pattern = r'<a href="(/contests/[^"]+)">([^<]+)</a>.*?(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})'
        matches = re.findall(pattern, response.text)
        
        # 注意：这个正则非常简化，实际AtCoder页面结构更复杂，建议用BeautifulSoup库
        # 这里仅作演示，真实使用时请使用更稳健的解析方法
        
        # 为了演示，我们模拟一些数据
        # 实际开发时，你可以使用第三方库或服务来获取AtCoder数据
        return []
    except Exception as e:
        print(f"Error fetching AtCoder: {e}")
        return []

def main():
    all_contests = []
    all_contests.extend(fetch_codeforces())
    all_contests.extend(fetch_atcoder())
    
    # 按开始时间排序
    all_contests.sort(key=lambda x: x['start_time'])
    
    # 写入JSON文件
    with open('docs/contests.json', 'w', encoding='utf-8') as f:
        json.dump(all_contests, f, ensure_ascii=False, indent=2)
    
    print(f"Fetched {len(all_contests)} contests.")

if __name__ == "__main__":
    main()