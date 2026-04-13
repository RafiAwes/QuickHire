# QuickHire Backend API

This is the Laravel-based backend for the QuickHire job portal. It provides a robust, RESTful API for managing job listings, applications, and taxonomies.

## 🔗 Project Links
- **[Main Project README](../README.md)** - Full project documentation and architecture.

## 🛠️ Tech Stack
- **Framework**: Laravel 12
- **Database**: MySQL / TiDB Cloud
- **ORM**: Eloquent
- **API Resources**: Laravel JSON Resource
s
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

## 📖 API Reference

The API follows RESTful conventions and returns JSON responses.

### Base URL
`http://localhost:8000/api` (Local)

### 💼 Job Listing Endpoints

#### 1. Retrieve All Jobs
- **Endpoint**: `GET /jobs`
- **Response**: List of active job listings with categories and types.

#### 2. Create Job Listing
- **Endpoint**: `POST /jobs`
- **Request Body**:
  ```json
  {
    "title": "Senior Developer",
    "company": "Tech Corp",
    "location": "New York, NY",
    "category": "Technology",
    "description": "Full job description...",
    "type": "Full-time",
    "level": "Senior",
    "salary": "$120k - $150k",
    "logo": "https://example.com/logo.png"
  }
  ```

#### 3. View Job Details
- **Endpoint**: `GET /jobs/{id}`
- **Response**: Single job listing object.

#### 4. Delete Job
- **Endpoint**: `DELETE /jobs/{id}`

---

### 📄 Job Application Endpoints

#### 1. Submit Application
- **Endpoint**: `POST /applications`
- **Request Body**:
  ```json
  {
    "jobId": "uuid-string",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "resumeUrl": "https://example.com/resume.pdf",
    "coverNote": "I am excited to apply..."
  }
  ```

#### 2. View All Applications
- **Endpoint**: `GET /applications`
- **Response**: List of all submitted applications.

---

### 🏷️ Taxonomy Endpoints

#### 1. Get Categories & Types
- **Endpoint**: `GET /taxonomies`
- **Response**:
  ```json
  {
    "categories": [...],
    "jobTypes": [...],
    "experienceLevels": [...]
  }
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
