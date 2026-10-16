class BankAccount {
  #balance;
  #transactions = [];
  constructor(accountNumber, owner, balance = 0) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.#balance = balance;
  }
  getBalance() { return this.#balance; }
  getHistory() { return [...this.#transactions]; }
  
  _addTransaction(type, amount) {
    this.#transactions.push({ type, amount, balance: this.#balance, date: new Date() });
  }
  _setBalance(v) { this.#balance = v; }

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit must be > 0");
    this.#balance += amount;
    this._addTransaction("DEPOSIT", amount);
    return this.#balance;
  }
  withdraw(amount) { throw new Error("Override this"); }
}

class SavingsAccount extends BankAccount {
  withdraw(amount) {
    if (amount <= 0) throw new Error("Withdrawal must be > 0");
    if (amount > this.getBalance()) throw new Error("Savings: Insufficient funds");
    this._setBalance(this.getBalance() - amount);
    this._addTransaction("WITHDRAW", amount);
    return this.getBalance();
  }
}

class CurrentAccount extends BankAccount {
  constructor(accountNumber, owner, balance, overdraftLimit) {
    super(accountNumber, owner, balance);
    this.overdraftLimit = overdraftLimit;
  }
  withdraw(amount) {
    if (amount <= 0) throw new Error("Withdrawal must be > 0");
    if (this.getBalance() - amount < -this.overdraftLimit) {
      throw new Error(`Current: Exceeds overdraft limit of ₦${this.overdraftLimit}`);
    }
    this._setBalance(this.getBalance() - amount);
    this._addTransaction("WITHDRAW", amount);
    return this.getBalance();
  }
}
module.exports = { SavingsAccount, CurrentAccount };
