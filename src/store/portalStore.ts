/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  sender: 'customer' | 'ai' | 'agent';
  author: string;
  authorEmail?: string;
  content: string;
  timestamp: string;
  confidence?: string;
  citations?: { doc: string; section: string; latency: string }[];
  attachments?: Attachment[];
}

export interface TicketTimelineItem {
  time: string;
  actor: string;
  event: string;
}

export interface SupportTicket {
  id: string; // e.g. '#4829' or 'TCK-4830'
  ticketNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerCompany: string;
  subject: string;
  category: 'API & Webhooks' | 'SCIM & Identity' | 'Billing & Accounts' | 'Security & Keys' | 'Platform & Infrastructure' | 'General';
  status: 'Open' | 'Pending' | 'Resolved';
  priority: 'Urgent' | 'High' | 'Normal' | 'Low';
  assignee: string;
  aiSuggested: boolean;
  slaRemaining: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  sentiment?: string;
  confidence?: string;
  timeline: TicketTimelineItem[];
  attachments?: Attachment[];
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  plan: 'Starter' | 'Scale Pro' | 'Enterprise';
  avatar?: string;
  timezone: string;
  phone?: string;
  notificationsEnabled: boolean;
}

const SEED_CUSTOMERS: CustomerUser[] = [
  {
    id: 'cust_sarah',
    name: 'Sarah Reynolds',
    email: 'sarah@stripe.com',
    company: 'Stripe Payments',
    role: 'Lead Infrastructure Engineer',
    plan: 'Enterprise',
    timezone: 'America/Los_Angeles (PST)',
    phone: '+1 (415) 890-2341',
    notificationsEnabled: true,
  },
  {
    id: 'cust_david',
    name: 'David Vance',
    email: 'david@figma.com',
    company: 'Figma Design',
    role: 'IT Identity Director',
    plan: 'Enterprise',
    timezone: 'America/New_York (EST)',
    phone: '+1 (212) 555-0199',
    notificationsEnabled: true,
  },
  {
    id: 'cust_mira',
    name: 'Mira Chen',
    email: 'mira@vercel.com',
    company: 'Vercel Platform',
    role: 'Staff DevOps Architect',
    plan: 'Scale Pro',
    timezone: 'America/Los_Angeles (PST)',
    phone: '+1 (650) 412-8820',
    notificationsEnabled: false,
  },
  {
    id: 'cust_liam',
    name: 'Liam O’Connor',
    email: 'liam@retool.com',
    company: 'Retool Ops',
    role: 'Finance Operations Lead',
    plan: 'Scale Pro',
    timezone: 'Europe/Dublin (GMT)',
    phone: '+353 1 496 0123',
    notificationsEnabled: true,
  },
];

