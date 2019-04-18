var ERC721MintableComplete = artifacts.require('TitleTrack');

contract('TestERC721Mintable', async accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        before(async function () {
            this.contract = await ERC721MintableComplete.deployed({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1, {from: account_one});
            await this.contract.mint(account_one, 2, {from: account_one});
            await this.contract.mint(account_one, 3, {from: account_one});
            await this.contract.mint(account_one, 4, {from: account_one});
            await this.contract.mint(account_one, 5, {from: account_one});
        })

        it('should return total supply', async function () {
            this.contract = await ERC721MintableComplete.deployed({from: account_one});
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, 5, "Total supply is not equal to 5.");
        })

        it('should get token balance', async function () {
          this.contract = await ERC721MintableComplete.deployed({from: account_one});
          let tokenBalance = await this.contract.balanceOf(account_one);
          assert.equal(tokenBalance, 5, "Token balance is not equal to 5.")
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
          this.contract = await ERC721MintableComplete.deployed({from: account_one});
          let tokenURI = await this.contract.tokenURI(1);
          assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Token balance is not equal to 5.")
        })

        it('should transfer token from one owner to another', async function () {
          this.contract = await ERC721MintableComplete.deployed({from: account_one});
          await this.contract.transferFrom(account_one, account_two, 1, {from: account_one});
          let newOwner = await this.contract.ownerOf(1);
          assert.equal(newOwner, account_two, "New owner does not equal the correct account (2).");
        })
    });

    describe('have ownership properties', function () {
      before(async function () {
          this.contract = await ERC721MintableComplete.deployed({from: account_one});
        });

        it('should fail when minting when address is not contract owner', async function () {
          this.contract = await ERC721MintableComplete.deployed({from: account_one});
          let result;
          try {
            result = await this.contract.mint(account_two, 6, {from: account_two});
          } catch {
          }
          assert.isUndefined(result, "Account was able to mint.");
        })

        it('should return contract owner', async function () {
          this.contract = await ERC721MintableComplete.deployed({from: account_one});
          let owner = await this.contract.getOwner();
          assert.equal(owner, account_one, "This is not the contract owner.");
        })

    });

    describe('pausability', function () {
      before(async function () {
          this.contract = await ERC721MintableComplete.deployed({from: account_one});
        });

        it('can be paused/unpaused', async function () {
          this.contract = await ERC721MintableComplete.deployed({from: account_one});
          await this.contract.setPaused(true);
          let paused = await this.contract.getPaused();
          assert.equal(paused, true, "Contract still not paused.");
          await this.contract.setPaused(false);
          paused = await this.contract.getPaused();
          assert.equal(paused, false, "Contract still paused.");
        })

    });

    describe('approval functionality', function () {
      before(async function () {
          this.contract = await ERC721MintableComplete.deployed({from: account_one});
        });

        it('can set approved address for a token', async function () {
          this.contract = await ERC721MintableComplete.deployed({from: account_one});
          await this.contract.approve(account_two, 5, {from: account_one});
          let approved = await this.contract.getApproved(5);
          assert.equal(approved, account_two, "Account two is not approved.");
        })

        it('can set operator that is approved for all tokens', async function () {
          this.contract = await ERC721MintableComplete.deployed({from: account_one});
          await this.contract.setApprovalForAll(account_two, true, {from: account_one});
          let approved = await this.contract.isApprovedForAll(account_one, account_two);
          assert.equal(approved, true, "Account two is not an operator of account one.");
        })

    });
})
