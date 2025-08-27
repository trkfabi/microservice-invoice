# Microservice Invoice

A Node.js microservice for electronic invoice management and integration with the Spanish Tax Agency (AEAT) VeriFactu system.

## Overview

This microservice serves as a starting point for electronic invoice processing and integration with the Spanish AEAT (Agencia Estatal de Administración Tributaria) using the VeriFactu protocol.

**Note: This is a work in progress.** The project provides a foundation for invoice lifecycle management, QR code generation, and asynchronous processing through Redis queues, but several features are still under development or require implementation.

## Features

### Implemented

- **Electronic Invoice Creation**: Basic invoice creation functionality
- **SOAP Type Mapping**: WSDL/XSD schemas mapped to TypeScript types and interfaces
- **QR Code Generation**: Automatic QR code generation for invoice verification
- **SHA-256 Hashing**: Cryptographic integrity validation for invoice data
- **Queue Processing**: Asynchronous batch processing foundation with Redis and Bull
- **API Documentation**: Swagger/OpenAPI documentation structure
- **Database Schema**: PostgreSQL with Prisma ORM setup

### In Development / Missing

- **Complete AEAT Integration**: SOAP communication is partially implemented but not fully functional
- **Invoice Modification**: Endpoint exists but logic needs implementation
- **Invoice Cancellation**: Endpoint exists but logic needs implementation
- **Status Queries**: Both AEAT and local status endpoints need implementation
- **Certificate Management**: Digital certificate handling requires setup
- **Authentication/Authorization**: Security layer not implemented
- **Complete Validation**: Input validation and business rule enforcement
- **Error Handling**: Comprehensive error management and logging

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Queue System**: Redis + Bull
- **Testing**: Jest + Supertest
- **Documentation**: Swagger/OpenAPI
- **Build Tools**: Babel, TypeScript Compiler
- **Development**: Nodemon, ts-node

## Prerequisites

- Node.js >= 18.x
- PostgreSQL >= 12.x
- Redis >= 6.x
- Digital certificate (.p12 format) for AEAT communication

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/microservice-invoice.git
cd microservice-invoice
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Copy environment template
cp .env.example .env.development

# Edit the configuration file
nano .env.development
```

4. Configure the database:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) Seed the database
npx prisma db seed
```

## Environment Configuration

Create environment-specific files (.env.development, .env.production, .env.staging) with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/invoice_db

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
QUEUE_NAME=AEATProcessingQueue

# AEAT Certificate
CERTIFICATE_PASSPHRASE=your_certificate_password

# Sistema Informatico Configuration
SISTEMA_INFORMATICO_NOMBRE_RAZON=Your Company Name
SISTEMA_INFORMATICO_NIF=B12345678
SISTEMA_INFORMATICO_NOMBRE=Your System Name
SISTEMA_INFORMATICO_ID=SYSTEM001
SISTEMA_INFORMATICO_NUMERO_INSTALACION=INST001
```

## Usage

### Development Mode

Start the development server with hot reloading:

```bash
npm run start:dev
```

Start the queue worker in development:

```bash
npm run start:queue:dev
```

### Production Mode

Build and start the production server:

```bash
npm run build
npm run start:prod
```

Start the queue worker in production:

```bash
npm run start:queue:prod
```

### Testing

Run the test suite:

```bash
npm run start:test
```

## API Endpoints

### Invoice Management

- `POST /api/invoice/create` - Create a new invoice (Implemented)
- `PUT /api/invoice/modify` - Modify an existing invoice (Endpoint only - needs implementation)
- `POST /api/invoice/cancel` - Cancel an invoice (Endpoint only - needs implementation)
- `POST /api/invoice/status` - Get invoice status from AEAT (Endpoint only - needs implementation)
- `GET /api/invoice/status` - Get local invoice record status (Endpoint only - needs implementation)
- `POST /api/invoice/list` - List invoices with filters (Endpoint only - needs implementation)
- `POST /api/invoice/download` - Download invoice data (Endpoint only - needs implementation)

### API Documentation

Access the Swagger documentation at:

```
http://localhost:3000/api
```

## Request Example

### Create Invoice

```json
POST /api/invoice/create
Content-Type: application/json

