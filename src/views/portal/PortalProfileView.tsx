/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  Sparkles,
  Ticket,
  Users
} from 'lucide-react';
import { portalStore, CustomerUser } from '../../store/portalStore';

export const PortalProfileView: React.FC = () => {
  const [customer, setCustomer] = useState<CustomerUser | null>(portalStore.getCurrentCustomer());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [timezone, setTimezone] = useState('');
  const [phone, setPhone] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const cur = portalStore.getCurrentCustomer();
    setCustomer(cur);
    if (cur) {
      setName(cur.name || '');
      setEmail(cur.email || '');
      setCompany(cur.company || '');
      setRole(cur.role || '');
      setTimezone(cur.timezone || 'UTC');
      setPhone(cur.phone || '');
      setNotificationsEnabled(cur.notificationsEnabled ?? true);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    portalStore.updateCustomerProfile({
      name,
      email,
      company,
      role,
      timezone,
      phone,
      notificationsEnabled,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const allCustomers = portalStore.getAllCustomers();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Account & Organization
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage your contact credentials, organization parameters, and notification alerts.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Your profile information and preferences have been updated successfully.</span>
        </div>
      )}

      {/* Main Profile Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        {/* Profile Card Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-slate-950 font-extrabold text-xl flex items-center justify-center shadow-lg">
              {customer?.name
                ? customer.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
                : 'CU'}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{customer?.name}</h2>
              <div className="text-xs text-slate-400">{customer?.email}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  {customer?.company}
                </span>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  {customer?.plan} Plan
                </span>
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-400 font-mono">
            <div className="text-emerald-400 font-semibold">● Active Account</div>
            <div className="text-[11px] text-slate-500 mt-0.5">SLA: Enterprise Sub-15m</div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Organization / Company</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Role / Job Title</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Lead Engineer, VP of Operations"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Preferred Timezone</label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="e.g. America/Los_Angeles"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Emergency Support Phone</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Preferences Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              <span>Notification Dispatch Settings</span>
            </div>

            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0"
              />
              <div>
                <div className="font-semibold text-slate-200">Email ticket updates in real-time</div>
                <div className="text-[11px] text-slate-400">
                  Receive instant dispatch emails whenever support agents or AI Copilot post replies to your tickets.
                </div>
              </div>
            </label>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-xl text-xs shadow-md hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Account Information</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
