Objective:
To access the candidate’s ability to plan, develop and deploy a full stack web application which
consists of a web application (with / without API) and a database.
*Note that you do not have to complete all this requirements in the timeframe given, but the
completeness of the application plays a part in the final score.
Deliverables:
1) Source code for Web Application
2) Screenshot of DB Collections and a sample of JSON object
3) A short documentation / user guide on how to use the Web Application with Images and
Explanations
Technology Stack:
1) Front-end: ReactJS
2) Server-side: NodeJS
3) Database: Mongodb
4) Bonus Points if you deploy your web app to online
Scope of Project:
You are tasked to design and develop a full stack web application that will facilitate the online
booking of wellness events (health talks, onsite screenings, etc) and the vendor approval or
rejection of said events.
Company Human Resource accounts will create the events with 3 proposed dates and 1 proposed
location while the Vendor Accounts (vendors are tagged to different event items) will reject (specify
a reason) or approve (select a date) the event.
The fields needed to apply a Wellness Event is as follows:
1) Company Name (auto populated by hr account)
2) 3 Proposed Dates
3) 1 Proposed Location (postal code and populate street name for bonus, if not free text)
4) Event ID / Name (Dropdown of event)
The backend system needs to capture the date created, status and remarks.
1) Date Created – the timestamp when the LoG iscreated
2) Status – The status of the Event (Pending /Approve)
3) Remarks – Rejected Remarks
4) Confirmed Date by Vendor
There is no need to create a registration page, just pre-create the accounts on the backend.

Pages to Build
No Name Description
1 Login Page Allows users to login with username and password
2 Company HR Admin
Dashboard

A simple table with a list of created events these fields:
- Event Name
- Vendor Name
- Confirmed Date (Proposed Dates if no Confirmed Date)
- Status
- Date Created
- View button

3 Vendor Admin
Dashboard

A simple table with a list of created events these fields:
- Event Name
- Vendor Name
- Confirmed Date (Proposed Dates if no Confirmed Date)
- Status
- Date Created
Individual Rows will also one button:
1) View

4 Event Popup – HR
/Vendor Admin

When the admin clicks on the “view” button for each individual
Event there will be a popup modal:
1) All information listed for the event.
2) If the Event Popup is called by Vendor Admin, there are 2
buttons Approve / Reject
3) After clicking approve, select one of the 3 dates to approve.
4) If click Reject – Text popup for them to enter the reason.

Bonus: If you can demonstrate each vendor accounts can only see their own events and the
company HR can view only their own events.

Assessment Criteria:
This test will be assessed with the following criterion:
1) Readable and well-documented code
2) Scalability of Implementation (how scalable the application is – e.g. nohardcoding)
3) Any prior notes / ER diagrams to show clarity ofthought