// Styles for /lib/components/settings/settings.jsx component
import { userWidgetsCreatorStyles } from "./user-widgets-creator";
import { aerospaceDisplayManagerStyles } from "./aerospace-display-manager";

export const settingsStyles = /* css */ `
.settings {
  z-index: 1;
}
.settings__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.simple-bar--floating .settings__overlay,
.simple-bar--no-bar-background .settings__overlay {
  display: none;
}
.simple-bar--on-bottom  .settings__overlay {
  top: unset;
  bottom: 28px;
}
.settings__outer {
  --settings-width: 620px;
  position: fixed;
  left: calc(50% - (var(--settings-width) / 2));
  top: calc(var(--bar-height) + 10px);
  width: var(--settings-width);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  background-color: var(--main);
  border-radius: var(--item-radius);
  box-shadow: var(--light-shadow);
  z-index: 1;
}
.simple-bar--floating .settings__outer {
  top: calc(var(--bar-height) + 20px);
}
.simple-bar--on-bottom  .settings__outer {
  top: unset;
  bottom: calc(var(--bar-height) + 10px);
}
.settings__header {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  font-size: calc(var(--font-size) * 1.4);
  font-weight: 700;
}
.settings__header-dot {
  flex: 0 0 12px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 9px;
}
.settings__header-dot--close {
  padding: 0;
  background-color: var(--red);
  cursor: pointer;
  user-select: none;
  border: 0;
  -webkit-user-select: none;
}
.settings__header-dot--disabled {
  background-color: grey;
  opacity: 0.3;
}
.settings__tabs {
  width: fit-content;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  padding: 5px;
  background-color: var(--minor);
  border-radius: var(--item-radius);
}
.settings__tab {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 5px;
  font-family: var(--font);
  font-size: var(--font-size);
  color: var(--foreground);
  text-align: center;
  background-color: transparent;
  border-radius: var(--item-radius);
  border: 0;
  outline: none;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: color 160ms var(--transition-easing), background-color 160ms var(--transition-easing),
    box-shadow 160ms var(--transition-easing);
}
.settings__tab:hover {
  box-shadow: var(--hover-ring);
}
.settings__tab:active {
  box-shadow: var(--focus-ring);
}
.settings__tab--current {
  color: var(--background);
  background-color: var(--foreground);
}
.settings__inner {
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  overflow: clip;
}
.settings__category {
  flex: 0 0 100%;
  max-height: 70vh;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 10px 25px 0;
  box-sizing: border-box;
  overflow: auto;
  transition: transform 160ms var(--transition-easing);
}
.settings__category::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.settings__category::-webkit-scrollbar-track {
  background-color: var(--main-alt);
  opacity: 0.1;
  border-radius: var(--item-radius);
}
.settings__category::-webkit-scrollbar-thumb {
  background: var(--foreground);
  border-radius: var(--item-radius);
}
.settings__inner-title {
  flex: 0 0 100%;
  font-size: calc(var(--font-size) * 1.2);
  font-weight: 700;
}
.settings__item-title {
  flex: 0 0 100%;
  margin: 8px 0;
  font-weight: 700;
}
.settings__item,
.settings__item-option {
  position: relative;
  flex: 1 0 32%;
  display: flex;
  align-items: center;
  gap: 4px;
}
.settings__item--full-width {
  flex: 1 1 100%;
}
.settings__item--color {
  flex: 0 0 32%;
  flex-direction: column;
  align-items: stretch;
}
.settings__item--radio {
  flex: 0 0 100%;
  display: flex;
  flex-wrap: wrap;
}
.settings__item--textarea {
  flex-direction: column;
  align-items: stretch;
  padding: 5px;
}
.settings__item--color > label,
.settings__item--full-width.settings__item--text > label,
.settings__item--full-width.settings__item--textarea > label {
  flex: 0 0 auto;
  white-space: nowrap;
}
.settings__item--text > input,
.settings__item--textarea > textarea {
  flex: 1 1 auto;
  width: auto;
  padding: 2px 4px;
  box-sizing: border-box;
  font-family: var(--font);
  font-size: calc(var(--font-size) * 0.9);
  background-color: var(--white);
  border: 0;
  outline: none;
  border-radius: 4px;
  transition: box-shadow 160ms var(--transition-easing), opacity 160ms var(--transition-easing);
}
.settings__item--textarea > textarea {
  resize: vertical;
}
.settings__item--color > input,
.settings__item--full-width.settings__item--text > input,
.settings__item--full-width.settings__item--textarea > textarea {
  flex: 1 1 100%;
}
.settings__item--text > input:hover,
.settings__item--textarea > textarea:hover {
  box-shadow: var(--hover-ring);
}
.settings__item--text > input:focus,
.settings__item--textarea > textarea:focus {
  box-shadow: var(--focus-ring);
}
.settings__item--color > input {
  padding-left: 24px;
}
.settings__item-color-pill {
  position: absolute;
  bottom: 1px;
  left: 2px;
  height: 14px;
  width: 14px;
  border-radius: 2px;
  border: 1px solid gray;
}
.settings__item > label > em {
  padding: 2px 3px;
  font-size: calc(var(--font-size) - 2px);
  color: var(--foreground);
  background-color: var(--minor);
  border-radius: 2px;
}
.settings__documentation {
  width: 100%;
  margin-top: 5px;
  padding: 10px;
  color: var(--white);
  background-color: var(--main-alt);
  font-weight: 700;
  border-radius: 5px;
}
.settings__documentation-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  margin-top: -2px;
  vertical-align: middle;
  fill: currentColor;
}
.settings__documentation a {
  color: currentColor;
}
.settings__infos {
  width: 100%;
  margin-top: 5px;
  padding: 10px;
  color: var(--foreground);
  background-color: var(--minor);
  border-radius: 5px;
}
.settings__infos-title {
  margin-bottom: 7px;
  font-size: calc(var(--font-size) * 1.1);
  font-weight: 700;
}
.settings__info {
  font-style: italic;
}
.settings__bottom {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
}
.settings__pending-changes {
  margin: 0 10px;
}
.settings__refresh-button,
.settings__import-button,
.settings__export-button {
  padding: 7px 10px;
  font-family: var(--font);
  font-size: calc(var(--font-size) * 0.9);
  border-radius: var(--item-radius);
  border: 0;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: box-shadow 160ms var(--transition-easing), opacity 160ms var(--transition-easing);
}
.settings__import-button,
.settings__export-button {
  margin-right: 10px;
  color: var(--foreground);
  background-color: var(--minor);
}
.settings__export-button {
  margin-left: 10px;
}
.settings__refresh-button {
  background-color: var(--green);
}
.settings__refresh-button:not(:disabled),
.settings__import-button:not(:disabled),
.settings__export-button:not(:disabled) {
  box-shadow: var(--light-shadow);
}
.settings__refresh-button:not(:disabled):hover,
.settings__import-button:not(:disabled):hover,
.settings__export-button:not(:disabled):hover {
  box-shadow: var(--light-shadow), var(--focus-ring);
}
.settings__refresh-button:disabled,
.settings__import-button:disabled,
.settings__export-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.settings__import-export-label {
  margin-right: auto;
}
.settings__widgets {
  width: 100%;
}
.settings__widgets-breadcrumb {
  height: 28px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 0 5px;
  margin-bottom: 5px;
}
.settings__widgets-breadcrumb-title {
  font-size: calc(var(--font-size) * 1.2);
  font-weight: 700;
}
button.settings__widgets-breadcrumb-title {
  padding: 0;
  color: inherit;
  font-family: inherit;
  background-color: transparent;
  text-decoration: underline;
  cursor: pointer;
  border: 0;
}
.settings__widgets-breadcrumb-current {
  margin-bottom: -2px;
}
.settings__widgets-breadcrumb-back {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 2px 10px;
  background-color: var(--minor);
  border: 1px solid var(--foreground-alt);
  border-radius: var(--item-radius);
  color: var(--foreground);
  font-family: var(--font);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  transition: color 160ms var(--transition-easing),
    background-color 160ms var(--transition-easing),
    box-shadow 160ms var(--transition-easing);
}
.settings__widgets-breadcrumb-back:hover {
  box-shadow: var(--hover-ring);
}
.settings__widgets-breadcrumb-back-icon {
  flex: 0 0 8px;
  width: 8px;
  height: 8px;
  margin-right: 6px;
  fill: currentColor;
}
.settings__widgets-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.settings__widgets-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: var(--minor);
  border-radius: var(--item-radius);
}
.settings__widgets-item:not(.settings__widgets-item--process) {
  cursor: pointer;
}
.settings__widgets-item-icon {
  flex: 0 0 10px;
  width: 10px;
  height: 10px;
  margin-left: auto;
  fill: currentcolor;
}
.settings__widget-settings {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* Enhanced theme section styling */
.settings__theme-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.settings__theme-selectors {
  display: flex;
  gap: 15px;
  width: 100%;
}

.settings__theme-selector {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: var(--minor);
  border-radius: 8px;
  border: 1px solid var(--main-alt);
}

.settings__theme-selector-label {
  font-weight: 600;
  font-size: calc(var(--font-size) * 0.95);
  color: var(--foreground);
  margin-bottom: 4px;
}

.settings__theme-selector select {
  padding: 8px 12px;
  background-color: var(--white);
  border: 1px solid var(--main-alt);
  border-radius: 6px;
  font-family: var(--font);
  font-size: calc(var(--font-size) * 0.9);
  color: var(--black);
  cursor: pointer;
  transition: all 160ms var(--transition-easing);
}

.settings__theme-selector select:hover {
  box-shadow: var(--hover-ring);
}

.settings__theme-selector select:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}

.settings__color-overrides {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.settings__color-overrides-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.settings__color-overrides-title {
  font-size: calc(var(--font-size) * 1.1);
  font-weight: 600;
  color: var(--foreground);
}

.settings__color-overrides-subtitle {
  font-size: calc(var(--font-size) * 0.85);
  color: var(--foreground);
  opacity: 0.7;
  font-style: italic;
}

.settings__color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  width: 100%;
}

.settings__color-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background-color: var(--minor);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 160ms var(--transition-easing);
}

.settings__color-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.settings__color-card-label {
  font-size: calc(var(--font-size) * 0.9);
  font-weight: 500;
  color: var(--foreground);
  margin-bottom: 4px;
}

.settings__color-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.settings__color-input {
  flex: 1;
  padding: 8px 12px 8px 36px;
  background-color: var(--white);
  border: 1px solid var(--main-alt);
  border-radius: 6px;
  font-family: var(--font);
  font-size: calc(var(--font-size) * 0.85);
  color: var(--black);
  transition: all 160ms var(--transition-easing);
}

.settings__color-input:hover {
  box-shadow: var(--hover-ring);
}

.settings__color-input:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}

.settings__color-input::placeholder {
  color: var(--foreground);
  opacity: 0.5;
  font-style: italic;
}

.settings__color-preview {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: transparent;
  pointer-events: none;
}

.settings__color-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  color: var(--foreground);
  opacity: 0.7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  transition: all 160ms var(--transition-easing);
  z-index: 2;
}

.settings__color-clear:hover {
  opacity: 1;
  background-color: rgba(255, 0, 0, 0.1);
  color: var(--red, #ff4444);
  transform: translateY(-50%) scale(1.1);
}

/* Color category grouping */
.settings__color-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.settings__color-section-title {
  font-size: calc(var(--font-size) * 0.95);
  font-weight: 600;
  color: var(--foreground);
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 4px;
}

.settings__color-section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}

/* Theme Color Picker Styles */
.theme-color-picker {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.theme-color-picker__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.theme-color-picker__preview {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 160ms var(--transition-easing);
  overflow: hidden;
  z-index: 1;
}

.theme-color-picker__preview:hover {
  transform: translateY(-50%) scale(1.1);
}

.theme-color-picker__input {
  flex: 1;
  width: 100%;
  padding: 8px 36px 8px 36px;
  background-color: var(--white);
  border: 1px solid var(--main-alt);
  border-radius: 6px;
  font-family: var(--font);
  font-size: calc(var(--font-size) * 0.85);
  color: var(--black);
  transition: all 160ms var(--transition-easing);
  box-sizing: border-box;
}

.theme-color-picker__input:hover {
  box-shadow: var(--hover-ring);
}

.theme-color-picker__input:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}

.theme-color-picker__clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  color: var(--foreground);
  opacity: 0.7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  transition: all 160ms var(--transition-easing);
  z-index: 2;
}

.theme-color-picker__clear:hover {
  opacity: 1;
  background-color: rgba(255, 0, 0, 0.1);
  color: var(--red, #ff4444);
  transform: translateY(-50%) scale(1.1);
}

.theme-color-picker__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.theme-color-picker__popup {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  width: 280px;
  background: var(--main);
  border: 1px solid var(--main-alt);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 16px;
  margin-top: 4px;
}

.theme-color-picker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  font-weight: 600;
  color: var(--foreground);
}

.theme-color-picker__header button {
  background: none;
  border: none;
  color: var(--foreground);
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: all 160ms var(--transition-easing);
}

.theme-color-picker__header button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.theme-color-picker__saturation {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  cursor: crosshair;
  margin-bottom: 16px;
  background: linear-gradient(to top, #000, transparent),
              linear-gradient(to right, #fff, transparent);
}

.theme-color-picker__saturation-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
}

.theme-color-picker__saturation-pointer {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
}

.theme-color-picker__sliders {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.theme-color-picker__hue {
  position: relative;
  height: 20px;
  border-radius: 10px;
  cursor: pointer;
  background: linear-gradient(to right, 
    #ff0000 0%, 
    #ffff00 16.66%, 
    #00ff00 33.33%, 
    #00ffff 50%, 
    #0000ff 66.66%, 
    #ff00ff 83.33%, 
    #ff0000 100%);
}

.theme-color-picker__hue-pointer {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
}

.theme-color-picker__alpha {
  position: relative;
  height: 20px;
  border-radius: 10px;
  cursor: pointer;
  background-image: 
    linear-gradient(45deg, #ccc 25%, transparent 25%), 
    linear-gradient(-45deg, #ccc 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, #ccc 75%), 
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0;
}

.theme-color-picker__alpha-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
}

.theme-color-picker__alpha-pointer {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
}

.theme-color-picker__info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.theme-color-picker__preview-large {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  padding: 2px;
}

.theme-color-picker__preview-large > div {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.theme-color-picker__values {
  flex: 1;
  font-size: calc(var(--font-size) * 0.8);
  color: var(--foreground);
  line-height: 1.4;
}

.theme-color-picker__values > div {
  margin-bottom: 2px;
}

${userWidgetsCreatorStyles}
${aerospaceDisplayManagerStyles}
`;
