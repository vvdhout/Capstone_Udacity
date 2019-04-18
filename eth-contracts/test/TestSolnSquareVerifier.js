// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('SolnSquareVerifier', async accounts => {
  const account_one = accounts[0];
  const account_two = accounts[1];

  describe('solution', function () {
      before(async function () {
          this.contract = await SolnSquareVerifier.deployed({from: account_one});
      })

      it('can add solution and mint', async function () {
          this.contract = await SolnSquareVerifier.deployed({from: account_one});
          await this.contract.mintNFT(account_one, 1,
            ["0x15e40e803f92f0e7f1f28b8a73610de34ddc99988cd76b3aa8b248267516a71e", "0x03d3e6d9fa2f4a4b88d42eeb45e079e2adc2f7bfc6e20a8abc5dc76baf436445"],
        		["0x1b5365e0b797c4ee7dbeff238f1f617662376fb07cff0f8da7d0c76f03321dac", "0x04fd329a6cdec5855190e744ff03e3546d32548c6f2838c3cd7369531694809f"],
        			[["0x1140c487b505e710195f3144e8916fd261da7c0129e228e1165dd189761d0b5d", "0x03b0319b9cc47d86eb1d155e761ff19afb641cffcdba649606cccf32fae264df"], ["0x1d7cace9b2bfbfa4c263e92697d9fc8202faf56e678f6bba26d9c5f9c1927de1", "0x268a695a1bce3bfb6d8aecfdbc6992a140d094ab5fdfba7894ec9e0df19cebe3"]],
        		["0x24cd04b4480a5fd91b54d92879ae64d35501cdeae59060ad3af0ec2a789e46dd", "0x1abdc171ecbaf0ca98e66956cb8561c041c8bcc2f98534693f1e3b94c711ad3f"],["0x1dc8308d36ea0050d11039012bc8ba03348e5e036d9a8e77ef2cb0dddc059474", "0x0abee67bd1dc716af9bc29f2ca2cb59e73410b1dec487b78e0b16c9eb960805a"],["0x14e32a1bdce3d88a3312a4255e537dfe55a662b26537086f1889db797cca4605", "0x08882f0b5410d09de3fa6dc8e523ae71ac52f1cbb597dd5eef0aff7dea1ff688"],
        		["0x0af19ba4cc4049badefc4dfe3890138bf8e2b4aaab796fb731de8654543180ac", "0x22147670f3e8c33eb0efc69c57e889b47820af6584f7c3cde14195bd48dba17e"],
        		["0x037b8a490f5148f72496df6d824e6e3833d6106f07b81534d879e774712e0a97", "0x1c120624a7efc37cd904031f1b39e298399a96ee667e8d5f2f37a295d100eb44"],
        	[0000000000000000000000000000000000000000000000000000000000000004,0000000000000000000000000000000000000000000000000000000000000001]
        , {from: account_one});
        let solutionUsed = await this.contract.solutionUsed.call(["0x15e40e803f92f0e7f1f28b8a73610de34ddc99988cd76b3aa8b248267516a71e", "0x03d3e6d9fa2f4a4b88d42eeb45e079e2adc2f7bfc6e20a8abc5dc76baf436445"],
        ["0x1b5365e0b797c4ee7dbeff238f1f617662376fb07cff0f8da7d0c76f03321dac", "0x04fd329a6cdec5855190e744ff03e3546d32548c6f2838c3cd7369531694809f"],
          [["0x1140c487b505e710195f3144e8916fd261da7c0129e228e1165dd189761d0b5d", "0x03b0319b9cc47d86eb1d155e761ff19afb641cffcdba649606cccf32fae264df"], ["0x1d7cace9b2bfbfa4c263e92697d9fc8202faf56e678f6bba26d9c5f9c1927de1", "0x268a695a1bce3bfb6d8aecfdbc6992a140d094ab5fdfba7894ec9e0df19cebe3"]],
        ["0x24cd04b4480a5fd91b54d92879ae64d35501cdeae59060ad3af0ec2a789e46dd", "0x1abdc171ecbaf0ca98e66956cb8561c041c8bcc2f98534693f1e3b94c711ad3f"],["0x1dc8308d36ea0050d11039012bc8ba03348e5e036d9a8e77ef2cb0dddc059474", "0x0abee67bd1dc716af9bc29f2ca2cb59e73410b1dec487b78e0b16c9eb960805a"],["0x14e32a1bdce3d88a3312a4255e537dfe55a662b26537086f1889db797cca4605", "0x08882f0b5410d09de3fa6dc8e523ae71ac52f1cbb597dd5eef0aff7dea1ff688"],
        ["0x0af19ba4cc4049badefc4dfe3890138bf8e2b4aaab796fb731de8654543180ac", "0x22147670f3e8c33eb0efc69c57e889b47820af6584f7c3cde14195bd48dba17e"],
        ["0x037b8a490f5148f72496df6d824e6e3833d6106f07b81534d879e774712e0a97", "0x1c120624a7efc37cd904031f1b39e298399a96ee667e8d5f2f37a295d100eb44"],
      [0000000000000000000000000000000000000000000000000000000000000004,0000000000000000000000000000000000000000000000000000000000000001]
      );
      let totalSupply = await this.contract.totalSupply();
      let owner = await this.contract.ownerOf(1);
          assert.equal(solutionUsed, true, "Solution has not been used.");
          assert.equal(totalSupply, 1, "Total supply has not been incremented.");
          assert.equal(owner, account_one, "Owner has not been set to account one.");
      })
    })
});
