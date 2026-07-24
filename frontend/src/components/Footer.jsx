import '../styles/Footer.css'

function Footer(){
    return (
    <footer className="footer">
        <div><strong>Rose&Ney</strong><span>Cabeleireiros</span></div>
        <p>© {new Date().getFullYear()} · Beleza com identidade e carinho.</p>
        <a href="#inicio">Voltar ao topo ↑</a>
      </footer>
)}
export default Footer