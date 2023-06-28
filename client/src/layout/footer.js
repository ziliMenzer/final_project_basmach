import React from 'react'
import './footer.css'
import styled from 'styled-components'

export default function Footer() {
  return (
    <footer className="footer container-fluid text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
    © 2020 Copyright:
    <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </footer>
  )
}

const footerContainer = styled.footer;