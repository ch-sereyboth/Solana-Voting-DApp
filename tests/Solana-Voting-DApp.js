const assert = require("assert");
const anchor = require("@project-serum/anchor")

const {
  SystemProgram
} = anchor.web3;
describe("Solana-Voting-DApp", () => {
  /* Configure the client */
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Solana-Voting-DApp;
  const voteAccount = anchor.web3.Keypair.generate();

  it("Initializes with 0 Votes for Approve and Deny", async () => {
    console.log("Testing Initialize...");
    
    /* The last element passed to RPC methods is always the transaction options. Because voteAccount is being created here, we are required to pass it as a signers array */
    await program.rpc.initialize({
      accounts: {
        voteAccount: voteAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [voteAccount],
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );


    console.log("Approve: ", account.approve.toString());
    console.log("Deny: ", account.deny.toString());
    assert.ok(
      account.approve.toString() == 0 && account.deny.toString() == 0
    );
  });
  it("Votes correctly for Approve", async () => {
    console.log("Testing voteApprove...");
    await program.rpc.voteApprove({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log("Approve: ", account.approve.toString());
    console.log("Deny: ", account.deny.toString());
    assert.ok(
      account.approve.toString() == 1 && account.deny.toString() == 0
    );
  });



  it("Votes correctly for Deny", async () => {
    console.log("Testing voteDeny...");
    await program.rpc.voteDeny({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log("Approve: ", account.approve.toString());
    console.log("Deny: ", account.deny.toString());
    assert.ok(
      account.approve.toString() == 1 && account.deny.toString() == 1
    );
  });
});
