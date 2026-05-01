# Lead Form Integration Guide

I have added the enquiry form to your Contact section. To ensure you receive leads via **Email** or to an **Excel sheet**, follow one of these two recommended methods:

## Method 1: Formspree (Easiest - Email + Excel)
Formspree sends an email notification for every lead and stores them in a dashboard where you can export to CSV/Excel.

1.  Go to [Formspree.io](https://formspree.io/) and create a free account.
2.  Create a "New Form" and name it "Grow Your Business Leads".
3.  Copy the **Endpoint URL** (it looks like `https://formspree.io/f/xyzk123`).
4.  In `src/pages/home/components/Contact.tsx`, find the `handleSubmit` function and update the fetch call:
    ```javascript
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Accept': 'application/json' }
    });
    ```

## Method 2: Supabase (Advanced - Database + Excel)
Since your project already has `@supabase/supabase-js`, you can store leads directly in your database.

1.  **Create a Table**: Run this SQL in your Supabase SQL Editor:
    ```sql
    create table leads (
      id uuid default uuid_generate_v4() primary key,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      name text,
      brand text,
      location text,
      requirement text,
      message text
    );
    ```
2.  **Update Component**: Use the Supabase client to insert data:
    ```javascript
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { name: data.name, brand: data.brand, location: data.location, requirement: data.requirement, message: data.message }
      ]);
    ```
3.  **Export to Excel**: In the Supabase dashboard, go to the `leads` table and click **Export to CSV**.

## Method 3: Netlify / Vercel Forms
If you are hosting on Netlify or Vercel, you can simply add a `data-netlify="true"` attribute to the `<form>` tag, and they will handle the storage and email notifications automatically.