const SEED_TICKETS: SupportTicket[] = [
  {
    id: '#4829',
    ticketNumber: '4829',
    customerId: 'cust_sarah',
    customerName: 'Sarah Reynolds',
    customerEmail: 'sarah@stripe.com',
    customerCompany: 'Stripe Payments',
    subject: 'Webhook signature mismatch error 401',
    category: 'API & Webhooks',
    status: 'Open',
    priority: 'Urgent',
    assignee: 'Alex Rivera (Staff Support Engineer)',
    aiSuggested: true,
    slaRemaining: '42 mins left',
    createdAt: 'Today, 10:42 AM',
    updatedAt: 'Today, 10:45 AM',
    description: 'Our production endpoint began failing webhook verification after upgrading to the v2 payload format. The receiver receives HTTP 401 Signature Verification Failed. Where do we extract the signing secret and is timestamp prepended to HMAC payload?',
    sentiment: 'Investigating',
    confidence: '98.2%',
    timeline: [
      { time: '10:42 AM', actor: 'Sarah Reynolds', event: 'Created ticket via Customer Portal' },
      { time: '10:42 AM', actor: 'Nexora AI', event: 'Retrieved 2 vector docs; formulated 98.2% confidence solution' },
      { time: '10:45 AM', actor: 'Alex Rivera', event: 'Assigned to self for engineering review' },
    ],
    attachments: [
      { id: 'att_1', name: 'webhook_payload_sample.json', size: '4.2 KB', type: 'application/json' },
      { id: 'att_2', name: 'error_stacktrace_401.log', size: '18.6 KB', type: 'text/plain' },
    ],
  },
  {
    id: '#4828',
    ticketNumber: '4828',
    customerId: 'cust_david',
    customerName: 'David Vance',
    customerEmail: 'david@figma.com',
    customerCompany: 'Figma Design',
    subject: 'SCIM group directory provisioning sync',
    category: 'SCIM & Identity',
    status: 'Pending',
    priority: 'High',
    assignee: 'Nexora AI Copilot',
    aiSuggested: true,
    slaRemaining: '1h 14m left',
    createdAt: 'Today, 09:15 AM',
    updatedAt: 'Today, 09:16 AM',
    description: 'Need to configure Okta group mappings for auto-provisioning enterprise seats across multiple regional workspaces without manual admin invites.',
    sentiment: 'Positive (84%)',
    confidence: '96.1%',
    timeline: [
      { time: '09:15 AM', actor: 'David Vance', event: 'Inbound chat opened in Customer Portal' },
      { time: '09:16 AM', actor: 'Nexora AI', event: 'Answered with SCIM guide and schema mapping specifications' },
    ],
    attachments: [
      { id: 'att_3', name: 'okta_scim_config.png', size: '240 KB', type: 'image/png' },
    ],
  },
  {
    id: '#4827',
    ticketNumber: '4827',
    customerId: 'cust_mira',
    customerName: 'Mira Chen',
    customerEmail: 'mira@vercel.com',
    customerCompany: 'Vercel Platform',
    subject: 'How to rotate production API token without downtime?',
    category: 'Security & Keys',
    status: 'Resolved',
    priority: 'Normal',
    assignee: 'Nexora AI',
    aiSuggested: true,
    slaRemaining: 'Met SLA (2m resolution)',
    createdAt: 'Yesterday, 02:10 PM',
    updatedAt: 'Yesterday, 02:12 PM',
    description: 'Customer requested procedure for rolling API keys with 24h grace overlap to prevent microservice downtime during routine key rotation cycle.',
    sentiment: 'Positive (99%)',
    confidence: '99.4%',
    timeline: [
      { time: 'Yesterday 14:10', actor: 'Mira Chen', event: 'Inquiry received via Customer Portal' },
      { time: 'Yesterday 14:11', actor: 'Nexora AI', event: 'Auto-resolved with zero human intervention' },
      { time: 'Yesterday 14:12', actor: 'Mira Chen', event: 'Customer marked ticket as Resolved' },
    ],
  },
  {
    id: '#4826',
    ticketNumber: '4826',
    customerId: 'cust_liam',
    customerName: 'Liam O’Connor',
    customerEmail: 'liam@retool.com',
    customerCompany: 'Retool Ops',
    subject: 'Billing invoice address change to European entity',
    category: 'Billing & Accounts',
    status: 'Resolved',
    priority: 'Normal',
    assignee: 'Nexora AI',
    aiSuggested: true,
    slaRemaining: 'Met SLA (4m resolution)',
    createdAt: 'Yesterday, 11:20 AM',
    updatedAt: 'Yesterday, 11:24 AM',
    description: 'Customer requested invoice details update with VAT number IE9823412X and registered office address in Dublin 2.',
    sentiment: 'Neutral',
    confidence: '97.0%',
    timeline: [
      { time: 'Yesterday 11:20', actor: 'Liam O’Connor', event: 'Email received' },
      { time: 'Yesterday 11:22', actor: 'Nexora AI', event: 'Updated Stripe tax ID and resent PDF' },
      { time: 'Yesterday 11:24', actor: 'Nexora AI', event: 'Invoice PDF regenerated and dispatched' },
    ],
  },
];

