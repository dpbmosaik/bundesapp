import { UnwrapNestedRefs } from "vue";

export function createReactiveDeepCopy<T extends object> (a: T): UnwrapNestedRefs<T> {
    return reactive(createDeepCopy(a));
}

export function createDeepCopy<T extends object> (a: T): T {
    return JSON.parse(JSON.stringify(a));
}