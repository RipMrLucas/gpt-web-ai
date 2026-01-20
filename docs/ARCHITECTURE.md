# Architecture & Technical Details

## Project Structure

```
gpt-web-ai/
├── index.html (single file with all code)
└── docs/
    ├── README.md
    ├── QUICK_START.md
    └── ARCHITECTURE.md (this file)
```

## Design Philosophy

**KISS Principle**: Keep It Simple Stupid

- ✅ Single HTML file (no build process needed)
- ✅ All JavaScript inline (no separate files)
- ✅ No external dependencies (no npm, no webpack)
- ✅ Pure vanilla HTML/CSS/JavaScript
- ✅ Works immediately when files are loaded

## Code Structure

### HTML (Lines 1-50)
- DOCTYPE, head, meta tags
- Embedded CSS (all styling inline)

### CSS (Lines 10-300)
- Dark theme (#0f172a background)
- Responsive grid layout
- Modal styling
- Button styles
- Loading animation

### Models Array (Lines ~600)
```javascript
const models = [
    {
        id: 'gpt-4o',
        name: 'GPT-4o (OpenAI)',
        provider: 'openai',
        description: '...',
        docs: '...',
        website: '...'
    },
    // ... 6 more models
];
```

### Key Functions

| Function | Purpose |
|----------|---------|
| `populateModels()` | Fill dropdown with model list |
| `displayModelsInfo()` | Show model details at bottom |
| `openModal()` | Show API key settings modal |
| `closeModal()` | Hide modal |
| `saveKeys()` | Save API keys to localStorage |
| `loadSavedKeys()` | Load keys from localStorage on page load |
| `sendMessage()` | Handle form submission, route to correct API |
| `callOpenAI()` | OpenAI API call |
| `callGoogle()` | Google Gemini API call |
| `callCohere()` | Cohere API call |
| `callGroq()` | Groq API call |
| `callMistral()` | Mistral API call |
| `callTogether()` | Together AI API call |

## API Integration

Each provider has its own endpoint and format:

### OpenAI
```
POST https://api.openai.com/v1/chat/completions
Headers: Authorization: Bearer {apiKey}
```

### Google Gemini
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
Query: ?key={apiKey}
```

### Cohere
```
POST https://api.cohere.ai/v1/generate
Headers: Authorization: Bearer {apiKey}
```

### Groq
```
POST https://api.groq.com/openai/v1/chat/completions
Headers: Authorization: Bearer {apiKey}
```

### Mistral
```
POST https://api.mistral.ai/v0.0/chat
Headers: Authorization: Bearer {apiKey}
```

### Together AI
```
POST https://api.together.xyz/inference
Headers: Authorization: Bearer {apiKey}
```

## Event Flow

1. **Page Load**
   - `window.addEventListener('load', ...)`
   - Call `populateModels()` → fills dropdown
   - Call `loadSavedKeys()` → restores saved API keys
   - Call `setupEventListeners()` → attach click handlers

2. **User Clicks API Settings**
   - `openModal()` → show modal with display: flex
   - Modal allows user to add/edit API keys

3. **User Clicks Save Keys**
   - `saveKeys()` → localStorage.setItem() for each key
   - Alert confirms success
   - Modal closes

4. **User Selects Model & Types Prompt**
   - Validates selection and prompt text

5. **User Clicks Send**
   - `sendMessage()` executes
   - Gets model details from array
   - Looks up stored API key
   - Routes to appropriate `call{Provider}()` function
   - Displays response

## Storage

API keys stored in browser's localStorage:
- Key: `openaiKey`, `googleKey`, `cohereKey`, etc.
- Value: The actual API key string
- Persistence: Until user clears browser data
- Security: Only accessible from same origin

## Styling Approach

All CSS is written inline in `<style>` tag:
- No external stylesheet needed
- No CSS files to load
- Instant styling

Color Scheme:
- Background: `#0f172a` (dark blue)
- Text: `#e2e8f0` (light gray)
- Primary: `#60a5fa` (blue)
- Success: `#10b981` (green)
- Danger: `#ec4899` (pink)

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (88+)
- Firefox (85+)
- Safari (14+)
- Mobile browsers (iOS Safari, Chrome Mobile)

Requirements:
- JavaScript enabled
- localStorage API support
- Fetch API support
- ES6+ support

## Performance

- **Initial Load**: ~50KB HTML file
- **No External Dependencies**: Nothing to load
- **No Build Step**: Paste and use immediately
- **API Calls**: Direct to provider (bypass any backend)

## Future Enhancements (Optional)

If you wanted to expand, you could:
- Add more models (Claude, Perplexity, etc.)
- Add streaming responses
- Add conversation history
- Add model comparison
- Add export/save chat feature
- Use Web Workers for processing

But currently: **It just works!**
