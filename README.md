# dna-mutation

## 🧬 Overview

**dna-mutation** is a RESTful API service that analyzes DNA sequences to detect specific types of mutations. It also tracks and reports statistics about the DNA samples processed. The project is built using **Node.js**, **TypeScript**, **Express**, and **MongoDB** (via **Mongoose**).

The main purpose of this project, was to create a quick REST API with these technologies and handle some logic with NxN data structures.

[Quick Demo Here!](https://www.loom.com/share/7898d5c4b70a44ee8c9812eb420bd177?sid=674771c4-6d57-40fb-af1c-17f4fe2f42f2)

---

## 🚀 Features

- **Mutation Detection**
  Analyzes NxN DNA matrices to detect mutations based on repeated character sequences.

- **Statistics**
  Tracks and reports counts and ratios of mutated vs non-mutated DNA sequences.

- **Persistence**
  Stores each analyzed sequence and result in a MongoDB database.

---

## ⚙️ How It Works

### 1. Architecture

- **Express.js** for the REST API framework
- **TypeScript** for static typing
- **MongoDB + Mongoose** for database modeling and persistence
- **Jest** for unit testing
- **Celebrate/Joi** for request validation

### 2. Mutation Detection Algorithm

- DNA is represented as an array of strings (NxN matrix)
- Checks for 4 identical letters in the following directions:
  - Horizontally (→)
  - Vertically (↓)
  - Diagonally (↘)
  - Anti-diagonally (↙)
- DNA is considered mutated if **at least two** such sequences are found.

---

## 📡 API Endpoints

### `POST /mutation`

**Purpose:** Analyze a DNA sequence for mutation.

**Request Body:**

```json
{
  "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
}
```

**Validations:**

- Must be a square NxN matrix where N >= 4
- Only contains characters: A, T, C, G

**Responses:**

- `200 OK - { hasMutation: true/false }` – DNA has mutation based on true/false
- `500 Internal Server Error` – Invalid input or server failure

---

### `GET /stats`

**Purpose:** Get mutation statistics.

**Response:**

```json
{
  "count_mutations": 40,
  "count_no_mutations": 100,
  "ratio": 0.4
}
```

- `200 OK` on success
- `500 Internal Server Error` on failure

---

## 📁 Project Structure

Key components:

- `routes/DnaRoutes.ts` – Routes for `/mutation` and `/stats`
- `controllers/` – Mutation logic and stats handling
- `models/` – MongoDB schema definition
- `tests/` – Jest-based unit tests
- `middleware/` – Validation and error handling

---

## 🛠️ Tech Stack

- **Node.js + TypeScript** – Scalable and maintainable server logic
- **Express** – Routing and middleware support
- **Mongoose** – MongoDB object modeling
- **Celebrate/Joi** – Request validation
- **Jest** – Testing framework
- **dotenv** – Environment variable configuration
- **Nodemon** – Dev-time server reloading

---

## 🔧 Setup & Usage

### ✅ Prerequisites

- Node.js (v12+)
- npm
- MongoDB (local or MongoDB Atlas)

### 📦 Installation

```bash
git clone git@github.com:<your-username>/dna-mutation.git
cd dna-mutation
npm install
```

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/dna-mutation
```

---

### ▶️ Running the Application

```bash
npm run dev
```

Server starts at: `http://localhost:3000`

---

### 🧪 Running Tests

```bash
npm run test
```

---

## 📈 Extensibility & Future Improvements

- 🔐 **Authentication:** Add OAuth2/OpenID for secure access
- 📚 **API Docs:** Integrate Swagger/OpenAPI
- ☁️ **Cloud Hosting:** Deploy to AWS EC2 or similar
- 📊 **Advanced Stats:** Filtering, date range, detailed analytics
- ✍️ **CRUD Support:** Update/delete stored DNA entries
