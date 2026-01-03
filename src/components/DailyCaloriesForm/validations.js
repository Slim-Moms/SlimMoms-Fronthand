export function validateForm(formData) {
  const errors = {};
  if (!formData.height) errors.height = "Height is required";
  if (!formData.desiredWeight) errors.desiredWeight = "Desired weight is required";
  if (!formData.age) errors.age = "Age is required";
  if (!formData.bloodType) errors.bloodType = "Blood type is required";
  if (!formData.currentWeight) errors.currentWeight = "Current weight is required";
  return errors;
}