import React, { Fragment } from 'react'

const Logo = () =>
  <Fragment>
    <div className="logo pb2 f-subheadline lh-solid tc tl-l">Samuel</div>
    <div className="f6 font-title lh-solid b ttu tracked color-muted tc tl-l">Play&nbsp;naked&nbsp;in&nbsp;the&nbsp;water</div>

    <style jsx>{`
      .logo {
        font-family: "Playfair Display", serif;
      }
    `}</style>
  </Fragment>

export default Logo
