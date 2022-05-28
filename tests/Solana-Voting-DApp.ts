import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaVotingDApp } from "../target/types/solana_voting_d_app";

describe("Solana-Voting-DApp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaVotingDApp as Program<SolanaVotingDApp>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
