/* chatbot.js — Groq AI Chatbot for Dhruv's Portfolio */

(function () {
  const GROQ_API_KEY = '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';
  const GROQ_MODEL = 'llama3-8b-8192';
  const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

  const SYSTEM_PROMPT = `You are DhruvBot, a smart AI assistant embedded in Dhruv Chandrawanshi's portfolio website. Your job is to help visitors learn about Dhruv and his work.

About Dhruv:
- Full-stack web developer & designer based in India
- Expert in Web Designing, AI Web Development, AI Automation, and Telegram Bot Development
- Contact: dxruxx@gmail.com | WhatsApp: +91 9540693239
- LinkedIn: https://www.linkedin.com/in/dhruv-chandrawanshi-31844b3bb/
- GitHub: https://github.com/mth25059-commits
- Portfolio projects: dema-gamma.vercel.app, krishna-lyart.vercel.app, dhruvdevelopre-ggqn.vercel.app, dr-vivek-gogia.vercel.app, dhruv-pi.vercel.app, vetvet-phi.vercel.app, petvet-lilac.vercel.app, cure-of-eyes.vercel.app, purevision-virid.vercel.app

Be friendly, technical, and enthusiastic. Keep replies concise (2-4 sentences). If asked about hiring or projects, direct to email. Respond in the same language the user writes in.`;

  const chatPanel = document.getElementById('chatbot-panel');
  const chatToggle = document.getElementById('chatbot-toggle');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  if (!chatPanel || !chatToggle) return;

  const conversationHistory = [];
  let isOpen = false;
  let isLoading = false;

  // Toggle panel
  chatToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    chatPanel.classList.toggle('open', isOpen);
    if (isOpen && chatMessages.children.length === 0) {
      addBotMessage("Hey! I'm DhruvBot 🤖 Ask me anything about Dhruv's skills, projects, or how to hire him!");
    }
  });

  // Send on button click
  chatSend.addEventListener('click', sendMessage);

  // Send on Enter
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  function addBotMessage(text) {
    const div = document.createElement('div');
    div.className = 'msg bot';
    div.textContent = text;
    chatMessages.appendChild(div);
    scrollBottom();
  }

  function addUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'msg user';
    div.textContent = text;
    chatMessages.appendChild(div);
    scrollBottom();
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'msg-typing';
    div.id = 'typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(div);
    scrollBottom();
    return div;
  }

  function removeTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  function scrollBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || isLoading) return;

    isLoading = true;
    chatInput.value = '';
    addUserMessage(text);

    conversationHistory.push({ role: 'user', content: text });

    const typingEl = showTyping();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) throw new Error(`API error ${response.status}`);

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Hmm, I couldn't get a response. Try again!";

      conversationHistory.push({ role: 'assistant', content: reply });

      removeTyping();
      addBotMessage(reply);

    } catch (err) {
      removeTyping();
      addBotMessage("Oops! Something went wrong. Please try again or reach Dhruv directly at dxruxx@gmail.com");
      console.error('Chatbot error:', err);
    } finally {
      isLoading = false;
    }
  }

})();
