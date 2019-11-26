import Notification from "./dto/Notification";

export type Consumer<T> = (param: T) => void;
export type BiConsumer<T, K> = (param1: T, param2: K) => void;
export type Predicate<T> = (target: T) => boolean;
export interface Entity {
    id: string;
}

export type Listener<E extends Entity, N extends Notification> = (entity: E, notification: N) => void;

export type ListenerUnsubscriber = () => void;
