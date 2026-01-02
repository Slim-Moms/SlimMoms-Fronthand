export function validateForm(formData) {
  const errors = {};
  if (!formData.age) errors.age = "Yaş gerekli";
  if (!formData.weight) errors.weight = "Kilo gerekli";
  if (!formData.height) errors.height = "Boy gerekli";
  return errors;
}