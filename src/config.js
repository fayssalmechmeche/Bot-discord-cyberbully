import { Client, IntentsBitField } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
