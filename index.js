require('dotenv').config();
const fs = require('fs');
const web3 = require('@solana/web3.js');

// Function read address from file
const readAddressesFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const addresses = data.split('\n').filter(Boolean);
        resolve(addresses);
      }
    });
  });
};

// Function check balance
const checkBalances = async (addresses, threshold) => {
  const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));
  const results = [];

  for (const address of addresses) {
    try {
      const publicKey = new web3.PublicKey(address);
      const balance = await connection.getBalance(publicKey);
      const balanceSol = balance / web3.LAMPORTS_PER_SOL;

      if (balanceSol > threshold) {
        results.push({ address, balance: balanceSol });
      }
    } catch (error) {
      console.error(`Error checking balance for address ${address}:`, error);
    }
  }

  return results;
};

// Function write resulte a file
const writeResultsToFile = (results, outputPath) => {
  const data = results.map(({ address, balance }) => `${address}, ${balance} SOL`).join('\n');
  fs.writeFileSync(outputPath, data, 'utf8');
};

// main function
const main = async () => {
  const inputFilePath = 'wallet.txt'; // Input file
  const outputFilePath = 'output.txt'; // Output
  const threshold = parseFloat(process.env.MIN_BALANCE);

  try {
    const addresses = await readAddressesFromFile(inputFilePath);
    const results = await checkBalances(addresses, threshold);
    writeResultsToFile(results, outputFilePath);
    console.log('All resulte saved in', outputFilePath);
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
