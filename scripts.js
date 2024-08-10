function toggleMobileMenu(){
    document.getElementById("menu").classList.toggle
    ("active");
}

const chatInput = document.querySelector(".chat-message input");
const sendChatBtn = document.querySelector(".chat-message button");
const chatlog = document.querySelector("#chat-log");


let userMessage;
const API_KEY = "";


const createChatLi = (message, className) => {
    // create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<div></div>` : `<span class="avatar bot">AI</span><div></div>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("div").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
    const messageElement = incomingChatLi.querySelector("div");

    const requestOptions = {
        method: "POST",
        headers: {
           "Content-Type":  "application/json"},
        body: JSON.stringify({
            contents: [{
                role: "user",
                parts: [{text: userMessage}]
            }]
        }),
    };

    // Send POST request to API, get response
    fetch (API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.candidates[0].content.parts[0].text;
    }).catch((error) => {
        messageElement.textContent = "Sorry Something went wrong. Please try again.";
    }).finally(() => chatlog.scrollTo(0, chatlog.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); 
    if(!userMessage) return;

    // Append the users message to the chatlog
    chatlog.appendChild(createChatLi(userMessage, "outgoing"));
    chatlog.scrollTo(0, chatlog.scrollHeight);

    // Clear the input after sending the message
    chatInput.value = "";

    // Display "..." message while user waiting for response
    setTimeout(() => {
        const incomingChatLi = createChatLi("...", "incoming")
        chatlog.appendChild(incomingChatLi);
        chatlog.scrollTo(0, chatlog.scrollHeight);
        generateResponse(incomingChatLi);
    }, 300);
}

sendChatBtn.addEventListener("click", handleChat);
