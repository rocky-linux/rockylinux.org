export interface SecurityAcknowledgement {
  name: string;
  org?: string;
  href?: string;
  date: string;
  description: string;
  cve?: string;
  advisory?: string;
}

export type SecurityAcknowledgements = SecurityAcknowledgement[];
