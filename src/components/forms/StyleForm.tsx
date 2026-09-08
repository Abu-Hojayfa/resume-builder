import { useResume } from '../../contexts/ResumeContext'

const FONTS = [
  { value: 'Inter', label: 'Inter — Modern Sans' },
  { value: 'Lora', label: 'Lora — Elegant Serif' },
  { value: 'Playfair Display', label: 'Playfair — Classic Serif' },
  { value: 'Roboto', label: 'Roboto — Clean Sans' },
  { value: 'Montserrat', label: 'Montserrat — Geometric Sans' },
  { value: 'Source Sans 3', label: 'Source Sans — Humanist' },
  { value: 'Merriweather', label: 'Merriweather — News Serif' },
  { value: 'DM Sans', label: 'DM Sans — Rounded Modern' },
]

export default function StyleForm() {
  const { style, updateStyle } = useResume()

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2 className="section-title">Typography & Colors</h2>
      </div>

      <div className="form-stack">
        {/* Font Family */}
        <div className="form-group">
          <label className="form-label">Font Family</label>
          <select
            className="form-input"
            value={style.fontFamily}
            onChange={e => updateStyle({ fontFamily: e.target.value })}
          >
            {FONTS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          <p
            className="form-hint"
            style={{ fontFamily: style.fontFamily, marginTop: 6 }}
          >
            The quick brown fox — sample text in {style.fontFamily}
          </p>
        </div>

        <div className="style-divider" />

        {/* Colors */}
        <p className="form-group-label">Colors</p>
        <div className="color-row">
          <div className="form-group">
            <label className="form-label">Accent / Headings</label>
            <div className="color-input-wrap">
              <input
                type="color"
                className="color-swatch"
                value={style.accentColor}
                onChange={e => updateStyle({ accentColor: e.target.value })}
              />
              <input
                type="text"
                className="form-input color-hex"
                value={style.accentColor}
                onChange={e => {
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                    updateStyle({ accentColor: e.target.value })
                  }
                }}
                maxLength={7}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Body Text</label>
            <div className="color-input-wrap">
              <input
                type="color"
                className="color-swatch"
                value={style.textColor}
                onChange={e => updateStyle({ textColor: e.target.value })}
              />
              <input
                type="text"
                className="form-input color-hex"
                value={style.textColor}
                onChange={e => {
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                    updateStyle({ textColor: e.target.value })
                  }
                }}
                maxLength={7}
              />
            </div>
          </div>
        </div>

        <div className="style-divider" />

        {/* Divider */}
        <p className="form-group-label">Section Divider Line</p>
        <div className="form-group">
          <label className="form-label">
            Thickness — <span style={{ fontWeight: 600 }}>{style.dividerWidth}px</span>
          </label>
          <input
            type="range"
            className="range-input"
            min={0}
            max={4}
            step={1}
            value={style.dividerWidth}
            onChange={e => updateStyle({ dividerWidth: parseInt(e.target.value) })}
          />
          <div className="range-labels">
            <span>None</span>
            <span>Thick</span>
          </div>
          {/* Live preview */}
          <div
            style={{
              marginTop: 12,
              borderTop: style.dividerWidth === 0 ? 'none' : `${style.dividerWidth}px solid ${style.dividerColor}`,
              opacity: style.dividerWidth === 0 ? 0.2 : 1,
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Divider Color</label>
          <div className="color-input-wrap">
            <input
              type="color"
              className="color-swatch"
              value={style.dividerColor}
              onChange={e => updateStyle({ dividerColor: e.target.value })}
            />
            <input
              type="text"
              className="form-input color-hex"
              value={style.dividerColor}
              onChange={e => {
                if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                  updateStyle({ dividerColor: e.target.value })
                }
              }}
              maxLength={7}
            />
          </div>
        </div>

        <div className="style-divider" />

        {/* Reset */}
        <button
          className="btn-ghost"
          onClick={() => updateStyle({
            fontFamily: 'Inter',
            accentColor: '#1e293b',
            textColor: '#374151',
            dividerWidth: 1,
            dividerColor: '#cbd5e1',
          })}
        >
          Reset to defaults
        </button>
      </div>
    </div>
  )
}
