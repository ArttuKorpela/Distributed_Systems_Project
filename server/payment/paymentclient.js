const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Define the path to the protobuf file
const PROTO_PATH = './payment.proto';

// Load the protobuf file
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const paymentService = protoDescriptor.payment.PaymentService;

// Create a gRPC client
const client = new paymentService('localhost:50051', grpc.credentials.createInsecure());

// Define a function to call the service
function processPayment(phone_number, amount) {
    const paymentRequest = { phone_number, amount };
    client.ProcessPayment(paymentRequest, (error, response) => {
        if (!error) {
            console.log("Respone received from server: ", response);
            console.log('Payment status:', response.accepted ? 'Accepted' : 'Declined');
            if (response.accepted) {
                return true
            } else {
                return false
            }
            ;
        } else {
            console.error('Error:', error.message);
            return false;
        }
    });
}

module.exports = { processPayment }
