"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const AutoConnectWallet = () =>  {
  const { isConnected } = useAccount();

  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => {
        useEffect(() => {
          if (!isConnected) {
            openConnectModal(); // 直接弹出钱包连接窗口
          }
        }, [isConnected]);

        return null; // 不返回任何按钮
      }}
    </ConnectButton.Custom>
  );
}

export default AutoConnectWallet
