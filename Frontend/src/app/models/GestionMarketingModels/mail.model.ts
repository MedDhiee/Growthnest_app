// mail.interface.ts
export interface GmailAccount {
    email: string;
    picture?: string;
    accessToken: string;
  }
  
  export interface Mail {
    id: string;
    from: string;
    subject: string;
    snippet: string;
    date: Date;
    read: boolean;
  }