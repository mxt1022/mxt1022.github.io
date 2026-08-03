import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export interface CodeforcesProfile {
  handle: string;
  rank: string;
  rating: number;
  max_rank: string;
  max_rating: number;
  organization?: string;
  last_online?: string;
  profile_url: string;
}

export interface CodeforcesStats {
  solved_count: number;
  accepted_submissions: number;
  submissions_scanned: number;
  rated_contests: number;
  active_days: number;
}

export interface RatingPoint {
  contest_id: number;
  contest_name: string;
  rank: number;
  old_rating: number;
  new_rating: number;
  delta: number;
  updated_at: string;
  url: string;
}

export interface AcceptedProblem {
  name: string;
  contest_id: number;
  index: string;
  rating: number | null;
  tags: string[];
  language: string;
  submitted_at: string;
  url: string;
}

export interface CodeforcesData {
  updated_at: string;
  profile: CodeforcesProfile;
  stats: CodeforcesStats;
  top_tags: { name: string; count: number }[];
  difficulty: { label: string; count: number }[];
  rating_history: RatingPoint[];
  recent_accepted: AcceptedProblem[];
}

export interface UpcomingContest {
  name: string;
  platform: string;
  start_time: string;
  duration: string;
  url: string;
}

const readJson = async <T>(filename: string) => {
  const file = resolve(process.cwd(), 'public', 'assets', 'data', filename);
  return JSON.parse(await readFile(file, 'utf8')) as T;
};

export const loadContestData = () => Promise.all([
  readJson<CodeforcesData>('codeforces.json'),
  readJson<UpcomingContest[]>('contests.json'),
]);
