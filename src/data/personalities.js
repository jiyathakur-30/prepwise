export const personalities = [
  {
    id: 'friendly-sophia',
    name: 'Sophia',
    role: 'Friendly Coach',
    avatarInitials: 'SO',
    description: 'Empathetic, supportive, and focus-oriented. Ideal for building confidence, reducing public-speaking anxiety, and refining basic structured narratives.',
    pressureLevel: 1,
    accentColor: '#10B981', // Emerald green
    focusText: 'Encouraging advice & structured growth',
    greeting: "Hi there! I'm Sophia, your coaching partner today. We're here to learn and refine your answers in a safe, constructive space. Take a deep breath, and let's tackle these questions together!",
    commentaryTiers: {
      strong: "That was an incredibly insightful explanation! You explained that with wonderful clarity and structured it beautifully. Let's build on this momentum and dive a bit deeper.",
      average: "A really solid effort! You've got the core concept down. I think we can make it even better by adding a touch more technical detail. Let's try the next one!",
      weak: "I love your energy! You covered the surface-level idea nicely. Let's work on reinforcing the absolute fundamentals before we scale up difficulty. Here is a constructive sub-prompt to guide you."
    }
  },
  {
    id: 'faang-vikram',
    name: 'Vikram',
    role: 'FAANG Interviewer',
    avatarInitials: 'VI',
    description: 'Highly structured, standard-compliant, and precise. Calibrated to match standard Big-Tech (Google/Meta) loops, evaluating precise tradeoffs and performance complexities.',
    pressureLevel: 3,
    accentColor: '#00D4FF', // Cyan
    focusText: 'Tradeoffs, complexity & big-tech standards',
    greeting: "Hello, I'm Vikram. I'll be conducting your technical assessment today. I'm looking for strong concept clarity, explicit architectural tradeoffs, and optimal asymptotic efficiency. Let's begin.",
    commentaryTiers: {
      strong: "Excellent technical depth. You laid out the architectural mechanics with high clarity. Let's move deeper into rendering and scalability optimization under load.",
      average: "Good direction. You understand the primary interface, but I want to see you discuss the underlying tradeoffs or algorithmic complexities more. Let's continue.",
      weak: "You've touched on the basic concept, but a FAANG loop requires concrete implementation specifics. Let's step back and reinforce core mechanisms before proceeding."
    }
  },
  {
    id: 'strict-marcus',
    name: 'Marcus',
    role: 'Strict Technical Lead',
    avatarInitials: 'MA',
    description: 'Blunt, code-focused, and highly demanding. Calibrated for system engineers who need to demonstrate absolute hardware/internal execution awareness under pressure.',
    pressureLevel: 5,
    accentColor: '#FF5733', // Red-Orange
    focusText: 'System internals, micro-optimization & direct logic',
    greeting: "Marcus here. I'm a principal engineer. I don't care about buzzwords; I care about what happens under the hood. Show me you understand compiler execution, thread barriers, and memory layout. No hand-waving.",
    commentaryTiers: {
      strong: "About time. A precise, low-level explanation with zero fluff. Finally, someone who understands compiler behavior under the hood. Let's see if you can keep this up on scaling queries.",
      average: "Acceptable, but you're still hand-waving the low-level details. Exactly which thread barriers or index operations are you triggering? Let's see if you can clarify this in the next round.",
      weak: "Highly superficial. That answer might fly in a general scrum, but it doesn't show you know how memory allocation actually works. Let's force a fundamentals check right now."
    }
  },
  {
    id: 'hr-sarah',
    name: 'Sarah',
    role: 'HR Recruiter',
    avatarInitials: 'SA',
    description: 'Behavior-heavy, culture-oriented, and looking for strong soft skills. Extremely observant of communication pacing, the STAR method, and collaborative maturity.',
    pressureLevel: 2,
    accentColor: '#7C5CFF', // Purple
    focusText: 'STAR methodology, conflict resolution & teamwork',
    greeting: "Hi! I'm Sarah from Talent Acquisition. I want to hear about your professional journey, how you resolve interpersonal friction, and how you steer ambiguous projects to success. Let's get to know you!",
    commentaryTiers: {
      strong: "Wonderful storytelling! You demonstrated extreme ownership and structured your actions and results in a textbook STAR format. Let's see how you handle situational pressure next.",
      average: "Interesting background. I appreciate the context, but make sure you highlight your specific actions and the tangible results more than the team's general tasks. Let's keep going.",
      weak: "That was a bit unstructured. In behavioral loops, it's vital to hear a clear sequence of events. Let's try to focus on a concrete scenario and apply a structured layout."
    }
  },
  {
    id: 'founder-elon',
    name: 'Elon',
    role: 'Startup Founder',
    avatarInitials: 'EL',
    description: 'Rapid-fire, highly dynamic, and product-focused. Calibrated for fast-growing startups where adaptability, raw speed, scale, and customer impact are everything.',
    pressureLevel: 4,
    accentColor: '#FFD700', // Gold
    focusText: 'Speed of shipping, customer value & scalable vision',
    greeting: "Hey! Elon here. We are shipping fast, breaking monoliths, and building systems that handle millions of requests tomorrow. I want to see rapid-fire decisions, extreme resourcefulness, and massive ambition. Let's fly.",
    commentaryTiers: {
      strong: "Insane speed and great execution vision! You clearly know how to ship high-impact features under extreme timelines. Let's scale this system to 10x load right now.",
      average: "Decent outline, but you're thinking too small. How does this system help us scale and acquire our next 100k users? Show me more entrepreneurial drive in your next response.",
      weak: "Too slow and overly academic. We don't have six months to refactor this architecture. Show me how you'd patch this together for immediate launch, and let's keep the pace fast."
    }
  }
];
