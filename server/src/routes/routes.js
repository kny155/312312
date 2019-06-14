import Router from 'koa-router';
import passport from 'koa-passport';

import {
	userController,
	parkingController,
	deviceController,
	statisticsController,
	authenticationController,
} from '../controllers';

const auth = (ctx, next) =>
	passport.authenticate('jwt', { session: false }, async (err, user) => {
		if (user === false) {
			ctx.throw(401);
		}
		await next(ctx);
	})(ctx);

const router = new Router();

router
	.get('/users', auth, userController.readByToken)
	.put('/users', auth, userController.update)
	.post('/parkings', auth, parkingController.create)
	.get('/parkings', parkingController.read)
	.get('/parkings-owner', auth, parkingController.readOwner)
	.get('/parkings/:id/seats', parkingController.readSeats)
	.get('/parkings/:id', parkingController.readById)
	.put('/parkings/:id', auth, parkingController.update)
	.delete('/parkings/:id', auth, parkingController.delete)
	.post('/devices', auth, deviceController.add)
	.delete('/devices/:id', auth, deviceController.delete)
	.get('/devices/:id', auth, deviceController.readDevices)
	.put('/devices', deviceController.update)
	.get('/statistics/:id', auth, statisticsController.readById)
	.post('/registration', authenticationController.registration)
	.post('/login', authenticationController.login)
	.get('/relogin', auth, authenticationController.relogin);

export const routes = () => router.routes();
export const allowedMethods = () => router.allowedMethods();
