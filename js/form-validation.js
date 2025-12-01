document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservationForm');

    // Set min date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (validateForm(form)) {
            alert('Sikeres foglalás! Hamarosan visszaigazoljuk emailben.');
            form.reset();
            form.classList.remove('was-validated');
        } else {
            form.classList.add('was-validated');
        }
    });
});

function validateForm(form) {
    let isValid = true;

    // Native HTML5 validation check first
    if (!form.checkValidity()) {
        isValid = false;
    }

    // Custom Logic: Check if date is not in the past (double check)
    const dateInput = document.getElementById('date');
    const selectedDate = new Date(dateInput.value);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (selectedDate < now) {
        dateInput.setCustomValidity('Múltbeli dátum nem választható.');
        isValid = false;
    } else {
        dateInput.setCustomValidity('');
    }

    return isValid;
}
