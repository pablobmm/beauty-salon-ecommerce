import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import './styles/App.css'

const fallbackServices = [
  { id: 'manicure', nome: 'Manicure', preco: 30, duracaoMinutos: 30 },
  { id: 'pedicure', nome: 'Pedicure', preco: 35, duracaoMinutos: 40 },
  { id: 'escova', nome: 'Escova', preco: 50, duracaoMinutos: 50 },
  { id: 'sobrancelha', nome: 'Sobrancelha', preco: 25, duracaoMinutos: 30 },
]

const serviceDetails = {
  manicure: { icon: '✦', description: 'Cuidado completo para suas mãos ficarem impecáveis.' },
  pedicure: { icon: '✿', description: 'Pés bem cuidados, leves e sempre bonitos.' },
  escova: { icon: '∿', description: 'Cabelos alinhados, com brilho e movimento.' },
  sobrancelha: { icon: '◉', description: 'Design que valoriza seu olhar e seus traços.' },
  corte: { icon: '✂', description: 'Um corte pensado para combinar com o seu estilo.' },
}

const normalize = (value = '') =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const getServiceDetails = (nome) => {
  const normalizedName = normalize(nome)
  const key = Object.keys(serviceDetails).find((item) => normalizedName.includes(item))

  return key
    ? serviceDetails[key]
    : { icon: '✧', description: 'Um cuidado especial preparado para realçar sua beleza.' }
}

const formatPrice = (price) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(price))

function App() {
  const [services, setServices] = useState(fallbackServices)
  const [catalogStatus, setCatalogStatus] = useState('loading')
  const [selectedService, setSelectedService] = useState('')
  const [formStatus, setFormStatus] = useState('idle')

  useEffect(() => {
    const controller = new AbortController()

    async function loadServices() {
      try {
        const response = await fetch('http://localhost:8080/api/servicos', {
          signal: controller.signal,
        })

        if (!response.ok) throw new Error('Não foi possível carregar os serviços.')

        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) setServices(data)
        setCatalogStatus('success')
      } catch (error) {
        if (error.name !== 'AbortError') setCatalogStatus('fallback')
      }
    }

    loadServices()
    console.log(selectedService)
    return () => controller.abort()
  }, [])

  const serviceOptions = useMemo(
    () => services.map((service) => ({ ...service, value: String(service.id ?? service.nome) })),
    [services],
  )

  function chooseService(service) {
    setSelectedService(String(service.id ?? service.nome))
    document.querySelector('#agendar')?.scrollIntoView({ behavior: 'smooth' })
  }

  function submitBooking(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const service = serviceOptions.find((item) => item.value === formData.get('servico'))
    const date = formData.get('data')
    const formattedDate = date ? new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR') : ''
    const message = [
      'Olá! Gostaria de solicitar um agendamento.',
      `Nome: ${formData.get('nome')}`,
      `Serviço: ${service?.nome ?? ''}`,
      `Data: ${formattedDate}`,
      `Horário: ${formData.get('horario')}`,
      `Telefone: ${formData.get('telefone')}`,
    ].join('\n')

    setFormStatus('sent')
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="site-shell">
      <Header />

      <main>
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

        <section className="services section-block" id="servicos">
          <div className="section-heading">
            <div>
              <span className="section-kicker">NOSSOS SERVIÇOS</span>
              <h2>Escolha seu cuidado</h2>
            </div>
            <p>Experiências pensadas para renovar sua autoestima e deixar sua rotina mais leve.</p>
          </div>

          {catalogStatus === 'fallback' && (
            <p className="catalog-note" role="status">
              Exibindo nosso catálogo principal. Inicie o backend para consultar valores atualizados.
            </p>
          )}

          <div className="service-grid" aria-busy={catalogStatus === 'loading'}>
            {services.map((service, index) => {
              const details = getServiceDetails(service.nome)
              return (
                <article key={service.id ?? service.nome} className="service-card">
                  <div className="service-card-top">
                    <span className="service-number">0{index + 1}</span>
                    <div className="service-icon" aria-hidden="true">{details.icon}</div>
                  </div>
                  <h3>{service.nome}</h3>
                  <p>{details.description}</p>
                  <div className="service-footer">
                    <span className="service-price">{formatPrice(service.preco)}</span>
                    <span className="service-duration">{service.duracaoMinutos} min</span>
                  </div>
                  <button className="card-action" type="button" onClick={() => chooseService(service)}>
                    Escolher <span aria-hidden="true">→</span>
                  </button>
                </article>
              )
            })}
          </div>
        </section>

        <section className="booking-section section-block" id="agendar">
          <div className="booking-copy">
            <span className="section-kicker">AGENDAMENTO</span>
            <h2>Reserve um tempo para você</h2>
            <p>Preencha os dados ao lado. Vamos abrir o WhatsApp com sua solicitação pronta para enviar.</p>
            <ul className="booking-benefits">
              <li><span>✓</span> Solicitação rápida e sem cadastro</li>
              <li><span>✓</span> Confirmação diretamente com o salão</li>
              <li><span>✓</span> Escolha o melhor dia e horário</li>
            </ul>
          </div>

          <form className="booking-form" onSubmit={submitBooking}>
            <label>
              Seu nome
              <input name="nome" type="text" placeholder="Como podemos chamar você?" required />
            </label>
            <label>
              Telefone
              <input name="telefone" type="tel" placeholder="(11) 99999-9999" required />
            </label>
            <label className="full-field">
              Serviço
              <select
                name="servico"
                value={selectedService}
                onChange={(event) => setSelectedService(event.target.value)}
                required
              >
                <option value="">Selecione um serviço</option>
                {serviceOptions.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.nome} — {formatPrice(service.preco)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Melhor dia
              <input name="data" type="date" min={new Date().toISOString().split('T')[0]} required />
            </label>
            <label>
              Melhor horário
              <input name="horario" type="time" min="08:00" max="19:00" required />
            </label>
            <button className="button primary full-field" type="submit">Solicitar pelo WhatsApp</button>
            {formStatus === 'sent' && (
              <p className="form-feedback full-field" role="status">
                Solicitação preparada! Finalize o envio no WhatsApp.
              </p>
            )}
          </form>
        </section>

        <section className="contact-section section-block" id="contato">
          <div>
            <span className="section-kicker">FALE COM A GENTE</span>
            <h2>Vai ser um prazer cuidar de você.</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-item">
              <span>01</span><p><strong>Horários</strong>Ter–Sáb, das 8h às 19h</p>
            </div>
            <div className="contact-item">
              <span>02</span><p><strong>Atendimento</strong>Consulte disponibilidade pelo WhatsApp</p>
            </div>
            <div className="contact-item">
              <span>03</span><p><strong>Endereço</strong>Adicione aqui o endereço do salão</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div><strong>Rose&Ney</strong><span>Cabeleireiros</span></div>
        <p>© {new Date().getFullYear()} · Beleza com identidade e carinho.</p>
        <a href="#inicio">Voltar ao topo ↑</a>
      </footer>
    </div>
  )
}

export default App
