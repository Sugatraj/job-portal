we are working on a project named as "Job Portal"
we have to build the Frontend first with static data and we will make it dynamic later on

techstack {
    frontend : next.js + tailwind
    backend : python + fastapi
}

the initial pages now i should create are :

login screen:
    two types of logic 1. admin login 2. user login (employee, candidate)

homepage/dashboard :
    showing logged in users basic informations

sidebar:
    for admin : Candidate (CRUD), Jobs(CRUD)
    for user : Jobs (list the jobs created by the admins), my profile (show users informations)

pages : 
    1. login
    2. dahboard/homescreen/welcome
    3. candidate CRUD (ADMIN)
    4. Jobs CRUD (ADMIN)
    5. Job List (USER)
    6. Myprofile (resuable component for ADMIN and USER)

we should maintain the consistancy while working on this project to be polished UI/UX, Fullstack Developer.
we should follow the react best practices like making reusbale components, makeing an utilies files, folder structures, Tanstack Query, Axios API instance or a single source of API registration, 
we should maintain clean UI/UX that should be scalable project architecure dicisions, mobile first approch with tailwindcss 
we should always think to making reusable components
we should follow the AppLayout and children rendering logic so unnecessary rerenders will not happens 