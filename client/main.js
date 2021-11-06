function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const publicVapidKey = 'BCqC6NmUge_uWmTMl8FWS9MDAEgMT1GwvSLUH7jKllXXvI6Aodz9hpbfcjnTeO8kOviZ-yNUXkIK77MelCNoM9k';

const triggerPush = document.querySelector('.trigger-push');

async function triggerPushNotification(name) {
  if ('serviceWorker' in navigator) {
    const register = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify({subscription,name}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(console.log);
   
  } else {
    console.error('Service workers are not supported in this browser');
  }
}

triggerPush.addEventListener('click', (e) => {
  e.preventDefault();
  const name=document.querySelector('.name').value; 
  document.querySelector('.name').value="";
  triggerPushNotification(name).catch(error => console.error(error));
});