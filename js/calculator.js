function calculatePizza() {
    const adults = parseInt(document.getElementById('adults').value) || 0;
    const kids = parseInt(document.getElementById('kids').value) || 0;

    const hungerRadios = document.getElementsByName('hunger');
    let multiplier = 1;
    for (const radio of hungerRadios) {
        if (radio.checked) {
            multiplier = parseFloat(radio.value);
            break;
        }
    }

    // Logic:
    // Adult base: 1 pizza
    // Kid base: 0.5 pizza
    const baseAmount = (adults * 1) + (kids * 0.5);
    const totalPizzas = Math.ceil(baseAmount * multiplier);

    const resultDiv = document.getElementById('result');
    const countSpan = document.getElementById('pizzaCount');

    // Animation reset
    resultDiv.classList.remove('show');
    void resultDiv.offsetWidth; // Trigger reflow

    countSpan.textContent = totalPizzas;
    resultDiv.classList.add('show');
}
