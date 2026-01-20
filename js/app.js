// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, models available:', typeof models !== 'undefined');
    if (typeof models !== 'undefined') {
        initializeApp();
        loadImagePreview();
        setupEventListeners();
    } else {
        console.error('Models not loaded! Retrying in 500ms...');
        setTimeout(() => {
            if (typeof models !== 'undefined') {
                initializeApp();
                loadImagePreview();
                setupEventListeners();
            }
        }, 500);
    }
});

// Fallback initialization on window load
window.addEventListener('load', function() {
    if (!window.appInitialized && typeof models !== 'undefined') {
        console.log('Window load event - initializing app');
        initializeApp();
        loadImagePreview();
        setupEventListeners();
        window.appInitialized = true;
    }
});

// Initialize the app - populate models and UI
function initializeApp() {
    try {
        populateModelSelect();
        renderModelsGrid();
        renderModelsInfo();
    } catch (e) {
        console.error('Error initializing app:', e);
    }
}

// Populate the model select dropdown
function populateModelSelect() {
    const select = document.getElementById('model-select');
    if (!select) {
        console.error('model-select element not found');
        return;
    }
    if (!models || models.length === 0) {
        console.error('models not loaded or empty');
        return;
    }
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model.id;
        option.textContent = `${model.icon} ${model.name} (${model.provider})`;
        select.appendChild(option);
    });
    console.log('Model dropdown populated with', models.length, 'models');
}

// Render models as grid cards
function renderModelsGrid() {
    const grid = document.getElementById('modelsGrid');
    grid.innerHTML = '';
    
    models.forEach(model => {
        const card = document.createElement('div');
        card.className = 'model-card';
        card.onclick = () => {
            document.getElementById('model-select').value = model.id;
            updateModelInfo();
            document.querySelector('.playground-section').scrollIntoView({ behavior: 'smooth' });
        };
        
        const capsHTML = model.capabilities
            .map(cap => `<span class="cap-badge ${cap}">${cap === 'text' ? '📝 Text' : '🖼️ Image'}</span>`)
            .join('');
        
        card.innerHTML = `
            <div class="model-card-icon">${model.icon}</div>
            <h3>${model.name}</h3>
            <div class="model-card-provider">${model.provider}</div>
            <p>${model.description}</p>
            <div class="model-card-caps">${capsHTML}</div>
            <div style="font-size: 0.85rem; color: #10b981;">Free: ${model.freeLimit}</div>
        `;
        grid.appendChild(card);
    });
}

// Render detailed model info
function renderModelsInfo() {
    const infoContainer = document.getElementById('modelsInfo');
    infoContainer.innerHTML = '';
    
    // Group models by provider
    const grouped = {};
    models.forEach(model => {
        if (!grouped[model.provider]) {
            grouped[model.provider] = [];
        }
        grouped[model.provider].push(model);
    });
    
    Object.entries(grouped).forEach(([provider, providerModels]) => {
        const section = document.createElement('div');
        section.className = 'provider-section';
        
        let html = `<h3 style="color: #ec4899; margin-bottom: 15px;">📌 ${provider}</h3>`;
        
        providerModels.forEach(model => {
            html += `
                <div class="info-card" style="margin-bottom: 15px;">
                    <h3>${model.icon} ${model.name}</h3>
                    <p><strong>Capabilities:</strong> ${model.capabilities.join(', ').toUpperCase()}</p>
                    <p><strong>Free Limit:</strong> ${model.freeLimit}</p>
                    <p>${model.description}</p>
                    <div class="info-links">
                        <a href="${model.docs}" target="_blank" class="info-link">📖 Docs</a>
                        <a href="${model.website}" target="_blank" class="info-link">🌐 Website</a>
                    </div>
                </div>
            `;
        });
        
        section.innerHTML = html;
        infoContainer.appendChild(section);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Image input
    const imageInput = document.getElementById('image-input');
    if (imageInput) {
        imageInput.addEventListener('change', loadImagePreview);
    }
    
    // Text input with Ctrl+Enter support
    const textInput = document.getElementById('text-input');
    if (textInput) {
        textInput.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                sendToModel();
            }
        });
    }
    
    // Send button - explicit event listener for better mobile support
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Send button clicked');
            sendToModel();
        });
    }
    
    // API Settings button
    const apiSettingsBtn = document.getElementById('apiSettingsBtn');
    if (apiSettingsBtn) {
        apiSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('API Settings button clicked');
            openApiModal();
        });
    }
    
    // Close modal button (X button)
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Close modal button clicked');
            closeApiModal();
        });
    }
    
    // Close modal button (bottom Close button)
    const closeModalBtn2 = document.getElementById('closeModalBtn2');
    if (closeModalBtn2) {
        closeModalBtn2.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Close modal button 2 clicked');
            closeApiModal();
        });
    }
    
    // Save API keys button
    const saveKeysBtn = document.getElementById('saveKeysBtn');
    if (saveKeysBtn) {
        saveKeysBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Save keys button clicked');
            saveApiKeys();
        });
    }
}

