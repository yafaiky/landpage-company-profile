const links = [
  { label: 'About', href: '#about' },
  { label: 'Pricelist', href: '#pricelist' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Our Clients', href: '/clients' },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #2A2E8A 0%, #1F2FA6 100%)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '4rem 0 2.5rem',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.06em', color: '#ffffff', marginBottom: '0.75rem' }}>
              byvisco<span style={{ color: '#a8c4ff' }}>.</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: '22ch' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: '#a8c4ff' }}>Navigation</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {links.map(l => (
                <li key={l.label}>
                  <a href={l.href} style={{
                    fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#a8c4ff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: '#a8c4ff' }}>Contact</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { icon: '✉', text: 'byvisco@byvisco.studio' },
                { icon: '↗', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
                { icon: '◉', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
              ].map(c => (
                <li key={c.text} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#a8c4ff', flexShrink: 0 }}>{c.icon}</span>
                  {c.text}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem', color: '#a8c4ff' }}>Start a Project</p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank" rel="noreferrer"
              className="btn-primary"
              id="footer-cta-btn"
              style={{ fontSize: '0.72rem' }}
            >
              WhatsApp Us ↗
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '1.5rem' }} />
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
            © 2025 byvisco. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['lorem', 'lorem ipsum', 'lorem ipsum'].map(s => (
              <a key={s} href="#" style={{
                fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#a8c4ff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
