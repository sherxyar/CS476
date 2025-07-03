
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model PMNote
 * 
 */
export type PMNote = $Result.DefaultSelection<Prisma.$PMNotePayload>
/**
 * Model FinancialHistoryEntry
 * 
 */
export type FinancialHistoryEntry = $Result.DefaultSelection<Prisma.$FinancialHistoryEntryPayload>
/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model TabAccessRequest
 * 
 */
export type TabAccessRequest = $Result.DefaultSelection<Prisma.$TabAccessRequestPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const InvoiceStatus: {
  PAID: 'PAID',
  NOT_PAID: 'NOT_PAID'
};

export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus]

}

export type InvoiceStatus = $Enums.InvoiceStatus

export const InvoiceStatus: typeof $Enums.InvoiceStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pMNote`: Exposes CRUD operations for the **PMNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PMNotes
    * const pMNotes = await prisma.pMNote.findMany()
    * ```
    */
  get pMNote(): Prisma.PMNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.financialHistoryEntry`: Exposes CRUD operations for the **FinancialHistoryEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FinancialHistoryEntries
    * const financialHistoryEntries = await prisma.financialHistoryEntry.findMany()
    * ```
    */
  get financialHistoryEntry(): Prisma.FinancialHistoryEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tabAccessRequest`: Exposes CRUD operations for the **TabAccessRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TabAccessRequests
    * const tabAccessRequests = await prisma.tabAccessRequest.findMany()
    * ```
    */
  get tabAccessRequest(): Prisma.TabAccessRequestDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Project: 'Project',
    AuditLog: 'AuditLog',
    PMNote: 'PMNote',
    FinancialHistoryEntry: 'FinancialHistoryEntry',
    Invoice: 'Invoice',
    TabAccessRequest: 'TabAccessRequest'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "project" | "auditLog" | "pMNote" | "financialHistoryEntry" | "invoice" | "tabAccessRequest"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      PMNote: {
        payload: Prisma.$PMNotePayload<ExtArgs>
        fields: Prisma.PMNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PMNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PMNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PMNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PMNotePayload>
          }
          findFirst: {
            args: Prisma.PMNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PMNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PMNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PMNotePayload>
          }
          findMany: {
            args: Prisma.PMNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PMNotePayload>[]
          }
          create: {
            args: Prisma.PMNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PMNotePayload>
          }
          createMany: {
            args: Prisma.PMNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PMNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PMNotePayload>[]
          }
          delete: {
            args: Prisma.PMNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PMNotePayload>
          }
          update: {
            args: Prisma.PMNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PMNotePayload>
          }
          deleteMany: {
            args: Prisma.PMNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PMNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PMNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PMNotePayload>[]
          }
          upsert: {
            args: Prisma.PMNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PMNotePayload>
          }
          aggregate: {
            args: Prisma.PMNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePMNote>
          }
          groupBy: {
            args: Prisma.PMNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<PMNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.PMNoteCountArgs<ExtArgs>
            result: $Utils.Optional<PMNoteCountAggregateOutputType> | number
          }
        }
      }
      FinancialHistoryEntry: {
        payload: Prisma.$FinancialHistoryEntryPayload<ExtArgs>
        fields: Prisma.FinancialHistoryEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FinancialHistoryEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialHistoryEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FinancialHistoryEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialHistoryEntryPayload>
          }
          findFirst: {
            args: Prisma.FinancialHistoryEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialHistoryEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FinancialHistoryEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialHistoryEntryPayload>
          }
          findMany: {
            args: Prisma.FinancialHistoryEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialHistoryEntryPayload>[]
          }
          create: {
            args: Prisma.FinancialHistoryEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialHistoryEntryPayload>
          }
          createMany: {
            args: Prisma.FinancialHistoryEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FinancialHistoryEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialHistoryEntryPayload>[]
          }
          delete: {
            args: Prisma.FinancialHistoryEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialHistoryEntryPayload>
          }
          update: {
            args: Prisma.FinancialHistoryEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialHistoryEntryPayload>
          }
          deleteMany: {
            args: Prisma.FinancialHistoryEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FinancialHistoryEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FinancialHistoryEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialHistoryEntryPayload>[]
          }
          upsert: {
            args: Prisma.FinancialHistoryEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialHistoryEntryPayload>
          }
          aggregate: {
            args: Prisma.FinancialHistoryEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFinancialHistoryEntry>
          }
          groupBy: {
            args: Prisma.FinancialHistoryEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<FinancialHistoryEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.FinancialHistoryEntryCountArgs<ExtArgs>
            result: $Utils.Optional<FinancialHistoryEntryCountAggregateOutputType> | number
          }
        }
      }
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      TabAccessRequest: {
        payload: Prisma.$TabAccessRequestPayload<ExtArgs>
        fields: Prisma.TabAccessRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TabAccessRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TabAccessRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TabAccessRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TabAccessRequestPayload>
          }
          findFirst: {
            args: Prisma.TabAccessRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TabAccessRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TabAccessRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TabAccessRequestPayload>
          }
          findMany: {
            args: Prisma.TabAccessRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TabAccessRequestPayload>[]
          }
          create: {
            args: Prisma.TabAccessRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TabAccessRequestPayload>
          }
          createMany: {
            args: Prisma.TabAccessRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TabAccessRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TabAccessRequestPayload>[]
          }
          delete: {
            args: Prisma.TabAccessRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TabAccessRequestPayload>
          }
          update: {
            args: Prisma.TabAccessRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TabAccessRequestPayload>
          }
          deleteMany: {
            args: Prisma.TabAccessRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TabAccessRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TabAccessRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TabAccessRequestPayload>[]
          }
          upsert: {
            args: Prisma.TabAccessRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TabAccessRequestPayload>
          }
          aggregate: {
            args: Prisma.TabAccessRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTabAccessRequest>
          }
          groupBy: {
            args: Prisma.TabAccessRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TabAccessRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TabAccessRequestCountArgs<ExtArgs>
            result: $Utils.Optional<TabAccessRequestCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    project?: ProjectOmit
    auditLog?: AuditLogOmit
    pMNote?: PMNoteOmit
    financialHistoryEntry?: FinancialHistoryEntryOmit
    invoice?: InvoiceOmit
    tabAccessRequest?: TabAccessRequestOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    financialChanges: number
    notes: number
    projects: number
    auditLogs: number
    tabRequests: number
    approvedTabs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    financialChanges?: boolean | UserCountOutputTypeCountFinancialChangesArgs
    notes?: boolean | UserCountOutputTypeCountNotesArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    tabRequests?: boolean | UserCountOutputTypeCountTabRequestsArgs
    approvedTabs?: boolean | UserCountOutputTypeCountApprovedTabsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFinancialChangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinancialHistoryEntryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PMNoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTabRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TabAccessRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApprovedTabsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TabAccessRequestWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    financialHistory: number
    Invoice: number
    pmNotesHistory: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    financialHistory?: boolean | ProjectCountOutputTypeCountFinancialHistoryArgs
    Invoice?: boolean | ProjectCountOutputTypeCountInvoiceArgs
    pmNotesHistory?: boolean | ProjectCountOutputTypeCountPmNotesHistoryArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountFinancialHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinancialHistoryEntryWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountInvoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountPmNotesHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PMNoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    hashedPassword: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    hashedPassword: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    hashedPassword: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    hashedPassword?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    hashedPassword?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    hashedPassword?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    hashedPassword: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    hashedPassword?: boolean
    financialChanges?: boolean | User$financialChangesArgs<ExtArgs>
    notes?: boolean | User$notesArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    tabRequests?: boolean | User$tabRequestsArgs<ExtArgs>
    approvedTabs?: boolean | User$approvedTabsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    hashedPassword?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    hashedPassword?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    hashedPassword?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "hashedPassword", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    financialChanges?: boolean | User$financialChangesArgs<ExtArgs>
    notes?: boolean | User$notesArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    tabRequests?: boolean | User$tabRequestsArgs<ExtArgs>
    approvedTabs?: boolean | User$approvedTabsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      financialChanges: Prisma.$FinancialHistoryEntryPayload<ExtArgs>[]
      notes: Prisma.$PMNotePayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      tabRequests: Prisma.$TabAccessRequestPayload<ExtArgs>[]
      approvedTabs: Prisma.$TabAccessRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      hashedPassword: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    financialChanges<T extends User$financialChangesArgs<ExtArgs> = {}>(args?: Subset<T, User$financialChangesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notes<T extends User$notesArgs<ExtArgs> = {}>(args?: Subset<T, User$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tabRequests<T extends User$tabRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$tabRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    approvedTabs<T extends User$approvedTabsArgs<ExtArgs> = {}>(args?: Subset<T, User$approvedTabsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly hashedPassword: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.financialChanges
   */
  export type User$financialChangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
    where?: FinancialHistoryEntryWhereInput
    orderBy?: FinancialHistoryEntryOrderByWithRelationInput | FinancialHistoryEntryOrderByWithRelationInput[]
    cursor?: FinancialHistoryEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FinancialHistoryEntryScalarFieldEnum | FinancialHistoryEntryScalarFieldEnum[]
  }

  /**
   * User.notes
   */
  export type User$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
    where?: PMNoteWhereInput
    orderBy?: PMNoteOrderByWithRelationInput | PMNoteOrderByWithRelationInput[]
    cursor?: PMNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PMNoteScalarFieldEnum | PMNoteScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User.tabRequests
   */
  export type User$tabRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
    where?: TabAccessRequestWhereInput
    orderBy?: TabAccessRequestOrderByWithRelationInput | TabAccessRequestOrderByWithRelationInput[]
    cursor?: TabAccessRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TabAccessRequestScalarFieldEnum | TabAccessRequestScalarFieldEnum[]
  }

  /**
   * User.approvedTabs
   */
  export type User$approvedTabsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
    where?: TabAccessRequestWhereInput
    orderBy?: TabAccessRequestOrderByWithRelationInput | TabAccessRequestOrderByWithRelationInput[]
    cursor?: TabAccessRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TabAccessRequestScalarFieldEnum | TabAccessRequestScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    forecast: number | null
    actuals: number | null
    budget: number | null
    projectManagerId: number | null
  }

  export type ProjectSumAggregateOutputType = {
    forecast: number | null
    actuals: number | null
    budget: number | null
    projectManagerId: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    projectID: string | null
    title: string | null
    phase: string | null
    description: string | null
    forecast: number | null
    actuals: number | null
    budget: number | null
    plannedStartDate: Date | null
    plannedEndDate: Date | null
    dateCreated: Date | null
    lastUpdated: Date | null
    status: string | null
    projectManagerId: number | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    projectID: string | null
    title: string | null
    phase: string | null
    description: string | null
    forecast: number | null
    actuals: number | null
    budget: number | null
    plannedStartDate: Date | null
    plannedEndDate: Date | null
    dateCreated: Date | null
    lastUpdated: Date | null
    status: string | null
    projectManagerId: number | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    projectID: number
    title: number
    phase: number
    description: number
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: number
    plannedEndDate: number
    dateCreated: number
    lastUpdated: number
    status: number
    projectManagerId: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    forecast?: true
    actuals?: true
    budget?: true
    projectManagerId?: true
  }

  export type ProjectSumAggregateInputType = {
    forecast?: true
    actuals?: true
    budget?: true
    projectManagerId?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    projectID?: true
    title?: true
    phase?: true
    description?: true
    forecast?: true
    actuals?: true
    budget?: true
    plannedStartDate?: true
    plannedEndDate?: true
    dateCreated?: true
    lastUpdated?: true
    status?: true
    projectManagerId?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    projectID?: true
    title?: true
    phase?: true
    description?: true
    forecast?: true
    actuals?: true
    budget?: true
    plannedStartDate?: true
    plannedEndDate?: true
    dateCreated?: true
    lastUpdated?: true
    status?: true
    projectManagerId?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    projectID?: true
    title?: true
    phase?: true
    description?: true
    forecast?: true
    actuals?: true
    budget?: true
    plannedStartDate?: true
    plannedEndDate?: true
    dateCreated?: true
    lastUpdated?: true
    status?: true
    projectManagerId?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    projectID: string
    title: string
    phase: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date
    plannedEndDate: Date
    dateCreated: Date
    lastUpdated: Date | null
    status: string | null
    projectManagerId: number | null
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectID?: boolean
    title?: boolean
    phase?: boolean
    description?: boolean
    forecast?: boolean
    actuals?: boolean
    budget?: boolean
    plannedStartDate?: boolean
    plannedEndDate?: boolean
    dateCreated?: boolean
    lastUpdated?: boolean
    status?: boolean
    projectManagerId?: boolean
    financialHistory?: boolean | Project$financialHistoryArgs<ExtArgs>
    Invoice?: boolean | Project$InvoiceArgs<ExtArgs>
    pmNotesHistory?: boolean | Project$pmNotesHistoryArgs<ExtArgs>
    projectManager?: boolean | Project$projectManagerArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectID?: boolean
    title?: boolean
    phase?: boolean
    description?: boolean
    forecast?: boolean
    actuals?: boolean
    budget?: boolean
    plannedStartDate?: boolean
    plannedEndDate?: boolean
    dateCreated?: boolean
    lastUpdated?: boolean
    status?: boolean
    projectManagerId?: boolean
    projectManager?: boolean | Project$projectManagerArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectID?: boolean
    title?: boolean
    phase?: boolean
    description?: boolean
    forecast?: boolean
    actuals?: boolean
    budget?: boolean
    plannedStartDate?: boolean
    plannedEndDate?: boolean
    dateCreated?: boolean
    lastUpdated?: boolean
    status?: boolean
    projectManagerId?: boolean
    projectManager?: boolean | Project$projectManagerArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    projectID?: boolean
    title?: boolean
    phase?: boolean
    description?: boolean
    forecast?: boolean
    actuals?: boolean
    budget?: boolean
    plannedStartDate?: boolean
    plannedEndDate?: boolean
    dateCreated?: boolean
    lastUpdated?: boolean
    status?: boolean
    projectManagerId?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectID" | "title" | "phase" | "description" | "forecast" | "actuals" | "budget" | "plannedStartDate" | "plannedEndDate" | "dateCreated" | "lastUpdated" | "status" | "projectManagerId", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    financialHistory?: boolean | Project$financialHistoryArgs<ExtArgs>
    Invoice?: boolean | Project$InvoiceArgs<ExtArgs>
    pmNotesHistory?: boolean | Project$pmNotesHistoryArgs<ExtArgs>
    projectManager?: boolean | Project$projectManagerArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectManager?: boolean | Project$projectManagerArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectManager?: boolean | Project$projectManagerArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      financialHistory: Prisma.$FinancialHistoryEntryPayload<ExtArgs>[]
      Invoice: Prisma.$InvoicePayload<ExtArgs>[]
      pmNotesHistory: Prisma.$PMNotePayload<ExtArgs>[]
      projectManager: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectID: string
      title: string
      phase: string
      description: string
      forecast: number
      actuals: number
      budget: number
      plannedStartDate: Date
      plannedEndDate: Date
      dateCreated: Date
      lastUpdated: Date | null
      status: string | null
      projectManagerId: number | null
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    financialHistory<T extends Project$financialHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Project$financialHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Invoice<T extends Project$InvoiceArgs<ExtArgs> = {}>(args?: Subset<T, Project$InvoiceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pmNotesHistory<T extends Project$pmNotesHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Project$pmNotesHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projectManager<T extends Project$projectManagerArgs<ExtArgs> = {}>(args?: Subset<T, Project$projectManagerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly projectID: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly phase: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly forecast: FieldRef<"Project", 'Float'>
    readonly actuals: FieldRef<"Project", 'Float'>
    readonly budget: FieldRef<"Project", 'Float'>
    readonly plannedStartDate: FieldRef<"Project", 'DateTime'>
    readonly plannedEndDate: FieldRef<"Project", 'DateTime'>
    readonly dateCreated: FieldRef<"Project", 'DateTime'>
    readonly lastUpdated: FieldRef<"Project", 'DateTime'>
    readonly status: FieldRef<"Project", 'String'>
    readonly projectManagerId: FieldRef<"Project", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.financialHistory
   */
  export type Project$financialHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
    where?: FinancialHistoryEntryWhereInput
    orderBy?: FinancialHistoryEntryOrderByWithRelationInput | FinancialHistoryEntryOrderByWithRelationInput[]
    cursor?: FinancialHistoryEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FinancialHistoryEntryScalarFieldEnum | FinancialHistoryEntryScalarFieldEnum[]
  }

  /**
   * Project.Invoice
   */
  export type Project$InvoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Project.pmNotesHistory
   */
  export type Project$pmNotesHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
    where?: PMNoteWhereInput
    orderBy?: PMNoteOrderByWithRelationInput | PMNoteOrderByWithRelationInput[]
    cursor?: PMNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PMNoteScalarFieldEnum | PMNoteScalarFieldEnum[]
  }

  /**
   * Project.projectManager
   */
  export type Project$projectManagerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    recordId: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
    recordId: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: number | null
    userId: number | null
    action: string | null
    tableName: string | null
    recordId: number | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    action: string | null
    tableName: string | null
    recordId: number | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    tableName: number
    recordId: number
    beforeData: number
    afterData: number
    timestamp: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    id?: true
    userId?: true
    recordId?: true
  }

  export type AuditLogSumAggregateInputType = {
    id?: true
    userId?: true
    recordId?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    tableName?: true
    recordId?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    tableName?: true
    recordId?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    tableName?: true
    recordId?: true
    beforeData?: true
    afterData?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: number
    userId: number | null
    action: string
    tableName: string
    recordId: number
    beforeData: JsonValue | null
    afterData: JsonValue | null
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    beforeData?: boolean
    afterData?: boolean
    timestamp?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    beforeData?: boolean
    afterData?: boolean
    timestamp?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    beforeData?: boolean
    afterData?: boolean
    timestamp?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    beforeData?: boolean
    afterData?: boolean
    timestamp?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "tableName" | "recordId" | "beforeData" | "afterData" | "timestamp", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number | null
      action: string
      tableName: string
      recordId: number
      beforeData: Prisma.JsonValue | null
      afterData: Prisma.JsonValue | null
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'Int'>
    readonly userId: FieldRef<"AuditLog", 'Int'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly tableName: FieldRef<"AuditLog", 'String'>
    readonly recordId: FieldRef<"AuditLog", 'Int'>
    readonly beforeData: FieldRef<"AuditLog", 'Json'>
    readonly afterData: FieldRef<"AuditLog", 'Json'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model PMNote
   */

  export type AggregatePMNote = {
    _count: PMNoteCountAggregateOutputType | null
    _avg: PMNoteAvgAggregateOutputType | null
    _sum: PMNoteSumAggregateOutputType | null
    _min: PMNoteMinAggregateOutputType | null
    _max: PMNoteMaxAggregateOutputType | null
  }

  export type PMNoteAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type PMNoteSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type PMNoteMinAggregateOutputType = {
    id: number | null
    note: string | null
    createdAt: Date | null
    projectId: string | null
    userId: number | null
  }

  export type PMNoteMaxAggregateOutputType = {
    id: number | null
    note: string | null
    createdAt: Date | null
    projectId: string | null
    userId: number | null
  }

  export type PMNoteCountAggregateOutputType = {
    id: number
    note: number
    createdAt: number
    projectId: number
    userId: number
    _all: number
  }


  export type PMNoteAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type PMNoteSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type PMNoteMinAggregateInputType = {
    id?: true
    note?: true
    createdAt?: true
    projectId?: true
    userId?: true
  }

  export type PMNoteMaxAggregateInputType = {
    id?: true
    note?: true
    createdAt?: true
    projectId?: true
    userId?: true
  }

  export type PMNoteCountAggregateInputType = {
    id?: true
    note?: true
    createdAt?: true
    projectId?: true
    userId?: true
    _all?: true
  }

  export type PMNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PMNote to aggregate.
     */
    where?: PMNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PMNotes to fetch.
     */
    orderBy?: PMNoteOrderByWithRelationInput | PMNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PMNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PMNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PMNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PMNotes
    **/
    _count?: true | PMNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PMNoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PMNoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PMNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PMNoteMaxAggregateInputType
  }

  export type GetPMNoteAggregateType<T extends PMNoteAggregateArgs> = {
        [P in keyof T & keyof AggregatePMNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePMNote[P]>
      : GetScalarType<T[P], AggregatePMNote[P]>
  }




  export type PMNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PMNoteWhereInput
    orderBy?: PMNoteOrderByWithAggregationInput | PMNoteOrderByWithAggregationInput[]
    by: PMNoteScalarFieldEnum[] | PMNoteScalarFieldEnum
    having?: PMNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PMNoteCountAggregateInputType | true
    _avg?: PMNoteAvgAggregateInputType
    _sum?: PMNoteSumAggregateInputType
    _min?: PMNoteMinAggregateInputType
    _max?: PMNoteMaxAggregateInputType
  }

  export type PMNoteGroupByOutputType = {
    id: number
    note: string
    createdAt: Date
    projectId: string
    userId: number | null
    _count: PMNoteCountAggregateOutputType | null
    _avg: PMNoteAvgAggregateOutputType | null
    _sum: PMNoteSumAggregateOutputType | null
    _min: PMNoteMinAggregateOutputType | null
    _max: PMNoteMaxAggregateOutputType | null
  }

  type GetPMNoteGroupByPayload<T extends PMNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PMNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PMNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PMNoteGroupByOutputType[P]>
            : GetScalarType<T[P], PMNoteGroupByOutputType[P]>
        }
      >
    >


  export type PMNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    note?: boolean
    createdAt?: boolean
    projectId?: boolean
    userId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    author?: boolean | PMNote$authorArgs<ExtArgs>
  }, ExtArgs["result"]["pMNote"]>

  export type PMNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    note?: boolean
    createdAt?: boolean
    projectId?: boolean
    userId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    author?: boolean | PMNote$authorArgs<ExtArgs>
  }, ExtArgs["result"]["pMNote"]>

  export type PMNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    note?: boolean
    createdAt?: boolean
    projectId?: boolean
    userId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    author?: boolean | PMNote$authorArgs<ExtArgs>
  }, ExtArgs["result"]["pMNote"]>

  export type PMNoteSelectScalar = {
    id?: boolean
    note?: boolean
    createdAt?: boolean
    projectId?: boolean
    userId?: boolean
  }

  export type PMNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "note" | "createdAt" | "projectId" | "userId", ExtArgs["result"]["pMNote"]>
  export type PMNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    author?: boolean | PMNote$authorArgs<ExtArgs>
  }
  export type PMNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    author?: boolean | PMNote$authorArgs<ExtArgs>
  }
  export type PMNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    author?: boolean | PMNote$authorArgs<ExtArgs>
  }

  export type $PMNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PMNote"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      note: string
      createdAt: Date
      projectId: string
      userId: number | null
    }, ExtArgs["result"]["pMNote"]>
    composites: {}
  }

  type PMNoteGetPayload<S extends boolean | null | undefined | PMNoteDefaultArgs> = $Result.GetResult<Prisma.$PMNotePayload, S>

  type PMNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PMNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PMNoteCountAggregateInputType | true
    }

  export interface PMNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PMNote'], meta: { name: 'PMNote' } }
    /**
     * Find zero or one PMNote that matches the filter.
     * @param {PMNoteFindUniqueArgs} args - Arguments to find a PMNote
     * @example
     * // Get one PMNote
     * const pMNote = await prisma.pMNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PMNoteFindUniqueArgs>(args: SelectSubset<T, PMNoteFindUniqueArgs<ExtArgs>>): Prisma__PMNoteClient<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PMNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PMNoteFindUniqueOrThrowArgs} args - Arguments to find a PMNote
     * @example
     * // Get one PMNote
     * const pMNote = await prisma.pMNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PMNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, PMNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PMNoteClient<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PMNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PMNoteFindFirstArgs} args - Arguments to find a PMNote
     * @example
     * // Get one PMNote
     * const pMNote = await prisma.pMNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PMNoteFindFirstArgs>(args?: SelectSubset<T, PMNoteFindFirstArgs<ExtArgs>>): Prisma__PMNoteClient<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PMNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PMNoteFindFirstOrThrowArgs} args - Arguments to find a PMNote
     * @example
     * // Get one PMNote
     * const pMNote = await prisma.pMNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PMNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, PMNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__PMNoteClient<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PMNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PMNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PMNotes
     * const pMNotes = await prisma.pMNote.findMany()
     * 
     * // Get first 10 PMNotes
     * const pMNotes = await prisma.pMNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pMNoteWithIdOnly = await prisma.pMNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PMNoteFindManyArgs>(args?: SelectSubset<T, PMNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PMNote.
     * @param {PMNoteCreateArgs} args - Arguments to create a PMNote.
     * @example
     * // Create one PMNote
     * const PMNote = await prisma.pMNote.create({
     *   data: {
     *     // ... data to create a PMNote
     *   }
     * })
     * 
     */
    create<T extends PMNoteCreateArgs>(args: SelectSubset<T, PMNoteCreateArgs<ExtArgs>>): Prisma__PMNoteClient<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PMNotes.
     * @param {PMNoteCreateManyArgs} args - Arguments to create many PMNotes.
     * @example
     * // Create many PMNotes
     * const pMNote = await prisma.pMNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PMNoteCreateManyArgs>(args?: SelectSubset<T, PMNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PMNotes and returns the data saved in the database.
     * @param {PMNoteCreateManyAndReturnArgs} args - Arguments to create many PMNotes.
     * @example
     * // Create many PMNotes
     * const pMNote = await prisma.pMNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PMNotes and only return the `id`
     * const pMNoteWithIdOnly = await prisma.pMNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PMNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, PMNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PMNote.
     * @param {PMNoteDeleteArgs} args - Arguments to delete one PMNote.
     * @example
     * // Delete one PMNote
     * const PMNote = await prisma.pMNote.delete({
     *   where: {
     *     // ... filter to delete one PMNote
     *   }
     * })
     * 
     */
    delete<T extends PMNoteDeleteArgs>(args: SelectSubset<T, PMNoteDeleteArgs<ExtArgs>>): Prisma__PMNoteClient<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PMNote.
     * @param {PMNoteUpdateArgs} args - Arguments to update one PMNote.
     * @example
     * // Update one PMNote
     * const pMNote = await prisma.pMNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PMNoteUpdateArgs>(args: SelectSubset<T, PMNoteUpdateArgs<ExtArgs>>): Prisma__PMNoteClient<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PMNotes.
     * @param {PMNoteDeleteManyArgs} args - Arguments to filter PMNotes to delete.
     * @example
     * // Delete a few PMNotes
     * const { count } = await prisma.pMNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PMNoteDeleteManyArgs>(args?: SelectSubset<T, PMNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PMNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PMNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PMNotes
     * const pMNote = await prisma.pMNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PMNoteUpdateManyArgs>(args: SelectSubset<T, PMNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PMNotes and returns the data updated in the database.
     * @param {PMNoteUpdateManyAndReturnArgs} args - Arguments to update many PMNotes.
     * @example
     * // Update many PMNotes
     * const pMNote = await prisma.pMNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PMNotes and only return the `id`
     * const pMNoteWithIdOnly = await prisma.pMNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PMNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, PMNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PMNote.
     * @param {PMNoteUpsertArgs} args - Arguments to update or create a PMNote.
     * @example
     * // Update or create a PMNote
     * const pMNote = await prisma.pMNote.upsert({
     *   create: {
     *     // ... data to create a PMNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PMNote we want to update
     *   }
     * })
     */
    upsert<T extends PMNoteUpsertArgs>(args: SelectSubset<T, PMNoteUpsertArgs<ExtArgs>>): Prisma__PMNoteClient<$Result.GetResult<Prisma.$PMNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PMNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PMNoteCountArgs} args - Arguments to filter PMNotes to count.
     * @example
     * // Count the number of PMNotes
     * const count = await prisma.pMNote.count({
     *   where: {
     *     // ... the filter for the PMNotes we want to count
     *   }
     * })
    **/
    count<T extends PMNoteCountArgs>(
      args?: Subset<T, PMNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PMNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PMNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PMNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PMNoteAggregateArgs>(args: Subset<T, PMNoteAggregateArgs>): Prisma.PrismaPromise<GetPMNoteAggregateType<T>>

    /**
     * Group by PMNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PMNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PMNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PMNoteGroupByArgs['orderBy'] }
        : { orderBy?: PMNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PMNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPMNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PMNote model
   */
  readonly fields: PMNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PMNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PMNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends PMNote$authorArgs<ExtArgs> = {}>(args?: Subset<T, PMNote$authorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PMNote model
   */
  interface PMNoteFieldRefs {
    readonly id: FieldRef<"PMNote", 'Int'>
    readonly note: FieldRef<"PMNote", 'String'>
    readonly createdAt: FieldRef<"PMNote", 'DateTime'>
    readonly projectId: FieldRef<"PMNote", 'String'>
    readonly userId: FieldRef<"PMNote", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PMNote findUnique
   */
  export type PMNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
    /**
     * Filter, which PMNote to fetch.
     */
    where: PMNoteWhereUniqueInput
  }

  /**
   * PMNote findUniqueOrThrow
   */
  export type PMNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
    /**
     * Filter, which PMNote to fetch.
     */
    where: PMNoteWhereUniqueInput
  }

  /**
   * PMNote findFirst
   */
  export type PMNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
    /**
     * Filter, which PMNote to fetch.
     */
    where?: PMNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PMNotes to fetch.
     */
    orderBy?: PMNoteOrderByWithRelationInput | PMNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PMNotes.
     */
    cursor?: PMNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PMNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PMNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PMNotes.
     */
    distinct?: PMNoteScalarFieldEnum | PMNoteScalarFieldEnum[]
  }

  /**
   * PMNote findFirstOrThrow
   */
  export type PMNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
    /**
     * Filter, which PMNote to fetch.
     */
    where?: PMNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PMNotes to fetch.
     */
    orderBy?: PMNoteOrderByWithRelationInput | PMNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PMNotes.
     */
    cursor?: PMNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PMNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PMNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PMNotes.
     */
    distinct?: PMNoteScalarFieldEnum | PMNoteScalarFieldEnum[]
  }

  /**
   * PMNote findMany
   */
  export type PMNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
    /**
     * Filter, which PMNotes to fetch.
     */
    where?: PMNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PMNotes to fetch.
     */
    orderBy?: PMNoteOrderByWithRelationInput | PMNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PMNotes.
     */
    cursor?: PMNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PMNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PMNotes.
     */
    skip?: number
    distinct?: PMNoteScalarFieldEnum | PMNoteScalarFieldEnum[]
  }

  /**
   * PMNote create
   */
  export type PMNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a PMNote.
     */
    data: XOR<PMNoteCreateInput, PMNoteUncheckedCreateInput>
  }

  /**
   * PMNote createMany
   */
  export type PMNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PMNotes.
     */
    data: PMNoteCreateManyInput | PMNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PMNote createManyAndReturn
   */
  export type PMNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * The data used to create many PMNotes.
     */
    data: PMNoteCreateManyInput | PMNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PMNote update
   */
  export type PMNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a PMNote.
     */
    data: XOR<PMNoteUpdateInput, PMNoteUncheckedUpdateInput>
    /**
     * Choose, which PMNote to update.
     */
    where: PMNoteWhereUniqueInput
  }

  /**
   * PMNote updateMany
   */
  export type PMNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PMNotes.
     */
    data: XOR<PMNoteUpdateManyMutationInput, PMNoteUncheckedUpdateManyInput>
    /**
     * Filter which PMNotes to update
     */
    where?: PMNoteWhereInput
    /**
     * Limit how many PMNotes to update.
     */
    limit?: number
  }

  /**
   * PMNote updateManyAndReturn
   */
  export type PMNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * The data used to update PMNotes.
     */
    data: XOR<PMNoteUpdateManyMutationInput, PMNoteUncheckedUpdateManyInput>
    /**
     * Filter which PMNotes to update
     */
    where?: PMNoteWhereInput
    /**
     * Limit how many PMNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PMNote upsert
   */
  export type PMNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the PMNote to update in case it exists.
     */
    where: PMNoteWhereUniqueInput
    /**
     * In case the PMNote found by the `where` argument doesn't exist, create a new PMNote with this data.
     */
    create: XOR<PMNoteCreateInput, PMNoteUncheckedCreateInput>
    /**
     * In case the PMNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PMNoteUpdateInput, PMNoteUncheckedUpdateInput>
  }

  /**
   * PMNote delete
   */
  export type PMNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
    /**
     * Filter which PMNote to delete.
     */
    where: PMNoteWhereUniqueInput
  }

  /**
   * PMNote deleteMany
   */
  export type PMNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PMNotes to delete
     */
    where?: PMNoteWhereInput
    /**
     * Limit how many PMNotes to delete.
     */
    limit?: number
  }

  /**
   * PMNote.author
   */
  export type PMNote$authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * PMNote without action
   */
  export type PMNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PMNote
     */
    select?: PMNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PMNote
     */
    omit?: PMNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PMNoteInclude<ExtArgs> | null
  }


  /**
   * Model FinancialHistoryEntry
   */

  export type AggregateFinancialHistoryEntry = {
    _count: FinancialHistoryEntryCountAggregateOutputType | null
    _avg: FinancialHistoryEntryAvgAggregateOutputType | null
    _sum: FinancialHistoryEntrySumAggregateOutputType | null
    _min: FinancialHistoryEntryMinAggregateOutputType | null
    _max: FinancialHistoryEntryMaxAggregateOutputType | null
  }

  export type FinancialHistoryEntryAvgAggregateOutputType = {
    id: number | null
    oldValue: number | null
    newValue: number | null
    userId: number | null
  }

  export type FinancialHistoryEntrySumAggregateOutputType = {
    id: number | null
    oldValue: number | null
    newValue: number | null
    userId: number | null
  }

  export type FinancialHistoryEntryMinAggregateOutputType = {
    id: number | null
    projectId: string | null
    field: string | null
    oldValue: number | null
    newValue: number | null
    reason: string | null
    changedAt: Date | null
    userId: number | null
  }

  export type FinancialHistoryEntryMaxAggregateOutputType = {
    id: number | null
    projectId: string | null
    field: string | null
    oldValue: number | null
    newValue: number | null
    reason: string | null
    changedAt: Date | null
    userId: number | null
  }

  export type FinancialHistoryEntryCountAggregateOutputType = {
    id: number
    projectId: number
    field: number
    oldValue: number
    newValue: number
    reason: number
    changedAt: number
    userId: number
    _all: number
  }


  export type FinancialHistoryEntryAvgAggregateInputType = {
    id?: true
    oldValue?: true
    newValue?: true
    userId?: true
  }

  export type FinancialHistoryEntrySumAggregateInputType = {
    id?: true
    oldValue?: true
    newValue?: true
    userId?: true
  }

  export type FinancialHistoryEntryMinAggregateInputType = {
    id?: true
    projectId?: true
    field?: true
    oldValue?: true
    newValue?: true
    reason?: true
    changedAt?: true
    userId?: true
  }

  export type FinancialHistoryEntryMaxAggregateInputType = {
    id?: true
    projectId?: true
    field?: true
    oldValue?: true
    newValue?: true
    reason?: true
    changedAt?: true
    userId?: true
  }

  export type FinancialHistoryEntryCountAggregateInputType = {
    id?: true
    projectId?: true
    field?: true
    oldValue?: true
    newValue?: true
    reason?: true
    changedAt?: true
    userId?: true
    _all?: true
  }

  export type FinancialHistoryEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialHistoryEntry to aggregate.
     */
    where?: FinancialHistoryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialHistoryEntries to fetch.
     */
    orderBy?: FinancialHistoryEntryOrderByWithRelationInput | FinancialHistoryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FinancialHistoryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialHistoryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialHistoryEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FinancialHistoryEntries
    **/
    _count?: true | FinancialHistoryEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FinancialHistoryEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FinancialHistoryEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FinancialHistoryEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FinancialHistoryEntryMaxAggregateInputType
  }

  export type GetFinancialHistoryEntryAggregateType<T extends FinancialHistoryEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateFinancialHistoryEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFinancialHistoryEntry[P]>
      : GetScalarType<T[P], AggregateFinancialHistoryEntry[P]>
  }




  export type FinancialHistoryEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinancialHistoryEntryWhereInput
    orderBy?: FinancialHistoryEntryOrderByWithAggregationInput | FinancialHistoryEntryOrderByWithAggregationInput[]
    by: FinancialHistoryEntryScalarFieldEnum[] | FinancialHistoryEntryScalarFieldEnum
    having?: FinancialHistoryEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FinancialHistoryEntryCountAggregateInputType | true
    _avg?: FinancialHistoryEntryAvgAggregateInputType
    _sum?: FinancialHistoryEntrySumAggregateInputType
    _min?: FinancialHistoryEntryMinAggregateInputType
    _max?: FinancialHistoryEntryMaxAggregateInputType
  }

  export type FinancialHistoryEntryGroupByOutputType = {
    id: number
    projectId: string
    field: string
    oldValue: number
    newValue: number
    reason: string | null
    changedAt: Date
    userId: number | null
    _count: FinancialHistoryEntryCountAggregateOutputType | null
    _avg: FinancialHistoryEntryAvgAggregateOutputType | null
    _sum: FinancialHistoryEntrySumAggregateOutputType | null
    _min: FinancialHistoryEntryMinAggregateOutputType | null
    _max: FinancialHistoryEntryMaxAggregateOutputType | null
  }

  type GetFinancialHistoryEntryGroupByPayload<T extends FinancialHistoryEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FinancialHistoryEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FinancialHistoryEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FinancialHistoryEntryGroupByOutputType[P]>
            : GetScalarType<T[P], FinancialHistoryEntryGroupByOutputType[P]>
        }
      >
    >


  export type FinancialHistoryEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    field?: boolean
    oldValue?: boolean
    newValue?: boolean
    reason?: boolean
    changedAt?: boolean
    userId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    changedBy?: boolean | FinancialHistoryEntry$changedByArgs<ExtArgs>
  }, ExtArgs["result"]["financialHistoryEntry"]>

  export type FinancialHistoryEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    field?: boolean
    oldValue?: boolean
    newValue?: boolean
    reason?: boolean
    changedAt?: boolean
    userId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    changedBy?: boolean | FinancialHistoryEntry$changedByArgs<ExtArgs>
  }, ExtArgs["result"]["financialHistoryEntry"]>

  export type FinancialHistoryEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    field?: boolean
    oldValue?: boolean
    newValue?: boolean
    reason?: boolean
    changedAt?: boolean
    userId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    changedBy?: boolean | FinancialHistoryEntry$changedByArgs<ExtArgs>
  }, ExtArgs["result"]["financialHistoryEntry"]>

  export type FinancialHistoryEntrySelectScalar = {
    id?: boolean
    projectId?: boolean
    field?: boolean
    oldValue?: boolean
    newValue?: boolean
    reason?: boolean
    changedAt?: boolean
    userId?: boolean
  }

  export type FinancialHistoryEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "field" | "oldValue" | "newValue" | "reason" | "changedAt" | "userId", ExtArgs["result"]["financialHistoryEntry"]>
  export type FinancialHistoryEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    changedBy?: boolean | FinancialHistoryEntry$changedByArgs<ExtArgs>
  }
  export type FinancialHistoryEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    changedBy?: boolean | FinancialHistoryEntry$changedByArgs<ExtArgs>
  }
  export type FinancialHistoryEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    changedBy?: boolean | FinancialHistoryEntry$changedByArgs<ExtArgs>
  }

  export type $FinancialHistoryEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FinancialHistoryEntry"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      changedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      projectId: string
      field: string
      oldValue: number
      newValue: number
      reason: string | null
      changedAt: Date
      userId: number | null
    }, ExtArgs["result"]["financialHistoryEntry"]>
    composites: {}
  }

  type FinancialHistoryEntryGetPayload<S extends boolean | null | undefined | FinancialHistoryEntryDefaultArgs> = $Result.GetResult<Prisma.$FinancialHistoryEntryPayload, S>

  type FinancialHistoryEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FinancialHistoryEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FinancialHistoryEntryCountAggregateInputType | true
    }

  export interface FinancialHistoryEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FinancialHistoryEntry'], meta: { name: 'FinancialHistoryEntry' } }
    /**
     * Find zero or one FinancialHistoryEntry that matches the filter.
     * @param {FinancialHistoryEntryFindUniqueArgs} args - Arguments to find a FinancialHistoryEntry
     * @example
     * // Get one FinancialHistoryEntry
     * const financialHistoryEntry = await prisma.financialHistoryEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FinancialHistoryEntryFindUniqueArgs>(args: SelectSubset<T, FinancialHistoryEntryFindUniqueArgs<ExtArgs>>): Prisma__FinancialHistoryEntryClient<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FinancialHistoryEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FinancialHistoryEntryFindUniqueOrThrowArgs} args - Arguments to find a FinancialHistoryEntry
     * @example
     * // Get one FinancialHistoryEntry
     * const financialHistoryEntry = await prisma.financialHistoryEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FinancialHistoryEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, FinancialHistoryEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FinancialHistoryEntryClient<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinancialHistoryEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialHistoryEntryFindFirstArgs} args - Arguments to find a FinancialHistoryEntry
     * @example
     * // Get one FinancialHistoryEntry
     * const financialHistoryEntry = await prisma.financialHistoryEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FinancialHistoryEntryFindFirstArgs>(args?: SelectSubset<T, FinancialHistoryEntryFindFirstArgs<ExtArgs>>): Prisma__FinancialHistoryEntryClient<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinancialHistoryEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialHistoryEntryFindFirstOrThrowArgs} args - Arguments to find a FinancialHistoryEntry
     * @example
     * // Get one FinancialHistoryEntry
     * const financialHistoryEntry = await prisma.financialHistoryEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FinancialHistoryEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, FinancialHistoryEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__FinancialHistoryEntryClient<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FinancialHistoryEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialHistoryEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FinancialHistoryEntries
     * const financialHistoryEntries = await prisma.financialHistoryEntry.findMany()
     * 
     * // Get first 10 FinancialHistoryEntries
     * const financialHistoryEntries = await prisma.financialHistoryEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const financialHistoryEntryWithIdOnly = await prisma.financialHistoryEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FinancialHistoryEntryFindManyArgs>(args?: SelectSubset<T, FinancialHistoryEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FinancialHistoryEntry.
     * @param {FinancialHistoryEntryCreateArgs} args - Arguments to create a FinancialHistoryEntry.
     * @example
     * // Create one FinancialHistoryEntry
     * const FinancialHistoryEntry = await prisma.financialHistoryEntry.create({
     *   data: {
     *     // ... data to create a FinancialHistoryEntry
     *   }
     * })
     * 
     */
    create<T extends FinancialHistoryEntryCreateArgs>(args: SelectSubset<T, FinancialHistoryEntryCreateArgs<ExtArgs>>): Prisma__FinancialHistoryEntryClient<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FinancialHistoryEntries.
     * @param {FinancialHistoryEntryCreateManyArgs} args - Arguments to create many FinancialHistoryEntries.
     * @example
     * // Create many FinancialHistoryEntries
     * const financialHistoryEntry = await prisma.financialHistoryEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FinancialHistoryEntryCreateManyArgs>(args?: SelectSubset<T, FinancialHistoryEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FinancialHistoryEntries and returns the data saved in the database.
     * @param {FinancialHistoryEntryCreateManyAndReturnArgs} args - Arguments to create many FinancialHistoryEntries.
     * @example
     * // Create many FinancialHistoryEntries
     * const financialHistoryEntry = await prisma.financialHistoryEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FinancialHistoryEntries and only return the `id`
     * const financialHistoryEntryWithIdOnly = await prisma.financialHistoryEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FinancialHistoryEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, FinancialHistoryEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FinancialHistoryEntry.
     * @param {FinancialHistoryEntryDeleteArgs} args - Arguments to delete one FinancialHistoryEntry.
     * @example
     * // Delete one FinancialHistoryEntry
     * const FinancialHistoryEntry = await prisma.financialHistoryEntry.delete({
     *   where: {
     *     // ... filter to delete one FinancialHistoryEntry
     *   }
     * })
     * 
     */
    delete<T extends FinancialHistoryEntryDeleteArgs>(args: SelectSubset<T, FinancialHistoryEntryDeleteArgs<ExtArgs>>): Prisma__FinancialHistoryEntryClient<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FinancialHistoryEntry.
     * @param {FinancialHistoryEntryUpdateArgs} args - Arguments to update one FinancialHistoryEntry.
     * @example
     * // Update one FinancialHistoryEntry
     * const financialHistoryEntry = await prisma.financialHistoryEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FinancialHistoryEntryUpdateArgs>(args: SelectSubset<T, FinancialHistoryEntryUpdateArgs<ExtArgs>>): Prisma__FinancialHistoryEntryClient<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FinancialHistoryEntries.
     * @param {FinancialHistoryEntryDeleteManyArgs} args - Arguments to filter FinancialHistoryEntries to delete.
     * @example
     * // Delete a few FinancialHistoryEntries
     * const { count } = await prisma.financialHistoryEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FinancialHistoryEntryDeleteManyArgs>(args?: SelectSubset<T, FinancialHistoryEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinancialHistoryEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialHistoryEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FinancialHistoryEntries
     * const financialHistoryEntry = await prisma.financialHistoryEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FinancialHistoryEntryUpdateManyArgs>(args: SelectSubset<T, FinancialHistoryEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinancialHistoryEntries and returns the data updated in the database.
     * @param {FinancialHistoryEntryUpdateManyAndReturnArgs} args - Arguments to update many FinancialHistoryEntries.
     * @example
     * // Update many FinancialHistoryEntries
     * const financialHistoryEntry = await prisma.financialHistoryEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FinancialHistoryEntries and only return the `id`
     * const financialHistoryEntryWithIdOnly = await prisma.financialHistoryEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FinancialHistoryEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, FinancialHistoryEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FinancialHistoryEntry.
     * @param {FinancialHistoryEntryUpsertArgs} args - Arguments to update or create a FinancialHistoryEntry.
     * @example
     * // Update or create a FinancialHistoryEntry
     * const financialHistoryEntry = await prisma.financialHistoryEntry.upsert({
     *   create: {
     *     // ... data to create a FinancialHistoryEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FinancialHistoryEntry we want to update
     *   }
     * })
     */
    upsert<T extends FinancialHistoryEntryUpsertArgs>(args: SelectSubset<T, FinancialHistoryEntryUpsertArgs<ExtArgs>>): Prisma__FinancialHistoryEntryClient<$Result.GetResult<Prisma.$FinancialHistoryEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FinancialHistoryEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialHistoryEntryCountArgs} args - Arguments to filter FinancialHistoryEntries to count.
     * @example
     * // Count the number of FinancialHistoryEntries
     * const count = await prisma.financialHistoryEntry.count({
     *   where: {
     *     // ... the filter for the FinancialHistoryEntries we want to count
     *   }
     * })
    **/
    count<T extends FinancialHistoryEntryCountArgs>(
      args?: Subset<T, FinancialHistoryEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FinancialHistoryEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FinancialHistoryEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialHistoryEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FinancialHistoryEntryAggregateArgs>(args: Subset<T, FinancialHistoryEntryAggregateArgs>): Prisma.PrismaPromise<GetFinancialHistoryEntryAggregateType<T>>

    /**
     * Group by FinancialHistoryEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialHistoryEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FinancialHistoryEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FinancialHistoryEntryGroupByArgs['orderBy'] }
        : { orderBy?: FinancialHistoryEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FinancialHistoryEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinancialHistoryEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FinancialHistoryEntry model
   */
  readonly fields: FinancialHistoryEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FinancialHistoryEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FinancialHistoryEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    changedBy<T extends FinancialHistoryEntry$changedByArgs<ExtArgs> = {}>(args?: Subset<T, FinancialHistoryEntry$changedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FinancialHistoryEntry model
   */
  interface FinancialHistoryEntryFieldRefs {
    readonly id: FieldRef<"FinancialHistoryEntry", 'Int'>
    readonly projectId: FieldRef<"FinancialHistoryEntry", 'String'>
    readonly field: FieldRef<"FinancialHistoryEntry", 'String'>
    readonly oldValue: FieldRef<"FinancialHistoryEntry", 'Float'>
    readonly newValue: FieldRef<"FinancialHistoryEntry", 'Float'>
    readonly reason: FieldRef<"FinancialHistoryEntry", 'String'>
    readonly changedAt: FieldRef<"FinancialHistoryEntry", 'DateTime'>
    readonly userId: FieldRef<"FinancialHistoryEntry", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * FinancialHistoryEntry findUnique
   */
  export type FinancialHistoryEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
    /**
     * Filter, which FinancialHistoryEntry to fetch.
     */
    where: FinancialHistoryEntryWhereUniqueInput
  }

  /**
   * FinancialHistoryEntry findUniqueOrThrow
   */
  export type FinancialHistoryEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
    /**
     * Filter, which FinancialHistoryEntry to fetch.
     */
    where: FinancialHistoryEntryWhereUniqueInput
  }

  /**
   * FinancialHistoryEntry findFirst
   */
  export type FinancialHistoryEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
    /**
     * Filter, which FinancialHistoryEntry to fetch.
     */
    where?: FinancialHistoryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialHistoryEntries to fetch.
     */
    orderBy?: FinancialHistoryEntryOrderByWithRelationInput | FinancialHistoryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinancialHistoryEntries.
     */
    cursor?: FinancialHistoryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialHistoryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialHistoryEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialHistoryEntries.
     */
    distinct?: FinancialHistoryEntryScalarFieldEnum | FinancialHistoryEntryScalarFieldEnum[]
  }

  /**
   * FinancialHistoryEntry findFirstOrThrow
   */
  export type FinancialHistoryEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
    /**
     * Filter, which FinancialHistoryEntry to fetch.
     */
    where?: FinancialHistoryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialHistoryEntries to fetch.
     */
    orderBy?: FinancialHistoryEntryOrderByWithRelationInput | FinancialHistoryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinancialHistoryEntries.
     */
    cursor?: FinancialHistoryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialHistoryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialHistoryEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialHistoryEntries.
     */
    distinct?: FinancialHistoryEntryScalarFieldEnum | FinancialHistoryEntryScalarFieldEnum[]
  }

  /**
   * FinancialHistoryEntry findMany
   */
  export type FinancialHistoryEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
    /**
     * Filter, which FinancialHistoryEntries to fetch.
     */
    where?: FinancialHistoryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialHistoryEntries to fetch.
     */
    orderBy?: FinancialHistoryEntryOrderByWithRelationInput | FinancialHistoryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FinancialHistoryEntries.
     */
    cursor?: FinancialHistoryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialHistoryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialHistoryEntries.
     */
    skip?: number
    distinct?: FinancialHistoryEntryScalarFieldEnum | FinancialHistoryEntryScalarFieldEnum[]
  }

  /**
   * FinancialHistoryEntry create
   */
  export type FinancialHistoryEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a FinancialHistoryEntry.
     */
    data: XOR<FinancialHistoryEntryCreateInput, FinancialHistoryEntryUncheckedCreateInput>
  }

  /**
   * FinancialHistoryEntry createMany
   */
  export type FinancialHistoryEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FinancialHistoryEntries.
     */
    data: FinancialHistoryEntryCreateManyInput | FinancialHistoryEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FinancialHistoryEntry createManyAndReturn
   */
  export type FinancialHistoryEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * The data used to create many FinancialHistoryEntries.
     */
    data: FinancialHistoryEntryCreateManyInput | FinancialHistoryEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinancialHistoryEntry update
   */
  export type FinancialHistoryEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a FinancialHistoryEntry.
     */
    data: XOR<FinancialHistoryEntryUpdateInput, FinancialHistoryEntryUncheckedUpdateInput>
    /**
     * Choose, which FinancialHistoryEntry to update.
     */
    where: FinancialHistoryEntryWhereUniqueInput
  }

  /**
   * FinancialHistoryEntry updateMany
   */
  export type FinancialHistoryEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FinancialHistoryEntries.
     */
    data: XOR<FinancialHistoryEntryUpdateManyMutationInput, FinancialHistoryEntryUncheckedUpdateManyInput>
    /**
     * Filter which FinancialHistoryEntries to update
     */
    where?: FinancialHistoryEntryWhereInput
    /**
     * Limit how many FinancialHistoryEntries to update.
     */
    limit?: number
  }

  /**
   * FinancialHistoryEntry updateManyAndReturn
   */
  export type FinancialHistoryEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * The data used to update FinancialHistoryEntries.
     */
    data: XOR<FinancialHistoryEntryUpdateManyMutationInput, FinancialHistoryEntryUncheckedUpdateManyInput>
    /**
     * Filter which FinancialHistoryEntries to update
     */
    where?: FinancialHistoryEntryWhereInput
    /**
     * Limit how many FinancialHistoryEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinancialHistoryEntry upsert
   */
  export type FinancialHistoryEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the FinancialHistoryEntry to update in case it exists.
     */
    where: FinancialHistoryEntryWhereUniqueInput
    /**
     * In case the FinancialHistoryEntry found by the `where` argument doesn't exist, create a new FinancialHistoryEntry with this data.
     */
    create: XOR<FinancialHistoryEntryCreateInput, FinancialHistoryEntryUncheckedCreateInput>
    /**
     * In case the FinancialHistoryEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FinancialHistoryEntryUpdateInput, FinancialHistoryEntryUncheckedUpdateInput>
  }

  /**
   * FinancialHistoryEntry delete
   */
  export type FinancialHistoryEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
    /**
     * Filter which FinancialHistoryEntry to delete.
     */
    where: FinancialHistoryEntryWhereUniqueInput
  }

  /**
   * FinancialHistoryEntry deleteMany
   */
  export type FinancialHistoryEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialHistoryEntries to delete
     */
    where?: FinancialHistoryEntryWhereInput
    /**
     * Limit how many FinancialHistoryEntries to delete.
     */
    limit?: number
  }

  /**
   * FinancialHistoryEntry.changedBy
   */
  export type FinancialHistoryEntry$changedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * FinancialHistoryEntry without action
   */
  export type FinancialHistoryEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialHistoryEntry
     */
    select?: FinancialHistoryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialHistoryEntry
     */
    omit?: FinancialHistoryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialHistoryEntryInclude<ExtArgs> | null
  }


  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    id: number | null
    amount: Decimal | null
  }

  export type InvoiceSumAggregateOutputType = {
    id: number | null
    amount: Decimal | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: number | null
    projectId: string | null
    invoiceNumber: string | null
    dateIssued: Date | null
    amount: Decimal | null
    status: $Enums.InvoiceStatus | null
    vendor: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: number | null
    projectId: string | null
    invoiceNumber: string | null
    dateIssued: Date | null
    amount: Decimal | null
    status: $Enums.InvoiceStatus | null
    vendor: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    projectId: number
    invoiceNumber: number
    dateIssued: number
    amount: number
    status: number
    vendor: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    id?: true
    amount?: true
  }

  export type InvoiceSumAggregateInputType = {
    id?: true
    amount?: true
  }

  export type InvoiceMinAggregateInputType = {
    id?: true
    projectId?: true
    invoiceNumber?: true
    dateIssued?: true
    amount?: true
    status?: true
    vendor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    projectId?: true
    invoiceNumber?: true
    dateIssued?: true
    amount?: true
    status?: true
    vendor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    projectId?: true
    invoiceNumber?: true
    dateIssued?: true
    amount?: true
    status?: true
    vendor?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: number
    projectId: string
    invoiceNumber: string
    dateIssued: Date
    amount: Decimal
    status: $Enums.InvoiceStatus
    vendor: string
    createdAt: Date
    updatedAt: Date
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    invoiceNumber?: boolean
    dateIssued?: boolean
    amount?: boolean
    status?: boolean
    vendor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    invoiceNumber?: boolean
    dateIssued?: boolean
    amount?: boolean
    status?: boolean
    vendor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    invoiceNumber?: boolean
    dateIssued?: boolean
    amount?: boolean
    status?: boolean
    vendor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    projectId?: boolean
    invoiceNumber?: boolean
    dateIssued?: boolean
    amount?: boolean
    status?: boolean
    vendor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "invoiceNumber" | "dateIssued" | "amount" | "status" | "vendor" | "createdAt" | "updatedAt", ExtArgs["result"]["invoice"]>
  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      Project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      projectId: string
      invoiceNumber: string
      dateIssued: Date
      amount: Prisma.Decimal
      status: $Enums.InvoiceStatus
      vendor: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices and returns the data updated in the database.
     * @param {InvoiceUpdateManyAndReturnArgs} args - Arguments to update many Invoices.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoiceUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invoice model
   */
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'Int'>
    readonly projectId: FieldRef<"Invoice", 'String'>
    readonly invoiceNumber: FieldRef<"Invoice", 'String'>
    readonly dateIssued: FieldRef<"Invoice", 'DateTime'>
    readonly amount: FieldRef<"Invoice", 'Decimal'>
    readonly status: FieldRef<"Invoice", 'InvoiceStatus'>
    readonly vendor: FieldRef<"Invoice", 'String'>
    readonly createdAt: FieldRef<"Invoice", 'DateTime'>
    readonly updatedAt: FieldRef<"Invoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
  }

  /**
   * Invoice updateManyAndReturn
   */
  export type InvoiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to delete.
     */
    limit?: number
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
  }


  /**
   * Model TabAccessRequest
   */

  export type AggregateTabAccessRequest = {
    _count: TabAccessRequestCountAggregateOutputType | null
    _avg: TabAccessRequestAvgAggregateOutputType | null
    _sum: TabAccessRequestSumAggregateOutputType | null
    _min: TabAccessRequestMinAggregateOutputType | null
    _max: TabAccessRequestMaxAggregateOutputType | null
  }

  export type TabAccessRequestAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    approvedBy: number | null
  }

  export type TabAccessRequestSumAggregateOutputType = {
    id: number | null
    userId: number | null
    approvedBy: number | null
  }

  export type TabAccessRequestMinAggregateOutputType = {
    id: number | null
    userId: number | null
    approvedBy: number | null
    status: string | null
    requestedAt: Date | null
    approvedAt: Date | null
  }

  export type TabAccessRequestMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    approvedBy: number | null
    status: string | null
    requestedAt: Date | null
    approvedAt: Date | null
  }

  export type TabAccessRequestCountAggregateOutputType = {
    id: number
    userId: number
    approvedBy: number
    status: number
    requestedAt: number
    approvedAt: number
    _all: number
  }


  export type TabAccessRequestAvgAggregateInputType = {
    id?: true
    userId?: true
    approvedBy?: true
  }

  export type TabAccessRequestSumAggregateInputType = {
    id?: true
    userId?: true
    approvedBy?: true
  }

  export type TabAccessRequestMinAggregateInputType = {
    id?: true
    userId?: true
    approvedBy?: true
    status?: true
    requestedAt?: true
    approvedAt?: true
  }

  export type TabAccessRequestMaxAggregateInputType = {
    id?: true
    userId?: true
    approvedBy?: true
    status?: true
    requestedAt?: true
    approvedAt?: true
  }

  export type TabAccessRequestCountAggregateInputType = {
    id?: true
    userId?: true
    approvedBy?: true
    status?: true
    requestedAt?: true
    approvedAt?: true
    _all?: true
  }

  export type TabAccessRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TabAccessRequest to aggregate.
     */
    where?: TabAccessRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TabAccessRequests to fetch.
     */
    orderBy?: TabAccessRequestOrderByWithRelationInput | TabAccessRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TabAccessRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TabAccessRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TabAccessRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TabAccessRequests
    **/
    _count?: true | TabAccessRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TabAccessRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TabAccessRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TabAccessRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TabAccessRequestMaxAggregateInputType
  }

  export type GetTabAccessRequestAggregateType<T extends TabAccessRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateTabAccessRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTabAccessRequest[P]>
      : GetScalarType<T[P], AggregateTabAccessRequest[P]>
  }




  export type TabAccessRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TabAccessRequestWhereInput
    orderBy?: TabAccessRequestOrderByWithAggregationInput | TabAccessRequestOrderByWithAggregationInput[]
    by: TabAccessRequestScalarFieldEnum[] | TabAccessRequestScalarFieldEnum
    having?: TabAccessRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TabAccessRequestCountAggregateInputType | true
    _avg?: TabAccessRequestAvgAggregateInputType
    _sum?: TabAccessRequestSumAggregateInputType
    _min?: TabAccessRequestMinAggregateInputType
    _max?: TabAccessRequestMaxAggregateInputType
  }

  export type TabAccessRequestGroupByOutputType = {
    id: number
    userId: number
    approvedBy: number | null
    status: string
    requestedAt: Date
    approvedAt: Date | null
    _count: TabAccessRequestCountAggregateOutputType | null
    _avg: TabAccessRequestAvgAggregateOutputType | null
    _sum: TabAccessRequestSumAggregateOutputType | null
    _min: TabAccessRequestMinAggregateOutputType | null
    _max: TabAccessRequestMaxAggregateOutputType | null
  }

  type GetTabAccessRequestGroupByPayload<T extends TabAccessRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TabAccessRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TabAccessRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TabAccessRequestGroupByOutputType[P]>
            : GetScalarType<T[P], TabAccessRequestGroupByOutputType[P]>
        }
      >
    >


  export type TabAccessRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    approvedBy?: boolean
    status?: boolean
    requestedAt?: boolean
    approvedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | TabAccessRequest$approverArgs<ExtArgs>
  }, ExtArgs["result"]["tabAccessRequest"]>

  export type TabAccessRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    approvedBy?: boolean
    status?: boolean
    requestedAt?: boolean
    approvedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | TabAccessRequest$approverArgs<ExtArgs>
  }, ExtArgs["result"]["tabAccessRequest"]>

  export type TabAccessRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    approvedBy?: boolean
    status?: boolean
    requestedAt?: boolean
    approvedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | TabAccessRequest$approverArgs<ExtArgs>
  }, ExtArgs["result"]["tabAccessRequest"]>

  export type TabAccessRequestSelectScalar = {
    id?: boolean
    userId?: boolean
    approvedBy?: boolean
    status?: boolean
    requestedAt?: boolean
    approvedAt?: boolean
  }

  export type TabAccessRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "approvedBy" | "status" | "requestedAt" | "approvedAt", ExtArgs["result"]["tabAccessRequest"]>
  export type TabAccessRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | TabAccessRequest$approverArgs<ExtArgs>
  }
  export type TabAccessRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | TabAccessRequest$approverArgs<ExtArgs>
  }
  export type TabAccessRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | TabAccessRequest$approverArgs<ExtArgs>
  }

  export type $TabAccessRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TabAccessRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      approver: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      approvedBy: number | null
      status: string
      requestedAt: Date
      approvedAt: Date | null
    }, ExtArgs["result"]["tabAccessRequest"]>
    composites: {}
  }

  type TabAccessRequestGetPayload<S extends boolean | null | undefined | TabAccessRequestDefaultArgs> = $Result.GetResult<Prisma.$TabAccessRequestPayload, S>

  type TabAccessRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TabAccessRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TabAccessRequestCountAggregateInputType | true
    }

  export interface TabAccessRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TabAccessRequest'], meta: { name: 'TabAccessRequest' } }
    /**
     * Find zero or one TabAccessRequest that matches the filter.
     * @param {TabAccessRequestFindUniqueArgs} args - Arguments to find a TabAccessRequest
     * @example
     * // Get one TabAccessRequest
     * const tabAccessRequest = await prisma.tabAccessRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TabAccessRequestFindUniqueArgs>(args: SelectSubset<T, TabAccessRequestFindUniqueArgs<ExtArgs>>): Prisma__TabAccessRequestClient<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TabAccessRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TabAccessRequestFindUniqueOrThrowArgs} args - Arguments to find a TabAccessRequest
     * @example
     * // Get one TabAccessRequest
     * const tabAccessRequest = await prisma.tabAccessRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TabAccessRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, TabAccessRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TabAccessRequestClient<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TabAccessRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TabAccessRequestFindFirstArgs} args - Arguments to find a TabAccessRequest
     * @example
     * // Get one TabAccessRequest
     * const tabAccessRequest = await prisma.tabAccessRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TabAccessRequestFindFirstArgs>(args?: SelectSubset<T, TabAccessRequestFindFirstArgs<ExtArgs>>): Prisma__TabAccessRequestClient<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TabAccessRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TabAccessRequestFindFirstOrThrowArgs} args - Arguments to find a TabAccessRequest
     * @example
     * // Get one TabAccessRequest
     * const tabAccessRequest = await prisma.tabAccessRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TabAccessRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, TabAccessRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TabAccessRequestClient<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TabAccessRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TabAccessRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TabAccessRequests
     * const tabAccessRequests = await prisma.tabAccessRequest.findMany()
     * 
     * // Get first 10 TabAccessRequests
     * const tabAccessRequests = await prisma.tabAccessRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tabAccessRequestWithIdOnly = await prisma.tabAccessRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TabAccessRequestFindManyArgs>(args?: SelectSubset<T, TabAccessRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TabAccessRequest.
     * @param {TabAccessRequestCreateArgs} args - Arguments to create a TabAccessRequest.
     * @example
     * // Create one TabAccessRequest
     * const TabAccessRequest = await prisma.tabAccessRequest.create({
     *   data: {
     *     // ... data to create a TabAccessRequest
     *   }
     * })
     * 
     */
    create<T extends TabAccessRequestCreateArgs>(args: SelectSubset<T, TabAccessRequestCreateArgs<ExtArgs>>): Prisma__TabAccessRequestClient<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TabAccessRequests.
     * @param {TabAccessRequestCreateManyArgs} args - Arguments to create many TabAccessRequests.
     * @example
     * // Create many TabAccessRequests
     * const tabAccessRequest = await prisma.tabAccessRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TabAccessRequestCreateManyArgs>(args?: SelectSubset<T, TabAccessRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TabAccessRequests and returns the data saved in the database.
     * @param {TabAccessRequestCreateManyAndReturnArgs} args - Arguments to create many TabAccessRequests.
     * @example
     * // Create many TabAccessRequests
     * const tabAccessRequest = await prisma.tabAccessRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TabAccessRequests and only return the `id`
     * const tabAccessRequestWithIdOnly = await prisma.tabAccessRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TabAccessRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, TabAccessRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TabAccessRequest.
     * @param {TabAccessRequestDeleteArgs} args - Arguments to delete one TabAccessRequest.
     * @example
     * // Delete one TabAccessRequest
     * const TabAccessRequest = await prisma.tabAccessRequest.delete({
     *   where: {
     *     // ... filter to delete one TabAccessRequest
     *   }
     * })
     * 
     */
    delete<T extends TabAccessRequestDeleteArgs>(args: SelectSubset<T, TabAccessRequestDeleteArgs<ExtArgs>>): Prisma__TabAccessRequestClient<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TabAccessRequest.
     * @param {TabAccessRequestUpdateArgs} args - Arguments to update one TabAccessRequest.
     * @example
     * // Update one TabAccessRequest
     * const tabAccessRequest = await prisma.tabAccessRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TabAccessRequestUpdateArgs>(args: SelectSubset<T, TabAccessRequestUpdateArgs<ExtArgs>>): Prisma__TabAccessRequestClient<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TabAccessRequests.
     * @param {TabAccessRequestDeleteManyArgs} args - Arguments to filter TabAccessRequests to delete.
     * @example
     * // Delete a few TabAccessRequests
     * const { count } = await prisma.tabAccessRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TabAccessRequestDeleteManyArgs>(args?: SelectSubset<T, TabAccessRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TabAccessRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TabAccessRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TabAccessRequests
     * const tabAccessRequest = await prisma.tabAccessRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TabAccessRequestUpdateManyArgs>(args: SelectSubset<T, TabAccessRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TabAccessRequests and returns the data updated in the database.
     * @param {TabAccessRequestUpdateManyAndReturnArgs} args - Arguments to update many TabAccessRequests.
     * @example
     * // Update many TabAccessRequests
     * const tabAccessRequest = await prisma.tabAccessRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TabAccessRequests and only return the `id`
     * const tabAccessRequestWithIdOnly = await prisma.tabAccessRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TabAccessRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, TabAccessRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TabAccessRequest.
     * @param {TabAccessRequestUpsertArgs} args - Arguments to update or create a TabAccessRequest.
     * @example
     * // Update or create a TabAccessRequest
     * const tabAccessRequest = await prisma.tabAccessRequest.upsert({
     *   create: {
     *     // ... data to create a TabAccessRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TabAccessRequest we want to update
     *   }
     * })
     */
    upsert<T extends TabAccessRequestUpsertArgs>(args: SelectSubset<T, TabAccessRequestUpsertArgs<ExtArgs>>): Prisma__TabAccessRequestClient<$Result.GetResult<Prisma.$TabAccessRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TabAccessRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TabAccessRequestCountArgs} args - Arguments to filter TabAccessRequests to count.
     * @example
     * // Count the number of TabAccessRequests
     * const count = await prisma.tabAccessRequest.count({
     *   where: {
     *     // ... the filter for the TabAccessRequests we want to count
     *   }
     * })
    **/
    count<T extends TabAccessRequestCountArgs>(
      args?: Subset<T, TabAccessRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TabAccessRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TabAccessRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TabAccessRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TabAccessRequestAggregateArgs>(args: Subset<T, TabAccessRequestAggregateArgs>): Prisma.PrismaPromise<GetTabAccessRequestAggregateType<T>>

    /**
     * Group by TabAccessRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TabAccessRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TabAccessRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TabAccessRequestGroupByArgs['orderBy'] }
        : { orderBy?: TabAccessRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TabAccessRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTabAccessRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TabAccessRequest model
   */
  readonly fields: TabAccessRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TabAccessRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TabAccessRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approver<T extends TabAccessRequest$approverArgs<ExtArgs> = {}>(args?: Subset<T, TabAccessRequest$approverArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TabAccessRequest model
   */
  interface TabAccessRequestFieldRefs {
    readonly id: FieldRef<"TabAccessRequest", 'Int'>
    readonly userId: FieldRef<"TabAccessRequest", 'Int'>
    readonly approvedBy: FieldRef<"TabAccessRequest", 'Int'>
    readonly status: FieldRef<"TabAccessRequest", 'String'>
    readonly requestedAt: FieldRef<"TabAccessRequest", 'DateTime'>
    readonly approvedAt: FieldRef<"TabAccessRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TabAccessRequest findUnique
   */
  export type TabAccessRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
    /**
     * Filter, which TabAccessRequest to fetch.
     */
    where: TabAccessRequestWhereUniqueInput
  }

  /**
   * TabAccessRequest findUniqueOrThrow
   */
  export type TabAccessRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
    /**
     * Filter, which TabAccessRequest to fetch.
     */
    where: TabAccessRequestWhereUniqueInput
  }

  /**
   * TabAccessRequest findFirst
   */
  export type TabAccessRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
    /**
     * Filter, which TabAccessRequest to fetch.
     */
    where?: TabAccessRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TabAccessRequests to fetch.
     */
    orderBy?: TabAccessRequestOrderByWithRelationInput | TabAccessRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TabAccessRequests.
     */
    cursor?: TabAccessRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TabAccessRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TabAccessRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TabAccessRequests.
     */
    distinct?: TabAccessRequestScalarFieldEnum | TabAccessRequestScalarFieldEnum[]
  }

  /**
   * TabAccessRequest findFirstOrThrow
   */
  export type TabAccessRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
    /**
     * Filter, which TabAccessRequest to fetch.
     */
    where?: TabAccessRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TabAccessRequests to fetch.
     */
    orderBy?: TabAccessRequestOrderByWithRelationInput | TabAccessRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TabAccessRequests.
     */
    cursor?: TabAccessRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TabAccessRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TabAccessRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TabAccessRequests.
     */
    distinct?: TabAccessRequestScalarFieldEnum | TabAccessRequestScalarFieldEnum[]
  }

  /**
   * TabAccessRequest findMany
   */
  export type TabAccessRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
    /**
     * Filter, which TabAccessRequests to fetch.
     */
    where?: TabAccessRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TabAccessRequests to fetch.
     */
    orderBy?: TabAccessRequestOrderByWithRelationInput | TabAccessRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TabAccessRequests.
     */
    cursor?: TabAccessRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TabAccessRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TabAccessRequests.
     */
    skip?: number
    distinct?: TabAccessRequestScalarFieldEnum | TabAccessRequestScalarFieldEnum[]
  }

  /**
   * TabAccessRequest create
   */
  export type TabAccessRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a TabAccessRequest.
     */
    data: XOR<TabAccessRequestCreateInput, TabAccessRequestUncheckedCreateInput>
  }

  /**
   * TabAccessRequest createMany
   */
  export type TabAccessRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TabAccessRequests.
     */
    data: TabAccessRequestCreateManyInput | TabAccessRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TabAccessRequest createManyAndReturn
   */
  export type TabAccessRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * The data used to create many TabAccessRequests.
     */
    data: TabAccessRequestCreateManyInput | TabAccessRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TabAccessRequest update
   */
  export type TabAccessRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a TabAccessRequest.
     */
    data: XOR<TabAccessRequestUpdateInput, TabAccessRequestUncheckedUpdateInput>
    /**
     * Choose, which TabAccessRequest to update.
     */
    where: TabAccessRequestWhereUniqueInput
  }

  /**
   * TabAccessRequest updateMany
   */
  export type TabAccessRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TabAccessRequests.
     */
    data: XOR<TabAccessRequestUpdateManyMutationInput, TabAccessRequestUncheckedUpdateManyInput>
    /**
     * Filter which TabAccessRequests to update
     */
    where?: TabAccessRequestWhereInput
    /**
     * Limit how many TabAccessRequests to update.
     */
    limit?: number
  }

  /**
   * TabAccessRequest updateManyAndReturn
   */
  export type TabAccessRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * The data used to update TabAccessRequests.
     */
    data: XOR<TabAccessRequestUpdateManyMutationInput, TabAccessRequestUncheckedUpdateManyInput>
    /**
     * Filter which TabAccessRequests to update
     */
    where?: TabAccessRequestWhereInput
    /**
     * Limit how many TabAccessRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TabAccessRequest upsert
   */
  export type TabAccessRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the TabAccessRequest to update in case it exists.
     */
    where: TabAccessRequestWhereUniqueInput
    /**
     * In case the TabAccessRequest found by the `where` argument doesn't exist, create a new TabAccessRequest with this data.
     */
    create: XOR<TabAccessRequestCreateInput, TabAccessRequestUncheckedCreateInput>
    /**
     * In case the TabAccessRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TabAccessRequestUpdateInput, TabAccessRequestUncheckedUpdateInput>
  }

  /**
   * TabAccessRequest delete
   */
  export type TabAccessRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
    /**
     * Filter which TabAccessRequest to delete.
     */
    where: TabAccessRequestWhereUniqueInput
  }

  /**
   * TabAccessRequest deleteMany
   */
  export type TabAccessRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TabAccessRequests to delete
     */
    where?: TabAccessRequestWhereInput
    /**
     * Limit how many TabAccessRequests to delete.
     */
    limit?: number
  }

  /**
   * TabAccessRequest.approver
   */
  export type TabAccessRequest$approverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TabAccessRequest without action
   */
  export type TabAccessRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TabAccessRequest
     */
    select?: TabAccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TabAccessRequest
     */
    omit?: TabAccessRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TabAccessRequestInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    hashedPassword: 'hashedPassword'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    projectID: 'projectID',
    title: 'title',
    phase: 'phase',
    description: 'description',
    forecast: 'forecast',
    actuals: 'actuals',
    budget: 'budget',
    plannedStartDate: 'plannedStartDate',
    plannedEndDate: 'plannedEndDate',
    dateCreated: 'dateCreated',
    lastUpdated: 'lastUpdated',
    status: 'status',
    projectManagerId: 'projectManagerId'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    tableName: 'tableName',
    recordId: 'recordId',
    beforeData: 'beforeData',
    afterData: 'afterData',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const PMNoteScalarFieldEnum: {
    id: 'id',
    note: 'note',
    createdAt: 'createdAt',
    projectId: 'projectId',
    userId: 'userId'
  };

  export type PMNoteScalarFieldEnum = (typeof PMNoteScalarFieldEnum)[keyof typeof PMNoteScalarFieldEnum]


  export const FinancialHistoryEntryScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    field: 'field',
    oldValue: 'oldValue',
    newValue: 'newValue',
    reason: 'reason',
    changedAt: 'changedAt',
    userId: 'userId'
  };

  export type FinancialHistoryEntryScalarFieldEnum = (typeof FinancialHistoryEntryScalarFieldEnum)[keyof typeof FinancialHistoryEntryScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    invoiceNumber: 'invoiceNumber',
    dateIssued: 'dateIssued',
    amount: 'amount',
    status: 'status',
    vendor: 'vendor',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const TabAccessRequestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    approvedBy: 'approvedBy',
    status: 'status',
    requestedAt: 'requestedAt',
    approvedAt: 'approvedAt'
  };

  export type TabAccessRequestScalarFieldEnum = (typeof TabAccessRequestScalarFieldEnum)[keyof typeof TabAccessRequestScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'InvoiceStatus'
   */
  export type EnumInvoiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvoiceStatus'>
    


  /**
   * Reference to a field of type 'InvoiceStatus[]'
   */
  export type ListEnumInvoiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvoiceStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    hashedPassword?: StringFilter<"User"> | string
    financialChanges?: FinancialHistoryEntryListRelationFilter
    notes?: PMNoteListRelationFilter
    projects?: ProjectListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    tabRequests?: TabAccessRequestListRelationFilter
    approvedTabs?: TabAccessRequestListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    financialChanges?: FinancialHistoryEntryOrderByRelationAggregateInput
    notes?: PMNoteOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    tabRequests?: TabAccessRequestOrderByRelationAggregateInput
    approvedTabs?: TabAccessRequestOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    hashedPassword?: StringFilter<"User"> | string
    financialChanges?: FinancialHistoryEntryListRelationFilter
    notes?: PMNoteListRelationFilter
    projects?: ProjectListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    tabRequests?: TabAccessRequestListRelationFilter
    approvedTabs?: TabAccessRequestListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    hashedPassword?: StringWithAggregatesFilter<"User"> | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    projectID?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    phase?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    forecast?: FloatFilter<"Project"> | number
    actuals?: FloatFilter<"Project"> | number
    budget?: FloatFilter<"Project"> | number
    plannedStartDate?: DateTimeFilter<"Project"> | Date | string
    plannedEndDate?: DateTimeFilter<"Project"> | Date | string
    dateCreated?: DateTimeFilter<"Project"> | Date | string
    lastUpdated?: DateTimeNullableFilter<"Project"> | Date | string | null
    status?: StringNullableFilter<"Project"> | string | null
    projectManagerId?: IntNullableFilter<"Project"> | number | null
    financialHistory?: FinancialHistoryEntryListRelationFilter
    Invoice?: InvoiceListRelationFilter
    pmNotesHistory?: PMNoteListRelationFilter
    projectManager?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    projectID?: SortOrder
    title?: SortOrder
    phase?: SortOrder
    description?: SortOrder
    forecast?: SortOrder
    actuals?: SortOrder
    budget?: SortOrder
    plannedStartDate?: SortOrder
    plannedEndDate?: SortOrder
    dateCreated?: SortOrder
    lastUpdated?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    projectManagerId?: SortOrderInput | SortOrder
    financialHistory?: FinancialHistoryEntryOrderByRelationAggregateInput
    Invoice?: InvoiceOrderByRelationAggregateInput
    pmNotesHistory?: PMNoteOrderByRelationAggregateInput
    projectManager?: UserOrderByWithRelationInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectID?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    title?: StringFilter<"Project"> | string
    phase?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    forecast?: FloatFilter<"Project"> | number
    actuals?: FloatFilter<"Project"> | number
    budget?: FloatFilter<"Project"> | number
    plannedStartDate?: DateTimeFilter<"Project"> | Date | string
    plannedEndDate?: DateTimeFilter<"Project"> | Date | string
    dateCreated?: DateTimeFilter<"Project"> | Date | string
    lastUpdated?: DateTimeNullableFilter<"Project"> | Date | string | null
    status?: StringNullableFilter<"Project"> | string | null
    projectManagerId?: IntNullableFilter<"Project"> | number | null
    financialHistory?: FinancialHistoryEntryListRelationFilter
    Invoice?: InvoiceListRelationFilter
    pmNotesHistory?: PMNoteListRelationFilter
    projectManager?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "projectID">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    projectID?: SortOrder
    title?: SortOrder
    phase?: SortOrder
    description?: SortOrder
    forecast?: SortOrder
    actuals?: SortOrder
    budget?: SortOrder
    plannedStartDate?: SortOrder
    plannedEndDate?: SortOrder
    dateCreated?: SortOrder
    lastUpdated?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    projectManagerId?: SortOrderInput | SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    projectID?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    phase?: StringWithAggregatesFilter<"Project"> | string
    description?: StringWithAggregatesFilter<"Project"> | string
    forecast?: FloatWithAggregatesFilter<"Project"> | number
    actuals?: FloatWithAggregatesFilter<"Project"> | number
    budget?: FloatWithAggregatesFilter<"Project"> | number
    plannedStartDate?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    plannedEndDate?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    dateCreated?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    lastUpdated?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    status?: StringNullableWithAggregatesFilter<"Project"> | string | null
    projectManagerId?: IntNullableWithAggregatesFilter<"Project"> | number | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    userId?: IntNullableFilter<"AuditLog"> | number | null
    action?: StringFilter<"AuditLog"> | string
    tableName?: StringFilter<"AuditLog"> | string
    recordId?: IntFilter<"AuditLog"> | number
    beforeData?: JsonNullableFilter<"AuditLog">
    afterData?: JsonNullableFilter<"AuditLog">
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    beforeData?: SortOrderInput | SortOrder
    afterData?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: IntNullableFilter<"AuditLog"> | number | null
    action?: StringFilter<"AuditLog"> | string
    tableName?: StringFilter<"AuditLog"> | string
    recordId?: IntFilter<"AuditLog"> | number
    beforeData?: JsonNullableFilter<"AuditLog">
    afterData?: JsonNullableFilter<"AuditLog">
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    beforeData?: SortOrderInput | SortOrder
    afterData?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuditLog"> | number
    userId?: IntNullableWithAggregatesFilter<"AuditLog"> | number | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    tableName?: StringWithAggregatesFilter<"AuditLog"> | string
    recordId?: IntWithAggregatesFilter<"AuditLog"> | number
    beforeData?: JsonNullableWithAggregatesFilter<"AuditLog">
    afterData?: JsonNullableWithAggregatesFilter<"AuditLog">
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type PMNoteWhereInput = {
    AND?: PMNoteWhereInput | PMNoteWhereInput[]
    OR?: PMNoteWhereInput[]
    NOT?: PMNoteWhereInput | PMNoteWhereInput[]
    id?: IntFilter<"PMNote"> | number
    note?: StringFilter<"PMNote"> | string
    createdAt?: DateTimeFilter<"PMNote"> | Date | string
    projectId?: StringFilter<"PMNote"> | string
    userId?: IntNullableFilter<"PMNote"> | number | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    author?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type PMNoteOrderByWithRelationInput = {
    id?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    userId?: SortOrderInput | SortOrder
    project?: ProjectOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
  }

  export type PMNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PMNoteWhereInput | PMNoteWhereInput[]
    OR?: PMNoteWhereInput[]
    NOT?: PMNoteWhereInput | PMNoteWhereInput[]
    note?: StringFilter<"PMNote"> | string
    createdAt?: DateTimeFilter<"PMNote"> | Date | string
    projectId?: StringFilter<"PMNote"> | string
    userId?: IntNullableFilter<"PMNote"> | number | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    author?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type PMNoteOrderByWithAggregationInput = {
    id?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: PMNoteCountOrderByAggregateInput
    _avg?: PMNoteAvgOrderByAggregateInput
    _max?: PMNoteMaxOrderByAggregateInput
    _min?: PMNoteMinOrderByAggregateInput
    _sum?: PMNoteSumOrderByAggregateInput
  }

  export type PMNoteScalarWhereWithAggregatesInput = {
    AND?: PMNoteScalarWhereWithAggregatesInput | PMNoteScalarWhereWithAggregatesInput[]
    OR?: PMNoteScalarWhereWithAggregatesInput[]
    NOT?: PMNoteScalarWhereWithAggregatesInput | PMNoteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PMNote"> | number
    note?: StringWithAggregatesFilter<"PMNote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PMNote"> | Date | string
    projectId?: StringWithAggregatesFilter<"PMNote"> | string
    userId?: IntNullableWithAggregatesFilter<"PMNote"> | number | null
  }

  export type FinancialHistoryEntryWhereInput = {
    AND?: FinancialHistoryEntryWhereInput | FinancialHistoryEntryWhereInput[]
    OR?: FinancialHistoryEntryWhereInput[]
    NOT?: FinancialHistoryEntryWhereInput | FinancialHistoryEntryWhereInput[]
    id?: IntFilter<"FinancialHistoryEntry"> | number
    projectId?: StringFilter<"FinancialHistoryEntry"> | string
    field?: StringFilter<"FinancialHistoryEntry"> | string
    oldValue?: FloatFilter<"FinancialHistoryEntry"> | number
    newValue?: FloatFilter<"FinancialHistoryEntry"> | number
    reason?: StringNullableFilter<"FinancialHistoryEntry"> | string | null
    changedAt?: DateTimeFilter<"FinancialHistoryEntry"> | Date | string
    userId?: IntNullableFilter<"FinancialHistoryEntry"> | number | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    changedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type FinancialHistoryEntryOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    field?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    reason?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    project?: ProjectOrderByWithRelationInput
    changedBy?: UserOrderByWithRelationInput
  }

  export type FinancialHistoryEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FinancialHistoryEntryWhereInput | FinancialHistoryEntryWhereInput[]
    OR?: FinancialHistoryEntryWhereInput[]
    NOT?: FinancialHistoryEntryWhereInput | FinancialHistoryEntryWhereInput[]
    projectId?: StringFilter<"FinancialHistoryEntry"> | string
    field?: StringFilter<"FinancialHistoryEntry"> | string
    oldValue?: FloatFilter<"FinancialHistoryEntry"> | number
    newValue?: FloatFilter<"FinancialHistoryEntry"> | number
    reason?: StringNullableFilter<"FinancialHistoryEntry"> | string | null
    changedAt?: DateTimeFilter<"FinancialHistoryEntry"> | Date | string
    userId?: IntNullableFilter<"FinancialHistoryEntry"> | number | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    changedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type FinancialHistoryEntryOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    field?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    reason?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: FinancialHistoryEntryCountOrderByAggregateInput
    _avg?: FinancialHistoryEntryAvgOrderByAggregateInput
    _max?: FinancialHistoryEntryMaxOrderByAggregateInput
    _min?: FinancialHistoryEntryMinOrderByAggregateInput
    _sum?: FinancialHistoryEntrySumOrderByAggregateInput
  }

  export type FinancialHistoryEntryScalarWhereWithAggregatesInput = {
    AND?: FinancialHistoryEntryScalarWhereWithAggregatesInput | FinancialHistoryEntryScalarWhereWithAggregatesInput[]
    OR?: FinancialHistoryEntryScalarWhereWithAggregatesInput[]
    NOT?: FinancialHistoryEntryScalarWhereWithAggregatesInput | FinancialHistoryEntryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FinancialHistoryEntry"> | number
    projectId?: StringWithAggregatesFilter<"FinancialHistoryEntry"> | string
    field?: StringWithAggregatesFilter<"FinancialHistoryEntry"> | string
    oldValue?: FloatWithAggregatesFilter<"FinancialHistoryEntry"> | number
    newValue?: FloatWithAggregatesFilter<"FinancialHistoryEntry"> | number
    reason?: StringNullableWithAggregatesFilter<"FinancialHistoryEntry"> | string | null
    changedAt?: DateTimeWithAggregatesFilter<"FinancialHistoryEntry"> | Date | string
    userId?: IntNullableWithAggregatesFilter<"FinancialHistoryEntry"> | number | null
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: IntFilter<"Invoice"> | number
    projectId?: StringFilter<"Invoice"> | string
    invoiceNumber?: StringFilter<"Invoice"> | string
    dateIssued?: DateTimeFilter<"Invoice"> | Date | string
    amount?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    status?: EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus
    vendor?: StringFilter<"Invoice"> | string
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    Project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    invoiceNumber?: SortOrder
    dateIssued?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    vendor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Project?: ProjectOrderByWithRelationInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    projectId?: StringFilter<"Invoice"> | string
    invoiceNumber?: StringFilter<"Invoice"> | string
    dateIssued?: DateTimeFilter<"Invoice"> | Date | string
    amount?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    status?: EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus
    vendor?: StringFilter<"Invoice"> | string
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    Project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    invoiceNumber?: SortOrder
    dateIssued?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    vendor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _avg?: InvoiceAvgOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
    _sum?: InvoiceSumOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Invoice"> | number
    projectId?: StringWithAggregatesFilter<"Invoice"> | string
    invoiceNumber?: StringWithAggregatesFilter<"Invoice"> | string
    dateIssued?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    amount?: DecimalWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    status?: EnumInvoiceStatusWithAggregatesFilter<"Invoice"> | $Enums.InvoiceStatus
    vendor?: StringWithAggregatesFilter<"Invoice"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
  }

  export type TabAccessRequestWhereInput = {
    AND?: TabAccessRequestWhereInput | TabAccessRequestWhereInput[]
    OR?: TabAccessRequestWhereInput[]
    NOT?: TabAccessRequestWhereInput | TabAccessRequestWhereInput[]
    id?: IntFilter<"TabAccessRequest"> | number
    userId?: IntFilter<"TabAccessRequest"> | number
    approvedBy?: IntNullableFilter<"TabAccessRequest"> | number | null
    status?: StringFilter<"TabAccessRequest"> | string
    requestedAt?: DateTimeFilter<"TabAccessRequest"> | Date | string
    approvedAt?: DateTimeNullableFilter<"TabAccessRequest"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    approver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type TabAccessRequestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    approvedBy?: SortOrderInput | SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    approver?: UserOrderByWithRelationInput
  }

  export type TabAccessRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TabAccessRequestWhereInput | TabAccessRequestWhereInput[]
    OR?: TabAccessRequestWhereInput[]
    NOT?: TabAccessRequestWhereInput | TabAccessRequestWhereInput[]
    userId?: IntFilter<"TabAccessRequest"> | number
    approvedBy?: IntNullableFilter<"TabAccessRequest"> | number | null
    status?: StringFilter<"TabAccessRequest"> | string
    requestedAt?: DateTimeFilter<"TabAccessRequest"> | Date | string
    approvedAt?: DateTimeNullableFilter<"TabAccessRequest"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    approver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type TabAccessRequestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    approvedBy?: SortOrderInput | SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    _count?: TabAccessRequestCountOrderByAggregateInput
    _avg?: TabAccessRequestAvgOrderByAggregateInput
    _max?: TabAccessRequestMaxOrderByAggregateInput
    _min?: TabAccessRequestMinOrderByAggregateInput
    _sum?: TabAccessRequestSumOrderByAggregateInput
  }

  export type TabAccessRequestScalarWhereWithAggregatesInput = {
    AND?: TabAccessRequestScalarWhereWithAggregatesInput | TabAccessRequestScalarWhereWithAggregatesInput[]
    OR?: TabAccessRequestScalarWhereWithAggregatesInput[]
    NOT?: TabAccessRequestScalarWhereWithAggregatesInput | TabAccessRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TabAccessRequest"> | number
    userId?: IntWithAggregatesFilter<"TabAccessRequest"> | number
    approvedBy?: IntNullableWithAggregatesFilter<"TabAccessRequest"> | number | null
    status?: StringWithAggregatesFilter<"TabAccessRequest"> | string
    requestedAt?: DateTimeWithAggregatesFilter<"TabAccessRequest"> | Date | string
    approvedAt?: DateTimeNullableWithAggregatesFilter<"TabAccessRequest"> | Date | string | null
  }

  export type UserCreateInput = {
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryCreateNestedManyWithoutChangedByInput
    notes?: PMNoteCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutProjectManagerInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    tabRequests?: TabAccessRequestCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryUncheckedCreateNestedManyWithoutChangedByInput
    notes?: PMNoteUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutProjectManagerInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    tabRequests?: TabAccessRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUpdateManyWithoutChangedByNestedInput
    notes?: PMNoteUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutProjectManagerNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    tabRequests?: TabAccessRequestUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUncheckedUpdateManyWithoutChangedByNestedInput
    notes?: PMNoteUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    tabRequests?: TabAccessRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    hashedPassword: string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
    financialHistory?: FinancialHistoryEntryCreateNestedManyWithoutProjectInput
    Invoice?: InvoiceCreateNestedManyWithoutProjectInput
    pmNotesHistory?: PMNoteCreateNestedManyWithoutProjectInput
    projectManager?: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
    projectManagerId?: number | null
    financialHistory?: FinancialHistoryEntryUncheckedCreateNestedManyWithoutProjectInput
    Invoice?: InvoiceUncheckedCreateNestedManyWithoutProjectInput
    pmNotesHistory?: PMNoteUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    financialHistory?: FinancialHistoryEntryUpdateManyWithoutProjectNestedInput
    Invoice?: InvoiceUpdateManyWithoutProjectNestedInput
    pmNotesHistory?: PMNoteUpdateManyWithoutProjectNestedInput
    projectManager?: UserUpdateOneWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    projectManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    financialHistory?: FinancialHistoryEntryUncheckedUpdateManyWithoutProjectNestedInput
    Invoice?: InvoiceUncheckedUpdateManyWithoutProjectNestedInput
    pmNotesHistory?: PMNoteUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
    projectManagerId?: number | null
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    projectManagerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AuditLogCreateInput = {
    action: string
    tableName: string
    recordId: number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: number
    userId?: number | null
    action: string
    tableName: string
    recordId: number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: IntFieldUpdateOperationsInput | number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: IntFieldUpdateOperationsInput | number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: number
    userId?: number | null
    action: string
    tableName: string
    recordId: number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: IntFieldUpdateOperationsInput | number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: IntFieldUpdateOperationsInput | number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PMNoteCreateInput = {
    note: string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutPmNotesHistoryInput
    author?: UserCreateNestedOneWithoutNotesInput
  }

  export type PMNoteUncheckedCreateInput = {
    id?: number
    note: string
    createdAt?: Date | string
    projectId: string
    userId?: number | null
  }

  export type PMNoteUpdateInput = {
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutPmNotesHistoryNestedInput
    author?: UserUpdateOneWithoutNotesNestedInput
  }

  export type PMNoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PMNoteCreateManyInput = {
    id?: number
    note: string
    createdAt?: Date | string
    projectId: string
    userId?: number | null
  }

  export type PMNoteUpdateManyMutationInput = {
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PMNoteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FinancialHistoryEntryCreateInput = {
    field: string
    oldValue: number
    newValue: number
    reason?: string | null
    changedAt?: Date | string
    project: ProjectCreateNestedOneWithoutFinancialHistoryInput
    changedBy?: UserCreateNestedOneWithoutFinancialChangesInput
  }

  export type FinancialHistoryEntryUncheckedCreateInput = {
    id?: number
    projectId: string
    field: string
    oldValue: number
    newValue: number
    reason?: string | null
    changedAt?: Date | string
    userId?: number | null
  }

  export type FinancialHistoryEntryUpdateInput = {
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: FloatFieldUpdateOperationsInput | number
    newValue?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutFinancialHistoryNestedInput
    changedBy?: UserUpdateOneWithoutFinancialChangesNestedInput
  }

  export type FinancialHistoryEntryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: FloatFieldUpdateOperationsInput | number
    newValue?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FinancialHistoryEntryCreateManyInput = {
    id?: number
    projectId: string
    field: string
    oldValue: number
    newValue: number
    reason?: string | null
    changedAt?: Date | string
    userId?: number | null
  }

  export type FinancialHistoryEntryUpdateManyMutationInput = {
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: FloatFieldUpdateOperationsInput | number
    newValue?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialHistoryEntryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: FloatFieldUpdateOperationsInput | number
    newValue?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type InvoiceCreateInput = {
    invoiceNumber: string
    dateIssued: Date | string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.InvoiceStatus
    vendor: string
    createdAt?: Date | string
    updatedAt: Date | string
    Project: ProjectCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateInput = {
    id?: number
    projectId: string
    invoiceNumber: string
    dateIssued: Date | string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.InvoiceStatus
    vendor: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceUpdateInput = {
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    dateIssued?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    vendor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Project?: ProjectUpdateOneRequiredWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    dateIssued?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    vendor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateManyInput = {
    id?: number
    projectId: string
    invoiceNumber: string
    dateIssued: Date | string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.InvoiceStatus
    vendor: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceUpdateManyMutationInput = {
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    dateIssued?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    vendor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    dateIssued?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    vendor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TabAccessRequestCreateInput = {
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
    user: UserCreateNestedOneWithoutTabRequestsInput
    approver?: UserCreateNestedOneWithoutApprovedTabsInput
  }

  export type TabAccessRequestUncheckedCreateInput = {
    id?: number
    userId: number
    approvedBy?: number | null
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
  }

  export type TabAccessRequestUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutTabRequestsNestedInput
    approver?: UserUpdateOneWithoutApprovedTabsNestedInput
  }

  export type TabAccessRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TabAccessRequestCreateManyInput = {
    id?: number
    userId: number
    approvedBy?: number | null
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
  }

  export type TabAccessRequestUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TabAccessRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FinancialHistoryEntryListRelationFilter = {
    every?: FinancialHistoryEntryWhereInput
    some?: FinancialHistoryEntryWhereInput
    none?: FinancialHistoryEntryWhereInput
  }

  export type PMNoteListRelationFilter = {
    every?: PMNoteWhereInput
    some?: PMNoteWhereInput
    none?: PMNoteWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type TabAccessRequestListRelationFilter = {
    every?: TabAccessRequestWhereInput
    some?: TabAccessRequestWhereInput
    none?: TabAccessRequestWhereInput
  }

  export type FinancialHistoryEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PMNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TabAccessRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type InvoiceListRelationFilter = {
    every?: InvoiceWhereInput
    some?: InvoiceWhereInput
    none?: InvoiceWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    projectID?: SortOrder
    title?: SortOrder
    phase?: SortOrder
    description?: SortOrder
    forecast?: SortOrder
    actuals?: SortOrder
    budget?: SortOrder
    plannedStartDate?: SortOrder
    plannedEndDate?: SortOrder
    dateCreated?: SortOrder
    lastUpdated?: SortOrder
    status?: SortOrder
    projectManagerId?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    forecast?: SortOrder
    actuals?: SortOrder
    budget?: SortOrder
    projectManagerId?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    projectID?: SortOrder
    title?: SortOrder
    phase?: SortOrder
    description?: SortOrder
    forecast?: SortOrder
    actuals?: SortOrder
    budget?: SortOrder
    plannedStartDate?: SortOrder
    plannedEndDate?: SortOrder
    dateCreated?: SortOrder
    lastUpdated?: SortOrder
    status?: SortOrder
    projectManagerId?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    projectID?: SortOrder
    title?: SortOrder
    phase?: SortOrder
    description?: SortOrder
    forecast?: SortOrder
    actuals?: SortOrder
    budget?: SortOrder
    plannedStartDate?: SortOrder
    plannedEndDate?: SortOrder
    dateCreated?: SortOrder
    lastUpdated?: SortOrder
    status?: SortOrder
    projectManagerId?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    forecast?: SortOrder
    actuals?: SortOrder
    budget?: SortOrder
    projectManagerId?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    beforeData?: SortOrder
    afterData?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    recordId?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    recordId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type PMNoteCountOrderByAggregateInput = {
    id?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
  }

  export type PMNoteAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type PMNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
  }

  export type PMNoteMinOrderByAggregateInput = {
    id?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
  }

  export type PMNoteSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type FinancialHistoryEntryCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    field?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    reason?: SortOrder
    changedAt?: SortOrder
    userId?: SortOrder
  }

  export type FinancialHistoryEntryAvgOrderByAggregateInput = {
    id?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    userId?: SortOrder
  }

  export type FinancialHistoryEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    field?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    reason?: SortOrder
    changedAt?: SortOrder
    userId?: SortOrder
  }

  export type FinancialHistoryEntryMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    field?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    reason?: SortOrder
    changedAt?: SortOrder
    userId?: SortOrder
  }

  export type FinancialHistoryEntrySumOrderByAggregateInput = {
    id?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    userId?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumInvoiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusFilter<$PrismaModel> | $Enums.InvoiceStatus
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    invoiceNumber?: SortOrder
    dateIssued?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    vendor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    invoiceNumber?: SortOrder
    dateIssued?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    vendor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    invoiceNumber?: SortOrder
    dateIssued?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    vendor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumInvoiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvoiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvoiceStatusFilter<$PrismaModel>
    _max?: NestedEnumInvoiceStatusFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TabAccessRequestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    approvedBy?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    approvedAt?: SortOrder
  }

  export type TabAccessRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    approvedBy?: SortOrder
  }

  export type TabAccessRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    approvedBy?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    approvedAt?: SortOrder
  }

  export type TabAccessRequestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    approvedBy?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    approvedAt?: SortOrder
  }

  export type TabAccessRequestSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    approvedBy?: SortOrder
  }

  export type FinancialHistoryEntryCreateNestedManyWithoutChangedByInput = {
    create?: XOR<FinancialHistoryEntryCreateWithoutChangedByInput, FinancialHistoryEntryUncheckedCreateWithoutChangedByInput> | FinancialHistoryEntryCreateWithoutChangedByInput[] | FinancialHistoryEntryUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: FinancialHistoryEntryCreateOrConnectWithoutChangedByInput | FinancialHistoryEntryCreateOrConnectWithoutChangedByInput[]
    createMany?: FinancialHistoryEntryCreateManyChangedByInputEnvelope
    connect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
  }

  export type PMNoteCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PMNoteCreateWithoutAuthorInput, PMNoteUncheckedCreateWithoutAuthorInput> | PMNoteCreateWithoutAuthorInput[] | PMNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PMNoteCreateOrConnectWithoutAuthorInput | PMNoteCreateOrConnectWithoutAuthorInput[]
    createMany?: PMNoteCreateManyAuthorInputEnvelope
    connect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutProjectManagerInput = {
    create?: XOR<ProjectCreateWithoutProjectManagerInput, ProjectUncheckedCreateWithoutProjectManagerInput> | ProjectCreateWithoutProjectManagerInput[] | ProjectUncheckedCreateWithoutProjectManagerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectManagerInput | ProjectCreateOrConnectWithoutProjectManagerInput[]
    createMany?: ProjectCreateManyProjectManagerInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type TabAccessRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<TabAccessRequestCreateWithoutUserInput, TabAccessRequestUncheckedCreateWithoutUserInput> | TabAccessRequestCreateWithoutUserInput[] | TabAccessRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TabAccessRequestCreateOrConnectWithoutUserInput | TabAccessRequestCreateOrConnectWithoutUserInput[]
    createMany?: TabAccessRequestCreateManyUserInputEnvelope
    connect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
  }

  export type TabAccessRequestCreateNestedManyWithoutApproverInput = {
    create?: XOR<TabAccessRequestCreateWithoutApproverInput, TabAccessRequestUncheckedCreateWithoutApproverInput> | TabAccessRequestCreateWithoutApproverInput[] | TabAccessRequestUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: TabAccessRequestCreateOrConnectWithoutApproverInput | TabAccessRequestCreateOrConnectWithoutApproverInput[]
    createMany?: TabAccessRequestCreateManyApproverInputEnvelope
    connect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
  }

  export type FinancialHistoryEntryUncheckedCreateNestedManyWithoutChangedByInput = {
    create?: XOR<FinancialHistoryEntryCreateWithoutChangedByInput, FinancialHistoryEntryUncheckedCreateWithoutChangedByInput> | FinancialHistoryEntryCreateWithoutChangedByInput[] | FinancialHistoryEntryUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: FinancialHistoryEntryCreateOrConnectWithoutChangedByInput | FinancialHistoryEntryCreateOrConnectWithoutChangedByInput[]
    createMany?: FinancialHistoryEntryCreateManyChangedByInputEnvelope
    connect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
  }

  export type PMNoteUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PMNoteCreateWithoutAuthorInput, PMNoteUncheckedCreateWithoutAuthorInput> | PMNoteCreateWithoutAuthorInput[] | PMNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PMNoteCreateOrConnectWithoutAuthorInput | PMNoteCreateOrConnectWithoutAuthorInput[]
    createMany?: PMNoteCreateManyAuthorInputEnvelope
    connect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutProjectManagerInput = {
    create?: XOR<ProjectCreateWithoutProjectManagerInput, ProjectUncheckedCreateWithoutProjectManagerInput> | ProjectCreateWithoutProjectManagerInput[] | ProjectUncheckedCreateWithoutProjectManagerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectManagerInput | ProjectCreateOrConnectWithoutProjectManagerInput[]
    createMany?: ProjectCreateManyProjectManagerInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type TabAccessRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TabAccessRequestCreateWithoutUserInput, TabAccessRequestUncheckedCreateWithoutUserInput> | TabAccessRequestCreateWithoutUserInput[] | TabAccessRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TabAccessRequestCreateOrConnectWithoutUserInput | TabAccessRequestCreateOrConnectWithoutUserInput[]
    createMany?: TabAccessRequestCreateManyUserInputEnvelope
    connect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
  }

  export type TabAccessRequestUncheckedCreateNestedManyWithoutApproverInput = {
    create?: XOR<TabAccessRequestCreateWithoutApproverInput, TabAccessRequestUncheckedCreateWithoutApproverInput> | TabAccessRequestCreateWithoutApproverInput[] | TabAccessRequestUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: TabAccessRequestCreateOrConnectWithoutApproverInput | TabAccessRequestCreateOrConnectWithoutApproverInput[]
    createMany?: TabAccessRequestCreateManyApproverInputEnvelope
    connect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FinancialHistoryEntryUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<FinancialHistoryEntryCreateWithoutChangedByInput, FinancialHistoryEntryUncheckedCreateWithoutChangedByInput> | FinancialHistoryEntryCreateWithoutChangedByInput[] | FinancialHistoryEntryUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: FinancialHistoryEntryCreateOrConnectWithoutChangedByInput | FinancialHistoryEntryCreateOrConnectWithoutChangedByInput[]
    upsert?: FinancialHistoryEntryUpsertWithWhereUniqueWithoutChangedByInput | FinancialHistoryEntryUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: FinancialHistoryEntryCreateManyChangedByInputEnvelope
    set?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    disconnect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    delete?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    connect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    update?: FinancialHistoryEntryUpdateWithWhereUniqueWithoutChangedByInput | FinancialHistoryEntryUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: FinancialHistoryEntryUpdateManyWithWhereWithoutChangedByInput | FinancialHistoryEntryUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: FinancialHistoryEntryScalarWhereInput | FinancialHistoryEntryScalarWhereInput[]
  }

  export type PMNoteUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PMNoteCreateWithoutAuthorInput, PMNoteUncheckedCreateWithoutAuthorInput> | PMNoteCreateWithoutAuthorInput[] | PMNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PMNoteCreateOrConnectWithoutAuthorInput | PMNoteCreateOrConnectWithoutAuthorInput[]
    upsert?: PMNoteUpsertWithWhereUniqueWithoutAuthorInput | PMNoteUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PMNoteCreateManyAuthorInputEnvelope
    set?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    disconnect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    delete?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    connect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    update?: PMNoteUpdateWithWhereUniqueWithoutAuthorInput | PMNoteUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PMNoteUpdateManyWithWhereWithoutAuthorInput | PMNoteUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PMNoteScalarWhereInput | PMNoteScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutProjectManagerNestedInput = {
    create?: XOR<ProjectCreateWithoutProjectManagerInput, ProjectUncheckedCreateWithoutProjectManagerInput> | ProjectCreateWithoutProjectManagerInput[] | ProjectUncheckedCreateWithoutProjectManagerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectManagerInput | ProjectCreateOrConnectWithoutProjectManagerInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutProjectManagerInput | ProjectUpsertWithWhereUniqueWithoutProjectManagerInput[]
    createMany?: ProjectCreateManyProjectManagerInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutProjectManagerInput | ProjectUpdateWithWhereUniqueWithoutProjectManagerInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutProjectManagerInput | ProjectUpdateManyWithWhereWithoutProjectManagerInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type TabAccessRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<TabAccessRequestCreateWithoutUserInput, TabAccessRequestUncheckedCreateWithoutUserInput> | TabAccessRequestCreateWithoutUserInput[] | TabAccessRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TabAccessRequestCreateOrConnectWithoutUserInput | TabAccessRequestCreateOrConnectWithoutUserInput[]
    upsert?: TabAccessRequestUpsertWithWhereUniqueWithoutUserInput | TabAccessRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TabAccessRequestCreateManyUserInputEnvelope
    set?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    disconnect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    delete?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    connect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    update?: TabAccessRequestUpdateWithWhereUniqueWithoutUserInput | TabAccessRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TabAccessRequestUpdateManyWithWhereWithoutUserInput | TabAccessRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TabAccessRequestScalarWhereInput | TabAccessRequestScalarWhereInput[]
  }

  export type TabAccessRequestUpdateManyWithoutApproverNestedInput = {
    create?: XOR<TabAccessRequestCreateWithoutApproverInput, TabAccessRequestUncheckedCreateWithoutApproverInput> | TabAccessRequestCreateWithoutApproverInput[] | TabAccessRequestUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: TabAccessRequestCreateOrConnectWithoutApproverInput | TabAccessRequestCreateOrConnectWithoutApproverInput[]
    upsert?: TabAccessRequestUpsertWithWhereUniqueWithoutApproverInput | TabAccessRequestUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: TabAccessRequestCreateManyApproverInputEnvelope
    set?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    disconnect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    delete?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    connect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    update?: TabAccessRequestUpdateWithWhereUniqueWithoutApproverInput | TabAccessRequestUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: TabAccessRequestUpdateManyWithWhereWithoutApproverInput | TabAccessRequestUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: TabAccessRequestScalarWhereInput | TabAccessRequestScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FinancialHistoryEntryUncheckedUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<FinancialHistoryEntryCreateWithoutChangedByInput, FinancialHistoryEntryUncheckedCreateWithoutChangedByInput> | FinancialHistoryEntryCreateWithoutChangedByInput[] | FinancialHistoryEntryUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: FinancialHistoryEntryCreateOrConnectWithoutChangedByInput | FinancialHistoryEntryCreateOrConnectWithoutChangedByInput[]
    upsert?: FinancialHistoryEntryUpsertWithWhereUniqueWithoutChangedByInput | FinancialHistoryEntryUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: FinancialHistoryEntryCreateManyChangedByInputEnvelope
    set?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    disconnect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    delete?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    connect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    update?: FinancialHistoryEntryUpdateWithWhereUniqueWithoutChangedByInput | FinancialHistoryEntryUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: FinancialHistoryEntryUpdateManyWithWhereWithoutChangedByInput | FinancialHistoryEntryUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: FinancialHistoryEntryScalarWhereInput | FinancialHistoryEntryScalarWhereInput[]
  }

  export type PMNoteUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PMNoteCreateWithoutAuthorInput, PMNoteUncheckedCreateWithoutAuthorInput> | PMNoteCreateWithoutAuthorInput[] | PMNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PMNoteCreateOrConnectWithoutAuthorInput | PMNoteCreateOrConnectWithoutAuthorInput[]
    upsert?: PMNoteUpsertWithWhereUniqueWithoutAuthorInput | PMNoteUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PMNoteCreateManyAuthorInputEnvelope
    set?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    disconnect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    delete?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    connect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    update?: PMNoteUpdateWithWhereUniqueWithoutAuthorInput | PMNoteUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PMNoteUpdateManyWithWhereWithoutAuthorInput | PMNoteUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PMNoteScalarWhereInput | PMNoteScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput = {
    create?: XOR<ProjectCreateWithoutProjectManagerInput, ProjectUncheckedCreateWithoutProjectManagerInput> | ProjectCreateWithoutProjectManagerInput[] | ProjectUncheckedCreateWithoutProjectManagerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectManagerInput | ProjectCreateOrConnectWithoutProjectManagerInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutProjectManagerInput | ProjectUpsertWithWhereUniqueWithoutProjectManagerInput[]
    createMany?: ProjectCreateManyProjectManagerInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutProjectManagerInput | ProjectUpdateWithWhereUniqueWithoutProjectManagerInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutProjectManagerInput | ProjectUpdateManyWithWhereWithoutProjectManagerInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type TabAccessRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TabAccessRequestCreateWithoutUserInput, TabAccessRequestUncheckedCreateWithoutUserInput> | TabAccessRequestCreateWithoutUserInput[] | TabAccessRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TabAccessRequestCreateOrConnectWithoutUserInput | TabAccessRequestCreateOrConnectWithoutUserInput[]
    upsert?: TabAccessRequestUpsertWithWhereUniqueWithoutUserInput | TabAccessRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TabAccessRequestCreateManyUserInputEnvelope
    set?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    disconnect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    delete?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    connect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    update?: TabAccessRequestUpdateWithWhereUniqueWithoutUserInput | TabAccessRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TabAccessRequestUpdateManyWithWhereWithoutUserInput | TabAccessRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TabAccessRequestScalarWhereInput | TabAccessRequestScalarWhereInput[]
  }

  export type TabAccessRequestUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: XOR<TabAccessRequestCreateWithoutApproverInput, TabAccessRequestUncheckedCreateWithoutApproverInput> | TabAccessRequestCreateWithoutApproverInput[] | TabAccessRequestUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: TabAccessRequestCreateOrConnectWithoutApproverInput | TabAccessRequestCreateOrConnectWithoutApproverInput[]
    upsert?: TabAccessRequestUpsertWithWhereUniqueWithoutApproverInput | TabAccessRequestUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: TabAccessRequestCreateManyApproverInputEnvelope
    set?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    disconnect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    delete?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    connect?: TabAccessRequestWhereUniqueInput | TabAccessRequestWhereUniqueInput[]
    update?: TabAccessRequestUpdateWithWhereUniqueWithoutApproverInput | TabAccessRequestUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: TabAccessRequestUpdateManyWithWhereWithoutApproverInput | TabAccessRequestUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: TabAccessRequestScalarWhereInput | TabAccessRequestScalarWhereInput[]
  }

  export type FinancialHistoryEntryCreateNestedManyWithoutProjectInput = {
    create?: XOR<FinancialHistoryEntryCreateWithoutProjectInput, FinancialHistoryEntryUncheckedCreateWithoutProjectInput> | FinancialHistoryEntryCreateWithoutProjectInput[] | FinancialHistoryEntryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FinancialHistoryEntryCreateOrConnectWithoutProjectInput | FinancialHistoryEntryCreateOrConnectWithoutProjectInput[]
    createMany?: FinancialHistoryEntryCreateManyProjectInputEnvelope
    connect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
  }

  export type InvoiceCreateNestedManyWithoutProjectInput = {
    create?: XOR<InvoiceCreateWithoutProjectInput, InvoiceUncheckedCreateWithoutProjectInput> | InvoiceCreateWithoutProjectInput[] | InvoiceUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutProjectInput | InvoiceCreateOrConnectWithoutProjectInput[]
    createMany?: InvoiceCreateManyProjectInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type PMNoteCreateNestedManyWithoutProjectInput = {
    create?: XOR<PMNoteCreateWithoutProjectInput, PMNoteUncheckedCreateWithoutProjectInput> | PMNoteCreateWithoutProjectInput[] | PMNoteUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PMNoteCreateOrConnectWithoutProjectInput | PMNoteCreateOrConnectWithoutProjectInput[]
    createMany?: PMNoteCreateManyProjectInputEnvelope
    connect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type FinancialHistoryEntryUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<FinancialHistoryEntryCreateWithoutProjectInput, FinancialHistoryEntryUncheckedCreateWithoutProjectInput> | FinancialHistoryEntryCreateWithoutProjectInput[] | FinancialHistoryEntryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FinancialHistoryEntryCreateOrConnectWithoutProjectInput | FinancialHistoryEntryCreateOrConnectWithoutProjectInput[]
    createMany?: FinancialHistoryEntryCreateManyProjectInputEnvelope
    connect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<InvoiceCreateWithoutProjectInput, InvoiceUncheckedCreateWithoutProjectInput> | InvoiceCreateWithoutProjectInput[] | InvoiceUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutProjectInput | InvoiceCreateOrConnectWithoutProjectInput[]
    createMany?: InvoiceCreateManyProjectInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type PMNoteUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<PMNoteCreateWithoutProjectInput, PMNoteUncheckedCreateWithoutProjectInput> | PMNoteCreateWithoutProjectInput[] | PMNoteUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PMNoteCreateOrConnectWithoutProjectInput | PMNoteCreateOrConnectWithoutProjectInput[]
    createMany?: PMNoteCreateManyProjectInputEnvelope
    connect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FinancialHistoryEntryUpdateManyWithoutProjectNestedInput = {
    create?: XOR<FinancialHistoryEntryCreateWithoutProjectInput, FinancialHistoryEntryUncheckedCreateWithoutProjectInput> | FinancialHistoryEntryCreateWithoutProjectInput[] | FinancialHistoryEntryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FinancialHistoryEntryCreateOrConnectWithoutProjectInput | FinancialHistoryEntryCreateOrConnectWithoutProjectInput[]
    upsert?: FinancialHistoryEntryUpsertWithWhereUniqueWithoutProjectInput | FinancialHistoryEntryUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: FinancialHistoryEntryCreateManyProjectInputEnvelope
    set?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    disconnect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    delete?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    connect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    update?: FinancialHistoryEntryUpdateWithWhereUniqueWithoutProjectInput | FinancialHistoryEntryUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: FinancialHistoryEntryUpdateManyWithWhereWithoutProjectInput | FinancialHistoryEntryUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: FinancialHistoryEntryScalarWhereInput | FinancialHistoryEntryScalarWhereInput[]
  }

  export type InvoiceUpdateManyWithoutProjectNestedInput = {
    create?: XOR<InvoiceCreateWithoutProjectInput, InvoiceUncheckedCreateWithoutProjectInput> | InvoiceCreateWithoutProjectInput[] | InvoiceUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutProjectInput | InvoiceCreateOrConnectWithoutProjectInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutProjectInput | InvoiceUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: InvoiceCreateManyProjectInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutProjectInput | InvoiceUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutProjectInput | InvoiceUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type PMNoteUpdateManyWithoutProjectNestedInput = {
    create?: XOR<PMNoteCreateWithoutProjectInput, PMNoteUncheckedCreateWithoutProjectInput> | PMNoteCreateWithoutProjectInput[] | PMNoteUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PMNoteCreateOrConnectWithoutProjectInput | PMNoteCreateOrConnectWithoutProjectInput[]
    upsert?: PMNoteUpsertWithWhereUniqueWithoutProjectInput | PMNoteUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: PMNoteCreateManyProjectInputEnvelope
    set?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    disconnect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    delete?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    connect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    update?: PMNoteUpdateWithWhereUniqueWithoutProjectInput | PMNoteUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: PMNoteUpdateManyWithWhereWithoutProjectInput | PMNoteUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: PMNoteScalarWhereInput | PMNoteScalarWhereInput[]
  }

  export type UserUpdateOneWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FinancialHistoryEntryUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<FinancialHistoryEntryCreateWithoutProjectInput, FinancialHistoryEntryUncheckedCreateWithoutProjectInput> | FinancialHistoryEntryCreateWithoutProjectInput[] | FinancialHistoryEntryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FinancialHistoryEntryCreateOrConnectWithoutProjectInput | FinancialHistoryEntryCreateOrConnectWithoutProjectInput[]
    upsert?: FinancialHistoryEntryUpsertWithWhereUniqueWithoutProjectInput | FinancialHistoryEntryUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: FinancialHistoryEntryCreateManyProjectInputEnvelope
    set?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    disconnect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    delete?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    connect?: FinancialHistoryEntryWhereUniqueInput | FinancialHistoryEntryWhereUniqueInput[]
    update?: FinancialHistoryEntryUpdateWithWhereUniqueWithoutProjectInput | FinancialHistoryEntryUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: FinancialHistoryEntryUpdateManyWithWhereWithoutProjectInput | FinancialHistoryEntryUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: FinancialHistoryEntryScalarWhereInput | FinancialHistoryEntryScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<InvoiceCreateWithoutProjectInput, InvoiceUncheckedCreateWithoutProjectInput> | InvoiceCreateWithoutProjectInput[] | InvoiceUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutProjectInput | InvoiceCreateOrConnectWithoutProjectInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutProjectInput | InvoiceUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: InvoiceCreateManyProjectInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutProjectInput | InvoiceUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutProjectInput | InvoiceUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type PMNoteUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<PMNoteCreateWithoutProjectInput, PMNoteUncheckedCreateWithoutProjectInput> | PMNoteCreateWithoutProjectInput[] | PMNoteUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PMNoteCreateOrConnectWithoutProjectInput | PMNoteCreateOrConnectWithoutProjectInput[]
    upsert?: PMNoteUpsertWithWhereUniqueWithoutProjectInput | PMNoteUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: PMNoteCreateManyProjectInputEnvelope
    set?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    disconnect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    delete?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    connect?: PMNoteWhereUniqueInput | PMNoteWhereUniqueInput[]
    update?: PMNoteUpdateWithWhereUniqueWithoutProjectInput | PMNoteUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: PMNoteUpdateManyWithWhereWithoutProjectInput | PMNoteUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: PMNoteScalarWhereInput | PMNoteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type ProjectCreateNestedOneWithoutPmNotesHistoryInput = {
    create?: XOR<ProjectCreateWithoutPmNotesHistoryInput, ProjectUncheckedCreateWithoutPmNotesHistoryInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutPmNotesHistoryInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutNotesInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutPmNotesHistoryNestedInput = {
    create?: XOR<ProjectCreateWithoutPmNotesHistoryInput, ProjectUncheckedCreateWithoutPmNotesHistoryInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutPmNotesHistoryInput
    upsert?: ProjectUpsertWithoutPmNotesHistoryInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutPmNotesHistoryInput, ProjectUpdateWithoutPmNotesHistoryInput>, ProjectUncheckedUpdateWithoutPmNotesHistoryInput>
  }

  export type UserUpdateOneWithoutNotesNestedInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    upsert?: UserUpsertWithoutNotesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotesInput, UserUpdateWithoutNotesInput>, UserUncheckedUpdateWithoutNotesInput>
  }

  export type ProjectCreateNestedOneWithoutFinancialHistoryInput = {
    create?: XOR<ProjectCreateWithoutFinancialHistoryInput, ProjectUncheckedCreateWithoutFinancialHistoryInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFinancialHistoryInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFinancialChangesInput = {
    create?: XOR<UserCreateWithoutFinancialChangesInput, UserUncheckedCreateWithoutFinancialChangesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFinancialChangesInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutFinancialHistoryNestedInput = {
    create?: XOR<ProjectCreateWithoutFinancialHistoryInput, ProjectUncheckedCreateWithoutFinancialHistoryInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFinancialHistoryInput
    upsert?: ProjectUpsertWithoutFinancialHistoryInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutFinancialHistoryInput, ProjectUpdateWithoutFinancialHistoryInput>, ProjectUncheckedUpdateWithoutFinancialHistoryInput>
  }

  export type UserUpdateOneWithoutFinancialChangesNestedInput = {
    create?: XOR<UserCreateWithoutFinancialChangesInput, UserUncheckedCreateWithoutFinancialChangesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFinancialChangesInput
    upsert?: UserUpsertWithoutFinancialChangesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFinancialChangesInput, UserUpdateWithoutFinancialChangesInput>, UserUncheckedUpdateWithoutFinancialChangesInput>
  }

  export type ProjectCreateNestedOneWithoutInvoiceInput = {
    create?: XOR<ProjectCreateWithoutInvoiceInput, ProjectUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInvoiceInput
    connect?: ProjectWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumInvoiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvoiceStatus
  }

  export type ProjectUpdateOneRequiredWithoutInvoiceNestedInput = {
    create?: XOR<ProjectCreateWithoutInvoiceInput, ProjectUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInvoiceInput
    upsert?: ProjectUpsertWithoutInvoiceInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutInvoiceInput, ProjectUpdateWithoutInvoiceInput>, ProjectUncheckedUpdateWithoutInvoiceInput>
  }

  export type UserCreateNestedOneWithoutTabRequestsInput = {
    create?: XOR<UserCreateWithoutTabRequestsInput, UserUncheckedCreateWithoutTabRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTabRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutApprovedTabsInput = {
    create?: XOR<UserCreateWithoutApprovedTabsInput, UserUncheckedCreateWithoutApprovedTabsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedTabsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTabRequestsNestedInput = {
    create?: XOR<UserCreateWithoutTabRequestsInput, UserUncheckedCreateWithoutTabRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTabRequestsInput
    upsert?: UserUpsertWithoutTabRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTabRequestsInput, UserUpdateWithoutTabRequestsInput>, UserUncheckedUpdateWithoutTabRequestsInput>
  }

  export type UserUpdateOneWithoutApprovedTabsNestedInput = {
    create?: XOR<UserCreateWithoutApprovedTabsInput, UserUncheckedCreateWithoutApprovedTabsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedTabsInput
    upsert?: UserUpsertWithoutApprovedTabsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApprovedTabsInput, UserUpdateWithoutApprovedTabsInput>, UserUncheckedUpdateWithoutApprovedTabsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumInvoiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusFilter<$PrismaModel> | $Enums.InvoiceStatus
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvoiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvoiceStatusFilter<$PrismaModel>
    _max?: NestedEnumInvoiceStatusFilter<$PrismaModel>
  }

  export type FinancialHistoryEntryCreateWithoutChangedByInput = {
    field: string
    oldValue: number
    newValue: number
    reason?: string | null
    changedAt?: Date | string
    project: ProjectCreateNestedOneWithoutFinancialHistoryInput
  }

  export type FinancialHistoryEntryUncheckedCreateWithoutChangedByInput = {
    id?: number
    projectId: string
    field: string
    oldValue: number
    newValue: number
    reason?: string | null
    changedAt?: Date | string
  }

  export type FinancialHistoryEntryCreateOrConnectWithoutChangedByInput = {
    where: FinancialHistoryEntryWhereUniqueInput
    create: XOR<FinancialHistoryEntryCreateWithoutChangedByInput, FinancialHistoryEntryUncheckedCreateWithoutChangedByInput>
  }

  export type FinancialHistoryEntryCreateManyChangedByInputEnvelope = {
    data: FinancialHistoryEntryCreateManyChangedByInput | FinancialHistoryEntryCreateManyChangedByInput[]
    skipDuplicates?: boolean
  }

  export type PMNoteCreateWithoutAuthorInput = {
    note: string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutPmNotesHistoryInput
  }

  export type PMNoteUncheckedCreateWithoutAuthorInput = {
    id?: number
    note: string
    createdAt?: Date | string
    projectId: string
  }

  export type PMNoteCreateOrConnectWithoutAuthorInput = {
    where: PMNoteWhereUniqueInput
    create: XOR<PMNoteCreateWithoutAuthorInput, PMNoteUncheckedCreateWithoutAuthorInput>
  }

  export type PMNoteCreateManyAuthorInputEnvelope = {
    data: PMNoteCreateManyAuthorInput | PMNoteCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutProjectManagerInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
    financialHistory?: FinancialHistoryEntryCreateNestedManyWithoutProjectInput
    Invoice?: InvoiceCreateNestedManyWithoutProjectInput
    pmNotesHistory?: PMNoteCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutProjectManagerInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
    financialHistory?: FinancialHistoryEntryUncheckedCreateNestedManyWithoutProjectInput
    Invoice?: InvoiceUncheckedCreateNestedManyWithoutProjectInput
    pmNotesHistory?: PMNoteUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutProjectManagerInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutProjectManagerInput, ProjectUncheckedCreateWithoutProjectManagerInput>
  }

  export type ProjectCreateManyProjectManagerInputEnvelope = {
    data: ProjectCreateManyProjectManagerInput | ProjectCreateManyProjectManagerInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    action: string
    tableName: string
    recordId: number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: number
    action: string
    tableName: string
    recordId: number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TabAccessRequestCreateWithoutUserInput = {
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
    approver?: UserCreateNestedOneWithoutApprovedTabsInput
  }

  export type TabAccessRequestUncheckedCreateWithoutUserInput = {
    id?: number
    approvedBy?: number | null
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
  }

  export type TabAccessRequestCreateOrConnectWithoutUserInput = {
    where: TabAccessRequestWhereUniqueInput
    create: XOR<TabAccessRequestCreateWithoutUserInput, TabAccessRequestUncheckedCreateWithoutUserInput>
  }

  export type TabAccessRequestCreateManyUserInputEnvelope = {
    data: TabAccessRequestCreateManyUserInput | TabAccessRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TabAccessRequestCreateWithoutApproverInput = {
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
    user: UserCreateNestedOneWithoutTabRequestsInput
  }

  export type TabAccessRequestUncheckedCreateWithoutApproverInput = {
    id?: number
    userId: number
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
  }

  export type TabAccessRequestCreateOrConnectWithoutApproverInput = {
    where: TabAccessRequestWhereUniqueInput
    create: XOR<TabAccessRequestCreateWithoutApproverInput, TabAccessRequestUncheckedCreateWithoutApproverInput>
  }

  export type TabAccessRequestCreateManyApproverInputEnvelope = {
    data: TabAccessRequestCreateManyApproverInput | TabAccessRequestCreateManyApproverInput[]
    skipDuplicates?: boolean
  }

  export type FinancialHistoryEntryUpsertWithWhereUniqueWithoutChangedByInput = {
    where: FinancialHistoryEntryWhereUniqueInput
    update: XOR<FinancialHistoryEntryUpdateWithoutChangedByInput, FinancialHistoryEntryUncheckedUpdateWithoutChangedByInput>
    create: XOR<FinancialHistoryEntryCreateWithoutChangedByInput, FinancialHistoryEntryUncheckedCreateWithoutChangedByInput>
  }

  export type FinancialHistoryEntryUpdateWithWhereUniqueWithoutChangedByInput = {
    where: FinancialHistoryEntryWhereUniqueInput
    data: XOR<FinancialHistoryEntryUpdateWithoutChangedByInput, FinancialHistoryEntryUncheckedUpdateWithoutChangedByInput>
  }

  export type FinancialHistoryEntryUpdateManyWithWhereWithoutChangedByInput = {
    where: FinancialHistoryEntryScalarWhereInput
    data: XOR<FinancialHistoryEntryUpdateManyMutationInput, FinancialHistoryEntryUncheckedUpdateManyWithoutChangedByInput>
  }

  export type FinancialHistoryEntryScalarWhereInput = {
    AND?: FinancialHistoryEntryScalarWhereInput | FinancialHistoryEntryScalarWhereInput[]
    OR?: FinancialHistoryEntryScalarWhereInput[]
    NOT?: FinancialHistoryEntryScalarWhereInput | FinancialHistoryEntryScalarWhereInput[]
    id?: IntFilter<"FinancialHistoryEntry"> | number
    projectId?: StringFilter<"FinancialHistoryEntry"> | string
    field?: StringFilter<"FinancialHistoryEntry"> | string
    oldValue?: FloatFilter<"FinancialHistoryEntry"> | number
    newValue?: FloatFilter<"FinancialHistoryEntry"> | number
    reason?: StringNullableFilter<"FinancialHistoryEntry"> | string | null
    changedAt?: DateTimeFilter<"FinancialHistoryEntry"> | Date | string
    userId?: IntNullableFilter<"FinancialHistoryEntry"> | number | null
  }

  export type PMNoteUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PMNoteWhereUniqueInput
    update: XOR<PMNoteUpdateWithoutAuthorInput, PMNoteUncheckedUpdateWithoutAuthorInput>
    create: XOR<PMNoteCreateWithoutAuthorInput, PMNoteUncheckedCreateWithoutAuthorInput>
  }

  export type PMNoteUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PMNoteWhereUniqueInput
    data: XOR<PMNoteUpdateWithoutAuthorInput, PMNoteUncheckedUpdateWithoutAuthorInput>
  }

  export type PMNoteUpdateManyWithWhereWithoutAuthorInput = {
    where: PMNoteScalarWhereInput
    data: XOR<PMNoteUpdateManyMutationInput, PMNoteUncheckedUpdateManyWithoutAuthorInput>
  }

  export type PMNoteScalarWhereInput = {
    AND?: PMNoteScalarWhereInput | PMNoteScalarWhereInput[]
    OR?: PMNoteScalarWhereInput[]
    NOT?: PMNoteScalarWhereInput | PMNoteScalarWhereInput[]
    id?: IntFilter<"PMNote"> | number
    note?: StringFilter<"PMNote"> | string
    createdAt?: DateTimeFilter<"PMNote"> | Date | string
    projectId?: StringFilter<"PMNote"> | string
    userId?: IntNullableFilter<"PMNote"> | number | null
  }

  export type ProjectUpsertWithWhereUniqueWithoutProjectManagerInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutProjectManagerInput, ProjectUncheckedUpdateWithoutProjectManagerInput>
    create: XOR<ProjectCreateWithoutProjectManagerInput, ProjectUncheckedCreateWithoutProjectManagerInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutProjectManagerInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutProjectManagerInput, ProjectUncheckedUpdateWithoutProjectManagerInput>
  }

  export type ProjectUpdateManyWithWhereWithoutProjectManagerInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutProjectManagerInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    projectID?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    phase?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    forecast?: FloatFilter<"Project"> | number
    actuals?: FloatFilter<"Project"> | number
    budget?: FloatFilter<"Project"> | number
    plannedStartDate?: DateTimeFilter<"Project"> | Date | string
    plannedEndDate?: DateTimeFilter<"Project"> | Date | string
    dateCreated?: DateTimeFilter<"Project"> | Date | string
    lastUpdated?: DateTimeNullableFilter<"Project"> | Date | string | null
    status?: StringNullableFilter<"Project"> | string | null
    projectManagerId?: IntNullableFilter<"Project"> | number | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    userId?: IntNullableFilter<"AuditLog"> | number | null
    action?: StringFilter<"AuditLog"> | string
    tableName?: StringFilter<"AuditLog"> | string
    recordId?: IntFilter<"AuditLog"> | number
    beforeData?: JsonNullableFilter<"AuditLog">
    afterData?: JsonNullableFilter<"AuditLog">
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type TabAccessRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: TabAccessRequestWhereUniqueInput
    update: XOR<TabAccessRequestUpdateWithoutUserInput, TabAccessRequestUncheckedUpdateWithoutUserInput>
    create: XOR<TabAccessRequestCreateWithoutUserInput, TabAccessRequestUncheckedCreateWithoutUserInput>
  }

  export type TabAccessRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: TabAccessRequestWhereUniqueInput
    data: XOR<TabAccessRequestUpdateWithoutUserInput, TabAccessRequestUncheckedUpdateWithoutUserInput>
  }

  export type TabAccessRequestUpdateManyWithWhereWithoutUserInput = {
    where: TabAccessRequestScalarWhereInput
    data: XOR<TabAccessRequestUpdateManyMutationInput, TabAccessRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type TabAccessRequestScalarWhereInput = {
    AND?: TabAccessRequestScalarWhereInput | TabAccessRequestScalarWhereInput[]
    OR?: TabAccessRequestScalarWhereInput[]
    NOT?: TabAccessRequestScalarWhereInput | TabAccessRequestScalarWhereInput[]
    id?: IntFilter<"TabAccessRequest"> | number
    userId?: IntFilter<"TabAccessRequest"> | number
    approvedBy?: IntNullableFilter<"TabAccessRequest"> | number | null
    status?: StringFilter<"TabAccessRequest"> | string
    requestedAt?: DateTimeFilter<"TabAccessRequest"> | Date | string
    approvedAt?: DateTimeNullableFilter<"TabAccessRequest"> | Date | string | null
  }

  export type TabAccessRequestUpsertWithWhereUniqueWithoutApproverInput = {
    where: TabAccessRequestWhereUniqueInput
    update: XOR<TabAccessRequestUpdateWithoutApproverInput, TabAccessRequestUncheckedUpdateWithoutApproverInput>
    create: XOR<TabAccessRequestCreateWithoutApproverInput, TabAccessRequestUncheckedCreateWithoutApproverInput>
  }

  export type TabAccessRequestUpdateWithWhereUniqueWithoutApproverInput = {
    where: TabAccessRequestWhereUniqueInput
    data: XOR<TabAccessRequestUpdateWithoutApproverInput, TabAccessRequestUncheckedUpdateWithoutApproverInput>
  }

  export type TabAccessRequestUpdateManyWithWhereWithoutApproverInput = {
    where: TabAccessRequestScalarWhereInput
    data: XOR<TabAccessRequestUpdateManyMutationInput, TabAccessRequestUncheckedUpdateManyWithoutApproverInput>
  }

  export type FinancialHistoryEntryCreateWithoutProjectInput = {
    field: string
    oldValue: number
    newValue: number
    reason?: string | null
    changedAt?: Date | string
    changedBy?: UserCreateNestedOneWithoutFinancialChangesInput
  }

  export type FinancialHistoryEntryUncheckedCreateWithoutProjectInput = {
    id?: number
    field: string
    oldValue: number
    newValue: number
    reason?: string | null
    changedAt?: Date | string
    userId?: number | null
  }

  export type FinancialHistoryEntryCreateOrConnectWithoutProjectInput = {
    where: FinancialHistoryEntryWhereUniqueInput
    create: XOR<FinancialHistoryEntryCreateWithoutProjectInput, FinancialHistoryEntryUncheckedCreateWithoutProjectInput>
  }

  export type FinancialHistoryEntryCreateManyProjectInputEnvelope = {
    data: FinancialHistoryEntryCreateManyProjectInput | FinancialHistoryEntryCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceCreateWithoutProjectInput = {
    invoiceNumber: string
    dateIssued: Date | string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.InvoiceStatus
    vendor: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceUncheckedCreateWithoutProjectInput = {
    id?: number
    invoiceNumber: string
    dateIssued: Date | string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.InvoiceStatus
    vendor: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type InvoiceCreateOrConnectWithoutProjectInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutProjectInput, InvoiceUncheckedCreateWithoutProjectInput>
  }

  export type InvoiceCreateManyProjectInputEnvelope = {
    data: InvoiceCreateManyProjectInput | InvoiceCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type PMNoteCreateWithoutProjectInput = {
    note: string
    createdAt?: Date | string
    author?: UserCreateNestedOneWithoutNotesInput
  }

  export type PMNoteUncheckedCreateWithoutProjectInput = {
    id?: number
    note: string
    createdAt?: Date | string
    userId?: number | null
  }

  export type PMNoteCreateOrConnectWithoutProjectInput = {
    where: PMNoteWhereUniqueInput
    create: XOR<PMNoteCreateWithoutProjectInput, PMNoteUncheckedCreateWithoutProjectInput>
  }

  export type PMNoteCreateManyProjectInputEnvelope = {
    data: PMNoteCreateManyProjectInput | PMNoteCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutProjectsInput = {
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryCreateNestedManyWithoutChangedByInput
    notes?: PMNoteCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    tabRequests?: TabAccessRequestCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: number
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryUncheckedCreateNestedManyWithoutChangedByInput
    notes?: PMNoteUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    tabRequests?: TabAccessRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type FinancialHistoryEntryUpsertWithWhereUniqueWithoutProjectInput = {
    where: FinancialHistoryEntryWhereUniqueInput
    update: XOR<FinancialHistoryEntryUpdateWithoutProjectInput, FinancialHistoryEntryUncheckedUpdateWithoutProjectInput>
    create: XOR<FinancialHistoryEntryCreateWithoutProjectInput, FinancialHistoryEntryUncheckedCreateWithoutProjectInput>
  }

  export type FinancialHistoryEntryUpdateWithWhereUniqueWithoutProjectInput = {
    where: FinancialHistoryEntryWhereUniqueInput
    data: XOR<FinancialHistoryEntryUpdateWithoutProjectInput, FinancialHistoryEntryUncheckedUpdateWithoutProjectInput>
  }

  export type FinancialHistoryEntryUpdateManyWithWhereWithoutProjectInput = {
    where: FinancialHistoryEntryScalarWhereInput
    data: XOR<FinancialHistoryEntryUpdateManyMutationInput, FinancialHistoryEntryUncheckedUpdateManyWithoutProjectInput>
  }

  export type InvoiceUpsertWithWhereUniqueWithoutProjectInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutProjectInput, InvoiceUncheckedUpdateWithoutProjectInput>
    create: XOR<InvoiceCreateWithoutProjectInput, InvoiceUncheckedCreateWithoutProjectInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutProjectInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutProjectInput, InvoiceUncheckedUpdateWithoutProjectInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutProjectInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutProjectInput>
  }

  export type InvoiceScalarWhereInput = {
    AND?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    OR?: InvoiceScalarWhereInput[]
    NOT?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    id?: IntFilter<"Invoice"> | number
    projectId?: StringFilter<"Invoice"> | string
    invoiceNumber?: StringFilter<"Invoice"> | string
    dateIssued?: DateTimeFilter<"Invoice"> | Date | string
    amount?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    status?: EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus
    vendor?: StringFilter<"Invoice"> | string
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
  }

  export type PMNoteUpsertWithWhereUniqueWithoutProjectInput = {
    where: PMNoteWhereUniqueInput
    update: XOR<PMNoteUpdateWithoutProjectInput, PMNoteUncheckedUpdateWithoutProjectInput>
    create: XOR<PMNoteCreateWithoutProjectInput, PMNoteUncheckedCreateWithoutProjectInput>
  }

  export type PMNoteUpdateWithWhereUniqueWithoutProjectInput = {
    where: PMNoteWhereUniqueInput
    data: XOR<PMNoteUpdateWithoutProjectInput, PMNoteUncheckedUpdateWithoutProjectInput>
  }

  export type PMNoteUpdateManyWithWhereWithoutProjectInput = {
    where: PMNoteScalarWhereInput
    data: XOR<PMNoteUpdateManyMutationInput, PMNoteUncheckedUpdateManyWithoutProjectInput>
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUpdateManyWithoutChangedByNestedInput
    notes?: PMNoteUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    tabRequests?: TabAccessRequestUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUncheckedUpdateManyWithoutChangedByNestedInput
    notes?: PMNoteUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    tabRequests?: TabAccessRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryCreateNestedManyWithoutChangedByInput
    notes?: PMNoteCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutProjectManagerInput
    tabRequests?: TabAccessRequestCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: number
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryUncheckedCreateNestedManyWithoutChangedByInput
    notes?: PMNoteUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutProjectManagerInput
    tabRequests?: TabAccessRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUpdateManyWithoutChangedByNestedInput
    notes?: PMNoteUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutProjectManagerNestedInput
    tabRequests?: TabAccessRequestUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUncheckedUpdateManyWithoutChangedByNestedInput
    notes?: PMNoteUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput
    tabRequests?: TabAccessRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type ProjectCreateWithoutPmNotesHistoryInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
    financialHistory?: FinancialHistoryEntryCreateNestedManyWithoutProjectInput
    Invoice?: InvoiceCreateNestedManyWithoutProjectInput
    projectManager?: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutPmNotesHistoryInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
    projectManagerId?: number | null
    financialHistory?: FinancialHistoryEntryUncheckedCreateNestedManyWithoutProjectInput
    Invoice?: InvoiceUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutPmNotesHistoryInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutPmNotesHistoryInput, ProjectUncheckedCreateWithoutPmNotesHistoryInput>
  }

  export type UserCreateWithoutNotesInput = {
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryCreateNestedManyWithoutChangedByInput
    projects?: ProjectCreateNestedManyWithoutProjectManagerInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    tabRequests?: TabAccessRequestCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutNotesInput = {
    id?: number
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryUncheckedCreateNestedManyWithoutChangedByInput
    projects?: ProjectUncheckedCreateNestedManyWithoutProjectManagerInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    tabRequests?: TabAccessRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutNotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
  }

  export type ProjectUpsertWithoutPmNotesHistoryInput = {
    update: XOR<ProjectUpdateWithoutPmNotesHistoryInput, ProjectUncheckedUpdateWithoutPmNotesHistoryInput>
    create: XOR<ProjectCreateWithoutPmNotesHistoryInput, ProjectUncheckedCreateWithoutPmNotesHistoryInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutPmNotesHistoryInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutPmNotesHistoryInput, ProjectUncheckedUpdateWithoutPmNotesHistoryInput>
  }

  export type ProjectUpdateWithoutPmNotesHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    financialHistory?: FinancialHistoryEntryUpdateManyWithoutProjectNestedInput
    Invoice?: InvoiceUpdateManyWithoutProjectNestedInput
    projectManager?: UserUpdateOneWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutPmNotesHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    projectManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    financialHistory?: FinancialHistoryEntryUncheckedUpdateManyWithoutProjectNestedInput
    Invoice?: InvoiceUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutNotesInput = {
    update: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateWithoutNotesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUpdateManyWithoutChangedByNestedInput
    projects?: ProjectUpdateManyWithoutProjectManagerNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    tabRequests?: TabAccessRequestUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutNotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUncheckedUpdateManyWithoutChangedByNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    tabRequests?: TabAccessRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type ProjectCreateWithoutFinancialHistoryInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
    Invoice?: InvoiceCreateNestedManyWithoutProjectInput
    pmNotesHistory?: PMNoteCreateNestedManyWithoutProjectInput
    projectManager?: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutFinancialHistoryInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
    projectManagerId?: number | null
    Invoice?: InvoiceUncheckedCreateNestedManyWithoutProjectInput
    pmNotesHistory?: PMNoteUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutFinancialHistoryInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutFinancialHistoryInput, ProjectUncheckedCreateWithoutFinancialHistoryInput>
  }

  export type UserCreateWithoutFinancialChangesInput = {
    name: string
    email: string
    hashedPassword: string
    notes?: PMNoteCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutProjectManagerInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    tabRequests?: TabAccessRequestCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutFinancialChangesInput = {
    id?: number
    name: string
    email: string
    hashedPassword: string
    notes?: PMNoteUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutProjectManagerInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    tabRequests?: TabAccessRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutFinancialChangesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFinancialChangesInput, UserUncheckedCreateWithoutFinancialChangesInput>
  }

  export type ProjectUpsertWithoutFinancialHistoryInput = {
    update: XOR<ProjectUpdateWithoutFinancialHistoryInput, ProjectUncheckedUpdateWithoutFinancialHistoryInput>
    create: XOR<ProjectCreateWithoutFinancialHistoryInput, ProjectUncheckedCreateWithoutFinancialHistoryInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutFinancialHistoryInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutFinancialHistoryInput, ProjectUncheckedUpdateWithoutFinancialHistoryInput>
  }

  export type ProjectUpdateWithoutFinancialHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    Invoice?: InvoiceUpdateManyWithoutProjectNestedInput
    pmNotesHistory?: PMNoteUpdateManyWithoutProjectNestedInput
    projectManager?: UserUpdateOneWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutFinancialHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    projectManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    Invoice?: InvoiceUncheckedUpdateManyWithoutProjectNestedInput
    pmNotesHistory?: PMNoteUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutFinancialChangesInput = {
    update: XOR<UserUpdateWithoutFinancialChangesInput, UserUncheckedUpdateWithoutFinancialChangesInput>
    create: XOR<UserCreateWithoutFinancialChangesInput, UserUncheckedCreateWithoutFinancialChangesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFinancialChangesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFinancialChangesInput, UserUncheckedUpdateWithoutFinancialChangesInput>
  }

  export type UserUpdateWithoutFinancialChangesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    notes?: PMNoteUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutProjectManagerNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    tabRequests?: TabAccessRequestUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutFinancialChangesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    notes?: PMNoteUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    tabRequests?: TabAccessRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type ProjectCreateWithoutInvoiceInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
    financialHistory?: FinancialHistoryEntryCreateNestedManyWithoutProjectInput
    pmNotesHistory?: PMNoteCreateNestedManyWithoutProjectInput
    projectManager?: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutInvoiceInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
    projectManagerId?: number | null
    financialHistory?: FinancialHistoryEntryUncheckedCreateNestedManyWithoutProjectInput
    pmNotesHistory?: PMNoteUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutInvoiceInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutInvoiceInput, ProjectUncheckedCreateWithoutInvoiceInput>
  }

  export type ProjectUpsertWithoutInvoiceInput = {
    update: XOR<ProjectUpdateWithoutInvoiceInput, ProjectUncheckedUpdateWithoutInvoiceInput>
    create: XOR<ProjectCreateWithoutInvoiceInput, ProjectUncheckedCreateWithoutInvoiceInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutInvoiceInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutInvoiceInput, ProjectUncheckedUpdateWithoutInvoiceInput>
  }

  export type ProjectUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    financialHistory?: FinancialHistoryEntryUpdateManyWithoutProjectNestedInput
    pmNotesHistory?: PMNoteUpdateManyWithoutProjectNestedInput
    projectManager?: UserUpdateOneWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    projectManagerId?: NullableIntFieldUpdateOperationsInput | number | null
    financialHistory?: FinancialHistoryEntryUncheckedUpdateManyWithoutProjectNestedInput
    pmNotesHistory?: PMNoteUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserCreateWithoutTabRequestsInput = {
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryCreateNestedManyWithoutChangedByInput
    notes?: PMNoteCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutProjectManagerInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutTabRequestsInput = {
    id?: number
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryUncheckedCreateNestedManyWithoutChangedByInput
    notes?: PMNoteUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutProjectManagerInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    approvedTabs?: TabAccessRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutTabRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTabRequestsInput, UserUncheckedCreateWithoutTabRequestsInput>
  }

  export type UserCreateWithoutApprovedTabsInput = {
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryCreateNestedManyWithoutChangedByInput
    notes?: PMNoteCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutProjectManagerInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    tabRequests?: TabAccessRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApprovedTabsInput = {
    id?: number
    name: string
    email: string
    hashedPassword: string
    financialChanges?: FinancialHistoryEntryUncheckedCreateNestedManyWithoutChangedByInput
    notes?: PMNoteUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutProjectManagerInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    tabRequests?: TabAccessRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApprovedTabsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApprovedTabsInput, UserUncheckedCreateWithoutApprovedTabsInput>
  }

  export type UserUpsertWithoutTabRequestsInput = {
    update: XOR<UserUpdateWithoutTabRequestsInput, UserUncheckedUpdateWithoutTabRequestsInput>
    create: XOR<UserCreateWithoutTabRequestsInput, UserUncheckedCreateWithoutTabRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTabRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTabRequestsInput, UserUncheckedUpdateWithoutTabRequestsInput>
  }

  export type UserUpdateWithoutTabRequestsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUpdateManyWithoutChangedByNestedInput
    notes?: PMNoteUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutProjectManagerNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutTabRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUncheckedUpdateManyWithoutChangedByNestedInput
    notes?: PMNoteUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    approvedTabs?: TabAccessRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserUpsertWithoutApprovedTabsInput = {
    update: XOR<UserUpdateWithoutApprovedTabsInput, UserUncheckedUpdateWithoutApprovedTabsInput>
    create: XOR<UserCreateWithoutApprovedTabsInput, UserUncheckedCreateWithoutApprovedTabsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApprovedTabsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApprovedTabsInput, UserUncheckedUpdateWithoutApprovedTabsInput>
  }

  export type UserUpdateWithoutApprovedTabsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUpdateManyWithoutChangedByNestedInput
    notes?: PMNoteUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutProjectManagerNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    tabRequests?: TabAccessRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApprovedTabsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    financialChanges?: FinancialHistoryEntryUncheckedUpdateManyWithoutChangedByNestedInput
    notes?: PMNoteUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    tabRequests?: TabAccessRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FinancialHistoryEntryCreateManyChangedByInput = {
    id?: number
    projectId: string
    field: string
    oldValue: number
    newValue: number
    reason?: string | null
    changedAt?: Date | string
  }

  export type PMNoteCreateManyAuthorInput = {
    id?: number
    note: string
    createdAt?: Date | string
    projectId: string
  }

  export type ProjectCreateManyProjectManagerInput = {
    id?: string
    projectID: string
    title: string
    phase?: string
    description: string
    forecast: number
    actuals: number
    budget: number
    plannedStartDate: Date | string
    plannedEndDate: Date | string
    dateCreated?: Date | string
    lastUpdated?: Date | string | null
    status?: string | null
  }

  export type AuditLogCreateManyUserInput = {
    id?: number
    action: string
    tableName: string
    recordId: number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type TabAccessRequestCreateManyUserInput = {
    id?: number
    approvedBy?: number | null
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
  }

  export type TabAccessRequestCreateManyApproverInput = {
    id?: number
    userId: number
    status?: string
    requestedAt?: Date | string
    approvedAt?: Date | string | null
  }

  export type FinancialHistoryEntryUpdateWithoutChangedByInput = {
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: FloatFieldUpdateOperationsInput | number
    newValue?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutFinancialHistoryNestedInput
  }

  export type FinancialHistoryEntryUncheckedUpdateWithoutChangedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: FloatFieldUpdateOperationsInput | number
    newValue?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialHistoryEntryUncheckedUpdateManyWithoutChangedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: FloatFieldUpdateOperationsInput | number
    newValue?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PMNoteUpdateWithoutAuthorInput = {
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutPmNotesHistoryNestedInput
  }

  export type PMNoteUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type PMNoteUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectUpdateWithoutProjectManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    financialHistory?: FinancialHistoryEntryUpdateManyWithoutProjectNestedInput
    Invoice?: InvoiceUpdateManyWithoutProjectNestedInput
    pmNotesHistory?: PMNoteUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutProjectManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    financialHistory?: FinancialHistoryEntryUncheckedUpdateManyWithoutProjectNestedInput
    Invoice?: InvoiceUncheckedUpdateManyWithoutProjectNestedInput
    pmNotesHistory?: PMNoteUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutProjectManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectID?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    forecast?: FloatFieldUpdateOperationsInput | number
    actuals?: FloatFieldUpdateOperationsInput | number
    budget?: FloatFieldUpdateOperationsInput | number
    plannedStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    plannedEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateCreated?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUpdateWithoutUserInput = {
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: IntFieldUpdateOperationsInput | number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: IntFieldUpdateOperationsInput | number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: IntFieldUpdateOperationsInput | number
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TabAccessRequestUpdateWithoutUserInput = {
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approver?: UserUpdateOneWithoutApprovedTabsNestedInput
  }

  export type TabAccessRequestUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TabAccessRequestUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    approvedBy?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TabAccessRequestUpdateWithoutApproverInput = {
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutTabRequestsNestedInput
  }

  export type TabAccessRequestUncheckedUpdateWithoutApproverInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TabAccessRequestUncheckedUpdateManyWithoutApproverInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FinancialHistoryEntryCreateManyProjectInput = {
    id?: number
    field: string
    oldValue: number
    newValue: number
    reason?: string | null
    changedAt?: Date | string
    userId?: number | null
  }

  export type InvoiceCreateManyProjectInput = {
    id?: number
    invoiceNumber: string
    dateIssued: Date | string
    amount: Decimal | DecimalJsLike | number | string
    status?: $Enums.InvoiceStatus
    vendor: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type PMNoteCreateManyProjectInput = {
    id?: number
    note: string
    createdAt?: Date | string
    userId?: number | null
  }

  export type FinancialHistoryEntryUpdateWithoutProjectInput = {
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: FloatFieldUpdateOperationsInput | number
    newValue?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: UserUpdateOneWithoutFinancialChangesNestedInput
  }

  export type FinancialHistoryEntryUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: FloatFieldUpdateOperationsInput | number
    newValue?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FinancialHistoryEntryUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    field?: StringFieldUpdateOperationsInput | string
    oldValue?: FloatFieldUpdateOperationsInput | number
    newValue?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type InvoiceUpdateWithoutProjectInput = {
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    dateIssued?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    vendor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    dateIssued?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    vendor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    dateIssued?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    vendor?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PMNoteUpdateWithoutProjectInput = {
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneWithoutNotesNestedInput
  }

  export type PMNoteUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PMNoteUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}