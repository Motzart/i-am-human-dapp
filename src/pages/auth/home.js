import React, { useEffect, useState, useCallback } from "react";

import { Header } from "../../components/common/header";
import { Tabs } from "../../components/pages/home/tabs";
import { wallet } from "../../index";
import { DonatePanel } from "../../components/pages/home/DonatePanel";
import { checkAdmin } from "../../utils/utilityFunctions";

export const Home = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [isDonatePanelOpen, setIsDonatePanelOpen] = useState(false);

  const checkAdminStatus = useCallback(async () => {
    try {
      const data = await checkAdmin(wallet.accountId);
      console.log(data);
      if (data) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  return (
    <>
      <Header isAdmin={isAdmin} />
      <div className="px-6">
        <Tabs isAdmin={isAdmin} />
      </div>
      <DonatePanel
        isOpen={isDonatePanelOpen}
        closeModal={() => setIsDonatePanelOpen(false)}
      />
      <button
        onClick={() => setIsDonatePanelOpen(true)}
        className="bg-blue-600 text-white rounded shadow-lg font-medium w-[fit-content] text-xs p-4 absolute bottom-2 right-2"
      >
        Donate to this awesome initiative
      </button>
    </>
  );
};