# 🔥 Cold Call Reviewer - Salesfire SDR Tool

An AI-powered cold call transcript reviewer built for Salesfire SDRs. Get supportive, actionable feedback on your cold calls with automatic validation of the mandatory 5-step discovery flow.

## Features

### 🎯 Mandatory Question Tracking
- Validates that SDRs ask all 5 required discovery questions
- Uses AI-based semantic matching to detect variations
- Clear visual indicators (✅/❌) showing which questions were asked
- Dedicated section highlighting missed questions with recommended phrasing

### 📊 Comprehensive Call Analysis
Scores calls across 10 key areas:
1. Gatekeeper Handling
2. Opener
3. Personalisation & Research
4. Discovery & Questioning
5. Qualifying Questions
6. Call Control
7. Tone & Energy
8. Value Proposition & Relevance
9. Objection Handling
10. Close & Next Steps

### 💡 Supportive Coaching
- Warm, encouraging tone
- Leads with what you did well
- Frames improvements as growth opportunities
- Includes specific script tweaks and alternatives
- Salesfire-specific product recommendations

### 📋 Question Reference Guide
- Floating button with quick access to all mandatory questions
- Shows acceptable variations for each question
- Explains the purpose and key themes for each step
- Helps SDRs prepare before calls

## The Mandatory 5-Step Discovery Flow

Every cold call must include these questions (or contextual variations):

| Step | Question Type | Standard Question | Purpose |
|------|--------------|-------------------|---------|
| 1 | Current State | "How's Klaviyo performing for you at the moment?" | Opens conversation, lets them talk |
| 2 | Problem Surfacing | "A lot of the Klaviyo retailers we talk to say when they compare their site traffic to their flow sends, the numbers don't add up — visitors are falling through the cracks. Is that something you've noticed?" | Plants the problem, uses social proof |
| 3 | Micro-Commitment | "Would it be useful if I explained why that happens?" | Gets a small yes, positions as helpful |
| 4 | Blind Spot | "Most teams don't have a way to see the visitors coming back on different devices or outside the cookie window. Is that the same for you?" | Normalises the gap |
| 5 | Demo Close | "Our retailers using AI Connect are recovering on average 200% more revenue through their Klaviyo flows — would it be worth 20 minutes with one of our team to see what that could look like for you?" | Ties stat to action |

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com/))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Cold-Call-Analysis-
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## Usage

1. **Enter API Key**: On first use, enter your Anthropic API key (stored locally in your browser)
2. **Paste Transcript**: Copy and paste your call transcript into the text area
3. **Select Outcome** (optional): Choose the call outcome from the dropdown
4. **Review Call**: Click "🔥 Review My Call" to get your feedback
5. **View Results**: Read through the comprehensive feedback, including:
   - Overall score and breakdown by area
   - Mandatory question tracker showing which questions were asked
   - What you nailed
   - Growth opportunities
   - Script tweaks to try
   - Salesfire-specific recommendations

### Accessing the Question Guide

Click the "📋 Question Guide" button in the bottom right corner to view:
- All 5 mandatory questions
- Acceptable variations for each
- Purpose and key themes
- Quick reference before or during calls

## Project Structure

```
Cold-Call-Analysis-/
├── src/
│   ├── components/
│   │   ├── ColdCallReviewer.jsx    # Main reviewer component
│   │   └── QuestionReference.jsx   # Question guide modal
│   ├── config/
│   │   ├── mandatoryQuestions.js   # 5-step discovery flow definition
│   │   ├── salesfireContext.js     # Product knowledge & case studies
│   │   └── systemPrompt.js         # AI evaluation prompt
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Tailwind styles
├── public/                         # Static assets
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS config
└── README.md                       # This file
```

## Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI**: Claude Sonnet 4 (Anthropic API)
- **Language**: JavaScript (ESM)

## Configuration

### Customizing Mandatory Questions

Edit `src/config/mandatoryQuestions.js` to modify:
- Question wording
- Acceptable variations
- Key themes for semantic matching
- Question purposes

### Updating Product Knowledge

Edit `src/config/salesfireContext.js` to update:
- Product descriptions
- Case studies
- Key differentiators
- Platform integrations

### Modifying Evaluation Criteria

Edit `src/config/systemPrompt.js` to adjust:
- Scoring rubrics
- Evaluation framework
- Output format
- Coaching tone

## API Key Security

- API keys are stored only in your browser's memory during the session
- Never committed to version control
- Never sent to any server except Anthropic's API
- Can be changed at any time via the settings

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new components in `src/components/`
2. Add configuration in `src/config/`
3. Import and use in `src/App.jsx`

## Roadmap

Future enhancements could include:
- [ ] Save review history locally
- [ ] Export reviews as PDF
- [ ] Team analytics dashboard
- [ ] Audio transcription integration
- [ ] Custom evaluation frameworks
- [ ] Multi-language support

## Support

For questions or issues:
- Check existing GitHub issues
- Create a new issue with details
- Contact the Salesfire SDR team

## License

MIT

---

**Built for Salesfire SDRs** • Every dial is progress 💪

Remember: The fact you're reviewing your calls puts you ahead of 90% of reps.
