/**
 * Cloudflare Pages Functions — secure API scaffold for L’ÉLITE Atelier.
 * Bindings expected in wrangler.toml / Pages dashboard:
 *   DB: D1 database (or KV namespace for settings)
 *   SESSION_SECRET: Pages secret
 *
 * The demo frontend is fully static; this edge API is ready for production wiring.
 */
interface Env { DB: D1Database; SESSION_SECRET: string; }

const json = (data: unknown, status = 200, headers: Record<string,string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', ...headers } });

async function derive(password: string, salt: Uint8Array) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name:'PBKDF2', salt, iterations: 120000, hash:'SHA-256' }, key, 256);
  return [...new Uint8Array(bits)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
function b64(input: ArrayBuffer | string) { const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : new Uint8Array(input); return btoa(String.fromCharCode(...bytes)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_'); }
async function sign(payload: object, secret: string) { const data=b64(JSON.stringify(payload)); const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']); const sig=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(data)); return `${data}.${b64(sig)}`; }

export const onRequestPost: PagesFunction<Env> = async ({ request, env, params }) => {
  const route = (params.route as string[] | undefined)?.join('/') || '';
  if (route === 'auth/login') {
    const { username, password } = await request.json() as { username:string; password:string };
    const account = await env.DB.prepare('SELECT id, username, password_hash, salt, role FROM admin_users WHERE username = ?').bind(username).first<any>();
    if (!account) return json({ error:'Invalid credentials' }, 401);
    const hash = await derive(password, Uint8Array.from(atob(account.salt), c=>c.charCodeAt(0)));
    if (hash !== account.password_hash) return json({ error:'Invalid credentials' }, 401);
    const token = await sign({ sub:account.id, role:account.role, exp:Date.now()+8*60*60*1000 }, env.SESSION_SECRET);
    return json({ ok:true }, 200, { 'set-cookie': `elite_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800` });
  }
  if (route === 'auth/logout') return json({ ok:true }, 200, { 'set-cookie':'elite_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0' });
  return json({ error:'Not found' }, 404);
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  const route = (params.route as string[] | undefined)?.join('/') || '';
  if (route === 'health') return json({ ok:true, service:'l-elite-atelier-edge-api' });
  if (route === 'settings') return json({ brand:'L’ÉLITE Atelier', locale:'ar' });
  return json({ error:'Not found' }, 404);
};

// Production migration example:
// CREATE TABLE admin_users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password_hash TEXT, salt TEXT, role TEXT);
// Never ship default credentials; seed the first admin through a one-time protected setup action.
