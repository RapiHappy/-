const fs = require('fs');
const path = require('path');
const https = require('https');

const dataDir = path.join(__dirname, '../data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js'));

async function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url.startsWith('http')) return resolve(false);
    
    const req = https.get(url, (res) => {
      // 200 OK or 3xx redirect is considered fine for iframes
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).on('error', () => {
      resolve(false);
    });
    
    // timeout
    req.setTimeout(5000, () => {
      req.abort();
      resolve(false);
    });
  });
}

async function audit() {
  console.log('Начинаем аудит видео ссылок...');
  let totalVideos = 0;
  let brokenVideos = 0;

  for (const file of files) {
    console.log(`\nПроверяем файл: ${file}`);
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // A simple regex to find all youtube links in the videos object
    const regex = /videos:\s*{\s*main:\s*'([^']+)',\s*simple:\s*'([^']+)',\s*tasks:\s*'([^']+)'/g;
    
    let match;
    while ((match = regex.exec(content)) !== null) {
      const urls = [match[1], match[2], match[3]];
      const types = ['main', 'simple', 'tasks'];
      
      for (let i = 0; i < urls.length; i++) {
        totalVideos++;
        const url = urls[i];
        const isOk = await checkUrl(url);
        
        if (!isOk) {
          console.error(`\n❌ [ОШИБКА] Недоступно видео (${types[i]}): ${url}`);
          brokenVideos++;
        } else {
          // just log a dot to show progress
          process.stdout.write('.');
        }
      }
    }
  }

  console.log('\n\n=== Результаты аудита ===');
  console.log(`Проверено видео: ${totalVideos}`);
  console.log(`Битых ссылок: ${brokenVideos}`);
  
  if (brokenVideos === 0 && totalVideos > 0) {
    console.log('✅ Все iframe ссылки активны и работают корректно!');
  } else if (totalVideos === 0) {
    console.log('⚠️ Видео не найдены. Проверьте регулярное выражение.');
  }
}

audit();