// Load and display image preview
function loadImagePreview() {
    const input = document.getElementById('image-input');
    const preview = document.getElementById('image-preview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.innerHTML = '';
    }
}

// Open API Settings Modal
function openApiModal() {
    console.log('Opening API modal');
    const modal = document.getElementById('apiModal');
    if (modal) {
        modal.classList.add('show');
        loadSavedKeys();
    } else {
        console.error('apiModal element not found');
    }
}

// Close API Settings Modal
function closeApiModal() {
    console.log('Closing API modal');
    const modal = document.getElementById('apiModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('apiModal');
    if (modal && event.target === modal) {
        closeApiModal();
    }
});

// Update model info when selection changes
function updateModelInfo() {
    const selectedId = document.getElementById('model-select').value;
    const model = models.find(m => m.id === selectedId);
    
    if (model) {
        console.log('Selected model:', model);
    }
}

// Send message to selected AI model
async function sendToModel() {
    const selectedId = document.getElementById('model-select').value;
    const model = models.find(m => m.id === selectedId);
    
    if (!model) {
        alert('Please select a model first');
        return;
    }
    
    const textInput = document.getElementById('text-input').value.trim();
    const imageInput = document.getElementById('image-input');
    
    if (!textInput) {
        alert('Please enter a prompt');
        return;
    }
    
    showLoading(true);
    
    try {
        let response;
        
        // Route to appropriate API based on provider
        if (model.provider === 'OpenAI') {
            response = await callOpenAI(model, textInput, imageInput.files[0]);
        } else if (model.provider === 'Google') {
            response = await callGoogle(model, textInput, imageInput.files[0]);
        } else if (model.provider === 'Cohere') {
            response = await callCohere(model, textInput);
        } else if (model.provider === 'Groq') {
            response = await callGroq(model, textInput);
        } else if (model.provider === 'Mistral AI') {
            response = await callMistral(model, textInput);
        } else if (model.provider === 'Together AI') {
            response = await callTogether(model, textInput);
        } else if (model.provider.includes('Replicate')) {
            response = await callReplicate(model, textInput, imageInput.files[0]);
        } else if (model.provider === 'Meta (Open Source)' || model.provider === 'Hugging Face') {
            response = await callHuggingFace(model, textInput);
        } else {
            response = `ℹ️ ${model.name} selected!\n\nTo use this model:\n1. Get API key from: ${model.website}\n2. Click "API Key Settings" button\n3. Save your key and try again!\n\nDocs: ${model.docs}`;
        }
        
        displayResponse(response);
    } catch (error) {
        console.error('Error:', error);
        displayResponse(`❌ Error: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

// Call OpenAI API
async function callOpenAI(model, text, imageFile) {
    const apiKey = localStorage.getItem('openai-key');
    
    if (!apiKey) {
        throw new Error('❌ OpenAI API key required. Get free $5 credits at: https://platform.openai.com/api-keys');
    }
    
    let messages = [
        {
            role: 'user',
            content: text
        }
    ];
    
    // Add image if provided
    if (imageFile) {
        const base64 = await fileToBase64(imageFile);
        messages[0].content = [
            { type: 'text', text: text },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64}` } }
        ];
    }
    
    const response = await fetch(`${apiConfig.openai.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model.id,
            messages: messages,
            max_tokens: 1024,
            temperature: 0.7
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API Error');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Call Anthropic API
async function callAnthropic(model, text, imageFile) {
    const apiKey = localStorage.getItem('anthropic-key');
    
    if (!apiKey) {
        throw new Error('❌ Anthropic API key required. Free API at: https://console.anthropic.com/keys\n\nOR use Claude for free at: https://claude.ai');
    }
    
    let content = [
        { type: 'text', text: text }
    ];
    
    // Add image if provided
    if (imageFile) {
        const base64 = await fileToBase64(imageFile);
        content.unshift({
            type: 'image',
            source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: base64
            }
        });
    }
    
    const response = await fetch(`${apiConfig.anthropic.baseUrl}/v1/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: model.id,
            max_tokens: 1024,
            messages: [
                { role: 'user', content: content }
            ]
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API Error');
    }
    
    const data = await response.json();
    return data.content[0].text;
}

