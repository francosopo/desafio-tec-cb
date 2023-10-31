import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../src/app.module';

describe('General Payments Controller (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    })

    it('should return OK because is has balance', async () => {

        const res = await request(app).post('/send_payment')
            .set('X-AUTH-TOKEN', 'my_auth_token')
            .set('Content-Type', 'application/json')
            .send({
            transferCode:'franco.seguel@ug.uchile.cl',
            amount: 5000
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body).not.toBeNull();
        expect(res.body.transferCode).toBeDefined();
        expect(res.body.transferCode).not.toBeNull();
        expect(res.body.transferCode).not.toBeNaN()
        expect(res.body.transferCode).toBe('franco.seguel@ug.uchile.cl')
        expect(res.body.message).toBeDefined();
        expect(res.body.message).not.toBeNull();
        expect(res.body.message).toBe('Success');
        expect(res.body.details).toBe('Executed successfully');
    })

    it('should return INSUFFICIENT FUNDS because of balance', async () => {
        const transferCode: string = 'francoseguellucero@gmail.com'
        const res = await request(app).post('/send_payment').send({
            transferCode: transferCode,
            amount: 5000
        });

        expect(res.statusCode).toBe(400)
        expect(res.body).toBeDefined();
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeNaN();
        expect(res.body.transferCode).toBeDefined();
        expect(res.body.transferCode).not.toBeNull();
        expect(res.body.transferCode).toBe(transferCode);
        expect(res.body.message).toBeDefined();
        expect(res.body.message).not.toBeNull();
        expect(res.body.message).not.toBeNaN();
        expect(res.body.message).toBe('Cannot proccess request, INSUFFICIENT FUNDS');
        expect(res.body.details).toBeDefined();
        expect(res.body.details).not.toBeNull();
        expect(res.body.details).not.toBeNaN();
        expect(res.body.details).toBe("INSUFFICIENT FUNDS");
    })
});