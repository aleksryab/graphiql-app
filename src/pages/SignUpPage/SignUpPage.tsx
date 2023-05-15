import Parallax from '../../components/Parallax/Parallax';
import SignUpForm from '../../components/auth-forms/SignUpForm';

function SignInPage() {
  return (
    <section>
      <Parallax color="dark">
        <SignUpForm />
      </Parallax>
    </section>
  );
}

export default SignInPage;
