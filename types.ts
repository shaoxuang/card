export interface WishRequest {
  recipientName: string;
  tone?: 'heartwarming' | 'funny' | 'poetic';
}

export interface GeneratedWish {
  message: string;
}
