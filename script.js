'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};


const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements){
containerMovements.innerHTML = '';
//  textContent = 0

  movements.forEach(function (mov,i){

    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov} €</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin',html);
  });
};


const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc,mov) => acc + mov ,0);
  labelBalance.textContent = `${acc.balance} €`;
};

const  calcDisplaySummary = function(acc){
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc,mov)=> acc + mov, 0);
  labelSumIn.textContent = `${incomes} € `;
  const outs = acc.movements.filter(mov => mov < 0).reduce((acc,mov) => acc + mov,0);           
  labelSumOut.textContent = `${Math.abs(outs)} €`;
  
  const intrest = acc.movements.filter(mov => mov > 0 ).map(deposit =>( deposit * acc.interestRate) / 100).filter((int,i,arr)=>{
    // console.log(arr);
    return int >= 1;
  }).reduce((acc,int) => acc + int,0);
  labelSumInterest.textContent = ` ${intrest} €`;
};

const creatUsernames = function(acc){
  acc.forEach(function(acc){
  acc.username =   acc.owner.toLowerCase().split(' ').map(name => 
    name[0]
 ).join(''); 
  })
};
creatUsernames(accounts);

const updateUi = function(acc){
      //  Display movements
      displayMovements(acc.movements);

      // DISPLAY BALENCE
      calcDisplayBalance(acc);
      
      // DISPLAY SUMMERY 
      calcDisplaySummary(acc);
  
}
//  Event handlers 

let currentAccount;
 
btnLogin.addEventListener('click',function (e) {
  //  prevent form from submitting 
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)){
    //  Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //  CLEAR INPUT FIELDS 
     inputLoginUsername.value = inputLoginPin.value = '';
     inputLoginPin.blur();
//  update UI
  updateUi(currentAccount);
    }

    
});
btnTransfer.addEventListener('click',function (e){
  e.preventDefault();

  const amount  = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';
 if (
   amount > 0 &&
    reciverAcc && 
    currentAccount.balance >= amount && 
    reciverAcc?.username !== currentAccount.username
    ) {
   currentAccount.movements.push(-amount);
   reciverAcc.movements.push(amount);
      //  update UI
     updateUi(currentAccount);
    
  }
});



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//  slice
// let arr = ['a','b','c','d','e'];
// console.log(arr.slice(2));
// console.log(arr.slice(2,4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1,-2));
// console.log(arr.slice());
// console.log([...arr]);

// // splice
// // console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr); 
// arr.splice(1,2);
// console.log(arr);

// // reverse
// arr = ['a','b','c','d','e'];
// const arr2 =['j','i','h','g','j'];
// console.log(arr2.reverse());
// console.log(arr2);

// //  concat
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr,arr2]);
// // join
// console.log(letters.join(' - '));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // for (const movement of movements){
// for(const [i , movement] of movements.entries()){  
// if(movement > 0){
//     console.log(` transetion ${i+ 1} :   you deposited ${movement}`);
//   }else {
//     console.log(` transetion ${i+ 1} :   you widhrew ${Math.abs(movement)}`);
//   }
// }

// console.log(`          ------for Each-------`);
// movements.forEach(function (mov,i,arr){
//   if(mov > 0){
//     console.log(` transetion ${i+ 1} :   you deposited ${mov}`);
//   }else {
//     console.log(` transetion ${i+ 1} :   you widhrew ${Math.abs(mov)}`);
//   }
// });
// map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value,key,map){
//   console.log(`${key}: ${value}`);
// });

// //  set 
// const currenciesUnique = new Set (['USD','GBR','USD','EUR','EUR',
// ]);

