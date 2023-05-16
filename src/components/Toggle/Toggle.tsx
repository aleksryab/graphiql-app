import { useState } from 'react';
import './Toggle.scss';

type Language = 'en' | 'ru';

export default function Toggle() {
  const [language, setLanguage] = useState<Language>('en');

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="languages">
      <button
        onClick={() => handleLanguageChange('en')}
        className={language === 'en' ? 'languages_button active' : 'languages_button'}
      >
        En
      </button>
      <button
        onClick={() => handleLanguageChange('ru')}
        className={language === 'ru' ? 'languages_button active' : 'languages_button'}
      >
        Ru
      </button>
    </div>
  );
}
