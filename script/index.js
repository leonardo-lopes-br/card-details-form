const input_name = document.getElementById('input-name');
const card_name = document.getElementById('card-name');

const input_card_number = document.getElementById('input-card-number');
const card_numbers = Array.from(document.getElementsByClassName('card-image-number'));
let current_card_number_index = 0;

const input_month = document.getElementById('input-month');
const input_year = document.getElementById('input-year');
const input_cvc = document.getElementById('input-cvc');

const card_month = document.getElementById('card-image-month');
const card_year = document.getElementById('card-image-year');
const card_cvc = document.getElementById('card-image-cvc');

const inputs = [input_name, input_card_number, input_month, input_year, input_cvc];

const submit_button = document.getElementById('submit-button');
let formChecked = [false, false, false, false, false];


submit_button.addEventListener('click', () => {
    if (formChecked.every((element) => element === true)){
        const form_submitted = document.getElementById('form-submitted');
        const form_unsubmitted = document.getElementById('form-unsubmitted');
        form_submitted.classList.remove('hidden');
        form_unsubmitted.classList.add('hidden');
    }
});

input_year.addEventListener('keydown', (event) => {
    if (event.target.value.length === 2 && event.key !== 'Backspace' && event.key !== 'Tab') event.preventDefault();
});

input_month.addEventListener('keydown', (event) => {
    if (event.target.value.length === 2 && event.key !== 'Backspace' && event.key !== 'Tab') event.preventDefault();
});

input_cvc.addEventListener('keydown', (event) => {
    if (event.target.value.length === 3 && event.key !== 'Backspace' && event.key !== 'Tab') event.preventDefault();
});

input_name.addEventListener('keydown', (event) => {
    const key_numeric_or_space = /^[A-zÀ-ú" "]*$/.test(event.key);
    if ((!key_numeric_or_space || event.target.value.length === 40) && event.key !== "Backspace" && event.key !== 'Tab') {
        event.preventDefault();
        return;
    }
});

input_name.addEventListener('input', (event) => {
    card_name.innerHTML = event.target.value;
    if (event.target.value === '') card_name.innerHTML = "Jane Appleseed";
});
/** */
input_month.addEventListener('input', (event) => {
    card_month.innerHTML = event.target.value;
    if (event.target.value === '') card_month.innerHTML = '00';
});

input_year.addEventListener('input', (event) => {
    card_year.innerHTML = event.target.value;
    if (event.target.value === '') card_year.innerHTML = '00';
});

input_cvc.addEventListener('input', (event) => {
    card_cvc.innerHTML = event.target.value;
    if (event.target.value === '') card_cvc.innerHTML = '000';
});


inputs.forEach((item) => {
    item.addEventListener('focusout', (event) => {
        if (event.target.value === ''){
            item.style.border = "1px solid var(--red)";
        }
    });
    item.addEventListener('focus', () => {
        item.style.border = "1px solid hsl(278, 94%, 30%)";
    });
});

input_card_number.addEventListener('focusout', (event) => {
    let error_message = document.getElementById('default-error-message2');
    formChecked[1] = false;
    if (event.target.value !== ""){
        error_message.classList.remove('show');
        const numeric_value = /^[0-9]*$/;
        const value_without_spaces = event.target.value.replaceAll(' ', '');
        if (!numeric_value.test(value_without_spaces)) {
            error_message.classList.add('show');
            error_message.innerHTML = 'Wrong format, numbers only';
        }
        else {
            if (event.target.value.length === 19)
                formChecked[1] = true;
        }
    }
    else {
        error_message.classList.add('show');
        error_message.innerHTML = "Can't be blank";
    }
});

input_name.addEventListener('focusout', (event) => {
    let error_message = document.getElementById('default-error-message1');
    if (event.target.value !== ""){
        error_message.classList.remove('show');
        formChecked[0] = true;
    }
    else{
        error_message.classList.add('show');
        formChecked[0] = false;
    }
})

input_month.addEventListener('focusout', (event) => {
    let error_message = document.getElementById('default-error-message3');
    formChecked[2] = false;
    if (event.target.value !== ""){
        event.target.value = event.target.value.padStart(2, '0');
        card_month.innerHTML = event.target.value;
        error_message.classList.remove('show');
        if (event.target.value >= 1 && event.target.value <= 12){
            formChecked[2] = true;
            error_message.innerHTML = "Can't be blank";
        }
        else {
            error_message.classList.add('show');
            error_message.innerHTML = 'Month must be between 1 and 12';
        }
    }
    else
        error_message.classList.add('show');
});
input_year.addEventListener('focusout', (event) => {
    let error_message = document.getElementById('default-error-message3');
    formChecked[3] = false;
    if (event.target.value !== ""){
        event.target.value = event.target.value.padStart(2, '0');
        card_year.innerHTML = event.target.value;
        error_message.classList.remove('show');
        formChecked[3] = true;
        if (error_message.textContent === 'Month must be between 1 and 12') {
            error_message.classList.add('show');
        }
    }
    else
        error_message.classList.add('show');
});
input_cvc.addEventListener('focusout', (event) => {
    let error_message = document.getElementById('default-error-message4');
    formChecked[4] = false;
    if (event.target.value !== ""){
        event.target.value = event.target.value.padStart(3, '0');
        card_cvc.innerHTML = event.target.value;
        error_message.classList.remove('show');
        formChecked[4] = true;
    }
    else
        error_message.classList.add('show');
});

/*When the user erases the whole content, resets some values*/
input_card_number.addEventListener('input', (event) => {
    if (event.target.value.length === 0) {
        current_card_number_index = 0;
        card_numbers.forEach((item) => item.textContent = 0);
    }
});

input_card_number.addEventListener('keydown', (event) => {
    const user_input = event.target.value;
    const key_alphanumeric = /^[A-Za-z0-9]*$/.test(event.key);
    const card_number = card_numbers[current_card_number_index] ?? 0;
    let user_input_without_spaces;
   
    /*Avoidind further numbers, prevents spacebar, allow backspace and tab */
    if ((user_input.length === 19 || event.key === " " || event.key === "Spacebar") && event.key !== 'Backspace' && event.key !== 'Tab'){
        event.preventDefault();
        return;
    } 
    
    /*Adds the space between the 4 digits block on the input*/
    if ((user_input.length === 4 || user_input.length === 9 || user_input.length === 14) && event.key != 'Backspace'){
        event.target.value += " ";
    }

    if (event.key === 'Backspace'){
        /*Input*/
        user_input_without_spaces = user_input.replaceAll(' ', '').slice(0, -1);
        if (user_input.length === 6 || user_input.length === 11 || user_input.length === 16) {
            event.target.value = event.target.value.slice(0, -1);
        }
        /*Card image*/
        if (current_card_number_index > 0) current_card_number_index -= 1;
    }
    else {
        /*Card image display*/
        if (key_alphanumeric && event.key.length === 1){
            user_input_without_spaces = user_input.concat(event.key).replaceAll(' ', '');
            card_number.textContent = user_input_without_spaces[current_card_number_index] ?? 0;
            if (current_card_number_index < 18) current_card_number_index += 1;
        }
    }
});
