//pendiente de crear tabla
class User {
    constructor(ctx){
        this.id = ctx.id
        this.token = ctx.token
        this.username = ctx.username
        this.password = ctx.password
    }
}

module.exports = User