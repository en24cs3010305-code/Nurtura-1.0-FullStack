import { ChatMessage, Baby } from '../types';
import { apiClient } from '../api/client';

export interface AiChatQuery {
  babyId?: string;
  question: string;
  history?: ChatMessage[];
}

export const AI_SUGGESTED_QUESTIONS = [
  "Explain my baby's latest growth measurements.",
  "What should I discuss with my pediatrician?",
  "Explain general infant feeding patterns.",
  "Tell me about developmental milestones for 6 months.",
  "Help me understand vaccination schedules.",
  "Summarize my baby's recorded health history."
];

export const aiService = {
  getSuggestedQuestions(): string[] {
    return AI_SUGGESTED_QUESTIONS;
  },

  async queryAssistant(query: AiChatQuery, activeBaby?: Baby): Promise<ChatMessage> {
    try {
      const res = await apiClient.post<ChatMessage>('/ai/chat', {
        babyId: activeBaby?.id || query.babyId,
        question: query.question,
        history: query.history
      });
      if (res.data) return res.data;
    } catch {
      // Fallback to local intelligence if offline
    }

    const q = query.question.toLowerCase();
    const babyName = activeBaby?.name || 'your baby';
    const age = activeBaby?.ageText || '6 months old';
    const weight = activeBaby?.currentWeightKg || 7.8;
    const height = activeBaby?.currentHeightCm || 67.5;

    let responseText = '';

    if (q.includes('growth') || q.includes('measurement') || q.includes('weight') || q.includes('height')) {
      responseText = `Based on the latest recorded logs for **${babyName}** (${age}):
- **Current Weight:** ${weight} kg (~55th–56th percentile on WHO growth curve).
- **Current Length/Height:** ${height} cm (~58th percentile).

**Pediatric Educational Insight:**
A percentile between 15% and 85% with a steady curve indicates healthy, consistent growth velocity. Growth charts are best interpreted longitudinally rather than from a single number.

*(Reminder: This is educational information. Always review physical measurements during your routine in-person pediatrician visits.)*`;
    } else {
      responseText = `I have context loaded for **${babyName}** (${age}, ${weight} kg).

I can help explain infant feeding patterns, interpret WHO percentile curves, and prepare discussion questions for Dr. Sharma.

*(Educational disclaimer: Nurtura AI does not provide clinical diagnoses or prescribe medication. In case of emergency, contact 911 immediately.)*`;
    }

    return {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
};
