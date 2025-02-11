'use client'
import { Description, Dialog, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { BellIcon, GearIcon, PersonIcon, PinLeftIcon } from "@radix-ui/react-icons";
import { ChevronDownIcon, LogOut } from "lucide-react";
import { useState, useRef, useEffect, Fragment } from "react";
import Button from "../Button";

interface HeaderProps {
  username: string;
  logo?: React.ReactNode;
  headerText?: string;
  role: string;
  onSignOut?: () => void;
}

export function Header({ username, logo, role, headerText, onSignOut }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [leaveMenu, setLeaveMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showMenu]);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleLeaveWorkspace = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(false);
    setTimeout(() => {
      setLeaveMenu(true);
    }, 0);
  };

  return (
    <header className="flex items-center justify-between px-8 py-1 bg-white border-b border-gray-200">
      {logo ? (
        <div className="flex items-center gap-2">
          {logo}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-gray-600 text-xl font-bold">
          {headerText}
        </div>
      )}

      <div className="flex items-center gap-6">
        <button 
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Notifications"
        >
          <BellIcon className="w-5 h-5" />
        </button>

        {role === 'MANAGER' && (
          <div className="text-black relative">
            <Menu as="div" className="relative">
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner hover:bg-gray-700">
                Selected WorkSpace
                <ChevronDownIcon className="size-4" />
              </MenuButton>

              <MenuItems className="absolute right-0 mt-2 w-52 rounded-lg bg-gray-100 p-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
                <MenuItem as="button" className="w-full text-left px-3 py-2 hover:bg-gray-300 rounded-md flex items-center justify-between group">
                  <span>Edit</span>
                  <kbd className="ml-auto hidden text-xs text-gray-400 group-hover:inline">⌘E</kbd>
                </MenuItem>
                
                <MenuItem as="button" className="w-full text-left px-3 py-2 hover:bg-gray-300 rounded-md flex items-center justify-between group">
                  <span>Duplicate</span>
                  <kbd className="ml-auto hidden text-xs text-gray-400 group-hover:inline">⌘D</kbd>
                </MenuItem>
                
                <div className="my-1 h-px bg-gray-700" />
                
                <MenuItem as="button" className="w-full text-left px-3 py-2 hover:bg-gray-300 rounded-md flex items-center justify-between group">
                  <span>Archive</span>
                  <kbd className="ml-auto hidden text-xs text-gray-400 group-hover:inline">⌘A</kbd>
                </MenuItem>
                
                <MenuItem as="button" className="w-full text-left px-3 py-2 hover:bg-gray-300 rounded-md flex items-center justify-between group">
                  <span>Delete</span>
                  <kbd className="ml-auto hidden text-xs text-gray-400 group-hover:inline">⌘⌫</kbd>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        )}

        <div className="relative">
          <button
            ref={buttonRef}
            onClick={handleMenuToggle}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            aria-expanded={showMenu}
            aria-haspopup="true"
            aria-controls="profile-menu"
          >
            <div className="text-right">
              <h3 className="text-sm font-medium text-gray-900">{username}</h3>
              <span className="text-xs text-gray-500 capitalize">{role}</span>
            </div>

            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {username[0].toUpperCase()}
              </span>
            </div>
          </button>

          
            <Transition
            as={Fragment}
            show={showMenu}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div
              id="profile-menu"
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-lg shadow-lg border border-gray-100"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="profile-menu-button"
            >
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                role="menuitem"
              >
                <PersonIcon className="w-4 h-4" />
                Profile
              </button>
              
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                role="menuitem"
              >
                <GearIcon className="w-4 h-4" />
                Settings
              </button>

              {role === "MANAGER" && (
                <div>
                  <button
                    onClick={handleLeaveWorkspace}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    role="menuitem"
                  >
                    <PinLeftIcon className="w-4 h-4" />
                    Leave WorkSpace
                  </button>
                </div>
              )}

              <button
                onClick={onSignOut}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                role="menuitem"
              >
                <PinLeftIcon className="w-4 h-4" />
                Sign out
              </button>
            </div>
            </Transition>
        </div>
      </div>

      <Transition.Root show={leaveMenu} as={Fragment}>
  <Dialog 
    as="div"
    className="relative z-50"
    onClose={() => setLeaveMenu(false)}
  >
    {/* First Transition Child - Backdrop */}
    <Transition.Child
      as={Fragment}
      enter="ease-in-out duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in-out duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    </Transition.Child>

    {/* Container for the modal */}
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Second Transition Child - Modal */}
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-out duration-300"
          enterFrom="translate-y-full opacity-0 scale-95"
          enterTo="translate-y-0 opacity-100 scale-100"
          leave="transform transition ease-in duration-200"
          leaveFrom="translate-y-0 opacity-100 scale-100"
          leaveTo="translate-y-full opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
            <DialogTitle className="font-bold text-gray-600">
              Leaving WorkSpace?
            </DialogTitle>
            <Description className="mt-2 text-gray-600">
              Are you sure about leaving the workspace?
            </Description>
            <div className="mt-4 flex gap-4">
              <Button onClick={() => setLeaveMenu(false)}>
                Cancel
              </Button>
              <Button variant="error" onClick={() => setLeaveMenu(false)}>
                Leave
              </Button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition.Root>
    </header>
  );
}