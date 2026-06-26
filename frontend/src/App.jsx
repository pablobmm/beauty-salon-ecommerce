import './styles/App.css'

const services = [
  {
    title: 'Manicure',
    description: 'Cuidado completo para suas mãos ficarem impecáveis.',
    price: 'R$ 30,00',
    emoji: '💅'
  },
  {
    title: 'Pedicure',
    description: 'Pés bem cuidados e sempre bonitos.',
    price: 'R$ 35,00',
    emoji: '🦶'
  },
  {
    title: 'Escova',
    description: 'Cabelos alinhados, com brilho e leveza.',
    price: 'R$ 50,00',
    emoji: '✨'
  },
  {
    title: 'Sobrancelha',
    description: 'Design que valoriza seu olhar e sua beleza.',
    price: 'R$ 25,00',
    emoji: '👁️'
  }
]

function App() {
  return (
    <div className="page">
      <header className="topbar">
        <div className="brand-box">
          <div className="brand-name">Rose&Ney Cabeleireiros</div>
          <div className="brand-subtitle">Salão de beleza</div>
        </div>
        <nav className="main-nav">
          <a href="#inicio">Início</a>
          <a href="#servicos">Serviços</a>
          <a href="#agendar">Agendar</a>
          <a href="#contato">Contato</a>
        </nav>
        <a href="#contato" className="button whatsapp">WhatsApp</a>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow">Realce sua</div>
            <h1>beleza com praticidade</h1>
            <p>Agende seu horário online ou fale direto pelo WhatsApp.</p>
            <div className="hero-actions">
              <a href="#agendar" className="button primary">Agendar agora</a>
              <div className="hero-meta">
                <div className="avatars">
                  <span className="avatar">A</span>
                  <span className="avatar">B</span>
                  <span className="avatar">C</span>
                </div>
                <span>+500 clientes satisfeitas</span>
              </div>
            </div>
          </div>
          
        </section>

        <section className="services" id="servicos">
          <div className="section-header">
            <h2>Serviços</h2>
            <p>Cuidados especiais para realçar ainda mais você.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <div className="service-icon" aria-hidden="true">{service.emoji}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-price">{service.price}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
