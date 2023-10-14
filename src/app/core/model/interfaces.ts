export interface NostrProfile {
  name: string;
  about: string;
  picture: string;
  banner?: string;

  /** https://github.com/nostr-protocol/nips/blob/master/05.md */
  nip05: string;

  /** LNURL */
  lud06?: string;

  /** LN Alias */
  lud16?: string;

  display_name: string;

  website: string;
}


export interface NostrProfileDocument extends NostrProfile {
  /** The npub encoded public key. */
  npub: string;

  /** The public key in hex encoding. */
  pubkey: string;

  /** The timestamp when the profile was created. Internal property, not from event. */
  created: number;

  /** The timestamp when the profile was modified. Internal property, not from event. */
  modified?: number;

  /** Timestamp when user started following. */
  followed?: number;

  /** Timestamp when last retrieved. */
  retrieved?: number;


  circle?: number;

  /** List of domains where the user has been verified, e.g. "@nostr.directory", "@domain.com" */
  verifications: string[];

  /** Copy of the value from original event. */
  created_at?: number;

  following?: string[];

  relays?: any;
}

export interface LNURLPayRequest {
  allowsNostr?: boolean;
  nostrPubkey?: string;
  minSendable?: number;
  maxSendable?: number;
  metadata?: string;
  callback: string;
  commentAllowed?: number;
  status?: string;
}

export interface LNURLPayResponse {
  pr: string;
}

export interface LNURLInvoice {
  pr: string;
  successAction?: LNURLSuccessAction;
}

export interface LNURLSuccessAction {
  description?: string;
  url?: string;
}