function ServicesSection({
  services,
  catalogStatus,
  chooseService,
  getServiceDetails,
  formatPrice,
}) {
  return (
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
                <div className="service-icon" aria-hidden="true">
                  {details.icon}
                </div>
              </div>

              <h3>{service.nome}</h3>
              <p>{details.description}</p>

              <div className="service-footer">
                <span className="service-price">{formatPrice(service.preco)}</span>
                <span className="service-duration">{service.duracaoMinutos} min</span>
              </div>

              <button
                className="card-action"
                type="button"
                onClick={() => chooseService(service)}
              >
                Escolher <span aria-hidden="true">→</span>
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ServicesSection