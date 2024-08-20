# B Airways Airline Reservation System

## Project Overview

This project was developed as part of the Semester 3 Database Systems Module. It involved the design and implementation of a full-stack application integrated with a MySQL database to manage an airline reservation system for B Airways, a subsidiary of Virgin Airlines. The system includes a user interface for booking flights and an admin panel for data analytics. The primary focus was on creating an optimized and secure database that follows the Boyce-Codd Normal Form (BCNF) for improved performance. Key security measures, such as Stored Procedures and Input Validation, were implemented to protect against SQL injection attacks.

## Getting Started

This section will guide you through setting up the Airline Reservation System on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js**: [Download and install Node.js](https://nodejs.org/) (includes npm).
- **MySQL**: [Download and install MySQL](https://www.mysql.com/downloads/).
- **Git**: [Download and install Git](https://git-scm.com/).
- **npm**: Node.js package manager (comes with Node.js).

### Installation

1. **Clone the Repository**

   Clone the project repository to your local machine using the following command:

   ```bash
   git clone https://github.com/k-ranasinghe/airline-reservation-system.git
   ```

2. **Navigate to the Project Directory**

   Change your directory to the project folder:

   ```bash
   cd airline-reservation-system
   ```

3. **Install Backend Dependencies**

   Navigate to the backend directory and install the necessary dependencies using npm:

   ```bash
   cd air-backend
   npm install
   ```

4. **Install Frontend Dependencies**

   Navigate to the frontend directory and install the necessary dependencies using npm:

   ```bash
   cd ../air
   npm install
   ```

5. **Set Up MySQL Database**

   Log in to your MySQL server using the command:

   ```bash
   mysql -u root -p
   ```

   Create a new database for the project:

   ```bash
   CREATE DATABASE airline;
   ```

   Import the initial schema and data into the newly created database:

   ```bash
   mysql -u root -p airline < ../DatabaseExport.sql
   ```

5. **Start the Backend Server**

   Navigate to the backend directory and start the Express server:

   ```bash
   cd air-backend
   npm run devStart
   ```

5. **Start the Frontend Development Server**

   In a new terminal window, navigate to the frontend directory and start the React development server:

   ```bash
   cd ../air
   npm start
   ```

If all the above processes are completed without any issues, the web application will open in your default browser on `http://localhost:3000`

## System Functionality

The Airline Reservation System was built to cater to B Airways' expanding operations, which now cover multiple destinations across Southeast Asia and South Asia. The system supports all the necessary components for booking flights, including user registration, flight search, seat selection, and booking confirmation. Additionally, an admin panel provides various analytics capabilities to assist in decision-making and operational management.

### User Features

1. **User Login**: 
    - Users can either log in as registered members or continue as guests.
    - Registered users are categorized as Frequent or Gold members, receiving discounts of 5% and 9% on ticket prices, respectively.
    ![image](https://github.com/user-attachments/assets/1ec9d4d7-ae92-4f33-8c7c-fd3ed6d19c3b)

2. **Flight Search**:
    - Users can search for available flights based on their origin and destination.
    - The system provides a schedule of flights, allowing users to select the most convenient option.
    ![image](https://github.com/user-attachments/assets/621211ad-18b0-4c3d-b2e5-d196c38fa611)

3. **User Detail Collection**:
    - Users have to enter necessary personal information to implement a booking.
    - If the user has logged into the account when entering the web application, then these information would be auto-filled. Only guest users need to fill this section.
    ![image](https://github.com/user-attachments/assets/1c6638e7-eadf-4db7-b9a1-cc7e193f4a1f)

4. **Seat Selection**:
    - Users can choose their seats from the available options. The system ensures that no two users can select the same seat.
    - The airline does not overbook seats, maintaining a one-to-one correspondence between bookings and available seats.
    ![image](https://github.com/user-attachments/assets/4c50b446-0c8e-4b2c-97c7-70a7b7c73efa)

5. **Booking Completion**:
    - After seat selection, users proceed to payment (handled externally) and complete the booking process.
    - A ticket is generated upon successful payment.
    ![image](https://github.com/user-attachments/assets/0d446df4-6473-4c18-8d49-766240f806be)
    ![image](https://github.com/user-attachments/assets/fccefacd-b0ed-4c61-9752-ab2e43d9fd75)

### Admin Features

The admin panel is accessible to users with admin authorization and includes the following sections:

1. **Flight Analysis**:
    - Provides passenger statistics and flight data for specific flight numbers.

2. **Destination Analysis**:
    - Displays travel statistics for specific destinations within a given date range.

3. **Booking Analysis**:
    - Offers insights into booking trends over a selected period.

4. **Route Analysis**:
    - Presents passenger statistics and flight data for specific routes.

5. **Revenue Analysis**:
    - Generates revenue data segmented by aircraft type.

![image](https://github.com/user-attachments/assets/7016a1f1-4fb9-4f36-93a9-ef7b166ac399)

![image](https://github.com/user-attachments/assets/febd6b1f-ef36-4255-89d0-81a19c183f17)

![image](https://github.com/user-attachments/assets/88ef7f3c-51d1-4fd4-9f5f-0c6d412e3f0f)

### Database Design

The database design is the core component of this project, following best practices to ensure data integrity, consistency, and performance. Key aspects include:

- **Normalization**: The database schema is normalized to Boyce-Codd Normal Form (BCNF) to eliminate redundancy and improve data integrity.
- **ACID Compliance**: Procedures, functions, and triggers are employed to maintain Atomicity, Consistency, Isolation, and Durability (ACID) properties in all transactions.
- **Indexing**: Appropriate indexing is applied to optimize query performance.
- **Security**: Stored Procedures and Input Validation techniques are implemented to safeguard the system against SQL injection attacks.

![image](https://github.com/user-attachments/assets/a2d253e6-9314-40eb-954b-69b5dc1e2cbd)

### Reporting Capabilities

The system is designed to generate several critical reports that aid in airline operations:

1. **Passenger Lists**:
    - Lists all passengers traveling on a given flight (next immediate flight), categorized by age group (below 18 and above 18).

2. **Destination Traffic**:
    - Reports the number of passengers traveling to a specific destination within a specified date range.

3. **Booking Trends**:
    - Shows the number of bookings categorized by passenger type (e.g., Frequent, Gold) over a given period.

4. **Route Analysis**:
    - Provides historical data on flights, including states and passenger counts for specific origin-destination pairs.

5. **Revenue Reports**:
    - Calculates total revenue generated by each aircraft type.

## Assumptions and Data Population

Given the scope of the project, certain assumptions were made where explicit details were not provided. The database was populated with data for the destinations and flights specified, including:

- **Flight Data**: At least 30 flights were created, covering routes between the specified airports.
- **Flight Schedule**: A flight schedule for at least 7 days was predefined in the database.
- **Airport Codes**: The system includes universally agreed airport codes and city-based location hierarchies.

## Conclusion

This Airline Reservation System provides a comprehensive solution for managing B Airways' expanding operations. With a robust database design and user-friendly interface, the system ensures efficient flight bookings and offers powerful analytical tools to assist in decision-making. The project demonstrates the application of advanced database principles and security measures in a real-world scenario.
