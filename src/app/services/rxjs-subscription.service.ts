import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class RxjsSubscriptionService implements OnDestroy {
  private subscriptions = new Subscriptions();

  public add<T>(obs: Observable<T>, observer: (value: T) => void): void {
    this.subscriptions.add(obs, observer);
  }

  public ngOnDestroy() {
    this.subscriptions.clear();
  }
}

export class Subscriptions {
  private subscriptions: Subscription[] = [];

  public add<T>(obs: Observable<T>, observer: (value: T) => void): void {
    this.subscriptions.push(obs.subscribe(observer));
  }

  public clear() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}