{{- if site.Params.main.enableDarkMode -}}

/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const supportedThemes = ['auto', 'dark', 'light'];

  // retrieves the currently stored theme from local storage (cookie)
  const storedTheme = localStorage.getItem('theme')

  // retrieves the theme preferred by the client, defaults to light
  function getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // retrieves the current theme, either from local storage or client's preferences
  function getTheme() {
    if (storedTheme) {
      return storedTheme
    } else {
      const preference = getPreferredTheme()
      localStorage.setItem('theme', preference)
      return preference
    }
  }

  // applies and stores requested theme
  function setTheme(theme) {
    if (!supportedThemes.includes(theme)) {
      theme = 'auto'
    }
    localStorage.setItem('theme', theme)

    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (getPreferredTheme()))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  // alternates the currently active theme
  function toggleTheme() {
    const target = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'
    setTheme(target)
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    setTheme(getTheme())

    document.querySelectorAll('.ball').forEach(ball => {
      ball.classList.add('notransition');
    })
    
    const chk = document.querySelectorAll('.navbar-mode-selector')
    for (let i = 0; i < chk.length; ++i) {
      if (document.documentElement.getAttribute('data-bs-theme') === 'light') {
        chk[i].click()
      }
      chk[i].addEventListener('change', function () {
        toggleTheme()
      })
    }

    document.querySelectorAll('.ball').forEach(ball => {
      ball.offsetHeight; // flush css changes
      ball.classList.remove('notransition');
    })
  })
})()

{{- end -}}