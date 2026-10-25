// This would need the minecraft-protocol library in the browser
// For now, let's just test if the DataChannel is working correctly
const testDC = () => {
  if (!window.dc || window.dc.readyState !== 'open') {
    console.log('DataChannel not ready');
    return;
  }
  
  // Send a simple test message
  window.dc.send(new TextEncoder().encode('hello from browser'));
  console.log('Sent text via DataChannel');
};

// Run test after 5 seconds
setTimeout(testDC, 5000);
