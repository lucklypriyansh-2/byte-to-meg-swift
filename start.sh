#!/bin/bash

# ByteToMeg Application Starter
# Single script to run the entire application with Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker and try again."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

echo "🚀 ByteToMeg Application Starter"
echo "================================="
echo ""

# Parse command line arguments
case "${1:-start}" in
    start)
        print_status "Starting application with Docker..."
        docker-compose -f docker-compose.dev.yml up -d
        
        print_status "Waiting for services to be ready..."
        sleep 5
        
        echo ""
        echo "🎉 ByteToMeg Application is now running!"
        echo "========================================"
        echo ""
        echo "🌐 Application URLs:"
        echo "   Frontend:     http://localhost:8080"
        echo "   Backend API:  http://localhost:3001"
        echo "   Admin Panel:  http://localhost:8080/admin/login"
        echo ""
        echo "🔑 Admin Credentials:"
        echo "   Username: admin"
        echo "   Password: admin123"
        echo ""
        echo "📊 Useful Commands:"
        echo "   View logs:    ./start.sh logs"
        echo "   Stop app:     ./start.sh stop"
        echo "   Restart app:  ./start.sh restart"
        echo "   Rebuild app:  ./start.sh rebuild"
        echo ""
        ;;
        
    stop)
        print_status "Stopping application..."
        docker-compose -f docker-compose.dev.yml down
        print_success "Application stopped"
        ;;
        
    restart)
        print_status "Restarting application..."
        docker-compose -f docker-compose.dev.yml restart
        print_success "Application restarted"
        ;;
        
    rebuild)
        print_status "Rebuilding and starting application..."
        docker-compose -f docker-compose.dev.yml down
        docker-compose -f docker-compose.dev.yml up --build -d
        
        print_status "Waiting for services to be ready..."
        sleep 5
        
        print_success "Application rebuilt and started"
        echo ""
        echo "🌐 Access at: http://localhost:8080"
        ;;
        
    logs)
        print_status "Showing application logs (Ctrl+C to exit)..."
        docker-compose -f docker-compose.dev.yml logs -f
        ;;
        
    status)
        print_status "Application status:"
        docker-compose -f docker-compose.dev.yml ps
        ;;
        
    clean)
        print_status "Cleaning up Docker resources..."
        docker-compose -f docker-compose.dev.yml down -v
        print_success "Cleanup completed"
        ;;
        
    help|--help|-h)
        echo "Usage: ./start.sh [command]"
        echo ""
        echo "Commands:"
        echo "  start     Start the application (default)"
        echo "  stop      Stop the application"
        echo "  restart   Restart the application"
        echo "  rebuild   Rebuild and restart the application"
        echo "  logs      View application logs"
        echo "  status    Show container status"
        echo "  clean     Stop and remove all containers and volumes"
        echo "  help      Show this help message"
        echo ""
        ;;
        
    *)
        print_error "Unknown command: $1"
        echo "Run './start.sh help' for usage information"
        exit 1
        ;;
esac
