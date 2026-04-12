# /backend/Dockerfile
FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip libzip-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions required for Laravel & TiDB
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy the backend code
COPY . .

# Install dependencies
RUN COMPOSER_MEMORY_LIMIT=-1 composer install --no-dev --optimize-autoloader --no-scripts --ignore-platform-reqs

# Expose the port Render assigns
EXPOSE $PORT

# THE FIX: Shell syntax to clear the cache, then boot the server
CMD php artisan optimize:clear && php artisan serve --host=0.0.0.0 --port=$PORT