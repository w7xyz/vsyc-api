import { Sequelize, Op, DataTypes } from "sequelize";
import Chalk from "chalk";

class MysqlDatabase extends Sequelize {
    constructor() {
        super('', {
            logging: false,
            dialect: 'mysql',
            timezone: '-03:00'
        })
        this.authenticate().then(() => console.log(Chalk.yellow('[MYSQL] ') + 'Banco de dados conectado!'))
    }

    async loadModels() {
        this.users = await import('./models/User.js').then(model => model.default(this, DataTypes))
        this.profiles = await import('./models/Profile.js').then(model => model.default(this, DataTypes))
        this.cooldowns = await import('./models/Cooldowns.js').then(model => model.default(this, DataTypes))
        this.transactions = await import('./models/Transactions.js').then(model => model.default(this, DataTypes))
        this.reputations = await import('./models/Reputations.js').then(model => model.default(this, DataTypes))
        this.raffle = await import('./models/Raffle.js').then(model => model.default(this, DataTypes))
        this.command = await import('./models/Command.js').then(model => model.default(this, DataTypes))
        this.system = await import('./models/System.js').then(model => model.default(this, DataTypes))
        this.buyers = await import('./models/Buyers.js').then(model => model.default(this, DataTypes))

        this.sync({ alter: true })
    }

    async getUser(user_id) {
        let data = await this.users.findOrCreate({
            where: { id: user_id },
            raw:true
        })
        return data[0]
    }

    async updateUser(user_id, data) {
        return await this.users.update(data, {
            where: { id: user_id }
        })
    }

    async updateUserMoney(user_id, amount) {
        let data = await this.getUser(user_id)

        return await this.users.update({
            money: data.money + amount
        }, {
            where: { id: user_id }
        })
    }

    async updateUserReputations(user_id, amount) {
        let data = await this.getProfile(user_id)

        return await this.profiles.update({
            reps: data.reps + amount
        }, {
            where: { id: user_id }
        })
    }

    async updateUserCooldowns(user_id, cooldown, timestamp) {
        return await this.cooldowns.update({
            [cooldown]: timestamp
        }, {
            where: { id: user_id }
        })
    }

    async updateUserPremium(user_id, timestamp) {
        return await this.users.update({
            premium: timestamp
        }, {
            where: { id: user_id }
        })
    }

    async getUserCooldowns(user_id) {
        let user_cd = await this.cooldowns.findOrCreate({
            where: { id: user_id }
        })
        return user_cd[0]
    }

    async getPremium(user_id) {
        let data = await this.users.findOrCreate({
            where: { id: user_id },
            raw: true
        })

        return {
            status: data[0].premium > Date.now(),
            timestamp: data[0].premium
        }
    }

    async createTransaction(data) {
        return await this.transactions.create(data)
    }

    async createTransactions(data) {
        return await this.transactions.bulkCreate(data)
    }

    async getProfile(user_id) {
        let profile =  await this.profiles.findOrCreate({
            where: { id: user_id },
            raw:true
        })
        return profile[0]
    }

    async getRaffle(client_id) {
        return await this.raffle.findOne({ where: { id: client_id }, raw:true })
    }

	async verifyUser(user_id) {
		return await this.buyers.count({
			where: {
				author: user_id
			},
			raw: true
		})
	}

    async ticketCounter(filter = {}) {
		return await this.buyers.count({
			where: filter
		})
	}

    
	async updateRaffle(author, client_id, tickets) {
		let data = []
		let new_user = await this.verifyUser(author.id) > 0 ? 0 : 1
		for (let i = 0; i < tickets; i++) {
			data.push({
				author: author.id,
				buyed_at: Date.now()
			})
		}
		await this.buyers.bulkCreate(data)

		let raffle_info = await this.getRaffle(client_id)
		let ticket_count = await this.ticketCounter()
		await this.raffle.update({
			quantity: ticket_count * 250,
			total: ticket_count,
			participants: raffle_info.participants + new_user
		}, {
			where: {
				id: client_id
			}
		})

	}


    async getSystem() {
        return await this.system.findOne({ where: { id: 1 } }).then(x => x.dataValues)
    }
}

export default new MysqlDatabase()