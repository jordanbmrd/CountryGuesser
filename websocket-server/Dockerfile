FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pcntl zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy composer files first
COPY composer.json composer.lock* ./

# Install dependencies and verify installation
RUN composer install --no-dev --no-interaction --prefer-dist && \
    test -f vendor/autoload.php && \
    test -d vendor/workerman/workerman && \
    echo "Composer dependencies installed successfully"

# Copy the rest of the application (vendor is excluded by .dockerignore)
COPY . .

EXPOSE 7777

CMD ["php", "server/server.php", "start"]