const SEED_MESSAGES: TicketMessage[] = [
  // Thread for #4829
  {
    id: 'msg_4829_1',
    ticketId: '#4829',
    sender: 'customer',
    author: 'Sarah Reynolds',
    authorEmail: 'sarah@stripe.com',
    content: "Hi Nexora team, we deployed our v2 webhook receiver in production today, but our server keeps rejecting payloads with '401 Unauthorized: Signature Verification Failed'. Where do we locate the active signing secret in the settings, and does the signature use HMAC-SHA256 with timestamp prepended?",
    timestamp: 'Today, 10:42 AM',
    attachments: [
      { id: 'att_1', name: 'webhook_payload_sample.json', size: '4.2 KB', type: 'application/json' },
      { id: 'att_2', name: 'error_stacktrace_401.log', size: '18.6 KB', type: 'text/plain' },
    ],
  },
  {
    id: 'msg_4829_2',
    ticketId: '#4829',
    sender: 'ai',
    author: 'Nexora AI Copilot',
    content: "Hello Sarah! To retrieve your webhook signing secret, navigate to Developers > Webhooks in your dashboard and click 'Reveal Signing Secret' on your registered endpoint. Yes, signatures are generated using HMAC-SHA256: the signature header contains 't=timestamp,v1=signature'. Ensure you verify against the raw unparsed request buffer rather than JSON-parsed text, or byte alignment will cause 401 mismatches.",
    timestamp: 'Today, 10:42 AM (112ms)',
    confidence: '98.2%',
    citations: [
      { doc: 'developer-webhooks-v2.md', section: 'Section 3.1 (Signature Verification)', latency: '112ms' },
      { doc: 'security-best-practices.pdf', section: 'Page 8 (HMAC Raw Buffer Handling)', latency: '128ms' },
    ],
  },
  {
    id: 'msg_4829_3',
    ticketId: '#4829',
    sender: 'agent',
    author: 'Alex Rivera (Support Engineer)',
    content: "Hi Sarah, Alex here from the support engineering team. I've double-checked your endpoint configuration in our telemetry logs. I noticed your Node.js Express server is parsing the body with bodyParser.json() before HMAC verification. If you pass the raw Buffer instead, your verification tests should pass immediately. Feel free to reply here if you'd like us to trigger a test ping!",
    timestamp: 'Today, 10:46 AM',
  },

  // Thread for #4828
  {
    id: 'msg_4828_1',
    ticketId: '#4828',
    sender: 'customer',
    author: 'David Vance',
    authorEmail: 'david@figma.com',
    content: "Can we sync our Okta user groups directly to project spaces? We want newly provisioned design team members to automatically receive edit access on assigned team boards without manual invitation flows.",
    timestamp: 'Today, 09:15 AM',
    attachments: [
      { id: 'att_3', name: 'okta_scim_config.png', size: '240 KB', type: 'image/png' },
    ],
  },
  {
    id: 'msg_4828_2',
    ticketId: '#4828',
    sender: 'ai',
    author: 'Nexora AI Copilot',
    content: "Hi David! Yes, SCIM 2.0 Group Push is fully supported in Enterprise workspaces. In your Okta admin portal under Push Groups, map your Okta group names directly to Nexora Team IDs. Nexora synchronizes membership changes every 60 seconds with zero manual invite requirements.",
    timestamp: 'Today, 09:16 AM (98ms)',
    confidence: '96.1%',
    citations: [
      { doc: 'okta-scim-integration-guide.md', section: 'Group Push & Attribute Mapping', latency: '98ms' },
    ],
  },

  // Thread for #4827
  {
    id: 'msg_4827_1',
    ticketId: '#4827',
    sender: 'customer',
    author: 'Mira Chen',
    authorEmail: 'mira@vercel.com',
    content: "How do we rotate production API token without causing microservice downtime across our edge cluster?",
    timestamp: 'Yesterday, 02:10 PM',
  },
  {
    id: 'msg_4827_2',
    ticketId: '#4827',
    sender: 'ai',
    author: 'Nexora AI Copilot',
    content: "Hello Mira! Under Settings > API Keys, click 'Generate Secondary Key'. Both the primary and secondary keys remain valid simultaneously during the 24-hour overlap window. Once all edge microservices have updated to the new secret, click 'Retire Primary Key'.",
    timestamp: 'Yesterday, 02:11 PM (86ms)',
    confidence: '99.4%',
  },
  {
    id: 'msg_4827_3',
    ticketId: '#4827',
    sender: 'customer',
    author: 'Mira Chen',
    authorEmail: 'mira@vercel.com',
    content: "That worked flawlessly, zero downtime observed across all regions. Marking as resolved. Thank you!",
    timestamp: 'Yesterday, 02:12 PM',
  },

  // Thread for #4826
  {
    id: 'msg_4826_1',
    ticketId: '#4826',
    sender: 'customer',
    author: 'Liam O’Connor',
    authorEmail: 'liam@retool.com',
    content: "Please update our invoice receipt to Dublin tax entity: Retool EU Operations Ltd, VAT: IE9823412X.",
    timestamp: 'Yesterday, 11:20 AM',
  },
  {
    id: 'msg_4826_2',
    ticketId: '#4826',
    sender: 'ai',
    author: 'Nexora AI Copilot',
    content: "Hi Liam, your billing records have been successfully updated with Irish VAT number IE9823412X. We have regenerated and resent the invoice PDF for the current billing cycle to your account email.",
    timestamp: 'Yesterday, 11:22 AM (104ms)',
    confidence: '97.0%',
  },
];

