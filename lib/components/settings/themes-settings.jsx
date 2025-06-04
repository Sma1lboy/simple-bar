import * as Uebersicht from "uebersicht";
import * as Themes from "../../styles/themes";
import * as Icons from "../icons/icons.jsx";
import ThemeColorPicker from "./theme-color-picker.jsx";

const { React } = Uebersicht;

/**
 * Enhanced themes settings component with better organization and visual design
 */
export default function ThemesSettings({ setting, newSettings, setNewSettings }) {
  const themeSettings = newSettings.themes;
  const { documentation, infos } = setting;

  // Color sections for better organization
  const colorSections = [
    {
      title: "Primary Colors",
      colors: [
        { key: "colorMain", label: "Main", description: "Primary background color" },
        { key: "colorMainAlt", label: "Main Alternative", description: "Secondary background" },
        { key: "colorMinor", label: "Minor", description: "Tertiary background" },
        { key: "colorAccent", label: "Accent", description: "Highlight color" },
      ]
    },
    {
      title: "Semantic Colors",
      colors: [
        { key: "colorRed", label: "Red", description: "Error/danger color" },
        { key: "colorGreen", label: "Green", description: "Success color" },
        { key: "colorYellow", label: "Yellow", description: "Warning color" },
        { key: "colorOrange", label: "Orange", description: "Info color" },
        { key: "colorBlue", label: "Blue", description: "Primary action color" },
        { key: "colorMagenta", label: "Magenta", description: "Secondary action" },
        { key: "colorCyan", label: "Cyan", description: "Tertiary action" },
      ]
    },
    {
      title: "Basic Colors",
      colors: [
        { key: "colorBlack", label: "Black", description: "True black" },
        { key: "colorWhite", label: "White", description: "True white" },
        { key: "colorForeground", label: "Foreground", description: "Text color" },
        { key: "colorBackground", label: "Background", description: "Base background" },
      ]
    }
  ];

  const updateColorValue = (colorKey, value) => {
    const updatedSettings = {
      ...newSettings,
      themes: { ...newSettings.themes, [colorKey]: value },
    };
    setNewSettings(updatedSettings);
  };

  const updateThemeSelection = (themeType, value) => {
    const updatedSettings = {
      ...newSettings,
      themes: { ...newSettings.themes, [themeType]: value },
    };
    setNewSettings(updatedSettings);
  };

  // Get available themes
  const availableThemes = Object.keys(Themes.collection).map((key) => {
    const theme = Themes.collection[key];
    return { code: key, name: theme.name, kind: theme.kind };
  });
  
  const darkThemes = availableThemes.filter((theme) => theme.kind === "dark");
  const lightThemes = availableThemes.filter((theme) => theme.kind === "light");

  // Fallback for empty theme lists
  if (lightThemes.length === 0) {
    lightThemes.push({ code: "MacOSLight", name: "Mac OS Light", kind: "light" });
  }
  if (darkThemes.length === 0) {
    darkThemes.push({ code: "MacOSDark", name: "Mac OS Dark", kind: "dark" });
  }

  return (
    <div className="settings__theme-section">
      {/* Theme Selectors */}
      <div className="settings__theme-selectors">
        <div className="settings__theme-selector">
          <div className="settings__theme-selector-label">Light Theme</div>
          <select
            value={themeSettings.lightTheme}
            onChange={(e) => updateThemeSelection("lightTheme", e.target.value)}
          >
            {lightThemes.map((theme) => (
              <option key={theme.code} value={theme.code}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="settings__theme-selector">
          <div className="settings__theme-selector-label">Dark Theme</div>
          <select
            value={themeSettings.darkTheme}
            onChange={(e) => updateThemeSelection("darkTheme", e.target.value)}
          >
            {darkThemes.map((theme) => (
              <option key={theme.code} value={theme.code}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Color Overrides */}
      <div className="settings__color-overrides">
        <div className="settings__color-overrides-header">
          <div className="settings__color-overrides-title">Color Overrides</div>
          <div className="settings__color-overrides-subtitle">
            Customize individual colors to override theme defaults
          </div>
        </div>

        {colorSections.map((section) => (
          <div key={section.title} className="settings__color-section">
            <div className="settings__color-section-title">{section.title}</div>
            <div className="settings__color-section-grid">
              {section.colors.map((color) => (
                <div key={color.key} className="settings__color-card">
                  <div className="settings__color-card-label">
                    {color.label}
                  </div>
                  <ThemeColorPicker
                    value={themeSettings[color.key] || ""}
                    onChange={(value) => updateColorValue(color.key, value)}
                    placeholder="e.g. #ff0000, rgb(255,0,0)"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Documentation and Tips */}
      {documentation && (
        <div className="settings__documentation">
          <Icons.OpenBook className="settings__documentation-icon" />
          <span className="settings__documentation-title">
            You{"'"}ll find all the information about these settings{" "}
            <a
              href={`https://www.jeantinland.com/toolbox/simple-bar/documentation${documentation}`}
            >
              here on the documentation
            </a>{" "}
            hosted on jeantinland.com.
          </span>
        </div>
      )}
      {infos && infos.length && (
        <div className="settings__infos">
          <div className="settings__infos-title">Tips</div>
          {infos.map((info, i) => (
            <div
              key={i}
              className="settings__info"
              dangerouslySetInnerHTML={{ __html: info }}
            />
          ))}
        </div>
      )}
    </div>
  );
} 