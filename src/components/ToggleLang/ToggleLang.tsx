import { useTranslation } from 'react-i18next';
import { LanguageEnums } from '../../translation/languages';
import './ToggleLang.scss';

export default function Toggle() {
  const { t, i18n } = useTranslation('common');
  const language = i18n.language;

  const handleLanguageChange = (newLanguage: LanguageEnums) => {
    i18n.changeLanguage(newLanguage);
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
