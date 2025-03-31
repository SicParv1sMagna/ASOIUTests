import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';
import { NetworkInfo } from 'react-native-network-info';

export default function App() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const startServer = async () => {
      const wwwPath = RNFS.DocumentDirectoryPath + '/www';
      const indexFilePath = wwwPath + '/index.html';

      // Создаём папку и копируем HTML-файл из assets
      const exists = await RNFS.exists(indexFilePath);
      if (!exists) {
        await RNFS.mkdir(wwwPath);

        const htmlContent = `
          <html>
            <head><title>Hello</title></head>
            <body>
              <h1>Hello from your phone 👋</h1>
              <p>This is served over Wi-Fi.</p>
            </body>
          </html>
        `;

        await RNFS.writeFile(indexFilePath, htmlContent, 'utf8');
      }

      const server = new StaticServer(8080, wwwPath, { localOnly: false });
      await server.start();

      const ip = await NetworkInfo.getIPV4Address();
      setUrl(`http://${ip}:8080`);
    };

    startServer();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Открой на другом устройстве:</Text>
      <Text selectable style={{ fontWeight: 'bold' }}>{url || 'Запуск...'}</Text>
    </View>
  );
}
