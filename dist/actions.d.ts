import { AppStore } from "./app-store";
/**
 * abstract class to provide utility methods for action creators
 */
export declare class Actions {
    createDispatcher(appStore: AppStore, action: (...n: any[]) => any): () => void;
}