// Call Google Gemini API
async function callGoogle(model, text, imageFile) {
    const apiKey = localStorage.getItem('google-key');
    
    if (!apiKey) {
        throw new Error('❌ Google API key required. Get FREE key at: https://aistudio.google.com/app/apikey\n\n✅ FREE: 50 req/min, 1.5M daily tokens!');
    }
    
    let parts = [
        { text: text }
    ];
    
    // Add image if provided
    if (imageFile) {
        const base64 = await fileToBase64(imageFile);
        parts.unshift({
            inline_data: {
                mime_type: 'image/jpeg',
                data: base64
            }
        });
    }
    
    const response = await fetch(
        `${apiConfig.google.baseUrl}/v1beta/models/${model.id}:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    { parts: parts }
                ]
            })
        }
    );
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API Error');
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// Call Cohere API
async function callCohere(model, text) {
    const apiKey = localStorage.getItem('cohere-key');
    
    if (!apiKey) {
        throw new Error('❌ Cohere API key required. Get FREE key at: https://dashboard.cohere.ai/\n\n✅ FREE unlimited requests with rate limits');
    }
    
    const response = await fetch(`${apiConfig.cohere.baseUrl}/v1/generate`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: text,
            max_tokens: 500,
            temperature: 0.8
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API Error');
    }
    
    const data = await response.json();
    return data.generations[0].text;
}

// Call Groq API
async function callGroq(model, text) {
    const apiKey = localStorage.getItem('groq-key');
    
    if (!apiKey) {
        throw new Error('❌ Groq API key required. Get FREE key at: https://console.groq.com/\n\n⚡ FASTEST LLM inference available!');
    }
    
    const response = await fetch(`${apiConfig.groq.baseUrl}/openai/v1/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mixtral-8x7b-32768',
            messages: [
                { role: 'user', content: text }
            ],
            max_tokens: 1024,
            temperature: 0.7
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API Error');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Call Mistral API
async function callMistral(model, text) {
    const apiKey = localStorage.getItem('mistral-key');
    
    if (!apiKey) {
        throw new Error('❌ Mistral API key required. Get FREE key at: https://console.mistral.ai/\n\n✅ FREE: 50,000 tokens/day');
    }
    
    const response = await fetch(`${apiConfig.mistral.baseUrl}/v0.0/chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mistral-large-latest',
            messages: [
                { role: 'user', content: text }
            ],
            max_tokens: 1024
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API Error');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Call Together AI API
async function callTogether(model, text) {
    const apiKey = localStorage.getItem('together-key');
    
    if (!apiKey) {
        throw new Error('❌ Together AI key required. Get FREE credits at: https://www.together.ai/\n\n✅ NEW ACCOUNTS: Free tier available');
    }
    
    const response = await fetch(`${apiConfig.together.baseUrl}/inference`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mistralai/Mistral-7B-Instruct-v0.1',
            prompt: text,
            max_tokens: 1024,
            temperature: 0.7
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API Error');
    }
    
    const data = await response.json();
    return data.output.choices[0].text;
}

// Call Replicate API
async function callReplicate(model, text, imageFile) {
    const apiKey = localStorage.getItem('replicate-key');
    
    if (!apiKey) {
        throw new Error('❌ Replicate API key required. Get FREE account at: https://replicate.com/account/api-tokens\n\n✅ FREE tier available');
    }
    
    const response = await fetch(`${apiConfig.replicate.baseUrl}/v1/predictions`, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            version: model.id,
            input: { prompt: text }
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'API Error');
    }
    
    const data = await response.json();
    return `⏳ Replicate prediction created!\nStatus: ${data.status}\nView at: ${data.urls.get}`;
}

// Call Hugging Face API
async function callHuggingFace(model, text) {
    const apiKey = localStorage.getItem('huggingface-key');
    
    if (!apiKey) {
        throw new Error('❌ Hugging Face API key required. Get FREE key at: https://huggingface.co/settings/tokens\n\n✅ FREE: 30K inputs/month');
    }
    
    const response = await fetch(`${apiConfig.huggingface.baseUrl}/models/${model.id}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
        method: 'POST',
        body: JSON.stringify({ inputs: text }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API Error');
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data[0].generated_text : data.generated_text;
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
    });
}

// Display response in UI
function displayResponse(response) {
    const responseDiv = document.getElementById('response');
    const contentDiv = document.getElementById('responseContent');
    
    contentDiv.textContent = response;
    responseDiv.classList.add('show');
    
    // Scroll to response
    responseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show/hide loading spinner
function showLoading(show) {
    const loading = document.getElementById('loading');
    const sendBtn = document.get
function saveApiKeys() {
    const keys = ['openai-key', 'google-key', 'cohere-key', 'groq-key', 'mistral-key', 'together-key', 'replicate-key', 'huggingface-key'];
    keys.forEach(key => {
        const input = document.getElementById(key);
        if (input && input.value) {
            localStorage.setItem(key, input.value);
        } else {
            localStorage.removeItem(key);
        }
    });
    alert('✅ API keys saved locally to your browser!');
    closeApiModal(

// Save API keys to localStorage (for other providers)
function saveApiKeys() {
    const keys = ['anthropic-key', 'google-key', 'replicate-key', 'huggingface-key'];
    keys.forEach(keopenai-key', 'google-key', 'cohere-key', 'groq-key', 'mistral-key', 'together
        const input = document.getElementById(key);
        if (input && input.value) {
            localStorage.setItem(key, input.value);
        }
    });
    alert('API keys saved locally to your browser!');
}

// Load saved API keys
function loadSavedKeys() {
    const keys = ['openai-key', 'google-key', 'cohere-key', 'groq-key', 'mistral-key', 'together-key', 'replicate-key', 'huggingface-key'];
    keys.forEach(key => {
        const saved = localStorage.getItem(key);
        const input = document.getElementById(key);
        if (saved && input) {
            input.value = saved;
        }
    });
}

// Call loadSavedKeys on page load
window.addEventListener('load', loadSavedKeys);
