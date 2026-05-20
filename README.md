# Portfolio - V1

Single-page portfolio with responsive design and mobile-first approach.

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Fonts:** Google Fonts (Bebas Neue, JetBrains Mono)
- **Dependencies:** None (pure vanilla)

## Features

- Responsive design (mobile-first)
- Animated stars/nebula background
- Skill circles visualization
- Project cards with hover effects
- Dark neon theme

## Sections

1. **Header** - Sticky navigation with hamburger menu
2. **About** - Bio, education, languages, courses, industry
3. **Skills** - Circles cloud (desktop) / Tech pills (mobile)
4. **Projects** - Responsive card grid
5. **Footer** - Logo, copyright, links

## Design System

### Colors

| Variable | Color | Usage |
|----------|-------|-------|
| `--bg-dark` | <span style="display:inline-block;width:70px;text-align:center;background:#0a1628;color:#fff;padding:2px 8px;border-radius:4px;border:1px solid #555;">0a1628</span> | Background |
| `--bg-card` | <span style="display:inline-block;width:70px;text-align:center;background:#0d1b2a;color:#fff;padding:2px 8px;border-radius:4px;border:1px solid #555;">0d1b2a</span> | Cards |
| `--neon-cyan` | <span style="display:inline-block;width:70px;text-align:center;background:#00d3ff;color:#000;padding:2px 8px;border-radius:4px;border:1px solid #555;">00d3ff</span> | Accent |
| `--neon-purple` | <span style="display:inline-block;width:70px;text-align:center;background:#a855f7;color:#fff;padding:2px 8px;border-radius:4px;border:1px solid #555;">a855f7</span> | Secondary |
| `--neon-green` | <span style="display:inline-block;width:70px;text-align:center;background:#4ade80;color:#000;padding:2px 8px;border-radius:4px;border:1px solid #555;">4ade80</span> | Success |
| `--text-light` | <span style="display:inline-block;width:70px;text-align:center;background:#ffffff;color:#000;padding:2px 8px;border-radius:4px;border:1px solid #555;">ffffff</span> | Primary text |
| `--text-dim` | <span style="display:inline-block;width:70px;text-align:center;background:#5cffc9;color:#000;padding:2px 8px;border-radius:4px;border:1px solid #555;">5cffc9</span> | Secondary text |

### Breakpoints

| Name | Size | Layout |
|------|------|--------|
| Extra small | < 375px | Compact mobile |
| Mobile | 480-767px | Hamburger menu |
| Tablet | 768-1023px | 2 columns |
| Desktop | ≥ 1024px | 3 columns |