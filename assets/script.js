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

async function getUsers() {
    fetch('/getUsers')
    .then(response => response.json()) // Parse the JSON from the response
    .then(data => {
        const container = document.getElementById('data-container'); // Get the container element
        const usersHtml = data.map(user => 
            `<div>
                <p>ID: ${user.id}</p>
                <p>NAME:${user.name}</p>
            </div><br>`).join(''); // Create HTML string for each user

        container.innerHTML = usersHtml; // Insert the HTML into the container
    })
    .catch(error => console.error('Error fetching data:', error));
}