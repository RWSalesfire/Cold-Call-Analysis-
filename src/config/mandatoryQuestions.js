// Mandatory 5-Step Discovery Flow for Salesfire SDRs
// SDRs must ask these questions (or contextual variations) in each cold call

export const MANDATORY_QUESTIONS = [
  {
    id: 'current-state',
    step: 1,
    category: 'Current State',
    question: "How's Klaviyo performing for you at the moment?",
    purpose: 'Opens conversation, lets them talk. Pause — let them answer fully.',
    acceptableVariations: [
      "How's Klaviyo working for you?",
      "What's your experience been with Klaviyo?",
      "How are you finding Klaviyo?",
      "Tell me about your Klaviyo setup",
      "How's your email marketing performing?",
      "What's your current email marketing setup like?"
    ],
    keyThemes: [
      'klaviyo performance',
      'email marketing performance',
      'current email setup',
      'how things are working'
    ]
  },
  {
    id: 'problem-surfacing',
    step: 2,
    category: 'Problem Surfacing',
    question: "A lot of the Klaviyo retailers we talk to say when they compare their site traffic to their flow sends, the numbers don't add up — visitors are falling through the cracks. Is that something you've noticed?",
    purpose: 'Plants the problem, uses social proof. Pause after — silence draws out more.',
    acceptableVariations: [
      "Do you find there's a gap between your site traffic and who you're actually capturing in Klaviyo?",
      "When you look at your traffic vs your email sends, do the numbers match up?",
      "Are you capturing everyone who visits your site in your email flows?",
      "Do you ever feel like you're missing visitors in your Klaviyo flows?",
      "Have you noticed visitors disappearing between browsing and your email flows?"
    ],
    keyThemes: [
      'traffic vs flow sends',
      'visitors falling through cracks',
      'gap in tracking',
      'missing visitors',
      'capture rate issues'
    ]
  },
  {
    id: 'micro-commitment',
    step: 3,
    category: 'Micro-Commitment',
    question: "Would it be useful if I explained why that happens?",
    purpose: 'Gets a small yes, positions as helpful not pitchy.',
    acceptableVariations: [
      "Would you like me to explain what's causing that?",
      "Can I share why this happens?",
      "Would it help if I walked you through the reason?",
      "Want me to explain the gap?",
      "Should I explain what's going on there?"
    ],
    keyThemes: [
      'would it be useful',
      'can I explain',
      'would you like',
      'permission to share',
      'helpful explanation'
    ]
  },
  {
    id: 'blind-spot',
    step: 4,
    category: 'Digging into Blind Spot',
    question: "Most teams don't have a way to see the visitors coming back on different devices or outside the cookie window. Is that the same for you?",
    purpose: 'Normalises the gap — no one feels tested.',
    acceptableVariations: [
      "Do you track visitors across different devices?",
      "Can you see when someone returns on a different device?",
      "Are you tracking beyond the 7-day cookie window?",
      "Do you have visibility into cross-device behavior?",
      "Can your system track visitors outside the cookie window?"
    ],
    keyThemes: [
      'cross-device tracking',
      'different devices',
      'cookie window',
      'visitor tracking limitations',
      'device switching'
    ]
  },
  {
    id: 'demo-close',
    step: 5,
    category: 'Demo Close',
    question: "Our retailers using AI Connect are recovering on average 200% more revenue through their Klaviyo flows — would it be worth 20 minutes with one of our team to see what that could look like for you?",
    purpose: 'Ties stat to action, specific time ask.',
    acceptableVariations: [
      "Would it be worth jumping on a quick call to see what this could look like for you?",
      "Should we schedule 20 minutes to walk through how this would work for your brand?",
      "Would it make sense to have a quick demo to show you the numbers?",
      "Want to see what this could mean for your Klaviyo performance?",
      "Shall we book in a demo to go through the potential impact?"
    ],
    keyThemes: [
      'demo invitation',
      'schedule time',
      'show you how it works',
      'worth a call',
      'meeting request'
    ]
  }
];

export const getQuestionById = (id) => {
  return MANDATORY_QUESTIONS.find(q => q.id === id);
};

export const getTotalMandatoryQuestions = () => {
  return MANDATORY_QUESTIONS.length;
};
