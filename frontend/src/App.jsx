import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import BookingSection from './components/BookingSection'
import ContactSection from './components/ContactSection'
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
        <HeroSection />

        <ServicesSection
          services={services}
          catalogStatus={catalogStatus}
          chooseService={chooseService}
          getServiceDetails={getServiceDetails}
          formatPrice={formatPrice} />


        <BookingSection
          submitBooking={submitBooking}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          serviceOptions={serviceOptions}
          formatPrice={formatPrice}
          formStatus={formStatus}
        />


        <ContactSection />
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
