import Parallax from '../../components/Parallax';
import SignInForm from '../../components/auth-forms/SignInForm';

function SignInPage() {
  return (
    <Parallax color="dark">
      <section>
        <SignInForm />
      </section>
    </Parallax>
  );
}

export default SignInPage;
