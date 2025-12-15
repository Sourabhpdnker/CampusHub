// USN validation regex
const usnRegex = /^[0-9]{1}[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/;

export const validators = {
  validateUSN(usn: string): boolean {
    return usnRegex.test(usn.toUpperCase());
  },

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePassword(password: string): string | null {
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null;
  },

  validateSemester(semester: string): string | null {
    const sem = parseInt(semester);
    if (isNaN(sem) || sem < 1 || sem > 8) {
      return 'Semester must be between 1 and 8';
    }
    return null;
  },
};