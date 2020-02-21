const user = {
    _id: "1",
    name: "Allistair",
    email: "test@test.com",
    picture: "https//cloudinary.com/test"
}

module.exports = {
    Query: {
        me: () => user
    }
}