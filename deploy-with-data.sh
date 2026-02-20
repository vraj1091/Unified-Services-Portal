#!/bin/bash

# Unified Services Portal - Deployment Script with Data Seeding
# This script builds and deploys the application with data

set -e

echo "=========================================="
echo "Unified Services Portal - Deployment"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker found${NC}"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗ Docker Compose is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker Compose found${NC}"

# Step 1: Build images
echo ""
echo -e "${YELLOW}Step 1: Building Docker images...${NC}"
docker-compose build --no-cache

echo -e "${GREEN}✓ Images built successfully${NC}"

# Step 2: Start services
echo ""
echo -e "${YELLOW}Step 2: Starting services...${NC}"
docker-compose up -d

echo -e "${GREEN}✓ Services started${NC}"

# Step 3: Wait for backend to be ready
echo ""
echo -e "${YELLOW}Step 3: Waiting for backend to be ready...${NC}"
sleep 10

# Check if backend is healthy
for i in {1..30}; do
    if docker-compose exec -T backend curl -f http://localhost:8000/health > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Backend is healthy${NC}"
        break
    fi
    echo "Waiting for backend... ($i/30)"
    sleep 2
done

# Step 4: Verify data
echo ""
echo -e "${YELLOW}Step 4: Verifying data...${NC}"

GRANT_COUNT=$(docker-compose exec -T backend curl -s http://localhost:8000/api/grants | grep -o '"id"' | wc -l)

if [ "$GRANT_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ Data verified: $GRANT_COUNT grants found${NC}"
else
    echo -e "${YELLOW}⚠ No grants found, seeding database...${NC}"
    docker-compose exec -T backend python seed_all_data.py
    echo -e "${GREEN}✓ Database seeded${NC}"
fi

# Step 5: Display status
echo ""
echo "=========================================="
echo -e "${GREEN}✓ DEPLOYMENT SUCCESSFUL${NC}"
echo "=========================================="
echo ""
echo "Services Status:"
docker-compose ps
echo ""
echo "Access your application:"
echo "  Frontend: http://localhost:80"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo ""
echo "View logs:"
echo "  docker-compose logs -f backend"
echo "  docker-compose logs -f frontend"
echo ""
echo "Stop services:"
echo "  docker-compose down"
echo ""

