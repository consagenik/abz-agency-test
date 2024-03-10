export default function scrollToElement(id: string) {
  const signUpForm = document.getElementById(id);
  if (signUpForm) {
    signUpForm.scrollIntoView({behavior: 'smooth'});
  }
}
