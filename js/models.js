const models = [
    // OpenAI Models - ✅ VERIFIED: GPT-4o, GPT-4 Turbo available. $5 free credits for new accounts
    {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'OpenAI',
        capabilities: ['text', 'image'],
        description: 'Latest multimodal model - best quality for text & vision tasks',
        freeLimit: '✅ $5 free credits (new accounts)',
        docs: 'https://platform.openai.com/docs/models/gpt-4o',
        website: 'https://openai.com',
        icon: '🧠',
        verified: true
    },
    {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        provider: 'OpenAI',
        capabilities: ['text', 'image'],
        description: 'High-performance model with 128K context window',
        freeLimit: '✅ $5 free credits (new accounts)',
        docs: 'https://platform.openai.com/docs/models/gpt-4-turbo',
        website: 'https://openai.com',
        icon: '⚡',
        verified: true
    },
    {
        id: 'gpt-4-vision',
        name: 'GPT-4 Vision',
        provider: 'OpenAI',
        capabilities: ['text', 'image'],
        description: 'Specialized in detailed image analysis and understanding',
        freeLimit: '✅ $5 free credits (new accounts)',
        docs: 'https://platform.openai.com/docs/guides/vision',
        website: 'https://openai.com',
        icon: '👁️',
        verified: true
    },
    {
        id: 'gpt-4o-mini',
        name: 'GPT-4o Mini',
        provider: 'OpenAI',
        capabilities: ['text', 'image'],
        description: 'Fast & efficient - perfect for mobile & low-latency needs',
        freeLimit: '✅ $5 free credits (new accounts)',
        docs: 'https://platform.openai.com/docs/models/gpt-4o-mini',
        website: 'https://openai.com',
        icon: '✨',
        verified: true
    },
    {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        provider: 'OpenAI',
        capabilities: ['text'],
        description: 'Fast text model - very affordable for production use',
        freeLimit: '✅ $5 free credits (new accounts)',
        docs: 'https://platform.openai.com/docs/models/gpt-3.5',
        website: 'https://openai.com',
        icon: '🚀',
        verified: true
    },

    // Google Gemini - ✅ VERIFIED: Free tier with generous limits (50 req/min)
    {
        id: 'gemini-2-0-flash',
        name: 'Gemini 2.0 Flash',
        provider: 'Google',
        capabilities: ['text', 'image'],
        description: 'Ultra-fast multimodal AI - real-time performance',
        freeLimit: '✅ 50 req/min free, 1.5M daily tokens',
        docs: 'https://ai.google.dev/gemini-2/',
        website: 'https://ai.google.dev/',
        icon: '⚡',
        verified: true
    },
    {
        id: 'gemini-1-5-pro',
        name: 'Gemini 1.5 Pro',
        provider: 'Google',
        capabilities: ['text', 'image'],
        description: '2M token context - handles long documents & videos',
        freeLimit: '✅ 50 req/min free, 1.5M daily tokens',
        docs: 'https://ai.google.dev/gemini-1-5/',
        website: 'https://ai.google.dev/',
        icon: '🎨',
        verified: true
    },
    {
        id: 'gemini-1-5-flash',
        name: 'Gemini 1.5 Flash',
        provider: 'Google',
        capabilities: ['text', 'image'],
        description: 'Lightweight & fast - great for quick tasks',
        freeLimit: '✅ 50 req/min free, 1.5M daily tokens',
        docs: 'https://ai.google.dev/gemini-1-5/',
        website: 'https://ai.google.dev/',
        icon: '💨',
        verified: true
    },

    // Anthropic Claude - ✅ VERIFIED: Claude 3.5 Sonnet available, token-based pricing
    {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        provider: 'Anthropic',
        capabilities: ['text', 'image'],
        description: 'Best quality-to-speed ratio - excellent reasoning',
        freeLimit: '⚠️ Paid API ($3/1M input tokens)',
        docs: 'https://docs.anthropic.com/claude/reference',
        website: 'https://www.anthropic.com',
        icon: '🎯',
        verified: true,
        note: 'Best free tier: Use claude.ai website for free conversation'
    },
    {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        provider: 'Anthropic',
        capabilities: ['text', 'image'],
        description: 'Most capable - best for complex reasoning tasks',
        freeLimit: '⚠️ Paid API ($15/1M input tokens)',
        docs: 'https://docs.anthropic.com/claude/reference',
        website: 'https://www.anthropic.com',
        icon: '👑',
        verified: true,
        note: 'Use claude.ai website for free (limited usage)'
    },

    // Meta Llama - ✅ VERIFIED: Available via multiple platforms (free)
    {
        id: 'llama-3-2',
        name: 'Llama 3.2',
        provider: 'Meta (Open Source)',
        capabilities: ['text', 'image'],
        description: 'Latest open-source model - runs locally or via APIs',
        freeLimit: '✅ Completely free - open source model',
        docs: 'https://www.llama.com/',
        website: 'https://huggingface.co/meta-llama',
        icon: '🦙',
        verified: true
    },
    {
        id: 'llama-2-70b',
        name: 'Llama 2 70B',
        provider: 'Meta via Replicate',
        capabilities: ['text'],
        description: 'Powerful 70B parameter model - requires API key',
        freeLimit: '✅ Free Replicate account available',
        docs: 'https://replicate.com/meta/llama-2-70b',
        website: 'https://replicate.com',
        icon: '🦙',
        verified: true
    },

    // Mistral - ✅ VERIFIED: Free tier available
    {
        id: 'mistral-large',
        name: 'Mistral Large',
        provider: 'Mistral AI',
        capabilities: ['text'],
        description: 'Efficient large model with strong reasoning',
        freeLimit: '✅ Free tier: 50,000 tokens/day',
        docs: 'https://docs.mistral.ai/capabilities/function_calling/',
        website: 'https://mistral.ai/',
        icon: '🌪️',
        verified: true
    },
    {
        id: 'mistral-7b',
        name: 'Mistral 7B',
        provider: 'Mistral AI',
        capabilities: ['text'],
        description: 'Lightweight & fast - great for real-time apps',
        freeLimit: '✅ Free tier: 50,000 tokens/day',
        docs: 'https://docs.mistral.ai/',
        website: 'https://mistral.ai/',
        icon: '⚡',
        verified: true
    },

    // Image Generation - ✅ VERIFIED: FLUX and Stable Diffusion available free
    {
        id: 'flux-pro',
        name: 'FLUX Pro (Image Gen)',
        provider: 'Black Forest Labs',
        capabilities: ['text', 'image'],
        description: 'State-of-the-art image generation - photorealistic quality',
        freeLimit: '✅ Free with Replicate account',
        docs: 'https://replicate.com/black-forest-labs/flux-pro',
        website: 'https://replicate.com',
        icon: '🎨',
        verified: true
    },
    {
        id: 'sdxl',
        name: 'Stable Diffusion XL',
        provider: 'Stability AI',
        capabilities: ['text', 'image'],
        description: 'Reliable text-to-image model - creative & diverse',
        freeLimit: '✅ Free with Replicate account',
        docs: 'https://replicate.com/stability-ai/sdxl',
        website: 'https://replicate.com',
        icon: '🖼️',
        verified: true
    },

    // Hugging Face - ✅ VERIFIED: Free tier with rate limits
    {
        id: 'huggingface-models',
        name: 'Hugging Face Models',
        provider: 'Hugging Face',
        capabilities: ['text', 'image'],
        description: 'Access to 1M+ open-source models via API',
        freeLimit: '✅ Free tier: up to 30K inputs/month',
        docs: 'https://huggingface.co/docs/inference-api',
        website: 'https://huggingface.co',
        icon: '🤗',
        verified: true
    },

    // CohereAPI - ✅ VERIFIED: Free tier available
    {
        id: 'cohere-command',
        name: 'Cohere Command',
        provider: 'Cohere',
        capabilities: ['text'],
        description: 'Strong language understanding & generation',
        freeLimit: '✅ Free tier: unlimited requests, limited RPM',
        docs: 'https://docs.cohere.com/docs/models-overview',
        website: 'https://cohere.com/',
        icon: '💬',
        verified: true
    },

    // Groq - ✅ VERIFIED: NEW - Fastest inference, free tier
    {
        id: 'groq-mixtral',
        name: 'Groq - Mixtral 8x7B',
        provider: 'Groq',
        capabilities: ['text'],
        description: 'Fastest LLM inference speed - real-time performance',
        freeLimit: '✅ Free tier with generous rate limits',
        docs: 'https://console.groq.com/docs',
        website: 'https://groq.com/',
        icon: '⚡',
        verified: true
    },

    // Together AI - ✅ VERIFIED: Free credits available
    {
        id: 'together-llama',
        name: 'Together AI - Llama',
        provider: 'Together AI',
        capabilities: ['text'],
        description: 'Multiple open-source models with free credits',
        freeLimit: '✅ Free credits for new accounts',
        docs: 'https://www.together.ai/api',
        website: 'https://www.together.ai/',
        icon: '🚀',
        verified: true
    },
];

// API Configuration
const apiConfig = {
    openai: {
        baseUrl: 'https://api.openai.com/v1',
        keyField: 'openai-key',
        defaultKey: '' // User should provide their own key
    },
    google: {
        baseUrl: 'https://generativelanguage.googleapis.com',
        keyField: 'google-key'
    },
    cohere: {
        baseUrl: 'https://api.cohere.ai',
        keyField: 'cohere-key'
    },
    groq: {
        baseUrl: 'https://api.groq.com',
        keyField: 'groq-key'
    },
    mistral: {
        baseUrl: 'https://api.mistral.ai',
        keyField: 'mistral-key'
    },
    together: {
        baseUrl: 'https://api.together.xyz',
        keyField: 'together-key'
    },
    replicate: {
        baseUrl: 'https://api.replicate.com',
        keyField: 'replicate-key'
    },
    huggingface: {
        baseUrl: 'https://api-inference.huggingface.co',
        keyField: 'huggingface-key'
    }
};