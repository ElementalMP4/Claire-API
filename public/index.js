function nameToClass(name) {
    if (name.toLowerCase() == "you") return "you";
    else return "ai";
}

function hideThinkingIndicator() {
    document.getElementById("thinking-indicator").style.display = "none";
}

function showThinkingIndicator() {
    document.getElementById("thinking-indicator").style.display = "block";
}

function getResponseToMessage(message) {
    fetch(`/chat?prompt=${encodeURIComponent(message)}`)
        .then((response) => response.json())
        .then((data) => {
            hideThinkingIndicator();
            addMessage("C.L.A.I.R.E", data.message);
        });
}

function addMessage(author, message) {
    let newMessage = `
    <div class="w3-card-4 w3-panel">
        <p class="bold ${nameToClass(author)}">${author}: </p><p>${message}</p>
    </div>`
    document.getElementById("message-container").insertAdjacentHTML('beforebegin', newMessage);
    document.getElementById("message-container").scrollIntoView(true);
}

document.getElementById("chat-input").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        showThinkingIndicator();
        let yourMessage = document.getElementById("chat-input").value;
        addMessage("You", yourMessage);
        getResponseToMessage(yourMessage);
        document.getElementById("chat-input").value = "";
    }
});