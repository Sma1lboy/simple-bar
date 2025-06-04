import * as Uebersicht from "uebersicht";

const { React } = Uebersicht;

/**
 * Theme color picker component with HSV color selection
 */
export default function ThemeColorPicker({ value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hsv, setHsv] = React.useState({ h: 0, s: 100, v: 100 });
  const [alpha, setAlpha] = React.useState(1);
  const [isDragging, setIsDragging] = React.useState(null);

  // Convert hex to HSV
  const hexToHsv = (hex) => {
    if (!hex || hex === "transparent") return { h: 0, s: 0, v: 100 };
    
    // Handle rgba() format
    if (hex.startsWith('rgba')) {
      const rgbaMatch = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1]) / 255;
        const g = parseInt(rgbaMatch[2]) / 255;
        const b = parseInt(rgbaMatch[3]) / 255;
        const a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
        setAlpha(a);
        return rgbToHsv(r, g, b);
      }
    }
    
    // Handle rgb() format
    if (hex.startsWith('rgb')) {
      const rgbMatch = hex.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]) / 255;
        const g = parseInt(rgbMatch[2]) / 255;
        const b = parseInt(rgbMatch[3]) / 255;
        return rgbToHsv(r, g, b);
      }
    }
    
    // Handle hex format
    hex = hex.replace('#', '');
    if (hex.length !== 6) return { h: 0, s: 0, v: 100 };
    
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    return rgbToHsv(r, g, b);
  };

  // Convert RGB to HSV
  const rgbToHsv = (r, g, b) => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    let h = 0;
    if (diff !== 0) {
      if (max === r) h = ((g - b) / diff) % 6;
      else if (max === g) h = (b - r) / diff + 2;
      else h = (r - g) / diff + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    
    const s = max === 0 ? 0 : Math.round((diff / max) * 100);
    const v = Math.round(max * 100);
    
    return { h: isNaN(h) ? 0 : h, s: isNaN(s) ? 0 : s, v: isNaN(v) ? 0 : v };
  };

  // Convert HSV to hex
  const hsvToHex = (h, s, v, a = 1) => {
    // Ensure valid values
    h = isNaN(h) ? 0 : Math.max(0, Math.min(360, h));
    s = isNaN(s) ? 0 : Math.max(0, Math.min(100, s));
    v = isNaN(v) ? 0 : Math.max(0, Math.min(100, v));
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    
    s /= 100;
    v /= 100;
    
    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    // Ensure values are valid numbers
    r = isNaN(r) ? 0 : Math.max(0, Math.min(255, r));
    g = isNaN(g) ? 0 : Math.max(0, Math.min(255, g));
    b = isNaN(b) ? 0 : Math.max(0, Math.min(255, b));
    
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
    return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : hex;
  };

  // Initialize HSV from value
  React.useEffect(() => {
    if (value) {
      const parsed = hexToHsv(value);
      setHsv(parsed);
    }
  }, [value]);

  // Handle saturation/brightness area click/drag
  const handleSaturationBrightness = React.useCallback((e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    const newS = Math.round(x * 100);
    const newV = Math.round((1 - y) * 100);
    
    const newHsv = { ...hsv, s: newS, v: newV };
    setHsv(newHsv);
    onChange(hsvToHex(newHsv.h, newHsv.s, newHsv.v, alpha));
  }, [hsv, alpha, onChange]);

  // Handle hue slider
  const handleHue = React.useCallback((e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newH = Math.round(x * 360);
    
    const newHsv = { ...hsv, h: newH };
    setHsv(newHsv);
    onChange(hsvToHex(newHsv.h, newHsv.s, newHsv.v, alpha));
  }, [hsv, alpha, onChange]);

  // Handle alpha slider
  const handleAlpha = React.useCallback((e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newAlpha = Math.round(x * 100) / 100;
    
    setAlpha(newAlpha);
    onChange(hsvToHex(hsv.h, hsv.s, hsv.v, newAlpha));
  }, [hsv, onChange]);

  // Mouse event handlers
  const handleMouseDown = React.useCallback((type) => (e) => {
    e.preventDefault();
    setIsDragging(type);
    
    // Handle the initial click
    if (type === 'saturation') {
      handleSaturationBrightness(e);
    } else if (type === 'hue') {
      handleHue(e);
    } else if (type === 'alpha') {
      handleAlpha(e);
    }
  }, [handleSaturationBrightness, handleHue, handleAlpha]);

  const handleMouseMove = React.useCallback((e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    
    // Find the correct target element for each drag type
    let targetElement;
    if (isDragging === 'saturation') {
      targetElement = document.querySelector('.theme-color-picker__saturation');
    } else if (isDragging === 'hue') {
      targetElement = document.querySelector('.theme-color-picker__hue');
    } else if (isDragging === 'alpha') {
      targetElement = document.querySelector('.theme-color-picker__alpha');
    }
    
    if (!targetElement) return;
    
    // Create a synthetic event with the correct target
    const syntheticEvent = {
      ...e,
      currentTarget: targetElement,
      clientX: e.clientX,
      clientY: e.clientY,
      preventDefault: () => e.preventDefault()
    };
    
    if (isDragging === 'saturation') {
      handleSaturationBrightness(syntheticEvent);
    } else if (isDragging === 'hue') {
      handleHue(syntheticEvent);
    } else if (isDragging === 'alpha') {
      handleAlpha(syntheticEvent);
    }
  }, [isDragging, handleSaturationBrightness, handleHue, handleAlpha]);

  const handleMouseUp = React.useCallback((e) => {
    e.preventDefault();
    setIsDragging(null);
  }, []);

  // Add global mouse events when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      // Prevent text selection while dragging
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const currentColor = hsvToHex(hsv.h, hsv.s, hsv.v, alpha);
  const hueColor = hsvToHex(hsv.h, 100, 100);

  // Simplified and reliable transparency detection
  const isTransparent = (colorValue) => {
    if (!colorValue) return false;
    if (colorValue.startsWith('rgba')) {
      // Extract alpha value from rgba(r,g,b,a)
      const alphaMatch = colorValue.match(/,\s*([\d.]+)\s*\)$/);
      if (alphaMatch) {
        const alpha = parseFloat(alphaMatch[1]);
        return !isNaN(alpha) && alpha < 1;
      }
    }
    return false;
  };
  
  const showTransparency = isTransparent(value);
  
  return (
    <div className="theme-color-picker">
      <div className="theme-color-picker__input-wrapper">
        <div 
          className="theme-color-picker__preview"
          style={{ 
            backgroundColor: showTransparency ? 'transparent' : (value || "transparent"),
            backgroundImage: showTransparency ? 
              `linear-gradient(45deg, #ccc 25%, transparent 25%), 
               linear-gradient(-45deg, #ccc 25%, transparent 25%), 
               linear-gradient(45deg, transparent 75%, #ccc 75%), 
               linear-gradient(-45deg, transparent 75%, #ccc 75%)` : 'none',
            backgroundSize: showTransparency ? '8px 8px' : 'auto',
            backgroundPosition: showTransparency ? '0 0, 0 4px, 4px -4px, -4px 0' : 'initial'
          }}
          onClick={() => setIsOpen(!isOpen)}
          title="Click to open color picker"
        >
          {showTransparency && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: value,
              borderRadius: '4px'
            }} />
          )}
        </div>
        <input
          type="text"
          className="theme-color-picker__input"
          value={value || ""}
          placeholder={placeholder || "e.g. #ff0000, rgb(255,0,0)"}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            className="theme-color-picker__clear"
            onClick={() => onChange("")}
            title="Clear color"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <div 
            className="theme-color-picker__overlay"
            onClick={() => setIsOpen(false)}
          />
          <div className="theme-color-picker__popup">
            <div className="theme-color-picker__header">
              <span>Color Picker</span>
              <button onClick={() => setIsOpen(false)}>×</button>
            </div>
            
            {/* Main saturation/brightness area */}
            <div 
              className="theme-color-picker__saturation"
              style={{ backgroundColor: hueColor }}
              onMouseDown={handleMouseDown('saturation')}
            >
              <div className="theme-color-picker__saturation-overlay">
                <div 
                  className="theme-color-picker__saturation-pointer"
                  style={{
                    left: `${hsv.s}%`,
                    top: `${100 - hsv.v}%`
                  }}
                />
              </div>
            </div>

            {/* Hue slider */}
            <div className="theme-color-picker__sliders">
              <div 
                className="theme-color-picker__hue"
                onMouseDown={handleMouseDown('hue')}
              >
                <div 
                  className="theme-color-picker__hue-pointer"
                  style={{ left: `calc(${(hsv.h / 360) * (100 - 16 / 2.8)}% + 8px)` }}
                />
              </div>

              {/* Alpha slider */}
              <div 
                className="theme-color-picker__alpha"
                onMouseDown={handleMouseDown('alpha')}
              >
                <div 
                  className="theme-color-picker__alpha-bg"
                  style={{
                    background: `linear-gradient(to right, transparent, ${hsvToHex(hsv.h, hsv.s, hsv.v)})`
                  }}
                />
                <div 
                  className="theme-color-picker__alpha-pointer"
                  style={{ left: `calc(${alpha * (100 - 16 / 2.8)}% + 8px)` }}
                />
              </div>
            </div>

            {/* Color info */}
            <div className="theme-color-picker__info">
              <div 
                className="theme-color-picker__preview-large"
                style={{
                  backgroundImage: showTransparency ? 
                    `linear-gradient(45deg, #ccc 25%, transparent 25%), 
                     linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                     linear-gradient(45deg, transparent 75%, #ccc 75%), 
                     linear-gradient(-45deg, transparent 75%, #ccc 75%)` : 'none',
                  backgroundSize: showTransparency ? '8px 8px' : 'auto',
                  backgroundPosition: showTransparency ? '0 0, 0 4px, 4px -4px, -4px 0' : 'initial'
                }}
              >
                <div style={{ backgroundColor: currentColor }} />
              </div>
              <div className="theme-color-picker__values">
                <div>HEX: {currentColor}</div>
                <div>HSV: {hsv.h}°, {hsv.s}%, {hsv.v}%</div>
                {alpha < 1 && <div>Alpha: {Math.round(alpha * 100)}%</div>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 