import { ALGOFORT_DARK_LOGO_URL as ALGOFORT_LOGO_URL } from '../brand.js';
import { EMAIL_BACKGROUNDS, EMAIL_MAIL_ICON_URL } from './emailAssets.js';
import { emailCard } from './emailCard.js';

const font = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const orange = '#ff7b16';
const groups = {
  contact: { label: 'Contact enquiry', location: 'contact page', title: 'Thank you for contacting Algofort.', accent: 'contacting Algofort.', intro: 'We have received your enquiry. A member of our team will review your message and contact you to discuss how we can help.' },
  cta: { label: 'Project enquiry', location: 'project enquiry form', title: 'Thank you for your project enquiry.', accent: 'project enquiry.', intro: 'We have received your project details. Our team will review your requirements and contact you to discuss the next steps.' },
  web: { label: 'Web development', location: 'web development page', title: 'Thank you for your website enquiry.', accent: 'website enquiry.', intro: 'We have received your web development enquiry. Our team will review your requirements and contact you to discuss your website project.' },
  brand: { label: 'Brand identity', location: 'brand identity page', title: 'Thank you for your branding enquiry.', accent: 'branding enquiry.', intro: 'We have received your brand identity enquiry. Our team will review your requirements and contact you to discuss your branding goals.' },
  app: { label: 'App development', location: 'app development page', title: 'Thank you for your app enquiry.', accent: 'app enquiry.', intro: 'We have received your app development enquiry. Our team will review your requirements and contact you to discuss your app project.' },
  saas: { label: 'SaaS development', location: 'SaaS development page', title: 'Thank you for your SaaS enquiry.', accent: 'SaaS enquiry.', intro: 'We have received your SaaS development enquiry. Our team will review your requirements and contact you to discuss your product goals.' },
};

