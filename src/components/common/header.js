import React, { useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { wallet } from "../../index";

export const Header = ({ isAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  useEffect(() => {
    wallet
      .startUp()
      .then((value) => {
        setIsSignedIn(value);
      })
      .catch(() => {
        setIsSignedIn(false);
      });
  });

  return (
    <>
      <div className="px-6 pt-6 lg:px-8">
        <div>
          <nav
            className="flex h-9 items-center justify-between"
            aria-label="Global"
          >
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
              <a href="#" className="-m-1.5 p-1.5 font-bold tracking-tight">
                <span className="sr-only">Your Company</span>I-am-Human-DAPP
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
              {/* {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-semibold text-gray-900 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))} */}
            </div>
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 space-x-4 lg:justify-end">
              {isSignedIn && (
                <>
                  {isAdmin ? (
                    <div className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 flex items-center space-x-2">
                      <p>Admin Account</p>
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 flex items-center space-x-2">
                      <p>User Account</p>
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                </>
              )}
              {wallet.accountId && (
                <div className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  {wallet.accountId}
                </div>
              )}
              <button
                type="button"
                onClick={
                  isSignedIn ? () => wallet.signOut() : () => wallet.signIn()
                }
                className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                {isSignedIn ? "Sign Out" : "Connect Your Wallet"}
              </button>
            </div>
          </nav>
          <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
              <div className="flex h-9 items-center justify-between">
                <div className="flex">
                  <a href="#" className="-m-1.5 p-1.5 font-bold tracking-tight">
                    <span className="sr-only">Your Company</span>
                    I-am-Human-DAPP
                  </a>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {/* {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                      >
                        {item.name}
                      </a>
                    ))} */}
                  </div>
                  <div className="py-6">
                    <button
                      type="button"
                      onClick={
                        isSignedIn
                          ? () => wallet.signOut()
                          : () => wallet.signIn()
                      }
                      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                    >
                      {isSignedIn ? "Sign Out" : "Connect Your Wallet"}
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
      </div>
    </>
  );
};