import '../styles/Header.css'

function Header() {
  return (
    <header className="topbar">
      <a className="brand-box" href="#inicio" aria-label="Rose e Ney - início">
        <span className="brand-mark">R&N</span>
        <span>
          <strong className="brand-name">Rose&Ney</strong>
          <small className="brand-subtitle">Cabeleireiros</small>
        </span>
      </a>

      <nav className="main-nav" aria-label="Navegação principal">
        <a href="#inicio">Início</a>
        <a href="#servicos">Serviços</a>
        <a href="#agendar">Agendar</a>
        <a href="#contato">Contato</a>
      </nav>

      <a
        href="https://wa.me/?text=Olá!%20Gostaria%20de%20conhecer%20os%20serviços%20do%20salão."
        target="_blank"
        rel="noreferrer"
        className="button whatsapp"
      >
        WhatsApp <span aria-hidden="true">↗</span>
      </a>
    </header>
  )
}

export default Header