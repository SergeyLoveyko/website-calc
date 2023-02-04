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

let screenWidth = window.screen.width < 450 ? 'height' : 'width';

console.log( screenWidth );



inputBunnyHDDValue.value = bunnyStorageHDDPrice;
inputBunnySSDValue.value = bunnyStorageSSDPrice;
inputscalewayMultiValue.value = scalewayStorageMultiPrice;
inputscalewaySingleValue.value = scalewayStorageSinglePrice;




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
  backblazeFinalCost = inputStorage.value * backblazeStoragePrice + inputTransfer.value * backblazeTransferPrice;
  
  bunnyFinalCost = inputStorage.value * bunnyInputPrice + inputTransfer.value * bunnyTransferPrice;

  scalewayFinalCost = 
    (inputStorage.value < scalewayStorageFree ? 0 : (inputStorage.value * scalewayInputPrice) - 75 * scalewayInputPrice) + 
    (inputTransfer.value < scalewayStorageFree ? 0 : (inputTransfer.value * scalewayTransferPrice) - 75 * scalewayTransferPrice );

  vultrFinalCost = inputStorage.value * vultrStoragePrice + inputTransfer.value * vultrTransferPrice;


  rangeStorageValue.innerHTML = `${inputStorage.value} GB`;
  rangeTransferValue.innerHTML = `${inputTransfer.value} GB`;


  backblazeColumnPrice.innerHTML = `$ ${
    (backblazeFinalCost < backblazeMinPayment ? backblazeMinPayment : backblazeFinalCost).toFixed(2)
  }`;
  bunnyColumnPrice.innerHTML = `$ ${(bunnyFinalCost < bunnyMaxPayment ? bunnyFinalCost : bunnyMaxPayment).toFixed(2)}`;
  scalewayColumnPrice.innerHTML = `$ ${(scalewayFinalCost).toFixed(2)}`;
  vultrColumnPrice.innerHTML = `$ ${
    (vultrFinalCost < vultrMinPayment ? vultrMinPayment : vultrFinalCost).toFixed(2)
  }`;

  if ( window.screen.width > 450 ) {
    valueBackvlaze.style.width = `${backblazeFinalCost}%`;
    valueBunny.style.width = `${bunnyFinalCost < bunnyMaxPayment ? bunnyFinalCost : bunnyMaxPayment}%`;
    valueScaleway.style.width = `${scalewayFinalCost}%`;
    valueVultr.style.width = `${vultrFinalCost}%`;
  } 
  
  if (window.screen.width < 450 ) {
    valueBackvlaze.style.height = `${backblazeFinalCost}%`;
    valueBunny.style.height = `${bunnyFinalCost < bunnyMaxPayment ? bunnyFinalCost : bunnyMaxPayment}%`;
    valueScaleway.style.height = `${scalewayFinalCost}%`;
    valueVultr.style.height = `${vultrFinalCost}%`;
  }
}

calcRange();