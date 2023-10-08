interface validate {
  email: string;
  name: string;
  phone: string;
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(09[0-9]{9}|٠٩[٠١٢٣٤٥٦٧٨٩]{9}|۰۹[۰۱۲۳۴۵۶۷۸۹]{9})$/i;

export const Validation = (values: validate) => {
  const { name, email, phone } = values;
  const errors: {
    name?: string;
    email?: string;
    phone?: string;
    empty?: string;
  } = {};
  if (name || email || phone) {
    delete errors.empty;
  } else {
    errors.empty = "fileds cant be empty";
  }

  if (emailRegex.test(email)) {
    delete errors.email;
  } else {
    errors.email = "email  not valid";
  }
  if (phoneRegex.test(phone)) {
    delete errors.phone;
  } else {
    errors.phone = "phone number not valid";
  }

  if (name.length > 3) {
    delete errors.name;
  } else {
    errors.name = "name most be +3 charcter";
  }
  return errors;
};
