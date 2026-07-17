import json
import os
import time
from collections import Counter
from datetime import datetime, timezone

import requests

CODEFORCES_API = "https://codeforces.com/api"
CODEFORCES_HANDLE = os.getenv("CODEFORCES_HANDLE", "InsaneArrogant")
OUTPUT_DIR = "public/assets/data"


def iso_time(timestamp):
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).isoformat()


def codeforces_request(method, params=None):
    response = requests.get(
        f"{CODEFORCES_API}/{method}", params=params, timeout=30
    )
    response.raise_for_status()
    payload = response.json()
    if payload.get("status") != "OK":
        raise ValueError(payload.get("comment", f"Codeforces {method} failed"))
    return payload["result"]


def fetch_codeforces_contests():
    try:
        result = codeforces_request("contest.list")
        contests = []
        for contest in result:
            if contest["phase"] != "BEFORE":
                continue
            contests.append(
                {
                    "name": contest["name"],
                    "platform": "Codeforces",
                    "start_time": iso_time(contest["startTimeSeconds"]),
                    "duration": f"{contest['durationSeconds'] // 3600}h",
                    "url": f"https://codeforces.com/contests/{contest['id']}",
                }
            )
        return sorted(contests, key=lambda item: item["start_time"])
    except (requests.RequestException, KeyError, TypeError, ValueError) as error:
        print(f"Error fetching Codeforces contests: {error}")
        return None


def difficulty_label(rating):
    if rating < 1000:
        return "800–999"
    if rating < 1200:
        return "1000–1199"
    if rating < 1400:
        return "1200–1399"
    if rating < 1600:
        return "1400–1599"
    if rating < 1800:
        return "1600–1799"
    if rating < 2000:
        return "1800–1999"
    return "2000+"


def fetch_codeforces_activity(handle):
    try:
        profile = codeforces_request("user.info", {"handles": handle})[0]
        time.sleep(2.1)
        rating_history = codeforces_request("user.rating", {"handle": handle})
        time.sleep(2.1)
        submissions = codeforces_request(
            "user.status", {"handle": handle, "from": 1, "count": 10000}
        )

        accepted = [item for item in submissions if item.get("verdict") == "OK"]
        solved = {}
        recent_accepted = []
        tag_counts = Counter()
        difficulty_counts = Counter()
        active_days = set()

        for submission in accepted:
            problem = submission.get("problem", {})
            contest_id = problem.get("contestId")
            index = problem.get("index")
            if not contest_id or not index:
                continue

            problem_key = f"{contest_id}-{index}"
            if problem_key in solved:
                continue

            solved[problem_key] = submission
            active_days.add(
                datetime.fromtimestamp(
                    submission["creationTimeSeconds"], tz=timezone.utc
                ).date().isoformat()
            )
            tag_counts.update(problem.get("tags", []))
            if problem.get("rating"):
                difficulty_counts[difficulty_label(problem["rating"])] += 1

            if len(recent_accepted) < 10:
                recent_accepted.append(
                    {
                        "name": problem.get("name", "Untitled problem"),
                        "contest_id": contest_id,
                        "index": index,
                        "rating": problem.get("rating"),
                        "tags": problem.get("tags", []),
                        "language": submission.get("programmingLanguage", ""),
                        "submitted_at": iso_time(submission["creationTimeSeconds"]),
                        "url": f"https://codeforces.com/contest/{contest_id}/problem/{index}",
                    }
                )

        bucket_order = [
            "800–999",
            "1000–1199",
            "1200–1399",
            "1400–1599",
            "1600–1799",
            "1800–1999",
            "2000+",
        ]

        return {
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "profile": {
                "handle": profile["handle"],
                "rank": profile.get("rank", "unrated"),
                "rating": profile.get("rating"),
                "max_rank": profile.get("maxRank", "unrated"),
                "max_rating": profile.get("maxRating"),
                "organization": profile.get("organization"),
                "last_online": iso_time(profile["lastOnlineTimeSeconds"]),
                "profile_url": f"https://codeforces.com/profile/{profile['handle']}",
            },
            "stats": {
                "solved_count": len(solved),
                "accepted_submissions": len(accepted),
                "submissions_scanned": len(submissions),
                "rated_contests": len(rating_history),
                "active_days": len(active_days),
            },
            "top_tags": [
                {"name": name, "count": count}
                for name, count in tag_counts.most_common(8)
            ],
            "difficulty": [
                {"label": label, "count": difficulty_counts.get(label, 0)}
                for label in bucket_order
            ],
            "recent_accepted": recent_accepted,
        }
    except (requests.RequestException, IndexError, KeyError, TypeError, ValueError) as error:
        print(f"Error fetching Codeforces activity for {handle}: {error}")
        return None


def write_json(filename, data):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    path = os.path.join(OUTPUT_DIR, filename)
    with open(path, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)


def main():
    contests = fetch_codeforces_contests()
    if contests is not None:
        write_json("contests.json", contests)
        print(f"Fetched {len(contests)} upcoming contests.")

    # Codeforces permits at most one API request every two seconds.
    time.sleep(2.1)
    activity = fetch_codeforces_activity(CODEFORCES_HANDLE)
    if activity is not None:
        write_json("codeforces.json", activity)
        print(
            f"Fetched {activity['stats']['solved_count']} solved problems "
            f"for {CODEFORCES_HANDLE}."
        )


if __name__ == "__main__":
    main()
