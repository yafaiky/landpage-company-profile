const links = [
  { label: 'About', href: '#about' },
  { label: 'Pricelist', href: '#pricelist' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Our Clients', href: '/clients' },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg2)',
      borderTop: '1px solid var(--dimmer)',
      padding: '4rem 0 2.5rem',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.06em', color: 'var(--white)', marginBottom: '0.75rem' }}>
              byvisco<span style={{ color: 'var(--green)' }}>.</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65, maxWidth: '22ch' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem' }}>Navigation</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {links.map(l => (
                <li key={l.label}>
                  <a href={l.href} style={{
                    fontSize: '0.82rem', color: 'var(--muted)', transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem' }}>Contact</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { icon: '✉', text: 'byvisco@byvisco.studio' },
                { icon: '↗', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
                { icon: '◉', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
              ].map(c => (
                <li key={c.text} style={{ fontSize: '0.82rem', color: 'var(--muted)', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--green)', flexShrink: 0 }}>{c.icon}</span>
                  {c.text}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="label" style={{ marginBottom: '1.25rem' }}>Start a Project</p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank" rel="noreferrer"
              className="btn-green"
              id="footer-cta-btn"
              style={{ fontSize: '0.72rem' }}
            >
              WhatsApp Us ↗
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ height: '1px', background: 'var(--dimmer)', marginBottom: '1.5rem' }} />
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
            © 2025 byvisco. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['lorem', 'lorem ipsum', 'lorem ipsum'].map(s => (
              <a key={s} href="#" style={{
                fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--muted)', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
