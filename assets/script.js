function sayHello() {
    alert("Hello!");
}

async function checkDbConnection() {
    try {
        const response = await fetch('/dbCheck');
        if (!response.ok) {
            alert("Response was not OK");
        }
        console.log(response);
        alert('CONNECT OK')
    } catch (error) {
        alert("Error with DB Connection");
    }
}