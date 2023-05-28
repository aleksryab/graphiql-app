import { useState, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineReload } from 'react-icons/ai';
import './ApiPanel.scss';
import Button from '../Buttons/Button';

interface ApiPanelProps {
  url: string;
  isLoading: boolean;
  isError: boolean;
  onChange: (url: string) => void;
}

function ApiPanel({ url, isLoading, isError, onChange }: ApiPanelProps) {
  const [currentUrl, setCurrentUrl] = useState<string>(url);
  const { t } = useTranslation('common');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onChange(currentUrl);
  };

  return (
    <div className="apiPanel">
      <form className="urlEditor" onSubmit={handleSubmit}>
        <div className="urlEditor__field">
          <label className="urlEditor__label" htmlFor="url">
            URL:{' '}
          </label>
          <input
            className={`urlEditor__input${isError ? ' error' : ''}`}
            type="url"
            id="url"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            required
          />
          {isError && <span className="urlEditor__error-message">{t('error.general.server')}</span>}
        </div>
        <Button size="large" type="submit" disabled={isLoading} square>
          <AiOutlineReload className={isLoading ? 'update' : ''} />
        </Button>
      </form>
    </div>
  );
}

export default ApiPanel;
