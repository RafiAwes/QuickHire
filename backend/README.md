# QuickHire Backend API

This is the Laravel-based backend for the QuickHire job portal. It provides a robust, RESTful API for managing job listings, applications, and taxonomies.

## 🔗 Project Links
- **[Main Project README](../README.md)** - Full project documentation and architecture.

## 🛠️ Tech Stack
- **Framework**: Laravel 11
- **Database**: MySQL / TiDB Cloud
- **ORM**: Eloquent
- **API Resources**: Laravel JSON Resources
- **Services**: Service-Layer pattern for business logic.

## 🚀 Setup & Local Development

### 1. Installation
```bash
composer install
```

### 2. Environment Configuration
Copy the `.env.example` file and configure your database settings:
```bash
cp .env.example .env
```

### 3. Key Generation & Database
```bash
php artisan key:generate
php artisan migrate --seed
```

### 4. Running the Server
```bash
php artisan serve
```

---

## 🏗️ Core Components

### Controllers
- `JobListingController`: Handles job discovery and management.
- `JobApplicationController`: Handles candidate applications.
- `TaxonomyController`: Provides categories, job types, and experience levels.

### Services
- `JobListingService`: Business logic for creating and filtering jobs.

### Seeders
- `CategorySeeder`, `JobTypeSeeder`, `ExperienceLevelSeeder`: Populates the taxonomy system.
- `JobListingSeeder`: Adds initial dummy data for development.

---

## 🧪 Testing

To run the backend tests:
```bash
php artisan test
```

## 📄 License
This project is open-sourced software licensed under the **MIT license**.
