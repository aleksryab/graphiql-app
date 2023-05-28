import { BsGithub } from 'react-icons/bs';

type AuthorLinkProps = {
  name: string;
  link: string;
};

function AuthorLink({ name, link }: AuthorLinkProps) {
  return (
    <a href={link} className="author-link" target="_blank" rel="noreferrer">
      <span className="author-link__icon">
        <BsGithub />
      </span>
      <span className="author-link__text">{name}</span>
    </a>
  );
}

export default AuthorLink;
