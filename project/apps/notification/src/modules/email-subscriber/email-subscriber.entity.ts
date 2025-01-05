import { BaseEntity, IStorableEntity, Subscriber } from '@project/core';

export class EmailSubscriberEntity extends BaseEntity implements IStorableEntity<Subscriber> {
  public email: string;
  public firstname: string;
  public lastname: string;

  constructor (subscriber?: Subscriber) {
    super();
    this.populate(subscriber);
  }

  public populate(subscriber?: Subscriber): void {
    if (! subscriber) {
      return;
    }

    this.id = subscriber.id ?? '';
    this.email = subscriber.email;
    this.firstname = subscriber.firstname;
    this.lastname = subscriber.lastname;
  }

  public toPOJO(): Subscriber {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
    }
  }
}
