const url = "https://jsonplaceholder.typicode.com/posts";




const mobile = () => {
const closeMenu = (burgerIcon, navigationMenu, menuBackground) => {
    burgerIcon.classList.remove('open');
    navigationMenu.classList.remove('open');
    menuBackground.classList.remove('open');
    document.body.style.overflowY = 'auto';
}

const openMenu = (burgerIcon, navigationMenu, menuBackground) => {
    burgerIcon.classList.add('open');
    navigationMenu.classList.add('open');
    menuBackground.classList.add('open');
    document.body.style.overflowY = 'hidden';
}

const mobileMenu = (() => {
    const burgerIcon = document.querySelector('.header__burger');
    const navigationMenu = document.querySelector('.header__navbar');
    const menuBackground = document.querySelector('.header__bg');

    burgerIcon.addEventListener('click', ({ target }) => {
        const isOpen = target.classList.contains('open') || target.parentNode.classList.contains('open');
        isOpen ? closeMenu(burgerIcon, navigationMenu, menuBackground) : openMenu(burgerIcon, navigationMenu, menuBackground);
    });

    navigationMenu.addEventListener('click', ({ target }) => {
        if (target.classList.contains('header__navbar-nav__link') || target.classList.contains('header__logo-img')) {
            closeMenu(burgerIcon, navigationMenu, menuBackground);
        }
    });
})()
}

const packageSwitch = () => {
    const packageField = document.getElementById("package");

    function handleLinkClick(event) {
        packageField.value = event.target.getAttribute("data-package");
    }

    const buttons = document.querySelectorAll(".package-btn");
    buttons.forEach((button) => button.addEventListener("click", handleLinkClick));
};

const formValidation = () => {
    const restrictInputToLetters = (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-zА-Яа-яЁёіІїЇґҐ']/g, '');
    }

    const restrictInputToNumbers = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }

    document.getElementById("name").addEventListener("input", restrictInputToLetters);
    document.getElementById("businessArea").addEventListener("input", restrictInputToLetters);
    document.getElementById("phone").addEventListener("input", restrictInputToNumbers);

};

const selectLogic = () => {
    const customSelect = document.querySelector('.connection__custom-select');
    const selectedOption = customSelect.querySelector('.connection__selected-option');
    const options = customSelect.querySelectorAll('.connection__option');
    const packageField = document.getElementById("package");

    function handleElementClick(element) {
        const prevSelected = customSelect.querySelector('.connection__option.selected');
        prevSelected?.classList.remove('selected');
        element.classList.add('selected');
        selectedOption.classList.remove('connection__prev');
        selectedOption.textContent = element.textContent;
        customSelect.dataset.value = element.dataset.value;
        customSelect.classList.remove('active');
    }

    function toggleCustomSelect() {
        customSelect.classList.toggle('active');
    }

    function handleOptionClick(option) {
        handleElementClick(option);
        packageField.value = "не обрано";
    }

    function handleButtonClick(button) {
        const packageValue = button.dataset.value;
        const selectedOption = customSelect.querySelector(`.connection__option[data-value="${packageValue}"]`);
        selectedOption && handleElementClick(selectedOption);
    }

    selectedOption.addEventListener('click', toggleCustomSelect);

    options.forEach((option) => {
        option.addEventListener('click', () => handleOptionClick(option));
    });

    const buttons = document.querySelectorAll(".package-btn");
    buttons.forEach((button) => {
        button.addEventListener('click', () => handleButtonClick(button));
        // formValidationModule.checkFormInputs();
    });

    document.addEventListener('click', (event) => {
        if (!customSelect.contains(event.target)) {
            customSelect.classList.remove('active');
        }
    });
};

const forms = (url) => {
    function showConfirmationMessage(message) {
        const confirmationSpan = document.createElement('span');
        confirmationSpan.textContent = `${message}`;
        confirmationSpan.classList.add('message');
        const formSubmitElement = document.getElementById('formSubmit');
        formSubmitElement.parentNode.insertBefore(confirmationSpan, formSubmitElement);
    }

    


    async function sendData() {
        try {
            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const selectedOption = document.querySelector(".connection__selected-option").textContent.trim();
            const packageType = document.getElementById("package").value;
            const companyName = document.getElementById("companyName").value;
            const businessArea = document.getElementById("businessArea").value;

            const formData = {
                name,
                phone,
                selectedOption,
                packageType,
                companyName,
                businessArea
            };

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Помилка при відправці даних.");
            }

            const data = await response.json();
            showConfirmationMessage("Відправлено");
            console.log("Дані успішно відправлені:", data);
        } catch (error) {
            showConfirmationMessage("Помилка");
            console.error("Сталась помилка:", error);
        }
    }

    document.querySelector(".connection__form").addEventListener("submit", function(event) {
        event.preventDefault(); 
        sendData();
        resetForm();
    });
};


const resetForm = () => {
    const phoneInput = document.getElementById('phone');
    document.getElementById("name").value = "";
    document.getElementById("companyName").value = "";
    phoneInput.value = "";

    document.getElementById("businessArea").value = "";
    document.getElementById("package").value = "не обрано";
    document.querySelector('.connection__custom-select').dataset.value = 'не обрано';

    const selectedOptionElement = document.querySelector(".connection__selected-option");
    selectedOptionElement.textContent = "Не вибрано";
    selectedOptionElement.classList.add('connection__prev');

    const options = document.querySelectorAll('.connection__option');
    options.forEach(option => {
        option.classList.remove("selected");
    });

    const removeConfirmationMessage = () => {
    const confirmationSpan = document.querySelector('.message');
    if (confirmationSpan) {
        confirmationSpan.parentNode.removeChild(confirmationSpan);
    }
    }
    setTimeout(removeConfirmationMessage, 5000);
};



document.addEventListener("DOMContentLoaded", () => {
mobile()
packageSwitch()
selectLogic()
formValidation()
forms(url)
})