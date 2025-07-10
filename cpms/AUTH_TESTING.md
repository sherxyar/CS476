# NextAuth Session and Role-Based Access Control Testing

Follow these steps to test if NextAuth authentication and role-based access control are working properly in the application.

## Step 1: Start the Application
Run the application with:
```
npm run dev
```

## Step 2: Login Flow
1. Navigate to http://localhost:3000/auth/login
2. Enter your email and password
3. On the MFA page, enter the 6-digit code sent to your email
4. After successful authentication, you'll be redirected to the test page

## Step 3: Verify Session
At http://localhost:3000/auth/test, you should see:
- Your user information including name, email, and role
- The full session object with all details
- Confirmation that NextAuth is working correctly

## Step 4: Test Role-Based Access for Different Roles

### Admin/Project Manager Testing:
1. Login with an admin account (accountRole = "ADMIN" or "PROJECT_MANAGER")
2. Navigate to a project and open the Financials Tab
3. Verify you can:
   - View financial history
   - Update budget and forecast values
   - Add new invoices
   - View all financial details

### Contributor Testing:
1. Login with a contributor account (accountRole = "CONTRIBUTOR")
2. Navigate to a project and open the Financials Tab
3. Verify you can ONLY:
   - Add new invoices
4. Verify you CANNOT:
   - View financial history (button should be disabled)
   - Update budget or forecast values (no access to the form)
   - Access sensitive financial information

### Unauthenticated User Testing:
1. Log out completely
2. Try to access the Financials Tab
3. Verify you are either:
   - Redirected to the login page, OR
   - See disabled controls with appropriate error messages

## Step 5: Invoice Management Testing

### As a Contributor:
1. Login with a contributor account
2. Navigate to a project's Financials Tab
3. Click "Add Invoice"
4. Fill in all required fields and submit
5. Verify the invoice is added successfully
6. Try to access other financial features and verify they're properly restricted

### As an Admin:
1. Login with an admin account
2. Navigate to a project's Financials Tab
3. Verify you can see all invoices added by contributors
4. Try updating budget/forecast values and verify it works
5. View financial history and confirm any changes are recorded

## Troubleshooting

If authentication or access control isn't working:

1. Check your .env.local file to ensure NEXTAUTH_SECRET and NEXTAUTH_URL are set
2. Look at browser console logs for session and role-related information
3. Verify the network requests to /api/auth/* endpoints
4. Check browser storage (cookies/localStorage) for auth tokens
5. Restart the development server to ensure environment variables are loaded

## How the Authentication and Access Control Works

1. User logs in with email/password via the custom login page
2. After credential verification, the MFA code is sent to email
3. User enters the MFA code which is verified by the server
4. The client then uses the verified credentials to sign in via NextAuth
5. NextAuth creates a session with the user's information including role
6. Components use useSession() to access the user's role for access control
7. The FinancialsTab component specifically:
   - Shows/hides UI elements based on the user's role
   - Disables actions that the user doesn't have permission for
   - Shows informative messages explaining what the user can/cannot do
   - Enforces permissions on both client and server side
