import { getAppId, commands } from "./commands.js";
import { client } from "./config.js";
import { addWarning, getWarnings, resetWarnings } from "./fileOperations.js";
import { Routes, REST } from "discord.js";
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);


import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = "Remplace ce texte de cyberharcèlement par un message positif et constructif équivalent à la phrase que je vais t'envoyer. écris moi uniquement le message de prévention constructif contre le harcèlement. \n Voici le message de cyberharcèlement: ";

export const refreshCommands = async () => {
    try {
        console.log("Started refreshing application (/) commands.");
        await rest.put(Routes.applicationCommands(getAppId()), { body: commands });
        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
};

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        activities: [{ name: "Stop Cyberbullying", type: "WATCHING" }],
        status: "online",
    });
});




client.on("messageCreate", async (interaction) => {
    if (interaction.author.bot) return;
    if (interaction.content === '') return;
    if (interaction.author.id === interaction.guild.ownerId) return;

    isCyberBullying(interaction);
});

client.login(process.env.TOKEN);

async function isCyberBullying(interaction) {
    let result = await model.generateContent(["Répond moi par true ou par false uniquement si la phrase suivante est du cyberharcèlement : " + interaction.content]);
    if (result.response.text().toLowerCase().includes("true")) {
        await handleWarning(interaction);
    }
}

async function handleWarning(interaction) {
    await addWarning(interaction.guild.id, interaction.author.id);
    let result = '';
    switch (getWarnings(interaction.guild.id, interaction.author.id)) {
        case 5:
            result = "Banni 1 jours temporairement pour cyberharcèlement après plusieurs avertissements, le prochain avertissement sera un bannissement définitif.";
            await interaction.member.ban({ days: 1, reason: result });
            break;
        case 10:
            result = "Banni définitivement pour cyberharcèlement après plusieurs avertissements.";
            await interaction.member.ban({ reason: result });
            await resetWarnings(interaction.guild.id, interaction.author.id);
            break;
        default:
            result = await model.generateContent([prompt + interaction.content], { max_tokens: 100 });
            await interaction.author.send(`Attention, ton message pourrait être considéré comme du cyberharcèlement. Voici un message constructif que tu pourrais envoyer à la place : \n ${result.response.text()}`);
            break;
    }

    return await interaction.delete();
}