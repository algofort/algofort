'use client';
import { useEffect, useState } from 'react';
import { CHAT_SETTINGS_EVENT, CHAT_STORAGE_KEY } from '../../lib/supportChatWidget';

export default function ChatbotSettings({api}) {
  const [config,setConfig] = useState(null), [apiKey,setApiKey] = useState(''), [busy,setBusy] = useState(false), [error,setError] = useState(''), [notice,setNotice] = useState('');
  useEffect(()=>{let alive=true;api('chatbot').then(data=>{if(alive)setConfig(data);}).catch(err=>{if(alive)setError(err.message);});return()=>{alive=false;};},[api]);
  const field = (key,value) => setConfig(old=>({...old,[key]:value}));
  async function action(test=false) {
    setBusy(true);setError('');setNotice('');
    try {
      if(test) { const result=await api('chatbot',{method:'POST'});setNotice(result.message); }
      else {
        const saved=await api('chatbot',{method:'PUT',body:JSON.stringify({...config,...(apiKey.trim()?{apiKey:apiKey.trim()}:{})})});setConfig(saved);setApiKey('');
        window.dispatchEvent(new Event(CHAT_SETTINGS_EVENT));try{localStorage.setItem(CHAT_STORAGE_KEY,String(Date.now()));}catch{}
        setNotice('AI support settings saved across the website and all landing pages.');
      }
    } catch(err) {setError(err.message);} finally {setBusy(false);}
  }
  return <div className="adm-chat-settings">
    {error && <div className="adm-alert adm-error" role="alert">{error}</div>}{notice && <div className="adm-alert" role="status">{notice}</div>}
    {!config ? <p className="adm-muted">{error?'Use Refresh to try again.':'Loading assistant settings…'}</p> : <form onSubmit={event=>{event.preventDefault();action();}}>
      <section className="adm-panel"><span className="adm-eyebrow">WEBSITE & LANDING PAGES</span><h2>Your support assistant</h2><p className="adm-muted">One assistant for the main website and all four landing pages. Owner access only.</p>
        <label className="adm-check"><input type="checkbox" checked={config.enabled} onChange={event=>field('enabled',event.target.checked)}/>Enable support chat</label>
        <label>Assistant name<input required maxLength={60} value={config.name} onChange={event=>field('name',event.target.value)}/></label>
        <label>Welcome message<textarea required rows={3} maxLength={350} value={config.greeting} onChange={event=>field('greeting',event.target.value)}/></label>
      </section>
      <section className="adm-panel"><span className="adm-eyebrow">COMPANY KNOWLEDGE</span><h2>What should it know?</h2><p className="adm-muted">Maintain your services, process, website links, policies and company details here. The current WhatsApp number is added automatically from Site settings. Only include information suitable for visitors.</p>
        <label>Company and website information<textarea required rows={17} maxLength={12000} value={config.companyKnowledge} onChange={event=>field('companyKnowledge',event.target.value)}/><small>{config.companyKnowledge.length.toLocaleString()} / 12,000 characters</small></label>
        <label>Tone and support guidance<textarea required rows={4} maxLength={2000} value={config.instructions} onChange={event=>field('instructions',event.target.value)}/></label>
      </section>
      <section className="adm-panel"><span className="adm-eyebrow">API CONNECTION</span><h2>Provider settings</h2><p className="adm-muted">Use an OpenAI-compatible chat completions API. API keys are encrypted on the server and are never returned to the browser.</p>
        <div className="adm-form-grid"><label>Provider name<input required maxLength={60} value={config.providerName} onChange={event=>field('providerName',event.target.value)}/></label><label>Model ID<input required maxLength={120} value={config.model} onChange={event=>field('model',event.target.value)}/></label></div>
        <label>API endpoint<input type="url" required maxLength={500} value={config.endpoint} onChange={event=>field('endpoint',event.target.value)}/><small>Public HTTPS URL ending in /chat/completions.</small></label>
        <label>{config.hasApiKey?'Replace API key':'API key'}<input type="password" autoComplete="new-password" spellCheck={false} maxLength={500} value={apiKey} placeholder={config.hasApiKey?'Key configured — leave blank to keep it':'Enter your provider API key'} onChange={event=>setApiKey(event.target.value)}/><small>{config.hasApiKey?'An encrypted key is configured. A blank field keeps the existing key.':'Save a key before enabling the assistant.'}</small></label>
        <label>Daily request limit<input type="number" min={10} max={5000} required value={config.dailyLimit} onChange={event=>field('dailyLimit',Number(event.target.value))}/><small>Maximum visitor requests per day across the website. Each visitor is also limited to 20 requests per 10 minutes.</small></label>
        <div className="adm-actions"><button className="adm-btn adm-primary" disabled={busy}>{busy?'Please wait…':'Save assistant settings'}</button><button type="button" className="adm-btn" disabled={busy || !config.hasApiKey} onClick={()=>action(true)}>Test saved connection</button></div><p className="adm-muted">Save changes before testing the connection. Chat history stays in the current page and is sent to your provider only when a visitor sends a message.</p>
      </section>
    </form>}
  </div>;
}
