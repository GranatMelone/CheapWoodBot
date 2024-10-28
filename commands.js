import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

// Simple test command
const TEST_COMMAND = {
    name: 'test',
    description: 'Basic command',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
};

const QUOTE_COMMAND = {
    name: 'shun_quote',
    description: 'Provides a random Shaun quote'
}

const ALL_COMMANDS = [TEST_COMMAND, QUOTE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
