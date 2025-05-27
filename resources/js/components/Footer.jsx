// resources/js/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
  return (
    <footer className="hb-footer">
      <div className="hb-footer-container">
        <div className="footer-col">
          <h4>¿QUÉ HACEMOS?</h4>
          <ul>
            <li><Link to="/">Listado de inmuebles</Link></li>
            <li><Link to="/contacto">Gestión de solicitudes</Link></li>
            <li><Link to="/mis-transacciones">Mis transacciones</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>SÍGUENOS EN REDES</h4>
          <div className="social-icons">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="https://linkedin.com/company/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>CONTACTO</h4>
          <address>
            HomeBuy S.L.<br/>
            C. Marqués, s/n, 33401 Avilés, Asturias<br/>
            Tel: +34 111 111 111<br/>
            Email: <a href="mailto:info@homebuy.com">info@homebuy.com</a>
          </address>
        </div>
      </div>

      <div className="hb-footer-bottom">
        © 2025 HomeBuy · <Link to="/">Términos</Link> · <Link to="/">Privacidad</Link> · <Link to="/">Cookies</Link>
      </div>
    </footer>
  );
}
