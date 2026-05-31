"use client";

import { ChevronRight, LogOut, Settings } from "lucide-react";
import { MENU_ITEMS } from "../model/constanst";

export function Profile() {
  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-8">
      <div>
        <p className="text-sm text-brand-gray">Your account</p>
        <h1 className="text-3xl font-bold text-dark">Profile</h1>
      </div>

      <div className="flex items-center justify-between bg-brand-purple rounded-2xl px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-brand-yellow flex items-center justify-center">
            <span className="text-2xl font-bold text-dark">A</span>
          </div>
          <div>
            <p className="text-lg font-bold text-light">Alex Morgan</p>
            <p className="text-sm text-light/80">alex@region.app</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-light/20 flex items-center justify-center">
          <Settings size={20} className="text-light" />
        </button>
      </div>

      <div className="bg-search-bg rounded-2xl divide-y divide-gray-200">
        {MENU_ITEMS.map(({ icon: Icon, label, value }) => (
          <button
            key={label}
            className="flex items-center justify-between w-full px-4 py-4 first:rounded-t-2xl last:rounded-b-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center">
                <Icon size={16} className="text-dark" />
              </div>
              <span className="font-medium text-dark">{label}</span>
            </div>
            <div className="flex items-center gap-1 text-brand-gray">
              {value && <span className="text-sm">{value}</span>}
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </div>

      <div className="bg-search-bg rounded-2xl">
        <button className="flex items-center gap-3 w-full px-4 py-4">
          <LogOut size={20} className="text-brand-pink" />
          <span className="font-medium text-brand-pink">Log out</span>
        </button>
      </div>
    </div>
  );
}
