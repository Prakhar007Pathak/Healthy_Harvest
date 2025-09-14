// profile.js
// call window.initProfile() after partial is placed into #content-area
window.initProfile = function () {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const editLink = section.querySelector('.edit-link');
        const inputs = section.querySelectorAll('input');
        const buttons = section.querySelector('.edit-buttons');
        const saveBtn = section.querySelector('.save-btn');
        const cancelBtn = section.querySelector('.cancel-btn');

        let originalValues = [];

        if (!editLink) return;

        editLink.addEventListener('click', (e) => {
            e.preventDefault();

            // Save original values and enable inputs
            originalValues = Array.from(inputs).map(input => input.value);
            inputs.forEach(input => {
                input.disabled = false;
                input.classList.remove('cursor-notAllowed');
            });

            // Enable radio buttons
            const radioInputs = section.querySelectorAll('input[type="radio"]');
            radioInputs.forEach(radio => radio.disabled = false);

            buttons.style.display = 'flex';
        });

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                inputs.forEach(input => {
                    input.disabled = true;
                    input.classList.add('cursor-notAllowed');
                    input.setAttribute('value', input.value); // demo save
                });

                const radioInputs = section.querySelectorAll('input[type="radio"]');
                radioInputs.forEach(radio => radio.disabled = true);

                buttons.style.display = 'none';
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                inputs.forEach((input, index) => {
                    input.disabled = true;
                    input.classList.add('cursor-notAllowed');
                    input.value = originalValues[index];
                });

                const radioInputs = section.querySelectorAll('input[type="radio"]');
                radioInputs.forEach(radio => radio.disabled = true);

                buttons.style.display = 'none';
            });
        }
    });
};
