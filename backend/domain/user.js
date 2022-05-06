//pendiente de crear tabla
class User {
    constructor(ctx){
        this.id = ctx.id
        this.token = ctx.token
        this.username = ctx.username
        this.password = ctx.password
        this.isAdmin = ctx.isAdmin
    }
}

module.exports = User