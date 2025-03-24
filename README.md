### 📌 `/api/register` – Register a Device

Registers a new device using a stored procedure in SQL Server. This endpoint checks if the device already exists in the database, and returns the appropriate result.

#### 🔗 Endpoint

```
POST /api/register
```

#### 🔒 Authentication

Include your API key in the request headers:

| Header Name | Value                    |
| ----------- | ------------------------ |
| `x-api-key` | `your-api-key-goes-here` |

---

#### 📅 Request Body (JSON)

| Field         | Type    | Required | Description                        |
| ------------- | ------- | -------- | ---------------------------------- |
| `device_id`   | string  | ✅ Yes   | Unique ID for the device           |
| `gender_id`   | integer | No       | Gender ID (defaults to `0`)        |
| `usertype_id` | integer | No       | User type ID (defaults to `0`)     |
| `country_id`  | integer | No       | Country ID (defaults to `0`)       |
| `lat`         | decimal | No       | Latitude (defaults to `0.000000`)  |
| `lon`         | decimal | No       | Longitude (defaults to `0.000000`) |

**Example:**

```json
{
  "device_id": "device123",
  "gender_id": 1,
  "usertype_id": 2,
  "country_id": 44,
  "lat": 12.345678,
  "lon": 76.54321
}
```

---

#### 📤 Response

##### ✅ Success (device registered or already exists)

```json
{
  "success": true,
  "device_id": "device123"
}
```

##### ❌ Failure (device not found or not registered)

```json
{
  "success": false,
  "message": "Device registration failed"
}
```

##### ⚠️ Error (e.g., missing fields or server/database issues)

```json
{
  "error": "Detailed error message here"
}
```

---

#### 🛠 Implementation Notes

- This route calls the `AA_register_device` stored procedure.
- Only stored procedures are used for all database communication.
- Optional fields default to `0` if not provided.
- Responses are dynamically constructed based on the result returned from the stored procedure.
