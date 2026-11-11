import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {
  APPEARANCE_CHANGE_EVENT,
  APPEARANCE_STORAGE_KEY,
  getAppearancePreference,
} from './lib/appearance.js'

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
let appearancePreference = getAppearancePreference()

function applyAppearance(prefersDark = colorScheme.matches) {
  const isDark = appearancePreference === 'dark'
    || (appearancePreference === 'system' && prefersDark)
  document.body.classList.toggle('dark', isDark)
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
}

applyAppearance()
colorScheme.addEventListener('change', (event) => applyAppearance(event.matches))
window.addEventListener(APPEARANCE_CHANGE_EVENT, (event) => {
  appearancePreference = event.detail
  applyAppearance()
})
window.addEventListener('storage', (event) => {
  if (event.key !== APPEARANCE_STORAGE_KEY) return
  appearancePreference = getAppearancePreference()
  applyAppearance()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
