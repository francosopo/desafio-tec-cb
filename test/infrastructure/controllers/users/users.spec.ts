import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../../../src/app.module";
import * as request from 'supertest';

describe('final user test',  () => {
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

    it('should register a new user', async  () => {
        const res = await request(app.getHttpServer())
            .post('/users/sign_up')
            .set('Content-Type', 'application/json')
            .send({
                email: 'franco.seguel@ug.uchile.cl',
                password: 'mi_password_s3cr3t4',
                balance: 9000
            });
        console.log(res.body);
        expect(res.statusCode).toBeDefined();
        expect(res.statusCode).not.toBeNull();
        expect(res.statusCode).toBe(201);
    })
})