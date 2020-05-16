export const executeCommand = (socket, command) => {
    socket.emit(command, {});
}