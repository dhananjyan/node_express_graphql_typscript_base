import server from "./src/server";

server().catch((err) => {
    console.error("Server Failed to Start")
    console.error(err)
});
