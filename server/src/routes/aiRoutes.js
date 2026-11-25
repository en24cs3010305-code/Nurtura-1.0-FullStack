import express from 'express';
import { getStore } from '../config/db.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { babyId, question } = req.body;
    if (!question) {
      return res.status(400).json({ success: false, message: 'Question parameter is required' });
    }

    const store = getStore();
    const baby = store.babies.find(b => b.id === babyId) || store.babies[0];
    const babyName = baby ? baby.name : 'your baby';
    const age = baby ? baby.ageText : '6 months old';
    const weight = baby ? baby.currentWeightKg : 7.8;
    const height = baby ? baby.currentHeightCm : 67.5;

    const q = question.toLowerCase();
    let answerText = '';

    if (q.includes('growth') || q.includes('measurement') || q.includes('weight') || q.includes('height')) {
      answerText = `Based on the latest clinical measurements for **${babyName}** (${age}):
- **Current Weight:** ${weight} kg (~56th percentile WHO).
- **Current Length:** ${height} cm (~58th percentile WHO).

**Pediatric Guidance:**
${babyName}'s growth curve shows steady velocity. Consistently following along a percentile band is the strongest indicator of thriving infant nutrition. Always review longitudinal trajectories during routine pediatric encounters.`;
    } else if (q.includes('pediatrician') || q.includes('discuss') || q.includes('appointment')) {
      answerText = `Key topics to discuss with your pediatrician at ${babyName}'s upcoming visit:
1. **Starting Solids:** Developmental cues (sitting readiness, tongue-thrust reflex) and single-ingredient puree pacing.
2. **Sleep Milestones:** Wake window transitions for ${age}.
3. **Upcoming Vaccines:** Questions regarding the 6-month immunization series and post-vaccine comfort measures.
4. **Physical Progress:** Rolling endurance and tripod sitting strength.`;
    } else if (q.includes('feeding') || q.includes('milk') || q.includes('solid')) {
      answerText = `**Infant Feeding Pacing Guidelines (${age}):**
- **Primary Foundation:** Breastmilk or infant formula remains the primary source of nutrients (typically 24–32 oz or 700–950 ml per 24 hours).
- **Introducing Solids:** Introduce single-ingredient purees (like sweet potato, avocado, iron-fortified oat cereal) one at a time, waiting 2–3 days between new foods to monitor for allergic reactions.`;
    } else if (q.includes('emergency') || q.includes('fever') || q.includes('breathing') || q.includes('urgent')) {
      answerText = `⚠️ **EMERGENCY MEDICAL ADVISORY**

If your infant has rapid or labored breathing, bluish lips, persistent high fever (>101.3°F / 38.5°C), seizures, lethargy, or inability to keep liquids down, **call 911 or visit the nearest pediatric emergency room immediately.**

Do not attempt to administer unprescribed medications or home remedies during an acute crisis.

*(Clinical Safety Disclaimer: Nurtura AI is an educational support tool and cannot triage acute medical emergencies or substitute for emergency pediatric care.)*`;
    } else {
      answerText = `I have context loaded for **${babyName}** (${age}, ${weight} kg).

I can explain routine feeding amounts, interpret WHO percentile trajectories, prepare discussion topics for your pediatrician Dr. Sharma, and summarize daily sleep logs.

*(Clinical Safety Disclaimer: Nurtura AI provides educational guidance only and does not diagnose conditions or prescribe medications. Always consult your licensed pediatrician.)*`;
    }

    res.json({
      success: true,
      data: {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
