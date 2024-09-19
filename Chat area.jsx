import React from 'react';
import { Box, TextField, IconButton, List, ListItem, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatApp = () => {
  return (
    <Box sx={styles.chatContainer}>
      {/* Chat Header */}
      <Box sx={styles.chatHeader}>
        <Typography variant="h6">Chat with Support</Typography>
      </Box>

      {/* Chat Messages */}
      <Box sx={styles.chatMessages}>
        <List sx={styles.messageList}>
          <ListItem sx={styles.messageReceived}>
            <Paper sx={styles.messagePaper}>
              <Typography>Hi, how can I help you?</Typography>
            </Paper>
          </ListItem>
          <ListItem sx={styles.messageSent}>
            <Paper sx={styles.messagePaperSent}>
              <Typography>I have an issue with my order.</Typography>
            </Paper>
          </ListItem>
        </List>
      </Box>

      {/* Chat Input */}
      <Box sx={styles.chatInput}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message..."
          sx={styles.textField}
        />
        <IconButton color="primary" sx={styles.sendButton}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const styles = {
  chatContainer: {
    width: '400px',
    height: '600px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
  },
  chatHeader: {
    padding: '10px',
    backgroundColor: '#1976d2',
    color: 'white',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    textAlign: 'center',
  },
  chatMessages: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#fff',
  },
  messageList: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  messageReceived: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '10px',
  },
  messageSent: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
  },
  messagePaper: {
    padding: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    maxWidth: '70%',
  },
  messagePaperSent: {
    padding: '10px',
    backgroundColor: '#1976d2',
    color: 'white',
    borderRadius: '10px',
    maxWidth: '70%',
  },
  chatInput: {
    display: 'flex',
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
  },
  textField: {
    marginRight: '10px',
  },
  sendButton: {
    alignSelf: 'center',
  },
};

export default ChatApp;
