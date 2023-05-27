import AuthorLink from './AuthorLink';
import './Footer.scss';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import logo from '../../assets/footer_logo.svg';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="">
          <NavLink to={ROUTES.main}>
            <img className="footer__logo" src={logo} alt="project logo" />
          </NavLink>
        </div>
        <div className="footer__middle">
          <div className="footer__links">
            {t('general.students')}
            <AuthorLink name="aleksryab" link="https://github.com/aleksryab" />
            <AuthorLink name="anastasiasyt" link="https://github.com/anastasiasyt" />
            <AuthorLink name="hkudria" link="https://github.com/hkudria" />
          </div>
          <div className="footer__year">{t('general.rights')}</div>
        </div>
        <div>
          <a href="https://rs.school/react/" className="school-link">
            <span className="school-link__text">Rolling Scopes School</span>
          </a>
        </div>
        <div className="footer__desk_year">© all rights reserved, 2023.</div>
      </div>
    </footer>
  );
}

export default Footer;
