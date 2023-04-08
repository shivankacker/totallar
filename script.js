let selected = [];
let toSum = 0;

const setup = (size = 5) => {
    selected = [];
    const rand = randomNum(max = size * 20, min = size * 8);
    $('#selected-nums').html('');
    $('#selected-sum').text(0);
    const setMax = Math.floor(rand / size);
    const setMin = Math.ceil(rand / (size + 5));
    const sets = Array.from({ length: size }, (v, i) => []).map((set, i) => {
        let nums = [];
        let sum = rand;
        while (nums.length < size) {
            let num = randomNum(setMax, setMin);
            if (sum - num > 0 && nums.length < size - 1) {
                nums.push(num);
                sum -= num;
            } else {
                nums.push(sum);
                sum = 0;
            }
        }
        return nums;
    })
    const jumbledGrid = sets.flat().sort(() => Math.random() - 0.5);
    const gridElement = document.querySelector('.grid');
    $('.grid').addClass('grid-cols-' + size);
    gridElement.innerHTML = jumbledGrid.map((num, i) => {
        return `<div class="border bg-white border-gray-200 flex items-center justify-center hover:bg-gray-100 cursor-pointer grid-col text-2xl" data-num="${num}" data-key="${i}">${num}</div>`
    }).join('');
    $('#next-number').text(rand);
    toSum = rand;
    $('.grid-col').on('click', (e) => {
        const num = $(e.target).data('num');
        const key = $(e.target).data('key');
        if (selected.find(s => s.key === key)) return;
        selected.push({ num, key });
        $(e.target).removeClass('hover:bg-gray-100 bg-white');
        $(e.target).addClass('bg-blue-500 text-white hover:bg-blue-600');
        const selectedSum = selected.reduce((acc, curr) => acc + curr.num, 0);
        $('#selected-nums').html(`
            <div class="text-gray-500">${selected.map(s => s.num).join(" + ")}</div>
        `);
        $('#selected-sum').text(selectedSum);
        if (selectedSum === toSum) {
            setup(size);
            confetti.start();
            setTimeout(() => confetti.stop(), 2000);
        } else if (selectedSum > toSum) {
            setup(size);
            alert('You lose!');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setup(5);
    $('#reset').on('click', () => {
        selected = [];
        $('#selected-nums').html('');
        $('.grid-col').removeClass('bg-blue-500 text-white hover:bg-blue-600');
    });
    $('#size').on('change', (e) => setup(e.target.value));
    $('#change').on('click', () => setup(5));
});

const randomNum = (max = 99, min = 1) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}