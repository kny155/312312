import { User } from '../model';
import { getIdByToken } from '../business/authentication';
import { getUserObj } from '../business/user';

const userController = {
	readByToken: async ctx => {
		const id = await getIdByToken(ctx.headers);
		const user = await User.findById(id);
		if (!user) {
			ctx.status = 401;
		} else {
			ctx.body = getUserObj(user);
		}
	},
	update: async ctx => {
		const newUser = ctx.request.body;
		const id = await getIdByToken(ctx.headers);
		await User.findByIdAndUpdate(id, newUser);
		const user = await User.findById(id);
		if (!user) {
			ctx.status = 401;
		} else {
			ctx.body = getUserObj(user);
		}
	},
};

export default userController;