export function sourceGroup(source) { return String(source || '').startsWith('lp-') ? source.split('-')[1] : source; }
export function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char])); }
function highlight(title, accent) {
  const index = title.indexOf(accent);
  if (index < 0 || !accent) return escapeHtml(title);
  return `${escapeHtml(title.slice(0,index))}<span style="color:${orange}">${escapeHtml(accent)}</span>${escapeHtml(title.slice(index+accent.length))}`;
}
function logo(width = 178) {
  return `<a href="https://algofort.com" style="display:inline-block;text-decoration:none"><img src="${ALGOFORT_LOGO_URL}" alt="Algofort" width="${width}" style="display:block;width:${width}px;max-width:100%;height:auto;border:0"></a>`;
}
function button(label, link, arrow = false) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px"><tr><td bgcolor="${orange}" style="background-color:${orange};background-image:linear-gradient(${orange},${orange});border-radius:8px;mso-padding-alt:15px 21px"><a href="${escapeHtml(link)}" style="display:inline-block;padding:15px 21px;border:1px solid ${orange};border-radius:8px;font-family:${font};font-size:14px;line-height:20px;font-weight:700;text-align:center;color:#ffffff;text-decoration:none">${escapeHtml(label)}${arrow ? '<span aria-hidden="true" style="padding-left:18px;font-size:18px">&#8599;</span>' : ''}</a></td></tr></table>`;
}
// Layout stays inline. Outlook's text inversion also needs targeted dark-mode overrides.
function inlineEmail(html) {
  const palette = new Map();
  // Override webmail/Word table-cell outlines on every layout element, including spacers.
  html = html.replace(/<(table|tr|td)(\s[^<>]*?)?>/gi, (full, tag, attributes = '') => {
    const reset = 'border:0!important;border-width:0!important;border-style:none!important;outline:0!important;box-shadow:none!important;mso-border-alt:none;mso-border-insideh:none;mso-border-insidev:none;';
    if (/style="/.test(attributes)) attributes = attributes.replace(/style="/, `style="${reset}`);
    else attributes += ` style="${reset}"`;
    if (tag.toLowerCase() === 'table') {
      if (!/\bborder=/.test(attributes)) attributes += ' border="0"';
      if (!/\bframe=/.test(attributes)) attributes += ' frame="void" rules="none"';
    }
    return `<${tag}${attributes}>`;
  });
  const result = html.replace(/<([a-z][a-z0-9:-]*)([^<>]*?)style="([^"]*)"([^<>]*?)>/gi, (_, tag, before, declarations, after) => {
    let style = declarations;
    const bg = style.match(/(?:^|;)background-color:(#[a-fA-F0-9]{6})/);
    if (bg && ['#f5f5f2','#fafaf8'].includes(bg[1])) {
      const asset = bg[1] === '#f5f5f2' ? EMAIL_BACKGROUNDS.paper : EMAIL_BACKGROUNDS.card;
      const url = asset.replace('/f_png/', '/b_white,f_jpg,w_1360,h_3000,c_scale/');
      style += `;background-image:url('${url}');background-size:100% 100%;background-repeat:no-repeat;background-position:center top`;
    }
    const text = style.match(/(?:^|;)color:(#[a-fA-F0-9]{6})/);
    let className = '';
    if (text) {
      const color = text[1].toLowerCase();
      className = `email-ink-${color.slice(1)}`;
      palette.set(className, color);
      style = style.replace(/(?:^|;)(?:color|-webkit-text-fill-color):[^;]*/g, '');
      // Word-based Outlook uses gradient text fill without applying its colour inversion.
      style += `;color:${color}!important;-webkit-text-fill-color:${color}!important;mso-style-textfill-type:gradient;mso-style-textfill-fill-gradientfill-stoplist:&quot;0 ${color} 0 100000,100000 ${color} 0 100000&quot;`;
    }
    return `<${tag}${before}${className ? `class="${className}" ` : ''}style="${style}"${after}>`;
  });
  const rules = [...palette].map(([name,color]) =>
    `[data-ogsc] .${name},[data-ogsb] .${name}{color:${color}!important;-webkit-text-fill-color:${color}!important}`
  ).join('');
  const darkRules = [...palette].map(([name,color]) => `.${name}{color:${color}!important;-webkit-text-fill-color:${color}!important}`).join('');
  return result.replace('</head>', `<style>${rules}@media(prefers-color-scheme:dark){${darkRules}}</style></head>`);
}
function shell({ label, title, accent, intro, content, preheader = intro }) {
  const hero = EMAIL_BACKGROUNDS.hero;
  return inlineEmail(`<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${escapeHtml(label)} | Algofort</title></head>
<body bgcolor="#f5f5f2" style="margin:0;padding:0;width:100%;background-color:#f5f5f2;color:#20232b;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:${font}">
<div style="display:none;font-size:1px;line-height:1px;color:#f5f5f2;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f5f2" style="width:100%;border-collapse:collapse;background-color:#f5f5f2;font-family:${font}"><tr><td align="center" bgcolor="#f5f5f2" style="padding:34px 16px;background-color:#f5f5f2;background-repeat:repeat">
<!--[if mso]><table role="presentation" width="680" align="center" border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f5f2" style="width:100%;max-width:680px;margin:0 auto;border-collapse:collapse;border-spacing:0;background-color:#f5f5f2;font-family:${font}">
<tr><td bgcolor="#f5f5f2" style="padding:0 4px 28px;background-color:#f5f5f2;"><table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-family:${font}"><tr><td width="46%" valign="middle" style="width:46%;padding-right:16px;font-family:${font}">${logo(190)}</td><td width="54%" align="right" valign="middle" style="width:54%;font-family:${font};font-size:12px;line-height:19px;color:#737471">Ideas into digital experiences.</td></tr></table></td></tr>
<tr><td background="${hero}" bgcolor="#0b0c0b" valign="top" style="background-color:#0b0c0b;background-image:url('${hero}');background-position:right center;background-repeat:no-repeat;background-size:cover;border-radius:10px;overflow:hidden">
<!--[if gte mso 9]><v:rect fill="true" stroke="false" style="width:680px;"><v:fill type="frame" src="${hero}" color="#0b0c0b"/><v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text:true"><![endif]-->
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-family:${font}"><tr><td style="padding:34px 28px;font-family:${font}"><table role="presentation" width="72%" border="0" cellpadding="0" cellspacing="0" style="width:72%;border-collapse:collapse;font-family:${font}"><tr><td style="font-family:${font}"><p style="margin:0 0 18px;font-family:${font};font-size:10px;line-height:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${orange}">${escapeHtml(label)}</p><h1 style="margin:0;font-family:${font};font-size:30px;line-height:1.22;letter-spacing:-0.8px;font-weight:700;color:#ffffff">${highlight(title,accent)}</h1><p style="margin:18px 0 0;font-family:${font};font-size:14px;line-height:1.8;color:#b8bab7">${escapeHtml(intro).replace(/\r?\n/g,'<br>')}</p></td></tr></table></td></tr></table>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>
<tr><td height="22" bgcolor="#f5f5f2" style="height:22px;font-size:0;line-height:0;background-color:#f5f5f2;">&nbsp;</td></tr>
<tr><td bgcolor="#fafaf8" style="padding:30px 28px 32px;background-color:#fafaf8;color:#252a35;font-family:${font};border:0;border-radius:10px">${content}</td></tr>
<tr><td height="24" bgcolor="#f5f5f2" style="height:24px;font-size:0;line-height:0;background-color:#f5f5f2;">&nbsp;</td></tr>
<tr><td bgcolor="#f5f5f2" style="padding:12px 4px 12px;background-color:#f5f5f2;font-family:${font}"><table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-family:${font}"><tr><td width="77%" valign="top" style="font-family:${font}">${logo(170)}<p style="margin:15px 0 18px;font-family:${font};font-size:14px;line-height:22px;color:#737471">Ideas into digital experiences.</p><p style="margin:0;font-family:${font};font-size:11px;line-height:22px;color:#666a64"><a href="mailto:hello@algofort.com" style="display:inline-block;margin-right:18px;font-family:${font};color:#666a64;text-decoration:none"><img src="${EMAIL_MAIL_ICON_URL}" alt="" width="14" height="14" style="display:inline-block;width:14px;height:14px;vertical-align:middle;border:0;outline:none">&nbsp; hello@algofort.com</a><a href="https://algofort.com" style="display:inline-block;font-family:${font};color:#666a64;text-decoration:none"><span style="color:${orange}">&#9678;</span>&nbsp; algofort.com</a></p></td><td width="23%" valign="bottom" align="right" style="width:23%;font-size:0;line-height:0"><img src="${EMAIL_BACKGROUNDS.footer}" alt="" width="120" style="display:block;width:120px;max-width:100%;height:auto;border:0;outline:none"></td></tr></table></td></tr>
</table><!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`);
}

export async function enquiryEmail(submission, audience = 'user') {
  const copy = groups[sourceGroup(submission.source)] || groups.contact;
  const user = audience === 'user';
  const subject = user ? `We received your ${copy.label.toLowerCase()} — Algofort` : `New ${copy.label.toLowerCase()} — ${submission.fullName}`;
  const title = user ? copy.title : `New ${copy.label.toLowerCase()} received.`;
  const intro = user ? `Dear ${submission.fullName},\n\n${copy.intro}` : `A new enquiry has been submitted through the ${copy.location}. Please review the contact details and message below.`;
  const rows = [['Reference',submission.id],['Name',submission.fullName],['Email',submission.email],['Phone',submission.phone || 'Not provided'],['Services',submission.selectedServices.join(', ')],['Form',submission.source]];
  const card = await emailCard({ title:'Contact details', rows, messageTitle:'Your message', message:submission.message, note:user ? 'If you would like to share any additional information, please reply to this email.' : '' });
  const content = card.html + (user ? '' : button('Open submissions','https://algofort.com/admin',true));
  return { subject, attachments:[card.attachment], html: shell({label:user?'Enquiry confirmation':`New ${copy.label.toLowerCase()}`,title,accent:user?copy.accent:copy.label.toLowerCase(),intro,content}), text: `${title}\n\n${intro}\n\n${rows.map(([label,value])=>`${label}: ${value}`).join('\n')}\n\n${submission.message}\n\n${user?'If you would like to share any additional information, please reply to this email.':'Open submissions: https://algofort.com/admin'}\n\nAlgofort\nhello@algofort.com\nhttps://algofort.com` };
}

export async function invitationEmail(email, link, role) {
  const card = await emailCard({title:'Workspace invitation',rows:[['Account',email],['Role',role]],message:'Set your password to get started, then verify your email before accessing the workspace.'});
  const content = card.html + button('Set your password',link,true);
  return {attachments:[card.attachment],subject:'Your Algofort workspace access',text:`You have been invited as ${role}. Set your password: ${link}\nSign in at https://algofort.com/admin and verify your email before accessing the workspace.`,html:shell({label:'Workspace invitation',title:'Your workspace is ready.',accent:'workspace',intro:'You have been invited to the Algofort admin workspace. Everything you need to get started is below.',content})};
}
export async function verificationEmail(email, link) {
  const card = await emailCard({title:'Confirm your account',rows:[['Account',email]],message:'Confirm that this email belongs to you to activate your dashboard access.',note:'Then sign in using the password supplied separately.'});
  const content = card.html + button('Verify email address',link,true);
  return {attachments:[card.attachment],subject:'Verify your Algofort workspace email',text:`Confirm workspace access for ${email}: ${link}\nThen sign in at https://algofort.com/admin using the password supplied separately.`,html:shell({label:'Email verification',title:'Confirm your workspace email.',accent:'workspace email.',intro:'Your Algofort account is ready. There is just one step left before you can open your workspace.',content})};
}
