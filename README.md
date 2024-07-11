# Solana Balance Checker

This project is a Node.js script that reads a list of Solana wallet addresses from a file, checks their balances, and writes the addresses with balances above a specified threshold to an output file.

## Prerequisites

- Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
- A file named `wallet.txt` containing Solana wallet addresses (one per line).
- A `.env` file with a variable `MIN_BALANCE` set to your desired balance threshold.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/solana-balance-checker.git
    cd solana-balance-checker
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file and set your minimum balance threshold:

    ```bash
    echo "MIN_BALANCE=0.00001" > .env
    ```

4. Create a `wallet.txt` file with your Solana wallet addresses (one per line):

    ```bash
    echo "your-solana-wallet-address" > wallet.txt
    ```

## Usage

Run the script using Node.js:

```bash
node index.js
