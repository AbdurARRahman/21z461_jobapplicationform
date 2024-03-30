const form = document.getElementById('jobApplicationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const resumeInput = document.getElementById('resume');
const submitBtn = document.getElementById('submitBtn');

// Validation functions
function validateName() {
  const nameValue = nameInput.value.trim();
  const nameError = document.getElementById('nameError');
  const nameRegex = /^[a-zA-Z\s]+$/;

  if (nameValue === '') {
    nameError.textContent = 'Name is a required field.';
    return false;
  } else if (!nameRegex.test(nameValue)) {
    nameError.textContent = 'Name should only contain letters and spaces.';
    return false;
  } else {
    nameError.textContent = '';
    return true;
  }
}

function validateEmail() {
  const emailValue = emailInput.value.trim();
  const emailError = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === '') {
    emailError.textContent = 'Email is a required field.';
    return false;
  } else if (!emailRegex.test(emailValue)) {
    emailError.textContent = 'Invalid email format.';
    return false;
  } else {
    emailError.textContent = '';
    return true;
  }
}

function validatePhone() {
  const phoneValue = phoneInput.value.trim();
  const phoneError = document.getElementById('phoneError');
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  if (phoneValue === '') {
    phoneError.textContent = 'Phone number is a required field.';
    return false;
  } else if (!phoneRegex.test(phoneValue)) {
    phoneError.textContent = 'Invalid phone number format (XXX-XXX-XXXX).';
    return false;
  } else {
    phoneError.textContent = '';
    return true;
  }
}

function formatPhoneNumber(input) {
  // Remove any non-digit characters from the input value
  let value = input.value.replace(/\D/g, '');

  // Format the value with hyphens
  let formattedValue = '';
  if (value.length > 0) {
    formattedValue += value.slice(0, 3);
    if (value.length > 3) {
      formattedValue += '-' + value.slice(3, 6);
    }
    if (value.length > 6) {
      formattedValue += '-' + value.slice(6);
    }
  }

  // Update the input value with the formatted value
  input.value = formattedValue;
}

function validateAddress() {
  const addressValue = addressInput.value.trim();
  const addressError = document.getElementById('addressError');
  const minLength = 10;

  if (addressValue === '') {
    addressError.textContent = 'Address is a required field.';
    return false;
  } else if (addressValue.length < minLength) {
    addressError.textContent = `Address should be at least ${minLength} characters long.`;
    return false;
  } else {
    addressError.textContent = '';
    return true;
  }
}

function validateResume() {
  const resumeValue = resumeInput.value.trim();
  const resumeError = document.getElementById('resumeError');
  const allowedExtensions = /(\.pdf|\.docx)$/i;
  const maxSize = 5 * 1024 * 1024; // 5 MB

  if (resumeValue === '') {
    resumeError.textContent = 'Resume is a  required field.';
    return false;
  } else if (!allowedExtensions.test(resumeValue)) {
    resumeError.textContent = 'Only PDF and DOCX files are allowed.';
    return false;
  } else if (resumeInput.files[0].size > maxSize) {
    resumeError.textContent = 'Resume file size should not exceed 5 MB.';
    return false;
  } else {
    resumeError.textContent = '';
    return true;
  }
}

// Event listeners
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
addressInput.addEventListener('input', validateAddress);
resumeInput.addEventListener('change', validateResume);

form.addEventListener('input', () => {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isAddressValid = validateAddress();
  const isResumeValid = validateResume();

  submitBtn.disabled = !(isNameValid && isEmailValid && isPhoneValid && isAddressValid && isResumeValid);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isAddressValid = validateAddress();
  const isResumeValid = validateResume();

  if (isNameValid && isEmailValid && isPhoneValid && isAddressValid && isResumeValid) {
    // Form is valid, submit data
    console.log('Form submitted successfully!');
    // Add your code to submit the form data here
    showSuccessPopup();
  }
});

function showSuccessPopup() {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.textContent = 'Application submitted successfully!';
  popup.setAttribute('aria-live', 'polite');

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('closeBtn');
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', () => {
    popup.remove();
  });

  popup.appendChild(closeBtn);
  document.body.appendChild(popup);
}