import '../styles/BookingSection.css'

function BookingSection({
    submitBooking,
    selectedService,
    setSelectedService,
    serviceOptions,
    formatPrice,
    formStatus}) {
    return (
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
    )
}
export default BookingSection