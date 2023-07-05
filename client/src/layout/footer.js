import React from 'react'
// import './footer.css'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';

export default function Footer() {
  return (
    <div>
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Helmet>
      <footer className="footer container-fluid text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" ,position:"sticky" ,bottom:"0",left:"0", right:"0"}}>
        2023 Copyright: Tzili Tamar Dvora ©
        <div>
          <a className="text-dark" href="https://github.com/ziliMenzer/final_project_basmach">
            <i className="fa fa-github"></i>
          </a>
        </div>

      </footer>
    </div>
  )
}

const footerContainer = styled.footer;

