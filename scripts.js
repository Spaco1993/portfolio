function toggleMobileMenu(){
    document.getElementById("menu").classList.toggle
    ("active");
}

const chatInput = document.querySelector(".chat-message input");
const sendChatBtn = document.querySelector(".chat-message button");
const chatlog = document.querySelector("#chat-log");


let userMessage;

const createChatLi = (message, className) => {
    // create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<div>${message}</div>` : `<span class="avatar bot">AI</span><div>${message}</div>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () => {
    const API_URL = "";
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); 
    if(!userMessage) return;

    // Append the users message to the chatlog
    chatlog.appendChild(createChatLi(userMessage, "outgoing"));

    // Clear the input after sending the message
    chatInput.value = "";

    // Display "Let me check..." message while user waiting for response
    setTimeout(() => {
        chatlog.appendChild(createChatLi("Let me check...", "incoming"));
        generateResponse();
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
