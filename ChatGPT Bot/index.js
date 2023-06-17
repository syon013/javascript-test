const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    // 메시지가 비어 있으면 아무 작업도 수행하지 않음
    if (message === '') {
        return;
    }
    // 메시지가 'developer'인 경우 우리의 메시지를 표시
    else if (message === 'developer') {
        // 입력 값 비우기
        userInput.value = '';
        // 사용자로 메시지 추가 - 이 기능을 코드로 작성할 것입니다
        appendMessage('user', message);
        // 가짜로 로딩 표시를 보여주기 위한 타임아웃 설정
        setTimeout(() => {
            // 메시지를 챗봇으로 보냄 (송신자: 챗봇)
            appendMessage('bot', 'This Source Coded By RezaMehdikhanlou');
            // 버튼 아이콘을 기본값으로 변경
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    // 위의 경우가 아닌 경우 사용자의 메시지를 화면에 추가
    appendMessage('user', message);
    userInput.value = '';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'a4976fc052mshf4476ceadfb6bb3p1c76adjsn955581958b1f',
            'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
        },
        // 공식 API를 사용하려면
        /*
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'a4976fc052mshf4476ceadfb6bb3p1c76adjsn955581958b1f',
        'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
        */

        body: `{"model":"gpt-3.5-turbo","messages":[{"role" : "user", "content":"${message}"}]}`
        // 공식 API를 사용하려면 다음 body가 필요합니다
        //`{"model":"gpt-3.5-turbo","message":[{"role" : "user", "content":"${message}"}]}`
    };
    // 공식 API: 'https://chatgpt53.p.rapidapi.com/';
    fetch('https://chatgpt53.p.rapidapi.com/', options)
        .then((response) => response.json())
        .then((response) => {
            appendMessage('bot', response.choices[0].message.content);

            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        })
        .catch((err) => {
            if (err.name === 'TypeError') {
                appendMessage('bot', 'Error : Check Your Api Key!');
                buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
                buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
            }
        });

}

function appendMessage(sender, message) {
    info.style.display = "none";
    // 버튼 아이콘을 로딩으로 변경 (fontawesome 사용)
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    // 메시지를 보낸 사람에 따라 아이콘 추가 (챗봇 또는 사용자)
    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;
}
