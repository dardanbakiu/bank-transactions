<h1>Bank Transaction API Documentation</h1>

<p>This is the documentation for the Bank Transaction RESTful API implemented using NestJS and TypeORM. The API allows users to perform bank transactions and calculates bonuses based on certain conditions. It provides various endpoints for user registration, authentication, bank transactions, and sorting users by bonuses. The API is secured using authentication mechanisms, and it utilizes a MySQL database for data storage.</p>

<h2>Getting Started</h2>

<p>To run the API locally, follow the steps below:</p>

<h3>Prerequisites</h3>

<ul>
  <li>Node.js (version 18 or above)</li>
  <li>MySQL database (running locally or accessible via connection string)</li>
</ul>

<h3>Installation</h3>

<ol>
  <li>Clone the repository:</li>
</ol>

<pre><code>git clone https://github.com/your-username/bank-transactions.git</code></pre>

<ol start="2">
  <li>Install the dependencies:</li>
</ol>

<pre><code>cd bank-transactions
yarn install</code></pre>

<ol start="3">
  <li>Configuration:</li>
</ol>

<ul>
  <li>Rename the <code>.env.example</code> file to <code>.env</code>.</li>
  <li>Update the values in the <code>.env</code> file to match your local environment configuration, including the database connection details.</li>
</ul>

<ol start="4">
  <li>Database Setup:</li>
</ol>

<ul>
  <li>Create a MySQL database with the specified name and credentials in the <code>.env</code> file.</li>
  <li>Run database migrations to create the necessary tables by executing the following command:</li>
</ul>

<pre><code>sudo yarn migration:run</code></pre>

<ol start="5">
  <li>Start the application:</li>
</ol>

<pre><code>yarn start</code></pre>

<p>The API will now be accessible at <code>http://localhost:3000</code>.</p>

<h2>API Endpoints</h2>

<p>The API exposes the following endpoints:</p>

<h3>Authentication</h3>

<ul>
  <li><code>POST /user/register</code> - Register a new user.</li>
  <li><code>POST /user/login</code> - Log in and retrieve an access token.</li>
</ul>

<h3>Bank Transactions</h3>

<ul>
  <li><code>POST /transaction/deposit</code> - Perform a deposit transaction.</li>
  <li><code>POST /transaction/withdrawal</code> - Perform a withdrawal transaction.</li>
</ul>

<h3>Sorting Users</h3>

<ul>
  <li><code>GET /user/bonus</code> - Get a sorted list of users based on their bonus balances.</li>
</ul>

<h2>Authentication and Authorization</h2>

<p>The API uses JSON Web Tokens (JWT) for authentication. When a user successfully logs in, an access token is generated and returned in the response. This access token should be included in the <code>Authorization</code> header for subsequent authenticated requests in the format: <code>Bearer &lt;access_token&gt;</code>.</p>

<p>To access the protected endpoints, the requests must include a valid access token. If the token is missing or invalid, the API will respond with an appropriate error.</p>

<h2>Error Handling</h2>

<p>The API provides detailed error responses in case of any failures or invalid requests. Error responses include appropriate status codes and error messages to help identify and resolve the issues. Examples of possible errors include invalid transactions, insufficient balance, unauthorized access, or validation failures.</p>

<h2>Database Integration</h2>

<p>The API integrates with a MySQL database using TypeORM. TypeORM manages the database schema and provides versioning capabilities. Database migrations are used to create the necessary tables and keep the schema up to date. If any changes are made to the entities, new migrations can be generated and applied using the following command:</p>

<pre><code>sudo yarn migration:generate -- db/migrations/{MigrationName}
sudo yarn migration:run</code></pre>

<h2>Swagger Documentation</h2>

<p>Swagger documentation is available for the API. After starting the application, you can access the Swagger UI at <code>http://localhost:3000/api</code>. The Swagger UI provides an interactive interface to explore the API endpoints, view request/response schemas, and test the API directly.</p>

<h2>Additional Information</h2>

<ul>
  <li>The API follows RESTful principles and utilizes appropriate HTTP methods for each endpoint.</li>
  <li>Input data is validated and sanitized to prevent security vulnerabilities such as SQL injection and cross-site scripting.</li>
  <li>Design patterns and coding best practices are followed to ensure a clean and maintainable codebase.</li>
</ul>

<h2>Contributing</h2>

<p>If you would like to contribute to the development of this project, please follow the guidelines specified in the CONTRIBUTING.md file.</p>

<h2>License</h2>

<p>This project is licensed under the <a href="https://opensource.org/licenses/MIT">MIT License</a>. Feel free to use and modify the code according to your needs.</p>

<h2>Contact</h2>

<p>If you have any questions or suggestions regarding this API, please contact <a href="mailto:your-email@example.com">your-name</a>.</p>

<p><strong>Note:</strong> Replace "your-username" and "your-name" with your GitHub username and name, respectively, in the URLs and contact information provided above.</p>
