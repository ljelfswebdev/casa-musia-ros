'use client';

import Select, { components } from 'react-select';
import { useLanguage } from '@/components/lang/LanguageContext';

const langOptions = [
  { value: 'es', label: 'ES', icon: '/flags/es.png' },
  { value: 'en', label: 'EN', icon: '/flags/en.png' },
  { value: 'fr', label: 'FR', icon: '/flags/fr.png' },
  { value: 'de', label: 'DE', icon: '/flags/de.png' },
];

const styles = {
  control: (base) => ({
    ...base,
    minHeight: '2.25rem',
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderColor: 'rgba(255,255,255,0.4)',
    boxShadow: 'none',
    cursor: 'pointer',
    backdropFilter: 'blur(6px)',
    ':hover': { borderColor: 'rgba(255,255,255,0.7)' },
  }),
  singleValue: (base) => ({ ...base, color: '#fff' }),
  menu: (base) => ({ ...base, backgroundColor: '#000', zIndex: 9999 }),
  option: (base, s) => ({
    ...base,
    backgroundColor: s.isFocused ? '#333' : '#000',
    color: '#fff',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({ ...base, color: '#fff' }),
};

// Custom option with flag SVG + label
const FlagOption = (props) => (
  <components.Option {...props}>
    
    <span className="flex items-center gap-2">
        <span>{props.data.label}</span>
      <img
        src={props.data.icon}
        alt={`${props.data.label} flag`}
        className="w-4 h-4"
      />
    
    </span>
  </components.Option>
);

// Custom selected value with flag SVG + label
const FlagSingleValue = (props) => (
  <components.SingleValue {...props}>
    <span className="flex items-center gap-2">
            <span>{props.data.label}</span>
      <img
        src={props.data.icon}
        alt={`${props.data.label} flag`}
        className="w-4 h-4"
      />

    </span>
  </components.SingleValue>
);

export default function LanguageFloatingSwitcher() {
  const { lang, setLang } = useLanguage();
  const selected = langOptions.find((o) => o.value === lang) ?? langOptions[0];

  return (
    <div className="fixed bottom-5 right-5 z-[9999] w-[110px]">
      <label htmlFor="language-switcher" className="sr-only">
        Select language
      </label>
      <Select
        inputId="language-switcher"
        value={selected}
        onChange={(opt) => opt && setLang(opt.value)}
        options={langOptions}
        styles={styles}
        menuPlacement="top"
        isSearchable={false}
        components={{
          Option: FlagOption,
          SingleValue: FlagSingleValue,
        }}
      />
    </div>
  );
}