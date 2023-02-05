const backblazeMinPayment = 7;
const backblazeStoragePrice = 0.005;
const backblazeTransferPrice = 0.01;

const bunnyMaxPayment = 10;
const bunnyStorageHDDPrice = 0.01;
const bunnyStorageSSDPrice = 0.02;
const bunnyTransferPrice = 0.01;

const scalewayStorageFree = 75;
const scalewayStorageMultiPrice = 0.06;
const scalewayStorageSinglePrice = 0.03;
const scalewayTransferPrice = 0.02;

const vultrMinPayment = 5;
const vultrStoragePrice = 0.01
const vultrTransferPrice = 0.01



const inputStorage = document.querySelector('#input-storage'),
      inputTransfer = document.querySelector('#input-transfer');

const inputBunnyHDDValue = document.querySelector('#hdd-value'),
      inputBunnySSDValue = document.querySelector('#ssd-value'),
      inputscalewayMultiValue = document.querySelector('#multi-value'),
      inputscalewaySingleValue = document.querySelector('#single-value');

const rangeStorageValue = document.querySelector('.range__storage-value'),
      rangeTransferValue = document.querySelector('.range__transfer-value');
      
const allInput = document.querySelectorAll('input[type="radio"]');

const valueBackvlaze = document.querySelector('.value__backvlaze'),
      valueBunny = document.querySelector('.value__bunny'),
      valueScaleway = document.querySelector('.value__scaleway'),
      valueVultr = document.querySelector('.value__vultr');

const backblazeColumnPrice = document.querySelector('.backvlaze__price'),
      bunnyColumnPrice = document.querySelector('.bunny__price'),
      scalewayColumnPrice = document.querySelector('.scaleway__price'),
      vultrColumnPrice = document.querySelector('.vultr__price');

const columnPrecend = document.querySelectorAll('.graph__percent');



inputBunnyHDDValue.value = bunnyStorageHDDPrice;
inputBunnySSDValue.value = bunnyStorageSSDPrice;
inputscalewayMultiValue.value = scalewayStorageMultiPrice;
inputscalewaySingleValue.value = scalewayStorageSinglePrice;


let colomnGrowthDirection = 'width';


let backblazeStorageCost = 0;
let backblazeFinalCost = 0;

let bunnyInputPrice = 0;
let bunnyFinalCost = 0;

let scalewayInputPrice = 0;
let scalewayFinalCost = 0;

let vultrFinalCost = 0;




allInput.forEach((input) => {
  if (input.name == 'selection-bunny') {
    if (input.checked) {
      bunnyInputPrice = input.value;
    }
  
    input.addEventListener('click', function() {
      bunnyInputPrice = this.value;
      calcRange();
    });
  }

  if (input.name == 'selection-scaleway') {
    if (input.checked) {
      scalewayInputPrice = input.value;
    }
  
    input.addEventListener('click', function() {
      scalewayInputPrice = this.value;
      calcRange();
    });
  }
});



inputStorage.oninput = function() {
  calcRange();
}

inputTransfer.oninput = function() {
  calcRange();
}



function calcRange() {

  if ( window.screen.width < 450 ) {
    colomnGrowthDirection = 'height';
  } else {
    colomnGrowthDirection = 'width';
  }

  backblazeFinalCost = inputStorage.value * backblazeStoragePrice + inputTransfer.value * backblazeTransferPrice;
  bunnyFinalCost = inputStorage.value * bunnyInputPrice + inputTransfer.value * bunnyTransferPrice;

  scalewayFinalCost = 
    (inputStorage.value < scalewayStorageFree ? 0 : (inputStorage.value * scalewayInputPrice) - 75 * scalewayInputPrice) + 
    (inputTransfer.value < scalewayStorageFree ? 0 : (inputTransfer.value * scalewayTransferPrice) - 75 * scalewayTransferPrice );

  vultrFinalCost = inputStorage.value * vultrStoragePrice + inputTransfer.value * vultrTransferPrice;


  const backblazeColumnPriceValue = backblazeFinalCost < backblazeMinPayment ? backblazeMinPayment : backblazeFinalCost;
  const bunnyColumnPriceValue = bunnyFinalCost < bunnyMaxPayment ? bunnyFinalCost : bunnyMaxPayment;
  const vultrColumnPriceValue = vultrFinalCost < vultrMinPayment ? vultrMinPayment : vultrFinalCost;


  rangeStorageValue.innerHTML = `${inputStorage.value} GB`;
  rangeTransferValue.innerHTML = `${inputTransfer.value} GB`;


  backblazeColumnPrice.innerHTML = `$ ${(backblazeColumnPriceValue).toFixed(2)}`;
  bunnyColumnPrice.innerHTML = `$ ${(bunnyColumnPriceValue).toFixed(2)}`;
  scalewayColumnPrice.innerHTML = `$ ${(scalewayFinalCost).toFixed(2)}`;
  vultrColumnPrice.innerHTML = `$ ${(vultrColumnPriceValue).toFixed(2)}`;


  valueBackvlaze.style[colomnGrowthDirection] = `${backblazeColumnPriceValue}%`;
  valueBunny.style[colomnGrowthDirection] = `${bunnyColumnPriceValue}%`;
  valueScaleway.style[colomnGrowthDirection] = `${scalewayFinalCost}%`;
  valueVultr.style[colomnGrowthDirection] = `${vultrColumnPriceValue}%`;

  changeColor()
}


function changeColor() {
  
  const colorColumns = ['red', 'orange','blueviolet', 'black'];
  const colorBorderColumns = ['#cd0101', '#db8e01','#590e9f', 'black'];
  let arr = [];
  let indexMinColumn = 0;

  columnPrecend.forEach((column) => {
    arr.push(+column.style[colomnGrowthDirection].substr(0, column.style[colomnGrowthDirection].length - 1));
    column.style.backgroundColor = '#bdbdbd';
    column.style.borderColor = '#939292';
  });

  indexMinColumn = arr.indexOf(Math.min.apply(null, arr));

  columnPrecend[indexMinColumn].style.backgroundColor = colorColumns[indexMinColumn];
  columnPrecend[indexMinColumn].style.borderColor = colorBorderColumns[indexMinColumn];
}


calcRange();

