self.addEventListener('push',(e)=>{
    const data=e.data.json();
    self.registration.showNotification(data.title,{
        body:` Hi ${data.name}, Have a good day! <3 `
    })})
   