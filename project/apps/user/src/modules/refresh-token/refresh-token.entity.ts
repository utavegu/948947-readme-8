import { BaseEntity, JwtToken, IStorableEntity } from '@project/core';

export class RefreshTokenEntity extends BaseEntity implements IStorableEntity<JwtToken> {
  public tokenId: string;
  public createdAt: Date;
  public userId: string;
  public expiresIn: Date;

  constructor(token?: JwtToken) {
    super();
    this.populate(token);
  }

  public populate(token?: JwtToken): void {
    if (!token) {
      return;
    }

    this.id = token.id ?? '';
    this.createdAt = token.createdAt;
    this.expiresIn = token.expiresIn;
    this.userId = token.userId;
    this.tokenId = token.tokenId;
  }

  public toPOJO(): JwtToken {
    return {
      id: this.id,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
      userId: this.userId,
      tokenId: this.tokenId,
    }
  }
}
