
export interface AnalysisResult {
  verdict: 'Likely Real News' | 'Likely Fake News' | 'Uncertain';
  confidence: number;
  explanation: string;
  red_flags: string[];
}
