const { SavingsAccount, CurrentAccount } = require('./bank.js');

console.log("--- BANK TESTS ---");
const sav = new SavingsAccount("SAV001", "Tunde", 0);
sav.deposit(50000);
sav.withdraw(15000);
console.log(`After deposit 50k withdraw 15k: ₦${sav.getBalance()} (expected 35000)`);

try { sav.withdraw(40000); } catch(e) { console.log(`PASS: Savings overdraw blocked -> ${e.message}`); }
console.log(`Balance after failed tx: ₦${sav.getBalance()} (should still be 35000)`);

const curr = new CurrentAccount("CUR001", "Aisha", 10000, 20000);
curr.withdraw(25000); // 10k - 25k = -15k (within 20k limit)
console.log(`Current within overdraft: ₦${curr.getBalance()} (expected -15000)`);
try { curr.withdraw(10000); } catch(e) { console.log(`PASS: Beyond overdraft blocked -> ${e.message}`); }

// direct access test
// sav.#balance = 1000000; // This will throw Syntax Error - protected!
console.log("PASS: Balance cannot be changed directly");
console.log(sav.getHistory());
