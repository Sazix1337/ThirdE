const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const rand = Math.random() * 16 | 0
        const uuid = (c == 'x') ? rand : (rand & 0x3 | 0x8)
        return uuid.toString(16) 
    })
} 

module.exports = uuid