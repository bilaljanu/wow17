const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    console.log(`[CONSOLE] ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    console.log(`[PAGE ERROR] ${err.message}`);
  });
  
  try {
    console.log('[TEST] Navigating to index.html...');
    await page.goto('http://localhost:9092/index.html', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for classes.js to load and execute
    await page.waitForTimeout(3000);
    
    // Check if TeaVM main executed
    const teaVMState = await page.evaluate(() => {
      return {
        main: typeof window.main,
        netBridgeWritePacket: !!window.NetBridge_writePacket,
        netBridgeReceivePacket: !!window.NetBridge_receivePacket,
        jsNetBridgeCallJoinServer: typeof window.JsNetBridge_callJoinServer,
        jsNetBridgeCallInitiateHandshake: typeof window.JsNetBridge_callInitiateHandshake,
        dataChannel: window.dataChannel?.readyState || 'none',
        peerConnection: window.peerConnection?.connectionState || 'none'
      };
    });
    
    console.log('[TEST] TeaVM State:', JSON.stringify(teaVMState, null, 2));
    
    // Wait a bit more for any async initialization
    await page.waitForTimeout(2000);
    
    // Try clicking connect button
    const connectBtn = await page.$('#connectBtn');
    if (connectBtn) {
      console.log('[TEST] Clicking connect button...');
      await connectBtn.click();
      await page.waitForTimeout(5000);
      
      const stateAfterConnect = await page.evaluate(() => {
        return {
          dataChannel: window.dataChannel?.readyState || 'none',
          peerConnection: window.peerConnection?.connectionState || 'none',
          iceConnectionState: window.peerConnection?.iceConnectionState || 'none',
          signalingSocket: window.signalingSocket?.readyState || 'none'
        };
      });
      console.log('[TEST] State after connect:', JSON.stringify(stateAfterConnect, null, 2));
    }
    
  } catch (err) {
    console.error('[TEST ERROR]', err.message);
  }
  
  await browser.close();
  console.log('[TEST] Done');
})();
