import { io } from "socket.io-client";
const socket = io();

const url = new URL(location.href)
const yourId = url.searchParams.get('yourId')
const otherId = url.searchParams.get('otherId')
let hasNoMore = false;

function autoScroll(isSmooth = false) {
    const chatArea = document.querySelector('.chat-content');
    chatArea.scrollTo({
        top: chatArea.scrollHeight, // scrollHeight ensures you scroll to the bottom of the chat
        behavior: isSmooth ? 'smooth' : 'auto'
    });
}

function handleScrollForPagination() {
    const chatArea = document.querySelector('.chat-content');
    chatArea.addEventListener('scroll', () => {
        // When user scrolls near the top (e.g., 50px away from the top)
        const scrollThreshold = 0; // You can adjust this value as needed
        if (chatArea.scrollTop <= scrollThreshold) {
            const firstChild = chatArea.firstElementChild; // Get the first child element
            if (firstChild && !hasNoMore) {
                const firstChildId = firstChild.getAttribute('data-id');
                fetch('/get-messages', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ yourId, otherId, lastMessageId: firstChildId })
                }).then(res => res.json())
                    .then(res => {
                        const messages = res.messages.reverse()
                        hasNoMore = res.noMore
                        messages.forEach(message => {
                            const div = document.createElement('div')
                            div.className = `chat ${message.sender.toString() === yourId ? 'sender' : 'receiver'}`
                            div.innerHTML = `<p>${message.message}</p>`
                            chatArea.insertBefore(div, chatArea.firstChild)
                        })
                    })
            }
        }
    });
}


if (yourId && otherId) {

    autoScroll()
    handleScrollForPagination();

    socket.emit('create-room', yourId, otherId)

    document.querySelector('.chat-footer').addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('message-input').value
        if (!message) return alert('Please provide a message')
        socket.emit('message', message, yourId, otherId)
        document.getElementById('message-input').value = ''
    })

    socket.on('message', (newMessage) => {
        const div = document.createElement('div')
        div.className = `chat ${newMessage.sender.toString() === yourId ? 'sender' : 'receiver'}`
        div.innerHTML = `<p>${newMessage.message}</p>`
        const parentDiv = document.querySelector('.chat-content');
        parentDiv.appendChild(div)
        if (newMessage.sender.toString() === yourId) autoScroll(true)
    })
}
