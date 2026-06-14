type PathProperty = string | number | (string | number)[];

declare module "lodash" {
   
    function head<T>(array:T[]): T | undefined;
    function hasIn(object:Object, path:PathProperty): boolean;
    function isBoolean<T>(value:boolean | T) : boolean
    function toString<T>(value : T ): string
    function split(stringValue:string, separator?:RegExp|string, limit?:number): string[]
    function hasPath(object: Object, path: PathProperty, hasFunc: (object: Object, key: PropertyKey) => boolean): boolean
    function filter<T>(collection: T[], predicate: (value:T, key: number, collection:T[]) => boolean ): T[];
    function filter<T extends object>(collection: T, predicate: (value:T[keyof T], key: keyof T, collection:T) => boolean): T[];
    function every<T>(collection: T[], predicate: (value:T, key: number, collection:T[]) => boolean, guard:Object ):boolean
    function map<T, U>(collection: T[], iteratee: (value:T, key: number, collection:T[]) => U ): U[];
    function map<T extends object, U>(collection: T, iteratee: (value:T[keyof T], key: keyof T, collection:T) => U): U[];
}