const STORAGE_KEY_CUSTOMERS = 'nexora_portal_customers_v1';
const STORAGE_KEY_TICKETS = 'nexora_portal_tickets_v1';
const STORAGE_KEY_MESSAGES = 'nexora_portal_messages_v1';
const STORAGE_KEY_AUTH = 'nexora_portal_current_customer_v1';

class PortalStoreManager {
  private customers: CustomerUser[] = [];
  private tickets: SupportTicket[] = [];
  private messages: TicketMessage[] = [];
  private currentCustomer: CustomerUser | null = null;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initFromStorage();
  }

  private initFromStorage() {
    try {
      const storedCustomers = localStorage.getItem(STORAGE_KEY_CUSTOMERS);
      this.customers = storedCustomers ? JSON.parse(storedCustomers) : SEED_CUSTOMERS;

      const storedTickets = localStorage.getItem(STORAGE_KEY_TICKETS);
      this.tickets = storedTickets ? JSON.parse(storedTickets) : SEED_TICKETS;

      const storedMessages = localStorage.getItem(STORAGE_KEY_MESSAGES);
      this.messages = storedMessages ? JSON.parse(storedMessages) : SEED_MESSAGES;

      const storedAuth = localStorage.getItem(STORAGE_KEY_AUTH);
      if (storedAuth) {
        this.currentCustomer = JSON.parse(storedAuth);
      } else {
        // Default to Sarah Reynolds for seamless initial demo experience
        this.currentCustomer = this.customers[0];
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(this.currentCustomer));
      }
    } catch {
      this.customers = SEED_CUSTOMERS;
      this.tickets = SEED_TICKETS;
      this.messages = SEED_MESSAGES;
      this.currentCustomer = SEED_CUSTOMERS[0];
    }
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(this.customers));
      localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(this.tickets));
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(this.messages));
      if (this.currentCustomer) {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(this.currentCustomer));
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
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

  // --- Auth Methods ---
  public getCurrentCustomer(): CustomerUser | null {
    return this.currentCustomer;
  }

  public getAllCustomers(): CustomerUser[] {
    return [...this.customers];
  }

  public loginCustomer(email: string, _password?: string): { success: boolean; error?: string; customer?: CustomerUser } {
    const cleanEmail = email.trim().toLowerCase();
    const existing = this.customers.find((c) => c.email.toLowerCase() === cleanEmail);
    if (!existing) {
      return { success: false, error: 'No account found with this email. Please register or use a demo profile.' };
    }
    this.currentCustomer = existing;
    this.persist();
    return { success: true, customer: existing };
  }

  public switchCustomer(customerId: string): boolean {
    const customer = this.customers.find((c) => c.id === customerId);
    if (customer) {
      this.currentCustomer = customer;
      this.persist();
      return true;
    }
    return false;
  }

  public signupCustomer(name: string, email: string, company: string, plan: 'Starter' | 'Scale Pro' | 'Enterprise' = 'Scale Pro'): { success: boolean; customer: CustomerUser } {
    const cleanEmail = email.trim().toLowerCase();
    const newId = `cust_${Date.now()}`;
    const newCustomer: CustomerUser = {
      id: newId,
      name: name.trim(),
      email: cleanEmail,
      company: company.trim() || 'Organization',
      role: 'Product Lead',
      plan,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      notificationsEnabled: true,
    };

    // Replace if email exists or add new
    const idx = this.customers.findIndex((c) => c.email.toLowerCase() === cleanEmail);
    if (idx >= 0) {
      this.customers[idx] = newCustomer;
    } else {
      this.customers.push(newCustomer);
    }
    this.currentCustomer = newCustomer;
    this.persist();
    return { success: true, customer: newCustomer };
  }

  public updateCustomerProfile(updates: Partial<CustomerUser>): CustomerUser | null {
    if (!this.currentCustomer) return null;
    this.currentCustomer = { ...this.currentCustomer, ...updates };
    const idx = this.customers.findIndex((c) => c.id === this.currentCustomer!.id);
    if (idx >= 0) {
      this.customers[idx] = this.currentCustomer;
    }
    this.persist();
    return this.currentCustomer;
  }

  public logoutCustomer() {
    this.currentCustomer = null;
    this.persist();
  }

  // --- Ticket Methods ---
  public getAllTickets(): SupportTicket[] {
    return [...this.tickets];
  }

  public getTicketsForCustomer(customerId: string): SupportTicket[] {
    return this.tickets.filter((t) => t.customerId === customerId);
  }

  public getTicketById(ticketId: string): SupportTicket | undefined {
    return this.tickets.find((t) => t.id === ticketId || t.ticketNumber === ticketId || `#${t.ticketNumber}` === ticketId);
  }

  public createTicket(data: {
    subject: string;
    category: SupportTicket['category'];
    priority: SupportTicket['priority'];
    description: string;
    attachments?: Attachment[];
    customer?: CustomerUser;
  }): SupportTicket {
    const cust = data.customer || this.currentCustomer || SEED_CUSTOMERS[0];
    const ticketNum = Math.floor(4830 + this.tickets.length).toString();
    const ticketId = `#${ticketNum}`;
    const nowStr = 'Just now';

    const newTicket: SupportTicket = {
      id: ticketId,
      ticketNumber: ticketNum,
      customerId: cust.id,
      customerName: cust.name,
      customerEmail: cust.email,
      customerCompany: cust.company,
      subject: data.subject.trim(),
      category: data.category,
      status: 'Open',
      priority: data.priority,
      assignee: 'Nexora AI Copilot',
      aiSuggested: true,
      slaRemaining: data.priority === 'Urgent' ? '15m SLA' : data.priority === 'High' ? '1h SLA' : '4h SLA',
      createdAt: nowStr,
      updatedAt: nowStr,
      description: data.description.trim(),
      sentiment: 'New Request',
      confidence: '95.4%',
      timeline: [
        { time: 'Just now', actor: cust.name, event: 'Created support request via Customer Portal' },
        { time: 'Just now', actor: 'Nexora AI', event: 'Vector embedding indexed; ingested into Support Queue' },
      ],
      attachments: data.attachments || [],
    };

    this.tickets.unshift(newTicket);

    // Initial customer message
    const custMessage: TicketMessage = {
      id: `msg_${ticketNum}_1`,
      ticketId,
      sender: 'customer',
      author: cust.name,
      authorEmail: cust.email,
      content: data.description.trim(),
      timestamp: 'Just now',
      attachments: data.attachments || [],
    };
    this.messages.push(custMessage);

    // Generate intelligent AI Copilot response simulation
    setTimeout(() => {
      this.generateAiResponseForTicket(newTicket);
    }, 600);

    this.persist();
    return newTicket;
  }

  private generateAiResponseForTicket(ticket: SupportTicket) {
    let aiContent = `Hello ${ticket.customerName.split(' ')[0]}! Nexora AI has ingested your ticket regarding "${ticket.subject}". `;
    let citations = [
      { doc: 'knowledge-base-v2.md', section: 'System Architecture & Solutions', latency: '92ms' },
    ];

    if (ticket.category === 'API & Webhooks') {
      aiContent += `For API & Webhook endpoints, verify that your HMAC payload includes header timestamps and that your proxy does not truncate chunked buffers. Our support engineers have also been notified with priority SLA.`;
      citations = [
        { doc: 'developer-webhooks-v2.md', section: 'Section 3.1 (Signature Verification)', latency: '88ms' },
      ];
    } else if (ticket.category === 'Billing & Accounts') {
      aiContent += `Our billing engine has queued this record. If this involves VAT, invoice adjustments, or subscription tiers, our accounts desk has been routed this update for priority processing.`;
    } else if (ticket.category === 'SCIM & Identity') {
      aiContent += `For directory provisioning, check your SCIM 2.0 Group Push mapping in your identity provider. Nexora synchronizes user attributes continuously.`;
    } else {
      aiContent += `Our engineering team has received your logs. An agent will review the parameters shortly.`;
    }

    const aiMsg: TicketMessage = {
      id: `msg_${ticket.ticketNumber}_ai_${Date.now()}`,
      ticketId: ticket.id,
      sender: 'ai',
      author: 'Nexora AI Copilot',
      content: aiContent,
      timestamp: 'Just now (92ms)',
      confidence: '97.8%',
      citations,
    };

    this.messages.push(aiMsg);
    
    // Add timeline event
    ticket.timeline.push({
      time: 'Just now',
      actor: 'Nexora AI Copilot',
      event: 'Autonomous assistance draft generated and posted to thread',
    });

    this.persist();
  }

  public updateTicketStatus(ticketId: string, status: SupportTicket['status'], actorName = 'Customer'): boolean {
    const ticket = this.getTicketById(ticketId);
    if (!ticket) return false;
    const oldStatus = ticket.status;
    ticket.status = status;
    ticket.updatedAt = 'Just now';
    ticket.timeline.push({
      time: 'Just now',
      actor: actorName,
      event: `Status changed from ${oldStatus} to ${status}`,
    });
    this.persist();
    return true;
  }

  public updateTicketPriority(ticketId: string, priority: SupportTicket['priority'], actorName = 'Support Team'): boolean {
    const ticket = this.getTicketById(ticketId);
    if (!ticket) return false;
    ticket.priority = priority;
    ticket.updatedAt = 'Just now';
    ticket.timeline.push({
      time: 'Just now',
      actor: actorName,
      event: `Priority updated to ${priority}`,
    });
    this.persist();
    return true;
  }

  // --- Messages Methods ---
  public getMessagesForTicket(ticketId: string): TicketMessage[] {
    return this.messages.filter((m) => m.ticketId === ticketId || m.ticketId === `#${ticketId}` || m.ticketId.replace('#', '') === ticketId.replace('#', ''));
  }

  public addMessage(data: {
    ticketId: string;
    sender: 'customer' | 'ai' | 'agent';
    author: string;
    authorEmail?: string;
    content: string;
    attachments?: Attachment[];
  }): TicketMessage {
    const ticket = this.getTicketById(data.ticketId);
    const msgId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newMsg: TicketMessage = {
      id: msgId,
      ticketId: ticket ? ticket.id : data.ticketId,
      sender: data.sender,
      author: data.author,
      authorEmail: data.authorEmail,
      content: data.content.trim(),
      timestamp: 'Just now',
      attachments: data.attachments || [],
    };

    this.messages.push(newMsg);

    if (ticket) {
      ticket.updatedAt = 'Just now';
      ticket.timeline.push({
        time: 'Just now',
        actor: data.author,
        event: data.sender === 'customer' ? 'Customer sent a reply' : data.sender === 'agent' ? 'Support agent replied' : 'AI generated reply',
      });
      // If customer replies, change status to Open if it was Resolved or Pending
      if (data.sender === 'customer' && ticket.status === 'Resolved') {
        ticket.status = 'Open';
      }
    }

    this.persist();
    return newMsg;
  }

  public resetToDefault() {
    this.customers = SEED_CUSTOMERS;
    this.tickets = SEED_TICKETS;
    this.messages = SEED_MESSAGES;
    this.currentCustomer = SEED_CUSTOMERS[0];
    this.persist();
  }
}

export const portalStore = new PortalStoreManager();
