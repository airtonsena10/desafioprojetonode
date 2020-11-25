import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CretaRepositoryDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const entrada = this.transactions.reduce((acumulador, valor) => {
      return acumulador + (valor.type === 'income' ? valor.value : 0);
    }, 0);

    const saida = this.transactions.reduce((acumulador, valor) => {
      return acumulador + (valor.type === 'outcome' ? valor.value : 0);
    }, 0);

    this.balance = {
      income: entrada,
      outcome: saida,
      total: entrada - saida,
    };
    return this.balance;
  }

  public create({ title, value, type }: CretaRepositoryDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
