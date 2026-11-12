import { useState } from 'react'
import appLogo from './assets/applogo.png'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('El inicio de sesión requiere conectar un servicio de autenticación.')
  }

  return (
    <>
      <section id="center" className="login-page" aria-labelledby="app-title" lang="es">
        <div className="login-card">
          <header className="login-brand">
            <img src={appLogo} width="170" height="179" alt="Logo de Nursing Knowledge IA" />
            <h1 id="app-title">Nursing Knowledge IA</h1>
            <p>Conocimiento al servicio del cuidado.</p>
          </header>
          <div className="login-heading">
            <h2>Te damos la bienvenida</h2>
            <p>Ingresa tus credenciales para iniciar sesión.</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="username">Usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
            <div className="login-field">
              <label htmlFor="password">Contraseña</label>
              <div className="login-password">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  className="login-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  aria-controls="password"
                  aria-pressed={showPassword}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>
            <button type="submit" className="login-submit">
              Iniciar sesión
            </button>
            <p role="status" className="login-status">{message}</p>
          </form>
          <p className="login-footer">Nursing Knowledge IA · Plataforma de conocimiento en enfermería</p>
        </div>
      </section>
    </>
  )
}

export default App
