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

we should use shadcn to maintain the UI
we should make an constant file where most of used constant will be used 
we should make an .ENV for development and production
use packages which make coding job easy like for dates we should use dayjs instead of writing the logic again and again
resuable logic should be made in constat like file so it act as single source of truth

make the tanstack implementation as 
    queryClient : here we declear all the config like staleTime, cahceTime
    queryKeys : here we store all the keys and act as single source of truth

admin logic and user login should not be see each other we have to make sure we authenticate the user and if wrong user trying to open routes of each others that time we should make clear the localhost or where authentication stored and navigate to login screen!