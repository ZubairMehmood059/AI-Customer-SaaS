/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'agent' | 'admin' | 'customer';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  orgName: string;
  teamSize?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface StoredAccount extends AuthUser {
  passwordHash?: string; // in local demo context, plain or hashed
}

const STORAGE_KEY_AUTH_USER = 'nexora_auth_current_user_v2';
const STORAGE_KEY_ACCOUNTS = 'nexora_auth_registered_accounts_v2';

const SEED_ACCOUNTS: StoredAccount[] = [
  {
    id: 'user_agent_1',
    name: 'Alex Rivera',
    email: 'alex@nexora.ai',
    role: 'agent',
    orgName: 'Acme Global Ltd.',
    teamSize: '5-20 agents',
    createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: 'user_admin_1',
    name: 'Root Administrator',
    email: 'admin@nexora.internal',
    role: 'admin',
    orgName: 'Nexora Platform Operations',
    teamSize: '50+ agents',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user_cust_1',
    name: 'Sarah Reynolds',
    email: 'sarah@stripe.com',
    role: 'customer',
    orgName: 'Stripe Payments',
    teamSize: 'Enterprise',
    createdAt: '2026-02-10T12:00:00Z',
  },
];

class AuthStoreManager {
  private currentUser: AuthUser | null = null;
  private accounts: StoredAccount[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedAccs = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      if (storedAccs) {
        this.accounts = JSON.parse(storedAccs);
      } else {
        this.accounts = SEED_ACCOUNTS;
        localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(SEED_ACCOUNTS));
      }

      const storedUser = localStorage.getItem(STORAGE_KEY_AUTH_USER);
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      } else {
        this.currentUser = null;
      }
    } catch {
      this.accounts = SEED_ACCOUNTS;
      this.currentUser = null;
    }
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(this.accounts));
      if (this.currentUser) {
        localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH_USER);
      }
    } catch (e) {
      console.warn('LocalStorage error in authStore:', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Log in an existing or entered user with credentials.
   * Does NOT force or pre-fill default details.
   */
  public login(
    email: string,
    password?: string,
    targetRole?: UserRole
  ): { success: boolean; user?: AuthUser; error?: string } {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'Please enter your work email address.' };
    }
    if (!password || password.trim().length === 0) {
      return { success: false, error: 'Please enter your password.' };
    }

    // Look for existing registered user
    const existing = this.accounts.find((a) => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      // If role specified and doesn't match, we still allow or adapt
      const userToLogin: AuthUser = {
        id: existing.id,
        name: existing.name,
        email: existing.email,
        role: targetRole || existing.role,
        orgName: existing.orgName,
        teamSize: existing.teamSize,
      };
      this.currentUser = userToLogin;
      this.persist();
      return { success: true, user: userToLogin };
    }

    // Generate authenticated profile from entered details
    const inferredName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = inferredName
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') || 'Authorized User';

    const domain = cleanEmail.split('@')[1] || 'workspace.io';
    const inferredOrg = domain.split('.')[0];
    const formattedOrg = inferredOrg.charAt(0).toUpperCase() + inferredOrg.slice(1) + ' Inc.';

    const newUser: StoredAccount = {
      id: `usr_${Date.now()}`,
      name: formattedName,
      email: cleanEmail,
      role: targetRole || (cleanEmail.includes('admin') ? 'admin' : 'agent'),
      orgName: formattedOrg,
      teamSize: '5-20 agents',
      createdAt: new Date().toISOString(),
    };

    this.accounts.push(newUser);
    this.currentUser = newUser;
    this.persist();

    return { success: true, user: newUser };
  }

  /**
   * Sign up with custom user details.
   * Truly saves entered details without pre-filled assumptions.
   */
  public signup(details: {
    name: string;
    email: string;
    password?: string;
    orgName: string;
    teamSize?: string;
    role?: UserRole;
  }): { success: boolean; user?: AuthUser; error?: string } {
    const cleanEmail = (details.email || '').trim().toLowerCase();
    const cleanName = (details.name || '').trim();
    const cleanOrg = (details.orgName || '').trim();

    if (!cleanName) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!cleanEmail) {
      return { success: false, error: 'Please enter a valid work email address.' };
    }
    if (!details.password || details.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }
    if (!cleanOrg) {
      return { success: false, error: 'Please enter your organization or company name.' };
    }

    const newUser: StoredAccount = {
      id: `usr_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      role: details.role || 'agent',
      orgName: cleanOrg,
      teamSize: details.teamSize || '5-20 agents',
      createdAt: new Date().toISOString(),
    };

    // Update if exists or append
    const existingIdx = this.accounts.findIndex((a) => a.email.toLowerCase() === cleanEmail);
    if (existingIdx >= 0) {
      this.accounts[existingIdx] = newUser;
    } else {
      this.accounts.push(newUser);
    }

    this.currentUser = newUser;
    this.persist();

    return { success: true, user: newUser };
  }

  public logout(): void {
    this.currentUser = null;
    this.persist();
  }

  public getInitials(name?: string): string {
    const target = name || this.currentUser?.name || 'NU';
    return target
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}

export const authStore = new AuthStoreManager();
