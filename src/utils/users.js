const users = []

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room}) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if(!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // check for existing user
    // Use filter to solve for this
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate user name
    if(existingUser) {
        return{
            error: 'User name taken'
        } 
    }

    // Save and store user
    const user = { id, username, room}
    users.push(user)
    return { user }

}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })
    
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {

    if(!id) {
        return {
            error: 'User not here'
        }
    }
    const me = users.find((user) => {
        return user.id === id
    })
    return me
}

const getUsersInRoom = (room) => {
    const all = users.filter((rooms) => rooms.room === room )
    return all
    
}

// addUser({
//     id: 22,
//     username: ' dano',
//     room: ' IbadAn'
// })


module.exports = {
    getUser,
    removeUser,
    addUser,
    getUsersInRoom
}