{
  "payload": {
    "serie": "A",
    "numero": "001",
    "fecha_expedicion": "31-12-2024",
    "tipo_factura": "F1",
    "descripcion": "Invoice description",
    "lineas": [
      {
        "base_imponible": "100.00",
        "tipo_impositivo": "21",
        "cuota_repercutida": "21.00"
      }
    ],
    "importe_total": "121.00"
  }
}
```

### Response

```json
{
  "success": true,
  "message": "",
  "results": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "estado": "P",
    "url": "https://aeat.es/ValidarQR?nif=...",
    "qr": "data:image/png;base64,..."
  }
}
```

## Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: System users with role-based access
- **Companies**: Company information for invoice issuers
- **Invoices**: Complete invoice data and metadata
- **InvoiceLines**: Individual invoice line items
- **Records**: Processing records for AEAT submission
- **ErroresAEAT**: AEAT error codes and descriptions

## Queue Processing

The system uses Redis and Bull for asynchronous processing:

- **Batch Processing**: Groups multiple invoices for efficient AEAT submission
- **Retry Logic**: Automatic retry on failures with exponential backoff
- **Status Tracking**: Real-time processing status updates
- **Error Handling**: Comprehensive error logging and recovery

## Certificate Management

Digital certificates for AEAT communication should be placed in:

```
src/certificates/
```

Supported formats:

- PKCS#12 (.p12, .pfx)

## Development

### Project Structure

```
src/
├── app.ts                 # Application entry point
├── config/                # Configuration files
│   ├── config.ts         # Main configuration
│   ├── database.ts       # Database configuration
│   ├── env-loader.ts     # Environment loader
│   └── swagger.config.ts # API documentation setup
├── controllers/           # Request handlers
├── services/             # Business logic
├── queues/               # Queue processors
├── routes/               # API routes
├── utils/                # Utility functions
├── types/                # TypeScript definitions
├── generated/            # Auto-generated SOAP client code
└── tests/                # Test files
```

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks

### Testing

The project includes:

- Unit tests with Jest
- Integration tests with Supertest
- API endpoint testing
- Database testing with test containers

## Deployment

### Docker (Recommended)

```dockerfile
# Example Dockerfile structure
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start:prod"]
```

### PM2 Process Manager

Production and development configurations are provided:

```bash
# Development
pm2 start pm2.development.json

# Production
pm2 start pm2.production.json
```

## Monitoring and Logging

- **Health Checks**: Built-in health check endpoints
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Response time and throughput monitoring
- **Queue Monitoring**: Queue status and processing metrics

## Security Considerations

- **Certificate Security**: Secure certificate storage and rotation
- **API Authentication**: Implement proper authentication mechanisms
- **Rate Limiting**: Protect against abuse and DoS attacks
- **Input Validation**: Comprehensive request validation
- **CORS Configuration**: Properly configured cross-origin policies

## Current Status and Roadmap

This project is in active development. The following areas need attention:

### High Priority

- Complete AEAT SOAP integration and testing
- Implement missing endpoint logic (modify, cancel, status, list, download)
- Add comprehensive input validation
- Implement proper error handling and logging
- Set up authentication and authorization

### Medium Priority

- Add comprehensive test coverage
- Implement certificate management
- Add monitoring and health checks
- Improve queue processing robustness

### Low Priority

- Performance optimization
- Advanced features and configuration options

## Contributing

Contributions are welcome! This project needs help in several areas:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests for new features
- Update documentation for new features
- Follow semantic versioning for releases
- Focus on completing missing functionality before adding new features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue in the GitHub repository
- Review the API documentation at `/api`
- Check the troubleshooting section in the wiki

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and releases.

## Acknowledgments

- Spanish Tax Agency (AEAT) for VeriFactu specification
- Contributors and maintainers
- Open source community for tools and libraries used
