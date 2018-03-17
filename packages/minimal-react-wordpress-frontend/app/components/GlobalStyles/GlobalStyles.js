import React from 'react'

export const viewportNotSmall = 'screen and (min-width: 30em)'
export const viewportMedium = 'screen and (min-width: 30em) and (max-width: 60em)'
export const viewportLarge = 'screen and (min-width: 60em)'

export const colorPrimary = '#000000'
export const colorAlternate = '#ffffff'
export const colorAccent = '#c06014'
export const colorMuted = '#777777'

export const bgColorPrimary = '#ffffff'
export const bgColorAlternate = '#000000'
export const bgColorSecondary = '#ededed'
export const bgColorAccent = '#c06014'
export const bgColorMuted = '#777777'

export const fontTitle = '"Libre Baskerville", serif'
export const fontCopy = 'Georgia, Times, "Times New Roman", serif'

export const lineHeightTitle = 1.25
export const lineHeightCopy = 1.5

const GlobalStyles = () =>
  <style jsx global>{`
    {/* Base Styles */}
    html { font-size: 14px; }

    body {
      min-width: 300px;
      background-color: ${bgColorPrimary};
      font-family: ${fontCopy};
      line-height: ${lineHeightCopy};
      color: ${colorPrimary};
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      font-family: ${fontTitle};
      font-weight: 700;
      line-height: ${lineHeightTitle};
    }

    p { margin: 0 }
    a { color: ${colorPrimary}; text-decoration: none; }
    img { display: block; max-width: 100%; }

    @media ${viewportNotSmall} {
      html { font-size: 16px; }
    }

    *:focus { outline: none; }

    {/* Components */}

    .button-primary,
    .button-secondary {
      display: inline-block;
      border-style: solid;
      border-width: 2px;
      padding: .5rem 1rem;
      font-family: ${fontTitle};
      font-size:.875rem;
      line-height: 1;
      letter-spacing:.15em;
      text-transform: uppercase;
      transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
    }

    .button-primary {
      border-color: ${colorAccent};
      color: ${colorAccent};
      font-weight: 700;
    }

    .button-secondary {
      border-color: ${colorPrimary};
      background-color: ${bgColorAlternate};
      color: ${colorAlternate};
      font-weight: 500;
    }

    .button-primary:hover, .button-primary:focus {
      background-color: ${bgColorAccent};
      color: ${colorAlternate};
    }

    .button-secondary:hover, .button-secondary:focus {
      background-color: transparent;
      color: ${colorPrimary};
      font-weight: 500;
    }

    .wp-content p:not(:last-child) {
      padding-bottom: 1rem;
    }

    {/* Utility Styles */}
    .font-title { font-family: ${fontTitle}; }
    .font-copy { font-family: ${fontCopy}; }

    .color-primary { color: ${colorPrimary}; }
    .color-accent { color: ${colorAccent}; }
    .color-muted { color: ${colorMuted}; }

    .hover-primary,
    .hover-accent,
    .hover-muted {
      transition: color 0.15s ease-in-out;
    }

    .hover-primary:hover, .hover-primary:focus { color: ${colorPrimary}; }
    .hover-accent:hover, .hover-accent:focus { color: ${colorAccent}; }
    .hover-muted:hover, .hover-muted:focus { color: ${colorMuted}; }

    .bg-color-primary { background-color: ${bgColorPrimary}; }
    .bg-color-secondary { background-color: ${bgColorSecondary}; }
    .bg-color-accent { background-color: ${bgColorAccent}; }
    .bg-color-muted { background-color: ${bgColorMuted}; }

    .b--primary { border-color: ${colorPrimary}; }
    .b--accent { border-color: ${colorAccent}; }
    .b--muted { border-color: ${colorMuted}; }

    .b--hover-primary,
    .b--hover-accent,
    .b--hover-muted {
      transition: color 0.15s ease-in-out;
    }

    .b--hover-primary:hover, .b--hover-primary:focus { border-color: ${colorPrimary}; }
    .b--hover-accent:hover, .b--hover-accent:focus { border-color: ${colorAccent}; }
    .b--hover-muted:hover, .b--hover-muted:focus { border-color: ${colorMuted}; }

    .c-bw1 { border-width: 1px; }
    .c-bw2 { border-width: 2px; }
    .c-bw3 { border-width: 3px; }

    .shadow-hover-1,
    .shadow-hover-2 {
      transition: box-shadow 0.15s ease-in-out;
    }

    .shadow-1 { box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); }
    .shadow-2 { box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); }

    .shadow-hover-1:hover, .shadow-hover-1:focus { box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); }
    .shadow-hover-2:hover, .shadow-hover-2:focus { box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); }

    .zn-1 { z-index:-0; }
    .zn-1 { z-index:-1; }
    .zn-1 { z-index:-2; }
    .zn-1 { z-index:-3; }
    .zn-1 { z-index:-999; }

    .transition-all {
      transition: all 0.15s ease-in-out !important;
    }

    {/*!
    * animate.css -http://daneden.me/animate
    * Version - 3.6.0
    * Licensed under the MIT license - http://opensource.org/licenses/MIT
    *
    * Copyright (c) 2018 Daniel Eden
    */}

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .fadeIn {
      animation-name: fadeIn;
    }

    .animated {
      animation-duration: 1s;
      animation-fill-mode: both;
    }
  `}</style>

export default GlobalStyles
