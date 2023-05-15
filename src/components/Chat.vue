<template>
  <div class="container">
    <div v-for="(message, index) in messages" :key="index" class="chat-history">
      <!-- <h1>Chat with ChatGPT {{ index + 1 }}</h1> -->
      <div v-for="msg in message" :key="msg.id" class="message">
        <strong>{{ msg.author }}:</strong> {{ msg.text }}
      </div>
    </div>
    <div class="input-box">
      <input v-model="inputMessage" @keydown.enter="sendMessage" placeholder="问题输入框">
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputMessage: '',
      messages: [[], [], [], []],
      prompt: ['', '像艺术家一样回答：', '像科学家一样回答：', '像冒险家一样回答：'],
    };
  },
  methods: {
    async sendMessage() {
      for (let i = 0; i < 4; i++) {
        const message = {
          author: 'User',
          text: this.prompt[i] + this.inputMessage,
          id: Date.now()
        };

        this.messages[i].push(message);

        try {
          const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', // Update with the desired model
            messages: [
              { role: 'system', content: 'You are User' },
              { role: 'user', content: message.text }
            ],
            max_tokens: 1000
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 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' // 请用你的ChatGPT API密钥替换此处
            }
          });

          const botReply = {
            author: 'ChatGPT',
            text: response.data.choices[0].message.content.trim(),
            id: Date.now() + 1
          };

          this.messages[i].push(botReply);
        } catch (error) {
          console.error(error);
        }
        
        await new Promise(res => setTimeout(res, 7000))
      }

      this.inputMessage = '';
    }
  }
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 调整每个区域的宽度 */
  grid-template-rows: 1fr 1fr;
  height: calc(100vh - 200px); /* 减少输入框的高度 */
}

.chat-history {
  overflow: auto;
  padding: 20px;
  border: 1px solid #000; 
}

.input-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px; /* 减少输入框的高度 */
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px; /* 增大输入框的高度 */
}
.input-box input {
  height: 70px; /* 增大输入框的高度 */
  font-size: 24px; /* 增大字体的大小 */
  width: 80%;
}
</style>
