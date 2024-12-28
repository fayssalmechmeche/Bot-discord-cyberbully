import { refreshCommands } from "./src/interactionHandlers.js";
import { loadServersWarningMembersMap } from "./src/fileOperations.js";

await loadServersWarningMembersMap();
await refreshCommands();
