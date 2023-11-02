import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from "../services/DeleteCustomerService";

interface DeleteCustomerProps {
  id: string;
}

class DeleteCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as DeleteCustomerProps;

    const customerService = new DeleteCustomerService();
    const customer = await customerService.execute({ id });

    reply.send(customer);
  }
}

export { DeleteCustomerController };
