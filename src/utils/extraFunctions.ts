export const calculateAge = (dateOfBirth: Date) => {
  const today = new Date();
  const dob = new Date(dateOfBirth);

  let age = today.getFullYear() - dob.getFullYear();
  const birthdayPassed = today.getMonth() > dob.getMonth()
    || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!birthdayPassed) {
    age--;
  }
  return age > 1 ? `${age} Years` : `${age} Year`;
}