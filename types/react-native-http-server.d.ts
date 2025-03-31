declare module 'react-native-http-server' {
    type Request = {
      url: string;
      method: string;
      headers: Record<string, string>;
      body: string;
      requestId: string;
    };
  
    const HttpServer: {
      start: (port: number) => Promise<void>;
      stop: () => Promise<void>;
      onRequest: (callback: (req: Request) => void) => void;
      sendResponse: (
        requestId: string,
        statusCode: number,
        contentType: string,
        body: string
      ) => void;
    };
  
    export default HttpServer;
  }
  