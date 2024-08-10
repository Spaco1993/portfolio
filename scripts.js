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
    let chatContent = className === "outgoing" ? `<div>${message}</div>` : `<span class="avatar bot">AI</span><div>${message}</div>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
           "Content-Type":  "application/json",
           "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    // Send POST request to API, get response
    fetch (API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Sorry Something went wrong. Please try again.";
    })
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); 
    if(!userMessage) return;

    // Append the users message to the chatlog
    chatlog.appendChild(createChatLi(userMessage, "outgoing"));
    chatlog.scrollTo(0, chatlog.scrollHeight);

    // Clear the input after sending the message
    chatInput.value = "";

    // Display "Let me check..." message while user waiting for response
    setTimeout(() => {
        const incomingChatLi = createChatLi("Let me check...", "incoming")
        chatlog.appendChild(incomingChatLi);
        chatlog.scrollTo(0, chatlog.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
