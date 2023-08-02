import { Observable, firstValueFrom } from 'rxjs';

export class RxjsUtil {

    public static firstValueFrom<T>(obs: Observable<T>): Promise<T> {
        return firstValueFrom(obs);
    }

    public static sleepAsync(milliseconds: number): Promise<void> {
        return new Promise(r => setTimeout(r, milliseconds));
    }
 }