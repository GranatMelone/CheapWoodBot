import 'dotenv/config';
import express from 'express';
import {
    InteractionType,
    InteractionResponseType,
    verifyKeyMiddleware,
} from 'discord-interactions';
import { handleCommand } from './commands/command_handler.js';

// Creates express app and gets port/default  
const app = express(); 
const PORT = process.env.PORT || 3000;

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
    // Interaction type and data
    const { type, data } = req.body;

    /**
     * Handle verification reuqests
     */
    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    /**
     * Handle Slash command requests 
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
        return handleCommand(data, res)
    }

    console.error(`Unknown interaction type`, type);
    return res.status(400).json({ error: 'Unknown interaction type' })
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
