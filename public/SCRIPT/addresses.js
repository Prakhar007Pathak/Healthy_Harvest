// addresses.js
// call window.initAddresses() after partial is placed into #content-area
window.initAddresses = function () {
    const addAddressLink = document.getElementById('add-address-link');
    const addressFormContainer = document.querySelector('.address-form-container');
    const formTitle = document.getElementById('form-title');
    const addressList = document.getElementById('address-list');
    const saveBtn = document.getElementById('save-address-btn');
    const cancelBtn = document.getElementById('cancel-form-btn');

    let editingAddressId = null;

    // Load addresses from local storage
    let addresses = JSON.parse(localStorage.getItem('userAddresses')) || [];

    function renderAddresses() {
        addressList.innerHTML = '';
        addresses.forEach(address => {
            const addressCard = document.createElement('div');
            addressCard.classList.add('address-card');
            addressCard.innerHTML = `
              <span class="address-label">${address.type}</span>
              <h4>${address.name} <span style="font-weight: normal; color: #555;">${address.mobile}</span></h4>
              <p>${address.address}, ${address.locality}, ${address.city}, ${address.state} - ${address.pincode}</p>
              <div class="options-container">
                  <i class='bx bx-dots-vertical-rounded options-icon' data-id="${address.id}"></i>
                  <div class="options-menu">
                      <a href="#" class="edit-option" data-id="${address.id}">Edit</a>
                      <a href="#" class="delete-option" data-id="${address.id}">Delete</a>
                  </div>
              </div>
          `;
            addressList.appendChild(addressCard);
        });
    }

    function saveAddresses() {
        localStorage.setItem('userAddresses', JSON.stringify(addresses));
    }

    function clearForm() {
        document.getElementById('name').value = '';
        document.getElementById('mobile').value = '';
        document.getElementById('pincode').value = '';
        document.getElementById('locality').value = '';
        document.getElementById('address').value = '';
        document.getElementById('city').value = '';
        document.getElementById('state').value = '--Select State--';
        document.getElementById('landmark').value = '';
        document.getElementById('altPhone').value = '';
        const homeRadio = document.querySelector('input[name="addressType"][value="Home"]');
        if (homeRadio) homeRadio.checked = true;
    }

    function showForm(title) {
        if (formTitle) formTitle.textContent = title;
        if (addAddressLink) addAddressLink.style.display = 'none';
        if (addressFormContainer) addressFormContainer.style.display = 'block';
    }

    function hideForm() {
        if (addAddressLink) addAddressLink.style.display = 'block';
        if (addressFormContainer) addressFormContainer.style.display = 'none';
        editingAddressId = null;
        clearForm();
    }

    if (addAddressLink) {
        addAddressLink.addEventListener('click', (e) => {
            e.preventDefault();
            showForm('ADD A NEW ADDRESS');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hideForm();
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const newAddress = {
                name: document.getElementById('name').value,
                mobile: document.getElementById('mobile').value,
                pincode: document.getElementById('pincode').value,
                locality: document.getElementById('locality').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                landmark: document.getElementById('landmark').value,
                altPhone: document.getElementById('altPhone').value,
                type: document.querySelector('input[name="addressType"]:checked')?.value || 'Home',
            };

            if (editingAddressId) {
                // Edit existing address
                const index = addresses.findIndex(addr => addr.id === editingAddressId);
                if (index !== -1) {
                    addresses[index] = { ...addresses[index], ...newAddress };
                }
            } else {
                // Add new address
                newAddress.id = Date.now(); // Simple unique ID
                addresses.unshift(newAddress);
            }

            saveAddresses();
            renderAddresses();
            hideForm();
        });
    }

    // Event delegation for edit/delete/options display
    if (addressList) {
        addressList.addEventListener('click', (e) => {
            const target = e.target;
            const id = parseInt(target.dataset.id);

            if (target.classList.contains('delete-option')) {
                e.preventDefault();
                addresses = addresses.filter(addr => addr.id !== id);
                saveAddresses();
                renderAddresses();
            }

            if (target.classList.contains('edit-option')) {
                e.preventDefault();
                const addressToEdit = addresses.find(addr => addr.id === id);
                if (addressToEdit) {
                    showForm('EDIT ADDRESS');
                    editingAddressId = id;

                    // Populate the form
                    document.getElementById('name').value = addressToEdit.name;
                    document.getElementById('mobile').value = addressToEdit.mobile;
                    document.getElementById('pincode').value = addressToEdit.pincode;
                    document.getElementById('locality').value = addressToEdit.locality;
                    document.getElementById('address').value = addressToEdit.address;
                    document.getElementById('city').value = addressToEdit.city;
                    document.getElementById('state').value = addressToEdit.state;
                    document.getElementById('landmark').value = addressToEdit.landmark;
                    document.getElementById('altPhone').value = addressToEdit.altPhone;
                    const radio = document.querySelector(`input[name="addressType"][value="${addressToEdit.type}"]`);
                    if (radio) radio.checked = true;
                }
            }
        });

        // hovering to show options menu (simple)
        addressList.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.address-card');
            if (!card) return;
            const menu = card.querySelector('.options-menu');
            if (menu) menu.style.display = 'block';
        });

        addressList.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.address-card');
            if (!card) return;
            const menu = card.querySelector('.options-menu');
            if (menu) menu.style.display = 'none';
        });
    }

    // initial render
    renderAddresses();
};
