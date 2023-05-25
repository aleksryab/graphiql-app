import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

function FallbackError({ error }: FallbackProps) {
  const { t } = useTranslation('common');
  return (
    <div style={{ color: 'red', textAlign: 'center' }}>
      <h3>{t('error.fallback_message')}</h3>
      <p>{error?.message}</p>
    </div>
  );
}

export default FallbackError;
