import json
import os
from datetime import datetime, timezone

import requests

def fetch_codeforces():
    url = "https://codeforces.com/api/contest.list"
    try:
        response = requests.get(url, timeout=20)
        response.raise_for_status()
        data = response.json()
        contests = []
        if data.get('status') == 'OK':
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
    except (requests.RequestException, KeyError, ValueError) as e:
        print(f"Error fetching Codeforces: {e}")
        return []

def main():
    all_contests = []
    all_contests.extend(fetch_codeforces())
    all_contests.sort(key=lambda x: x['start_time'])
    
    output_dir = 'public/assets/data'
    os.makedirs(output_dir, exist_ok=True)
    
    with open(os.path.join(output_dir, 'contests.json'), 'w', encoding='utf-8') as f:
        json.dump(all_contests, f, ensure_ascii=False, indent=2)
    
    print(f"Fetched {len(all_contests)} contests.")

if __name__ == "__main__":
    main()
