export const CHAT_SETTINGS_EVENT = 'algofort:chat-settings';
export const CHAT_STORAGE_KEY = 'algofort-chat-updated';
const icon = '<svg class="asc-brand-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M10 34v-4C10 17 19 10 32 10s22 7 22 20v4M10 34v5c0 12 10 18 23 18M32 5v16" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/><g fill="currentColor"><circle cx="32" cy="3.8" r="3.2"/><rect x="4" y="26" width="9" height="17" rx="4.5"/><rect x="51" y="26" width="9" height="17" rx="4.5"/><rect x="14" y="22" width="36" height="27" rx="13.5"/><circle cx="33" cy="57" r="4"/></g><g fill="#fff"><circle cx="24" cy="32" r="2"/><circle cx="40" cy="32" r="2"/><path d="M27 37h10a5 5 0 0 1-10 0Z"/></g></svg>';

// Shared by the main website and the four Vite landing pages.
export function initSupportChat() {
  if (typeof window === 'undefined' || location.pathname.startsWith('/admin') || document.getElementById('algofort-support-chat')) return () => {};
  const root = document.createElement('div'); root.id = 'algofort-support-chat'; root.hidden = true;
  root.innerHTML = `<button class="asc-launch" aria-label="Open support chat" aria-expanded="false" aria-controls="asc-panel">${icon}<span class="asc-launch-close" aria-hidden="true">×</span></button><section id="asc-panel" class="asc-panel" data-lenis-prevent aria-label="Algofort support chat" hidden><header class="asc-header"><span class="asc-avatar">${icon}</span><div><strong class="asc-name"></strong><span class="asc-subtitle">AI support · Here to help</span></div><button class="asc-close" aria-label="Close support chat">×</button></header><div class="asc-log" role="log" aria-live="polite" aria-relevant="additions text"></div><div class="asc-prompts"><button>Our services</button><button>Plan a project</button><button>Get a quote</button></div><p class="asc-error" role="alert" hidden></p><form class="asc-compose"><label class="asc-sr" for="asc-input">Your message</label><textarea id="asc-input" rows="1" maxlength="2000" placeholder="How can we help?" required></textarea><button class="asc-send" aria-label="Send message"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></form><footer class="asc-footer"><span>AI can make mistakes. Keep personal details private.</span><a class="asc-human" target="_blank" rel="noopener noreferrer">Talk to our team</a></footer></section>`;
  document.body.appendChild(root);
  const $ = selector => root.querySelector(selector);
  const launcher = $('.asc-launch'), panel = $('.asc-panel'), log = $('.asc-log'), input = $('#asc-input'), send = $('.asc-send'), prompts = $('.asc-prompts'), error = $('.asc-error');
  const controller = new AbortController(); let destroyed = false, pending = false, messages = [], config, sequence = 0, closeTimer;
  function renderContent(element,text) {
    element.replaceChildren();
    // Model and visitor text never become executable markup.
    for (const part of text.split(/(https:\/\/[^\s<>]+)/g)) {
      if (part.startsWith('https://')) { const link = document.createElement('a'); const href = part.replace(/[.,;)]+$/, ''); link.href = href; link.textContent = href.startsWith('https://wa.me/') ? 'Chat on WhatsApp' : href.replace(/^https:\/\//,'').split('?')[0]; link.target = '_blank'; link.rel = 'noopener noreferrer'; element.appendChild(link); }
      else element.appendChild(document.createTextNode(part));
    }
  }
  function bubble(text, role) {
    const element = document.createElement('div'); element.className = `asc-message asc-${role}`;
    renderContent(element,text); log.appendChild(element); log.scrollTop = log.scrollHeight; return element;
  }
  async function revealReply(text) {
    const element=bubble('','assistant');
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) { renderContent(element,text); return; }
    element.classList.add('asc-revealing');
    const node=document.createTextNode('');element.appendChild(node);
    const characters=Array.from(text), duration=Math.min(3600,Math.max(700,characters.length*9));
    await new Promise(resolve=>{
      let frame,position=0;const start=performance.now();
      function finish() { cancelAnimationFrame(frame);controller.signal.removeEventListener('abort',finish);resolve(); }
      function tick(now) {
        if(destroyed) {finish();return;}
        const follow=log.scrollHeight-log.scrollTop-log.clientHeight<65;
        const next=Math.min(characters.length,Math.floor((now-start)/duration*characters.length));
        if(next>position) {node.appendData(characters.slice(position,next).join(''));position=next;}
        if(follow)log.scrollTop=log.scrollHeight;
        if(position>=characters.length)finish();else frame=requestAnimationFrame(tick);
      }
      controller.signal.addEventListener('abort',finish,{once:true});frame=requestAnimationFrame(tick);
    });
    if(!destroyed) {const follow=log.scrollHeight-log.scrollTop-log.clientHeight<65;element.classList.remove('asc-revealing');renderContent(element,text);if(follow)log.scrollTop=log.scrollHeight;}
  }
  function toggle(open) {
    clearTimeout(closeTimer); launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label',open?'Close support chat':'Open support chat');
    if(open) { panel.hidden=false; panel.classList.remove('asc-closing'); document.body.classList.add('alg-chat-open'); input.focus({preventScroll:true}); }
    else { panel.classList.add('asc-closing'); closeTimer=setTimeout(()=>{panel.hidden=true;panel.classList.remove('asc-closing');document.body.classList.remove('alg-chat-open');},180); launcher.focus({preventScroll:true}); }
  }
  launcher.onclick = () => toggle(launcher.getAttribute('aria-expanded')!=='true'); $('.asc-close').onclick = () => toggle(false);
  root.addEventListener('keydown', event => { if(event.key === 'Escape' && !panel.hidden) { event.stopPropagation(); toggle(false); } });
  async function refresh() {
    const current = ++sequence;
    try {
      const response = await fetch('/api/chat', {cache:'no-store',signal:controller.signal}); if(!response.ok) return;
      const next = await response.json(); if(destroyed || current!==sequence) return;
      config = next; root.hidden = !next.enabled; document.body.classList.toggle('alg-chat-ready', Boolean(next.enabled));
      if(!next.enabled) { clearTimeout(closeTimer); panel.hidden = true; panel.classList.remove('asc-closing'); launcher.setAttribute('aria-expanded','false'); launcher.setAttribute('aria-label','Open support chat'); document.body.classList.remove('alg-chat-open'); }
      $('.asc-name').textContent = next.name; const human = $('.asc-human'); human.hidden = !next.whatsappUrl; if(next.whatsappUrl) human.href = next.whatsappUrl;
      if(!messages.length && !pending) { log.replaceChildren(); bubble(next.greeting,'assistant'); }
    } catch { /* Keep the last valid public configuration during a network interruption. */ }
  }
  async function submit(event) {
    event?.preventDefault(); const text = input.value.trim(); if(!text || pending || !config?.enabled) return;
    pending = true; send.disabled = true; input.readOnly = true; error.hidden = true; prompts.hidden = true; log.setAttribute('aria-busy','true');
    bubble(text,'user'); input.value = ''; const waiting = bubble('','assistant'); waiting.classList.add('asc-thinking'); waiting.setAttribute('aria-label','Assistant is typing');
    for(let index=0;index<3;index++) { const dot=document.createElement('span');dot.setAttribute('aria-hidden','true');waiting.appendChild(dot); }
    let history = [...messages,{role:'user',content:text}].slice(-11).map(item=>({...item,content:item.content.slice(0,2000)}));
    while(history.reduce((sum,item)=>sum+item.content.length,0)>12000) history.shift();
    try {
      const response = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history}),signal:controller.signal});
      const result = await response.json(); if(!response.ok) throw Error(result.error || 'Unable to send. Please try again.');
      if(typeof result.reply!=='string' || !result.reply.trim())throw Error('The assistant could not reply. Please try again.');
      if(destroyed) return; waiting.remove(); await revealReply(result.reply); if(destroyed)return; messages = [...history,{role:'assistant',content:result.reply}];
    } catch(err) {
      if(destroyed) return; waiting.remove(); log.lastElementChild?.remove(); input.value = text; error.textContent = err.name==='AbortError' ? 'The request timed out. Please try again.' : err.message; error.hidden = false;
    } finally { pending = false; send.disabled = false; input.readOnly = false; log.setAttribute('aria-busy','false'); }
  }
  $('.asc-compose').onsubmit = submit;
  input.onkeydown = event => { if(event.key==='Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); submit(); } };
  prompts.querySelectorAll('button').forEach(button => { button.onclick = () => { input.value = button.textContent; submit(); }; });
  function storage(event) { if(event.key===CHAT_STORAGE_KEY) refresh(); }
  function visible() { if(!document.hidden) refresh(); }
  window.addEventListener(CHAT_SETTINGS_EVENT,refresh); window.addEventListener('storage',storage); window.addEventListener('focus',visible); document.addEventListener('visibilitychange',visible);
  refresh(); const timer = setInterval(visible,60000);
  return () => { destroyed = true; sequence++; controller.abort(); clearTimeout(closeTimer); clearInterval(timer); root.remove(); document.body.classList.remove('alg-chat-ready','alg-chat-open'); window.removeEventListener(CHAT_SETTINGS_EVENT,refresh); window.removeEventListener('storage',storage); window.removeEventListener('focus',visible); document.removeEventListener('visibilitychange',visible); };
}
