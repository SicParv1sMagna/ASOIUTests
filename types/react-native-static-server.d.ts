declare module 'react-native-static-server' {
    interface StaticServerOptions {
      localOnly?: boolean;
      keepAlive?: boolean;
      index?: string;
    }
  
    export default class StaticServer {
      constructor(port: number, root: string, options?: StaticServerOptions);
  
      start(): Promise<string>;
      stop(): void;
      isRunning(): Promise<boolean>;
      getPort(): number;
      getOrigin(): string;
      getURL(): string;
    }
  }
  