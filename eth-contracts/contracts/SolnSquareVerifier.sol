pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './Verifier.sol';
import './ERC721Mintable.sol';

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is TitleTrack {
  Verifier verifierContract;

  constructor(address _verifierContract) public {
    verifierContract = Verifier(_verifierContract);
  }

// TODO define a solutions struct that can hold an index & an address
struct Solution {
  bytes32 index;
  address caller;
}

// TODO define an array of the above struct
Solution[] public solutions;

// TODO define a mapping to store unique solutions submitted
mapping (bytes32 => bool) usedSolutions;

// TODO Create an event to emit when a solution is added
event solutionAdded(bytes32 hash);

// TODO Create a function to add the solutions to the array and emit the event
function addSolution(bytes32 _hash, address _caller) internal {
      Solution memory newSolution;
      newSolution.index = _hash;
      newSolution.caller = _caller;
      solutions.push(newSolution);
      usedSolutions[_hash] = true;
      emit solutionAdded(_hash);
}

function solutionUsed(uint[2] memory a,
uint[2] memory a_p,
uint[2][2] memory b,
uint[2] memory b_p,
uint[2] memory c,
uint[2] memory c_p,
uint[2] memory h,
uint[2] memory k,
uint[2] memory input) view public returns(bool) {
  bytes32 _hash = keccak256(abi.encodePacked(a,
  a_p,
  b,
  b_p,
  c,
  c_p,
  h,
  k,
  input));
  return usedSolutions[_hash];
}


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

function mintNFT(address to, uint tokenId,
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input) public {
          require(solutionUsed(
          a,
          a_p,
          b,
          b_p,
          c,
          c_p,
          h,
          k,
          input) == false, "Solution has already been used.");
          require(verifierContract.verifyTx(
          a,
          a_p,
          b,
          b_p,
          c,
          c_p,
          h,
          k,
          input), "Solution is not correct.");
          bytes32 _hash = keccak256(abi.encodePacked(a,
          a_p,
          b,
          b_p,
          c,
          c_p,
          h,
          k,
          input));
          addSolution(_hash, msg.sender);
          mint(to, tokenId);
}

}
