/** Adds `req.admin`, set by the verifyJWT middleware once a token is validated. */
export interface AdminTokenPayload {
  uid: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AdminTokenPayload;
    }
  }
}

export {};
