import React, { useState } from 'react';
import appLogo from './assets/applogo.png';

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '');
    const authEndpoint = '/api/auth/login'; // Reemplazar por el endpoint real.
    const useMockAuth = true; // Solo para pruebas: desactivar al integrar el backend.

    try {
      let authenticated = false;

      if (useMockAuth) {
        // Estas credenciales en el frontend no ofrecen seguridad real.
        authenticated = username === 'admin' && password === 'nkia';
      } else {
        const response = await fetch(authEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username, password }),
        });

        if (response.status !== 401 && response.status !== 403 && !response.ok) {
          throw new Error('Authentication service unavailable');
        }
        authenticated = response.ok;
      }

      if (!authenticated) {
        setMessage('Usuario o contraseña incorrectos.');
        return;
      }

      window.location.assign('/src/views/landing.html');
    } catch {
      setMessage('No se pudo iniciar sesión. Inténtalo nuevamente más tarde.');
    }
  }
  return (
    <main className="nk-login">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .nk-login { min-height: 100vh; min-height: 100svh; display: grid; grid-template-columns: 1.05fr 1fr; background: #f7fafc; color: #122b48; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .nk-brand { position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; padding: 52px 64px; color: white; background: radial-gradient(ellipse at 90% 90%, #087d89 0%, transparent 55%), linear-gradient(145deg, #082956, #073b60); }
        .nk-brand::after { content: ''; position: absolute; width: 540px; height: 540px; right: -260px; bottom: -240px; border: 1px solid #ffffff20; border-radius: 50%; box-shadow: 0 0 0 65px #ffffff06, 0 0 0 130px #ffffff04; pointer-events: none; }
        .nk-wordmark { display: flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 700; letter-spacing: .02em; }
        .nk-cross { display: grid; place-items: center; width: 36px; height: 36px; border: 1px solid #ffffff30; border-radius: 11px; color: #52d4d5; font-size: 27px; font-weight: 500; }
        .nk-brand-content { position: relative; z-index: 1; max-width: 450px; padding: 60px 0; }
        .nk-eyebrow { display: inline-flex; align-items: center; gap: 8px; color: #78e0df; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        .nk-dot { width: 7px; height: 7px; border-radius: 50%; background: #46d4cd; }
        .nk-brand h1 { margin: 24px 0; font-size: clamp(34px, 3.6vw, 52px); font-weight: 600; line-height: 1.15; letter-spacing: -.045em; }
        .nk-brand h1 span { color: #65d6d6; }
        .nk-brand p { margin: 0; max-width: 370px; color: #bdd0df; font-size: 16px; line-height: 1.8; }
        .nk-values { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 36px; font-size: 12px; color: #d7e7ee; }
        .nk-values span::before { content: '✓'; margin-right: 7px; color: #63dbd4; }
        .nk-brand-footer { position: relative; z-index: 1; color: #a8c3d4; font-size: 12px; }
        .nk-form-panel { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px; }
        .nk-card { width: 100%; max-width: 400px; }
        .nk-logo { display: block; width: 150px; height: 150px; object-fit: contain; margin: 0 auto 30px; }
        .nk-card h2 { font-size: 29px; letter-spacing: -.035em; margin: 0 0 10px; font-weight: 700; }
        .nk-intro { margin: 0 0 32px; color: #64748b; font-size: 14px; line-height: 1.7; }
        .nk-field { margin-bottom: 21px; }
        .nk-label { display: block; margin-bottom: 9px; font-size: 13px; font-weight: 600; }
        .nk-input-wrap { position: relative; }
        .nk-input { width: 100%; height: 52px; border: 1px solid #d7e0e9; border-radius: 10px; padding: 0 15px 0 45px; background: white; color: #122b48; font: inherit; font-size: 14px; transition: border-color .2s, box-shadow .2s; }
        .nk-input::placeholder { color: #94a3b8; }
        .nk-input:focus { outline: none; border-color: #078e9b; box-shadow: 0 0 0 3px #0795a214; }
        .nk-input-icon { position: absolute; left: 15px; top: 17px; color: #8a9aaf; pointer-events: none; }
        .nk-password { padding-right: 52px; }
        .nk-toggle { position: absolute; right: 7px; top: 6px; display: grid; place-items: center; width: 40px; height: 40px; border: 0; background: transparent; color: #73859b; border-radius: 7px; cursor: pointer; }
        .nk-toggle:hover { background: #eef5f8; color: #087e8c; }
        .nk-hint { margin: -3px 0 26px; color: #728196; font-size: 12px; line-height: 1.6; }
        .nk-submit { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; height: 52px; border: none; border-radius: 10px; background: #073b73; color: white; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 5px 12px #073b731a; transition: background .2s, transform .2s; }
        .nk-submit:hover { background: #07518c; transform: translateY(-1px); }
        .nk-toggle:focus-visible, .nk-submit:focus-visible { outline: 3px solid #16b6c2; outline-offset: 3px; }
        .nk-message { margin: 18px 0 0; padding: 12px 14px; border: 1px solid #ebd7a2; border-radius: 8px; background: #fffbef; color: #765718; font-size: 13px; line-height: 1.6; }
        .nk-access-note { margin: 28px 0 0; border-top: 1px solid #e2e8f0; padding-top: 24px; text-align: center; color: #748499; font-size: 12px; line-height: 1.8; }
        .nk-secure { display: flex; justify-content: center; align-items: center; gap: 7px; margin-top: 38px; color: #738599; font-size: 11px; }
        @media (min-width: 1400px) { .nk-brand { padding: 64px 90px; } }
        @media (max-width: 900px) { .nk-brand { padding: 36px; } .nk-form-panel { padding: 36px; } .nk-values { gap: 12px; } }
        @media (max-width: 680px) { .nk-login { grid-template-columns: 1fr; } .nk-brand { padding: 24px; } .nk-brand-content { padding: 28px 0 6px; max-width: none; } .nk-brand h1 { margin: 14px 0; font-size: 32px; } .nk-brand p, .nk-values, .nk-brand-footer { display: none; } .nk-form-panel { padding: 32px 24px 40px; } .nk-logo { width: 110px; height: 110px; margin-bottom: 22px; } .nk-card h2 { font-size: 26px; } }
        @media (prefers-reduced-motion: reduce) { .nk-input, .nk-submit { transition: none; } }
      `}</style>

      <aside className="nk-brand" aria-label="Nursing Knowledge AI">
        <div className="nk-brand-content">
          <div className="nk-eyebrow"><span className="nk-dot" /> Conocimiento que cuida</div>
          <h1>Tu conocimiento.<br />Tu vocación.<br /><span>Un cuidado mejor.</span></h1>
          <p>Un espacio para impulsar tu práctica de enfermería con conocimiento, evidencia e inteligencia artificial.</p>
          <div className="nk-values"><span>Conocimiento</span><span>Evidencia</span><span>Cuidado</span></div>
        </div>
        <div className="nk-brand-footer">Al servicio de quienes cuidan de los demás.</div>
      </aside>

      <section className="nk-form-panel" aria-labelledby="login-title">
        <div className="nk-card">
          <img className="nk-logo" src={appLogo} alt="Nursing Knowledge AI — Conocimiento, evidencia y cuidado" />
          <h2 id="login-title">Te damos la bienvenida</h2>
          <p className="nk-intro">Ingresa tus credenciales para acceder a tu espacio.</p>
          <form onSubmit={handleSubmit} onChange={() => setMessage('')}>
            <div className="nk-field">
              <label className="nk-label" htmlFor="username">Usuario</label>
              <div className="nk-input-wrap">
                <svg className="nk-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></svg>
                <input className="nk-input" id="username" name="username" type="text" autoComplete="username" placeholder="Ingresa tu usuario" required maxLength={254} autoCapitalize="none" spellCheck={false} />
              </div>
            </div>
            <div className="nk-field">
              <label className="nk-label" htmlFor="password">Contraseña</label>
              <div className="nk-input-wrap">
                <svg className="nk-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><path d="M12 14v3" /></svg>
                <input className="nk-input nk-password" id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Ingresa tu contraseña" required />
                <button className="nk-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={showPassword} aria-controls="password">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{showPassword && <path d="m3 3 18 18" />}</svg>
                </button>
              </div>
            </div>
            <p className="nk-hint">Utiliza el usuario asignado por tu institución.</p>
            <button className="nk-submit" type="submit">Iniciar sesión <span aria-hidden="true">→</span></button>
            {message && <p className="nk-message" role="status">{message}</p>}
          </form>
          <p className="nk-access-note">¿Necesitas acceso o recuperar tu contraseña?<br />Contacta con el administrador de tu institución.</p>
          <div className="nk-secure"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></svg> Acceso exclusivo para usuarios autorizados</div>
        </div>
      </section>
    </main>
  );
}
