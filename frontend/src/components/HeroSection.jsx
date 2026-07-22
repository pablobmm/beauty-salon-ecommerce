function HeroSection() {
  return (
    <section className="hero-section" id="inicio">
          <div className="hero-copy">
            <span className="eyebrow">BELEZA, CUIDADO E BEM-ESTAR</span>
            <h1>Seu momento de se sentir ainda mais <em>bonita.</em></h1>
            <p>Escolha seu cuidado favorito e solicite seu horário em poucos minutos.</p>
            <div className="hero-actions">
              <a href="#agendar" className="button primary">Agendar agora</a>
              <a href="#servicos" className="text-link">Conhecer serviços <span>↓</span></a>
            </div>
            <div className="hero-trust">
              <div className="avatars" aria-hidden="true">
                <span className="avatar">R</span>
                <span className="avatar">N</span>
                <span className="avatar">+</span>
              </div>
              <span><strong>+500</strong> clientes atendidas com carinho</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Destaques do salão">
            <div className="visual-glow" />
            <div className="visual-monogram">R<span>&</span>N</div>
            <div className="floating-card floating-card-top">
              <span className="floating-icon">♡</span>
              <span><strong>Atendimento</strong><small>feito com carinho</small></span>
            </div>
            <div className="floating-card floating-card-bottom">
              <span className="floating-icon">✦</span>
              <span><strong>Resultado</strong><small>que combina com você</small></span>
            </div>
          </div>
        </section>

    )
  }
export default HeroSection