import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract, toNano } from "@ton/core";
import { useTonConnect } from "./useTonConnect";



export function useMainContract() {
  const {tonClient} = useTonConnect();
  const { sender } = useTonConnect()
  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

  const [contractData, setContractData] = useState<null | {
    counter_value: number;
    recent_sender: Address;
    owner_address: Address;
  }>();
  const [balance, setBalance] = useState<null | number>(0)

  const mainContract = useAsyncInitialize(async () => {
    if (!tonClient) return;
    const contract = new MainContract(
      Address.parse("EQB3OapcNoXeiz7NaEWTNx8mpK1ILK4FuMSUR-pxzzqvRxbz") // replace with your address from tutorial 2 step 8
    );
    return tonClient.open(contract) as OpenedContract<MainContract>;
  }, [tonClient]);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      setContractData(null);
      const val = await mainContract.getStorageData();
      const {balance} = await mainContract.getBalance()
      setContractData({
        counter_value: val.number,
        recent_sender: val.recent_sender,
        owner_address: val.owner_address,
      });
      setBalance(balance)

      await sleep(5000)
      getValue()
    }
    getValue();
  }, [mainContract]);

  return {
    contract_address: mainContract?.address.toString(),
    contract_balance: balance,
    ...contractData,
    sendIncrement: async () => {
        return mainContract?.sendIncrement(sender, toNano("0.05"), 5)
    },
    sendDeposit: async () => {
        return mainContract?.sendDeposit(sender, toNano("1"))
    },
    sendWithdraw: async () => {
        return mainContract?.sendWithdrawalRequest(sender, toNano("0.05"), toNano("0.7"))
    },
    sendTx: async () => {
        return sender.send({
            value: toNano("0.1"),
            to: Address.parse("UQCqoGmED2IEitG9jSQlHz3OFhGiaygoN2EPlOldnxt27Tiq"),
        })
    }
  };
}