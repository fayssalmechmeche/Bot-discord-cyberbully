import fs from "fs/promises";

let serversWarningMembers = {};

export const loadServersWarningMembersMap = async () => {
    try {
        const data = await fs.readFile('serversWarningMembers.json', 'utf8');
        serversWarningMembers = JSON.parse(data);
    } catch (err) {
        console.error('Error reading or parsing the serversWarningMembers.json file:', err.message);
    }
};

export const saveServersWarningMembersMap = async () => {
    try {
        const jsonData = JSON.stringify(serversWarningMembers, null, 2);
        await fs.writeFile('serversWarningMembers.json', jsonData, 'utf8');
        console.log('Server-ClubID map updated successfully.');
    } catch (err) {
        console.error('Error writing to serversWarningMembers.json file:', err.message);
    }
};

export const addWarning = async (serverId, userId) => {
    if (!serversWarningMembers[serverId]) {
        serversWarningMembers[serverId] = {};
    }

    if (!serversWarningMembers[serverId][userId]) {
        serversWarningMembers[serverId][userId] = 0;
    }

    serversWarningMembers[serverId][userId] += 1;

    console.log(`Warning ajouté : Serveur ${serverId}, Utilisateur ${userId}, Warnings: ${serversWarningMembers[serverId][userId]}`);
    await saveServersWarningMembersMap();
};

export const resetWarnings = async (serverId, userId) => {
    if (serversWarningMembers[serverId] && serversWarningMembers[serverId][userId]) {
        delete serversWarningMembers[serverId][userId];
        console.log(`Warnings réinitialisés pour l'utilisateur ${userId} dans le serveur ${serverId}.`);

        // Supprime le serveur si plus aucun utilisateur n'y a de warnings
        if (Object.keys(serversWarningMembers[serverId]).length === 0) {
            delete serversWarningMembers[serverId];
        }
        await saveServersWarningMembersMap();
    } else {
        console.log(`Aucun warning trouvé pour l'utilisateur ${userId} dans le serveur ${serverId}.`);
    }
};

export const getWarnings = (serverId, userId) => {
    return serversWarningMembers[serverId]?.[userId] || 0;
};

export { serversWarningMembers };