// console.log(currenciesUnique);
// currenciesUnique.forEach(function(value,_,map){
//   console.log(`${value}: ${value}`);
// });
//  challenge 
// const checkDogs = function(dogsJulia,dogsKate){
// const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0,1); 
//   dogsJuliaCorrected.splice(-2);
//   console.log(dogsJuliaCorrected);
// const dogs = dogsJuliaCorrected.concat(dogsKate);
// console.log(dogs);
// // dog number one is an adult , and is 5 year old or a puppy ('dog number 2 is still a puppy '
// dogs.forEach(function(dog,i){
//   if (dog >= 3 ){
//     console.log( `dog number ${i+1}  is an adult , and is ${dog} year old or a puppy`);
//     console.log(`   `)
//   }else{
//     console.log(`dog number ${i+1} is still a puppy`);
//     console.log(`   `)
//   }
// })
// };
// checkDogs([3,5,2,12,7],[4,1,15,8,3]);
// console.log(`--------second array -------------`)
// checkDogs([9,16,6,8,3],[10,5,6,1,4]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;
// const movementsUSD =  movements.map(function(mov){
//   return mov * euroToUsd;

// });
const movementsUSD = movements.map(mov => mov * euroToUsd )
// console.log(movements);
// console.log(movementsUSD);

const movementsUSDfor = [] ;
for(const mov of movements) movementsUSDfor.push(mov * euroToUsd); 
// console.log(movementsUSDfor);

const movementsDescription =movements.map((mov,i) => 
 
  `Movement ${i + 1} : you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`

);
// console.log(movementsDescription);


//  deposits created using arrow function
const deposits = movements.filter(mov =>mov > 0);
console.log(movements);
console.log(deposits);
const depositsfor = [];
for(const mov of movements) if (mov> 0) depositsfor.push(mov);
// console.log(depositsfor);
//  widrawals created using regular function

const widthdrawals = movements.filter(function(mov){
  return mov < 0 ;
});
// console.log(widthdrawals);
// accumulator  -> SNOWBALL


// const balance =  movements.reduce(function (acc,cur,i,arr){

//   console.log(`Iteration ${i} : ${acc}`);
//   return acc + cur ;
// },);

//                             using arrow function         // 

const  balance =  movements.reduce((acc,cur) => acc + cur, 0);
let balance2 = 0;
for(const mov of movements)balance2 += mov;
// console.log(balance);
// console.log(balance2);
//  Maximum value

const max = movements.reduce((acc,mov) => {
  if (acc > mov)
  return acc;
  else
  return mov;
},movements[0]) 
// console.log(max);





// // challenge
// const calcAverageAge  =  function(ages){
//   const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAge.filter(age => age  >= 18);
//   console.log(humanAge);
//   console.log(adults);
//   // const Average = adults.reduce((acc,age) => acc + age,0)/ adults.length;
//   const Average = adults.reduce((acc,age,i,arr) => acc + age / arr.length,0);
//   return Average;


// };
// const av1 = calcAverageAge([5,2,4,1,15,8,3]);
// const av2 = calcAverageAge([16,6,10,5,6,1,4]);
//  console.log(av1,av2);

//  the magic of chainging methods

// const euroToUsd = 1.1 ;
//  pipeline 

const totalDepositsUSD = movements
.filter(mov => mov > 0)
.map((mov,i,arr) => {
  // console.log(arr);
  return mov * euroToUsd 
})
// .map(mov => mov * euroToUsd)
.reduce((acc,mov) => acc + mov , 0);
console.log(totalDepositsUSD);



//  challenge 

// const calcAverageAge  =  function(ages){
//   const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAge.filter(age => age  >= 18);
//   console.log(humanAge);
//   console.log(adults);
//   // const Average = adults.reduce((acc,age) => acc + age,0)/ adults.length;
//   const Average = adults.reduce((acc,age,i,arr) => acc + age / arr.length,0);
//   return Average;


// const calcAverageHumaneAge  = ages => ages.map(age => (age <= 2 ? 2 * age : 16 + age *4)).filter(age => age >= 18).reduce((acc,age,i,arr) => acc + age / arr.length,0); 
// const av1 = calcAverageHumaneAge([5,2,4,1,15,8,3]);
// const av2 = calcAverageHumaneAge([16,6,10,5,6,1,4]);


const firstWithdrawl = movements.find(mov => mov < 0 );
console.log(movements);
console.log(firstWithdrawl);
console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);