import {Body, Controller, Post, Headers, Res} from "@nestjs/common";
import {GeneralPaymentBodyDTO, GeneralPaymentHeaders} from "./dto/general.payment.dto";
import {PaymentResponseInterface} from "../../../domain/payments/interfaces/payment.response.interface";
import {GeneralPaymentUsecases} from "../../../usecases/general_payments/general.payment.usecases";
import {GeneralPaymentStateService} from "../../../domain/payments/states/general.payment.state.service";
import {Response} from "express"
import {BaseException} from "../../../domain/exceptions/base.exception";
@Controller('general_payment')
export class GeneralPaymentController
{
    private generalPaymentUsecase: GeneralPaymentUsecases;
    constructor(private readonly generalPaymentStateService: GeneralPaymentStateService) {
        this.generalPaymentUsecase = new GeneralPaymentUsecases(this.generalPaymentStateService);
    }
    @Post('send_payment')
    async doPayment(@Headers() generalPaymentHeaders: GeneralPaymentHeaders, @Body() bodyDTO: GeneralPaymentBodyDTO, @Res() res: Response): Promise<PaymentResponseInterface>
    {
        try{
            if (generalPaymentHeaders.x_general_payment != 'MAKE-GENERAL-PAYMENT')
            {
                res.status(403).json({
                    transferCode: bodyDTO.transferCode,
                    status:403,
                    message: "Forbidden",
                    details: "Contact to CurrencyBird to get the appropriated payload configuration"
                })
                return ;
            }
            const myres = await this.generalPaymentUsecase.executePayment(bodyDTO.transferCode, bodyDTO.amount);
            res.status(myres.status).json(
                myres
            )
        }catch(e: any)
        {
            if (e instanceof BaseException){
                console.log("Error while executing payment")
                console.log(e);
                res.status(e.getStatus()).json({
                    transferCode: bodyDTO.transferCode,
                    status: e.getStatus(),
                    message:e.getMessage(),
                    details: "Cannot process your request"
                })
                return ;
            }
            console.log(`Unknown Error: ${e}`)
            res.status(500).json({
                transferCode:bodyDTO.transferCode,
                status: 500,
                message: "Something bad happen, e.p"
            })
            return
        }
    }
}