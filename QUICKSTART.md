# Quick Start Guide

Get up and running with the Cold Call Reviewer in 5 minutes.

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- Other required dependencies

## Step 2: Get Your API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign in or create an account
3. Navigate to API Keys
4. Create a new API key
5. Copy it (you'll need it in the app)

## Step 3: Start the Dev Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Step 4: Use the App

1. **Enter API Key**: When prompted, paste your Anthropic API key
2. **Paste Transcript**: Copy a call transcript and paste it in the text area
3. **Optional**: Select the call outcome
4. **Click Review**: Click the "🔥 Review My Call" button
5. **Read Feedback**: Review your comprehensive feedback

## Step 5: Reference the Question Guide

Click the floating "📋 Question Guide" button (bottom right) to see:
- All 5 mandatory discovery questions
- Acceptable variations
- Purpose of each question
- Key themes to include

## Example Transcript

Here's a sample transcript you can use to test:

```
SDR: Hi, is this Mark?

Prospect: Yes, this is Mark.

SDR: Hi Mark, this is Katie from Salesfire. Do you have 30 seconds for me to explain why I'm calling?

Prospect: Sure, go ahead.

SDR: Thanks! I noticed you're using Klaviyo for your email marketing. How's that performing for you at the moment?

Prospect: It's going okay, I guess. We use it for our abandoned cart emails.

SDR: That's great. A lot of the Klaviyo retailers we talk to mention that when they compare their site traffic to their flow sends, the numbers don't really add up—like visitors are falling through the cracks. Is that something you've noticed?

Prospect: Hmm, I haven't really looked at it that way. We do seem to have fewer people in our flows than I'd expect.

SDR: Yeah, that's really common. Would it be useful if I explained why that happens?

Prospect: Sure, I'm curious.

SDR: So most teams don't have a way to see the visitors coming back on different devices or outside the cookie window. Is that the same for you?

Prospect: I'm not sure, to be honest. I don't think we track cross-device.

SDR: That makes sense—most don't. Our retailers using AI Connect are recovering on average 200% more revenue through their Klaviyo flows by solving exactly this. Would it be worth 20 minutes with one of our team to see what that could look like for you?

Prospect: Yeah, that sounds interesting. Let's schedule something.

SDR: Perfect! Does Thursday at 2pm or Friday at 10am work better for you?

Prospect: Thursday at 2pm works.

SDR: Excellent. I'll send you a calendar invite to [email]. Thanks Mark!
```

## Tips for Best Results

1. **Complete Transcripts**: Include the full conversation, not just snippets
2. **Clear Format**: Use "SDR:" and "Prospect:" labels
3. **Include Outcome**: Specify if a demo was booked for better analysis
4. **Review Question Guide**: Before calls, review the mandatory questions
5. **Be Honest**: The AI is supportive—it's here to help you improve

## Common Issues

### API Key Not Working
- Make sure you copied the entire key (starts with `sk-ant-`)
- Check that your Anthropic account has credits
- Try generating a new key

### Review Taking Too Long
- Long transcripts may take 15-30 seconds
- Check your internet connection
- Verify the API key is valid

### Formatting Issues
- Make sure your transcript has clear speaker labels
- Avoid extra formatting or special characters
- Keep it simple: "SDR: [text]" and "Prospect: [text]"

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Customize the mandatory questions in `src/config/mandatoryQuestions.js`
- Adjust the evaluation criteria in `src/config/systemPrompt.js`
- Build for production with `npm run build`

---

**Need Help?** Check the main README or create an issue on GitHub.
