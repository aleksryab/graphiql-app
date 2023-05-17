import { useEffect, useState } from 'react';
import './Toggle.scss';
import { LanguageEnums } from '../../translation/languages';
import { useTranslation } from 'react-i18next';

export default function Toggle() {
  const [language, setLanguage] = useState(LanguageEnums.EN);
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    const language =
      localStorage.getItem('language') === LanguageEnums.EN ? LanguageEnums.EN : LanguageEnums.RU;
    setLanguage(language);
    i18n.changeLanguage(language);
  }, []);

  const handleLanguageChange = (newLanguage: LanguageEnums) => {
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <div className="languages">
      <button
        onClick={() => handleLanguageChange(LanguageEnums.EN)}
        className={language === LanguageEnums.EN ? 'languages_button active' : 'languages_button'}
      >
        {t('languages.en')}
      </button>
      <button
        onClick={() => handleLanguageChange(LanguageEnums.RU)}
        className={language === LanguageEnums.RU ? 'languages_button active' : 'languages_button'}
      >
        {t('languages.ru')}
      </button>
    </div>
  );
}
