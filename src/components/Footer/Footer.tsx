import AuthorLink from './AuthorLink';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div>
          <AuthorLink name="aleksryab" link="https://github.com/aleksryab" />
          <AuthorLink name="anastasiasyt" link="https://github.com/anastasiasyt" />
          <AuthorLink name="hkudria" link="https://github.com/hkudria" />
        </div>
        <div>2023</div>
        <div>
          <a href="https://rs.school/react/" className="school-link">
            <span className="school-link__text">Rolling Scopes School</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
